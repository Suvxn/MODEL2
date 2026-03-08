/* eslint-disable no-unused-vars */
import React from 'react';
import bgVideo from '../assets/videos/bgvideo.mp4';
import { motion, AnimatePresence } from 'framer-motion';
import OppositeScroll from '../components/OppositeScroll';
import RevealLinks from '../components/RevealLinks';


const Home = ({ isLoading = false }) => {

    // Flicker effect for "Chronicles" (Purple)
    const chroniclesFlickerVariants = {
        hidden: { opacity: 0.1 },
        visible: {
            opacity: [0.1, 1, 0.1, 1, 0.5, 1, 0.2, 1, 1, 0.1, 1],
            transition: {
                duration: 2, // Slightly slower/different rhythm
                times: [0, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.7, 0.8, 1],
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.5
            }
        }
    };





    return (
        <div className="bg-black relative">

            {/* Section 1: Hero */}
            <div className="relative w-full h-screen overflow-hidden text-white">
                {/* Background Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                >
                    <source src={bgVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" />

                {/* Content */}
                <div className="relative z-20 w-full h-full flex items-center px-8 md:px-20 max-w-7xl mx-auto">
                    <AnimatePresence>
                        {!isLoading && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                                className="max-w-4xl mx-auto flex flex-col items-center text-center"
                            >
                                <h1 className="text-6xl md:text-8xl font-black mb-8 font-['Ethnocentric'] tracking-widest flex items-center justify-center flex-wrap gap-y-4">
                                    <motion.span 
                                        initial={{ opacity: 0, y: -50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.8 }}
                                        className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] block w-full md:w-auto"
                                    >
                                        Astro
                                    </motion.span>
                                    <motion.span 
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 1.2 }}
                                        className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F3FF] to-[#7000FF] drop-shadow-[0_0_30px_rgba(0,243,255,0.3)] block w-full md:w-auto md:ml-4"
                                    >
                                        NITR
                                    </motion.span>
                                </h1>
                                
                                <motion.p 
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, ease: "easeOut", delay: 1.6 }}
                                    className="text-gray-300 text-lg md:text-lg font-light leading-relaxed tracking-wide backdrop-blur-sm bg-black/30 p-8 rounded-3xl border border-white/5 shadow-2xl"
                                >
                                    Welcome to <span className="text-white font-medium">AstroNITR</span>, the epitome of the astronomical quest at NIT Rourkela. As a cornerstone of the Technical Society and the official Astronomy and Astrophysics club, we offer a sophisticated platform for students dedicated to exploring the cosmos. Boasting exclusive access to cutting-edge telescopic instruments such as the Celestron CPC 800GPS (XLT) and Nexstar 130SLT Computerised Telescope, seldom found in academic settings, where we provide unmatched opportunities for rigorous celestial observation and advanced astrophotography. Join us as we embark on a meticulously curated journey, where the intricacies of the cosmos become our focal point, fostering enduring connections with the universe.
                                </motion.p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Section 2: Opposite Scroll */}
            <section id="section2" className="relative z-20 bg-black">
                <div className="py-24 flex justify-center items-center">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl text-white font-['Ethnocentric'] tracking-widest text-center px-4"
                        style={{
                            textShadow: "0 0 20px rgba(103, 232, 249, 0.3)"
                        }}
                    >
                        <span>AstroNITR’s Celestial </span>
                        <motion.span
                            variants={chroniclesFlickerVariants}
                            initial="hidden"
                            whileInView="visible" // Start flicker when in view
                            viewport={{ once: true }}
                            className="inline-block ml-2"
                            style={{
                                color: "#7000FF", // Nebula Purple
                                textShadow: "0 0 15px rgba(112, 0, 255, 0.6)"
                            }}
                        >
                            Chronicles
                        </motion.span>
                    </motion.h2>
                </div>
                <OppositeScroll />
            </section>

            {/* Section 3: Reveal Links */}
            <RevealLinks />
        </div>
    );
};

export default Home;
