import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoUrl from '../assets/images/logo.png';

const InitialLoader = ({ onComplete }) => {
    useEffect(() => {
        // Automatically hide the loader and call onComplete after the animation
        // Animation takes 3s, keep the loader visible for 3.2s then transition out
        const timer = setTimeout(() => {
            onComplete();
        }, 3200);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            <motion.div
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
            >
                <div className="flex items-center gap-6">
                    {/* Logo Animation */}
                    <motion.img
                        src={logoUrl}
                        alt="AstroNITR Logo"
                        initial={{ opacity: 0, filter: "blur(20px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{ duration: 3, ease: "easeOut" }}
                        className="w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                    />

                    {/* Text Animation */}
                    <motion.h1
                        initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        transition={{ duration: 3, ease: "easeOut", delay: 0.2 }}
                        className="text-white font-['Ethnocentric'] text-3xl md:text-5xl font-bold tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] flex"
                    >
                        {/* Adding subtle glow effect using Tailwind classes */}
                        <div className="flex">
                            <span className="drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Astro</span>
                            <span className="ml-[2px] bg-gradient-to-r from-[#00F3FF] to-[#7000FF] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,243,255,0.4)]">
                                NITR
                            </span>
                        </div>
                    </motion.h1>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default InitialLoader;
