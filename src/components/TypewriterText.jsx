import React from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({ text, className = "" }) => {
    // Split text into words first, then characters to preserve word wrapping
    const words = text.split(" ");

    // Variants for each letter
    const letterVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.05 }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.02, // Fast typing speed
                delayChildren: 0.5
            }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={className}
        >
            {words.map((word, i) => (
                <span key={i} className="inline-block whitespace-nowrap mr-[0.25em]">
                    {word.split("").map((char, j) => (
                        <motion.span key={j} variants={letterVariants} className="inline-block">
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </motion.div>
    );
};

export default TypewriterText;
