/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { useGLTF, useAnimations, Stars, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
const solarSystemModel = `${import.meta.env.BASE_URL}models/solar_system_animation/scene.gltf`.replace('//', '/');

// Preload the model
useGLTF.preload(solarSystemModel);

const Model = ({ onObjectClick }) => {
    const group = useRef();
    const { scene, animations } = useGLTF(solarSystemModel);
    const { actions } = useAnimations(animations, group);

    // Play all animations on mount (orbits/rotations)
    useEffect(() => {
        if (actions) {
            Object.values(actions).forEach(action => action.play());
        }
    }, [actions]);

    const handleClick = (e) => {
        e.stopPropagation();
        // Traverse up to find a named node if the clicked mesh is part of a larger group
        // Usually models are structured Mesh -> Object3D (Named)
        // We'll try to find a meaningful name.
        let target = e.object;
        while (target) {
            // Filter some common non-planet names if needed, or just take the first meaningful one
            // Assuming the model uses standard names like "Sun", "Earth", etc.
            if (target.name && target.name !== 'Scene' && !target.name.startsWith('Object')) {
                onObjectClick(target.name);
                return;
            }
            // If it is 'Object_X', we might want to check its parent
            if (target.parent && target.parent.name) {
                // Try parent
            }
            target = target.parent;
            if (target === scene) break;
        }

        // Fallback: just use the mesh name if it has one, or "Unknown"
        // Some Sketchfab models use complex naming like "Earth_01_..." 
        // We will clean it up in the UI.
        const rawName = e.object.name || e.object.parent?.name || "Celestial Body";
        onObjectClick(rawName);
    };

    return (
        <group ref={group} dispose={null} onClick={handleClick}>
            {/* Scale might need adjustment depending on the model size */}
            <primitive object={scene} scale={0.5} />
        </group>
    );
};

const SolarSystem = () => {
    const [selectedBody, setSelectedBody] = useState(null);

    return (
        <div className="w-full h-screen bg-black relative">

            {/* Canvas */}
            <Canvas camera={{ position: [0, 20, 30], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[0, 0, 0]} intensity={2} color="#ffcc00" distance={100} /> {/* Sun Light */}
                <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Model onObjectClick={setSelectedBody} />

                <OrbitControls enableZoom={true} enablePan={true} maxDistance={200} minDistance={10} />
            </Canvas>

            {/* Info Panel */}
            <AnimatePresence>
                {selectedBody && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md border border-[#00F3FF] p-6 rounded-xl text-center min-w-[300px]"
                    >
                        <h2 className="text-3xl text-[#00F3FF] font-['Ethnocentric'] mb-2">
                            {selectedBody.replace(/_/g, ' ').replace(/[0-9]/g, '').trim()}
                        </h2>
                        <button
                            onClick={() => setSelectedBody(null)}
                            className="text-xs text-gray-400 hover:text-white mt-2 underline"
                        >
                            Close
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SolarSystem;
