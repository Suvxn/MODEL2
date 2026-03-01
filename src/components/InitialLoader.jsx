import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// --------------------------------------------------------
// StarField Component
// --------------------------------------------------------
const StarField = ({ warping }) => {
    const points = useRef();

    // Create thousands of stars
    const starCount = 6000;

    const [positions, initialZ] = useMemo(() => {
        const pos = new Float32Array(starCount * 3);
        const z = new Float32Array(starCount);

        for (let i = 0; i < starCount; i++) {
            // Spread stars in a wide cylinder around the camera 
            // x and y: random spread, but avoid the very center to give a "tunnel" feel if desired, 
            // or just uniform. Let's do uniform but wide.
            const r = 400 * Math.sqrt(Math.random());
            const theta = Math.random() * 2 * Math.PI;

            pos[i * 3] = r * Math.cos(theta);     // x
            pos[i * 3 + 1] = r * Math.sin(theta); // y

            // z: spread deep into the screen
            const d = Math.random() * 1000;
            pos[i * 3 + 2] = -d;                  // z

            z[i] = pos[i * 3 + 2];
        }
        return [pos, z];
    }, []);

    useFrame((state, delta) => {
        // Base speed is slow, warp speed is fast
        const targetSpeed = warping ? 2000 : 20;
        // Smoothly accelerate/decelerate
        // Note: We can use a ref for currentSpeed to avoid re-renders if we wanted, 
        // but straight calculation is fine here.

        // We update the positions manually for performance
        const positionsArray = points.current.geometry.attributes.position.array;

        for (let i = 0; i < starCount; i++) {
            // Move star towards camera (positive Z)
            // Different stars can have slightly different speeds for parallax, 
            // utilizing their initial random depth or valid index
            const speedMultiplier = 1 + (i % 10) * 0.1;

            let moveStep = targetSpeed * delta * speedMultiplier;
            if (warping) moveStep *= 2; // Extra kick for warp

            positionsArray[i * 3 + 2] += moveStep;

            // If star passes camera (z > 50), reset it far back
            if (positionsArray[i * 3 + 2] > 50) {
                positionsArray[i * 3 + 2] = -1000;
            }
        }

        points.current.geometry.attributes.position.needsUpdate = true;

        // Optional: Rotate the whole tunnel slightly
        if (!warping) {
            points.current.rotation.z += delta * 0.05;
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={starCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={warping ? 1.5 : 0.8}
                color={warping ? "#00ffff" : "white"}
                transparent
                opacity={0.8}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
};

// --------------------------------------------------------
// Main Loader Component
// --------------------------------------------------------
const InitialLoader = ({ onComplete }) => {
    const [status, setStatus] = useState("idle"); // idle, ready, countdown, warping, done
    const [count, setCount] = useState(3);
    const [warping, setWarping] = useState(false);

    // Sequence for text
    useEffect(() => {
        const timer1 = setTimeout(() => setStatus("ready"), 2000);
        return () => clearTimeout(timer1);
    }, []);

    const handleLaunch = () => {
        if (status !== "ready") return;

        startWarp();
    };

    const startWarp = () => {
        setStatus("warping");
        setWarping(true);

        // Play warp animation for 2.5 seconds, then finish
        setTimeout(() => {
            setStatus("done");
            setTimeout(onComplete, 1000);
        }, 2500);
    };

    return (
        <AnimatePresence>
            {status !== "done" && (
                <motion.div
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="fixed inset-0 z-[9999] bg-black overflow-hidden"
                >
                    {/* 3D Canvas */}
                    <div className="absolute inset-0 z-0">
                        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
                            <color attach="background" args={['#000000']} />
                            <fog attach="fog" args={['#000000', 50, 1000]} />
                            <StarField warping={warping} />
                        </Canvas>
                    </div>

                    {/* UI Overlay */}
                    <div
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
                    >
                        {/* Centered Cinematic Text */}
                        <AnimatePresence mode="wait">
                            {status === "idle" && (
                                <motion.h1
                                    key="init"
                                    initial={{ opacity: 0, scale: 0.9, letterSpacing: "5px" }}
                                    animate={{ opacity: 1, scale: 1, letterSpacing: "10px" }}
                                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                    transition={{ duration: 1 }}
                                    className="text-cyan-400 font-['Orbitron'] text-xl md:text-3xl font-bold tracking-widest uppercase"
                                >
                                    System Initializing...
                                </motion.h1>
                            )}

                            {status === "ready" && (
                                <motion.div
                                    key="ready"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 3, filter: "blur(20px)" }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col items-center cursor-pointer pointer-events-auto"
                                    onClick={handleLaunch}
                                >
                                    <h1 className="text-white font-['Ethnocentric'] text-4xl md:text-7xl font-bold tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
                                        READY
                                    </h1>
                                    <motion.p
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="mt-6 text-cyan-500 font-mono text-sm tracking-[0.3em] uppercase"
                                    >
                                        Click to Engage Warp Drive
                                    </motion.p>

                                    {/* Decorative bracket graphic */}
                                    <div className="mt-8 w-64 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
                                </motion.div>
                            )}

                            {status === "warping" && (
                                <div className="relative flex items-center justify-center">
                                    {/* Main GO */}
                                    <motion.h1
                                        key="warp-main"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: [1, 1.2, 1] }}
                                        transition={{ duration: 0.2, repeat: Infinity }}
                                        className="relative z-20 text-white font-black text-6xl md:text-9xl tracking-widest uppercase italic mix-blend-overlay"
                                    >
                                        GO!
                                    </motion.h1>

                                    {/* Echo/Ghost Effects - Reduced for performance */}
                                    <motion.h1
                                        initial={{ opacity: 0.5, scale: 1 }}
                                        animate={{
                                            opacity: 0,
                                            scale: 2,
                                        }}
                                        transition={{
                                            duration: 0.8,
                                            repeat: Infinity,
                                            ease: "easeOut"
                                        }}
                                        className="absolute z-10 text-cyan-500 font-black text-6xl md:text-9xl tracking-widest uppercase italic opacity-30 select-none"
                                        style={{ filter: 'blur(5px)' }}
                                    >
                                        GO!
                                    </motion.h1>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Speed Lines / Vignette Overlay for extra depth */}
                    <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-40"></div>

                    {/* White Flash on Exit */}
                    {status === "warping" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 2.0, ease: "easeIn" }}
                            className="absolute inset-0 bg-white z-50 pointer-events-none"
                        />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InitialLoader;
