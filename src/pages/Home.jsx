/* eslint-disable no-unused-vars */
import React from 'react';
import bgVideo from '../assets/videos/bgvideo.mp4';
import { motion } from 'framer-motion';
import OppositeScroll from '../components/OppositeScroll';
import RevealLinks from '../components/RevealLinks';
import TypewriterText from '../components/TypewriterText';
import ScrollSpaceship from '../components/ScrollSpaceship';

const Home = () => {

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



    const descriptionText = "Welcome to AstroNITR, the epitome of the astronomical quest at NIT Rourkela. As a cornerstone of the Technical Society and the official Astronomy and Astrophysics club, we offer a sophisticated platform for students dedicated to exploring the cosmos. Boasting exclusive access to cutting-edge telescopic instruments such as the Celestron CPC 800GPS (XLT) and Nexstar 130SLT Computerised Telescope, seldom found in academic settings, where we provide unmatched opportunities for rigorous celestial observation and advanced astrophotography. Join us as we embark on a meticulously curated journey, where the intricacies of the cosmos become our focal point, fostering enduring connections with the universe.";

    return (
        <div className="bg-black relative">
            <ScrollSpaceship />

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
                    <div className="max-w-3xl bg-black/60 backdrop-blur-sm border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl">
                        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter flex items-center select-none font-['Ethnocentric'] overflow-hidden">
                            {/* "Astro" - Silver/White */}
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="flex text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                            >
                                Astro
                            </motion.div>

                            {/* "NITR" - Gradient & Glow */}
                            <motion.div
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                className="flex ml-2 bg-gradient-to-r from-[#00F3FF] to-[#7000FF] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,243,255,0.4)]"
                            >
                                NITR
                            </motion.div>
                        </h1>

                        {/* Typewriter Text */}
                        <div className="text-lg md:text-xl leading-relaxed font-light text-gray-200">
                            <TypewriterText text={descriptionText} />
                        </div>
                    </div>
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
