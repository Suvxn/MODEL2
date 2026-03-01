/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const menuVariants = {
    hidden: {
        opacity: 0,
        y: '-100%',
        transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1]
        }
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1]
        }
    },
    exit: {
        opacity: 0,
        y: '-100%',
        transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1]
        }
    }
};

const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.1 + i * 0.1,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    })
};

const MobileMenu = ({ navLinks, onNavigate }) => {
    return (
        <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl pt-32 px-6 flex flex-col items-center justify-start"
        >
            <div className="flex flex-col gap-8 w-full max-w-md items-center">
                {navLinks.map((link, i) => (
                    <motion.div
                        key={link.name}
                        custom={i}
                        variants={linkVariants}
                        className="w-full text-center"
                    >
                        <button
                            onClick={() => onNavigate(link.path)}
                            className="text-4xl font-light tracking-widest text-white/80 hover:text-white uppercase py-2 transition-all w-full border-b border-white/10 hover:border-white/30"
                        >
                            {link.name}
                        </button>
                    </motion.div>
                ))}

                <motion.div
                    key="contact"
                    custom={navLinks.length}
                    variants={linkVariants}
                    className="mt-8"
                >
                    <button
                        onClick={() => onNavigate('/contact')}
                        className="flex items-center gap-3 px-8 py-3 bg-white text-black rounded-full font-medium uppercase tracking-wide hover:scale-105 transition-transform"
                    >
                        Start a Project
                        <ArrowUpRight size={20} />
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default MobileMenu;
