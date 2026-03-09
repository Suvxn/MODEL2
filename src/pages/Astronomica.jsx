import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/images/logo.png';
import spaceBg1 from '../assets/images/space-bg.jpg';
import spaceBg2 from '../assets/images/space-bg2.jpg';
import spaceBg3 from '../assets/images/space-bg3.jpg';
import posterImg from '../assets/images/poster.png';
import brochurePdf from '../assets/docs/Brochure.pdf';
import guidelinesPdf from '../assets/docs/Guidelines.pdf';

const bgImages = [spaceBg1, spaceBg2, spaceBg3];

const Astronomica = () => {
    const [currentBg, setCurrentBg] = useState(0);

    // Slideshow effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBg((prev) => (prev + 1) % bgImages.length);
        }, 5000); // Change image every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-black min-h-screen text-white w-full overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
                {/* Background Slideshow */}
                <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentBg}
                        src={bgImages[currentBg]}
                        alt="Space Background"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>
                {/* Overlay to darken background slightly for text readability */}
                <div className="absolute inset-0 bg-black/40 z-10" />
            </div>

            {/* Hero Content */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full w-full text-center px-4">
                {/* Logo */}
                <motion.img 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    src={logo} 
                    alt="AstroNITR Logo" 
                    className="w-32 md:w-48 mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                />

                {/* Text Elements */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="flex flex-col items-center gap-2 mb-8"
                >
                    <h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-['Quintessential'] tracking-wider drop-shadow-lg">
                        EXPLORE THE COSMOS
                    </h2>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl text-[#FF0055] font-['Quintessential'] tracking-widest drop-shadow-[0_0_15px_rgba(255,0,85,0.4)]">
                        ASTRONOMICA
                    </h1>
                </motion.div>

                {/* Register Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    <button className="px-8 py-2 md:px-10 md:py-3 bg-[#FF0055] text-white text-base md:text-lg rounded-xl shadow-[0_6px_0_#990033,0_15px_20px_rgba(255,0,85,0.4)] hover:bg-[#ff1a66] hover:shadow-[0_4px_0_#990033,0_15px_30px_rgba(255,0,85,0.6)] hover:translate-y-[2px] active:shadow-[0_0px_0_#990033,0_10px_10px_rgba(255,0,85,0.4)] active:translate-y-[6px] transition-all duration-150 font-medium tracking-wide">
                        Register
                    </button>
                </motion.div>
            </div>
            </section>

            {/* Section 2: Details */}
            <section className="relative w-full py-24 px-8 md:px-20 max-w-7xl mx-auto z-20">
                {/* Heading Area */}
                <div className="flex flex-col items-center justify-center w-full mb-16 relative">
                    <h3 className="text-[#E2E8F0] tracking-[0.5em] text-sm md:text-base font-['Quintessential'] uppercase z-10 relative">
                        ASTRONOMICA
                    </h3>
                    
                    <div className="relative flex justify-center items-center mt-2 w-full">
                        {/* Background Faded Text */}
                        <span className="absolute text-7xl md:text-9xl font-['Beau_Rivage'] text-white/5 select-none tracking-wider -translate-y-2">
                            Details
                        </span>
                        {/* Foreground Sharp Text */}
                        <h2 className="text-5xl md:text-7xl font-['Beau_Rivage'] text-white z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                            Details
                        </h2>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Left side text */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full lg:w-3/5"
                    >
                        <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
                            Welcome to the spectacular Astronomica 3.0, the annual cosmic extravaganza hosted by AstroNITR, 
                            promising an unparalleled odyssey through the cosmos for young enthusiasts! Calling all budding stargazers 
                            in grades 10 and 12 to join us for an exhilarating journey into the depths of space. Prepare yourselves for an 
                            array of captivating events including a stellar quiz round, captivating documentaries on celestial marvels, 
                            engaging recreational activities, telescope adventures, observation sessions, and more!
                        </p>
                    </motion.div>

                    {/* Right side poster */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="w-full lg:w-2/5 flex justify-center"
                    >
                        <img 
                            src={posterImg} 
                            alt="Astronomica Poster" 
                            className="w-full max-w-md rounded-lg shadow-[0_0_30px_rgba(255,0,85,0.15)] border border-white/5"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Section 3: Events */}
            <section className="relative w-full py-16 px-8 md:px-20 max-w-7xl mx-auto z-20">
                {/* Heading Area */}
                <div className="flex flex-col items-center justify-center w-full mb-16 relative">
                    <h3 className="text-[#E2E8F0] tracking-[0.5em] text-sm md:text-base font-['Quintessential'] uppercase z-10 relative">
                        ASTRONOMICA
                    </h3>
                    
                    <div className="relative flex justify-center items-center mt-2 w-full">
                        {/* Background Faded Text */}
                        <span className="absolute text-7xl md:text-9xl font-['Beau_Rivage'] text-white/5 select-none tracking-wider -translate-y-2">
                            Events
                        </span>
                        {/* Foreground Sharp Text */}
                        <h2 className="text-5xl md:text-7xl font-['Beau_Rivage'] text-white z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                            Events
                        </h2>
                    </div>
                </div>

                {/* Events List */}
                <div className="text-gray-300 text-base md:text-lg font-light leading-relaxed space-y-4 max-w-5xl">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        • <span className="text-[#5b5bff] font-medium">Cosmic Prelude and Celestial Challenge:</span> Easy yet engaging general astronomy quiz, serving as the Preliminary Round
                    </motion.p>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        • <span className="text-[#5b5bff] font-medium">Galactic Chronicles:</span> Immerse yourself in an enthralling documentary session that will transport you across the vast expanse of space.
                    </motion.p>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        • <span className="text-[#5b5bff] font-medium">Cosmic Revelry:</span> Get ready to indulge in some pre-treasure hunt fun! Following the competitive excitement, we've lined up a series of enjoyable activities where you can score goodies and treasure trinkets. But shh, it's a surprise!
                    </motion.p>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        • <span className="text-[#5b5bff] font-medium">Stellar Quest:</span> Following the mesmerizing documentary, get ready to embark on a thrilling astronomical treasure hunt! This one-of-a-kind adventure will challenge you to unravel astronomy-themed riddles and puzzles, uncovering fascinating insights into the universe with each clue solved.
                    </motion.p>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        • <span className="text-[#5b5bff] font-medium">Telescope Expedition:</span> Step into the world of celestial wonders with our telescope session, where you'll journey through the cosmos guided by our expert astronomers.
                    </motion.p>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        • <span className="text-[#5b5bff] font-medium">Celestial Observation:</span> Now that you've mastered telescope handling, it's time for the eagerly awaited observation session - hip, hip, hooray! We'll delve into the fascinating realm of solar observations, exploring topics like the sun, solar flares, sun filters, and much more.
                    </motion.p>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
                        • <span className="text-[#5b5bff] font-medium">Prize Distribution Ceremony:</span> Celebrate excellence at our prestigious prize distribution ceremony, where accolades await the brightest minds. Among the coveted rewards is a state-of-the-art telescope, alongside two cutting-edge science gadgets.
                    </motion.p>
                </div>

                {/* Download Links */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="flex justify-center gap-12 mt-16 text-[#ffe599] text-lg font-medium tracking-widest font-['Orbitron']"
                >
                    <a href={brochurePdf} download="Brochure.pdf" className="hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,229,153,0.8)] transition-all flex items-center gap-3">
                        <span className="text-2xl leading-none">•</span> Brochure
                    </a>
                    <a href={guidelinesPdf} download="Guidelines.pdf" className="hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,229,153,0.8)] transition-all flex items-center gap-3">
                        <span className="text-2xl leading-none">•</span> Guideline
                    </a>
                </motion.div>
            </section>
        </div>
    );
};

export default Astronomica;
