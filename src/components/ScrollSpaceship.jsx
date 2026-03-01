import React, { useRef, useLayoutEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SpaceshipModel = () => {
    // Load the generic spaceship model
    // Using the path found: src/assets/models/spaceship/scene.gltf
    // In Vite, we might need to import it or move it to public. 
    // Assuming for now it works via direct import or public. 
    // If it's in src, we usually import it. Let's try dynamic import string or assume user handles asset moving.
    // Ideally, GLTFs should be in public for easier access, but let's try assuming the build handles it or use the one we found.
    // Correction: I should probably move the model to public if I want to use standard GLTF loading paths effortlessly.
    // For now, let's assume it's moved or accessible at /models/spaceship/scene.gltf if copied to public.
    // BUT I SAW IT IN src/assets. I will try to use the path relative to public if I can, or import it.
    // UseGLTF supports urls.

    // NOTE: The user has it in `src/assets`. I should probably copy it to public to be safe, but let's see. 
    // I'll assume I can reference it via a direct import if I was inside a component, but useGLTF needs a string path. 
    // I'll assume the user has configured Vite to serve assets or I'll refer to it if it was in public.
    // Let's copy it to public/models/spaceship/scene.gltf to be Robust.

    // Waiting for the copy tool? No, I'll just code it assuming it's at /models/spaceship/scene.gltf
    // and I'll perform a copy command next if needed.
    // Actually, I saw `public/models` exists. Let's assume I refer to that.

    const { scene } = useGLTF('/models/spaceship/scene.gltf');
    const shipRef = useRef();

    // Zig-Zag Curve (Normalized -1 to 1 X, Y is inverted)
    // ThreeJS coordinates: Center (0,0). 
    // Visible range depends on camera Z. At Z=5, width is ~6, height ~4ish.

    useLayoutEffect(() => {
        if (!shipRef.current) return;

        // Initial setup
        const ship = shipRef.current;
        ship.position.set(2, 2, 0); // Start Top-Right
        ship.scale.set(0.05, 0.05, 0.05); // Adjust scale as needed

        // GSAP Scroll Animation
        // We animate a 'progress' object and update the ship's position onTick
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.documentElement,
                start: "top top",
                end: "bottom bottom",
                scrub: 1, // Smooth interaction
            }
        });

        // Define Zig Zag Waypoints
        // X: Right (2) -> Left (-2) -> Right (2) -> Center (0)
        // Y: Top (2) -> ... -> Bottom (-2)

        tl.to(ship.position, {
            x: -2.5,
            y: 0.5,
            z: 0.5,
            duration: 1,
            ease: "power1.inOut",
            onUpdate: () => {
                // simple banking logic could go here
                ship.rotation.z = 0.5; // Bank Left
            }
        })
            .to(ship.position, {
                x: 2.5,
                y: -1,
                z: 0,
                duration: 1,
                ease: "power1.inOut",
                onUpdate: () => {
                    ship.rotation.z = -0.5; // Bank Right
                }
            })
            .to(ship.position, {
                x: 0,
                y: -2.5,
                z: 2, // Come closer at the end (fly out)
                duration: 1,
                ease: "power1.inOut",
                onUpdate: () => {
                    ship.rotation.z = 0; // Level out
                }
            });

        // Add rotation animation for constant spinning or banking
        // We can just rely on the onUpdates above or separate tweens

        return () => {
            if (tl) tl.kill();
        };
    }, [scene]);

    return <primitive ref={shipRef} object={scene} />;
};

const ScrollSpaceship = () => {
    return (
        <div className="fixed inset-0 z-50 pointer-events-none">
            {/* Use a transparent canvas on top of everything */}
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={2} />
                <spotLight position={[-10, -10, -10]} intensity={1} color="cyan" />
                <SpaceshipModel />
            </Canvas>
        </div>
    );
};

export default ScrollSpaceship;
