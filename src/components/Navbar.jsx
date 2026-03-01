/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import GlassNavbar from './GlassNavbar';

const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.5 // Wait for some initial load if needed
        }
    }
};

const Navbar = () => {
    return (
        <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="visible"
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        >
            <GlassNavbar />
        </motion.nav>
    );
};

export default Navbar;
