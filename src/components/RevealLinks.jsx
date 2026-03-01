/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const RevealLinks = () => {
    return (
        <section className="grid place-content-center gap-2 bg-[#020005] px-8 py-24 text-white">
            <FlipLink to="/">About</FlipLink>
            <FlipLink to="/astronomica">Astronomica</FlipLink>
            <FlipLink to="/gallery">Gallery</FlipLink>
            <FlipLink to="/orbits">Orbits</FlipLink>
            <FlipLink to="/team">Team</FlipLink>
            <FlipLink to="/contact">Contact Us</FlipLink>
        </section>
    );
};

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, to }) => {
    const handleClick = (e) => {
        if (to === "/") {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            // If we are not on home, we might need navigation logic, 
            // but for now assuming this is a single page or mainly home.
            // If using Router, we should check if we are on another page.
            // But getting current location requires useLocation hook or window.location.
            if (window.location.pathname !== "/") {
                window.location.href = "/";
            }
        }
    };

    return (
        <motion.div
            initial="initial"
            whileHover="hovered"
            className="relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl font-['Ethnocentric']"
            style={{
                lineHeight: 0.85,
            }}
        >
            <Link to={to} className="block" onClick={handleClick}>
                <div>
                    {children.split("").map((l, i) => (
                        <motion.span
                            variants={{
                                initial: {
                                    y: 0,
                                },
                                hovered: {
                                    y: "-100%",
                                },
                            }}
                            transition={{
                                duration: DURATION,
                                ease: "easeInOut",
                                delay: STAGGER * i,
                            }}
                            className="inline-block"
                            key={i}
                        >
                            {l === " " ? "\u00A0" : l}
                        </motion.span>
                    ))}
                </div>
                <div className="absolute inset-0">
                    {children.split("").map((l, i) => (
                        <motion.span
                            variants={{
                                initial: {
                                    y: "100%",
                                },
                                hovered: {
                                    y: 0,
                                },
                            }}
                            transition={{
                                duration: DURATION,
                                ease: "easeInOut",
                                delay: STAGGER * i,
                            }}
                            className="inline-block text-[#00F3FF]"
                            key={i}
                        >
                            {l === " " ? "\u00A0" : l}
                        </motion.span>
                    ))}
                </div>
            </Link>
        </motion.div>
    );
};

export default RevealLinks;
