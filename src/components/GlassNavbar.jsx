import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import logo from '../assets/images/logo.png';
import MobileMenu from './MobileMenu';

const GlassNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Astronomica', path: '/astronomica' },
        { name: 'Team', path: '/team' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Orbits', path: '/orbits' },
    ];

    const handleNavigation = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <div className="w-full max-w-7xl mx-auto pointer-events-auto">
                <div className="relative flex items-center justify-between px-6 py-4 bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-full shadow-2xl mx-4 mt-4">

                    {/* Left: Logo (Clickable -> Home) */}
                    <div
                        onClick={() => handleNavigation('/')}
                        className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
                    </div>

                    {/* Center: Links (Desktop) */}
                    <div className="hidden md:flex items-center gap-12 text-[11px] font-medium tracking-[0.2em] text-gray-300">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => handleNavigation(link.path)}
                                className={`hover:text-white transition-colors duration-300 relative group uppercase bg-transparent border-none cursor-pointer ${location.pathname === link.path ? 'text-white' : ''}`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 h-[1px] bg-white transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                            </button>
                        ))}
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3">
                        {/* Desktop Contact Button */}
                        <div className="hidden md:flex items-center">
                            <div
                                onClick={() => handleNavigation('/contact')}
                                className="group flex items-center justify-center w-12 h-12 bg-white rounded-full text-black hover:scale-105 transition-transform duration-300 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(45,212,191,0.4)]"
                                title="Contact Us"
                            >
                                <ArrowUpRight
                                    strokeWidth={2.5}
                                    size={20}
                                    className="transition-transform duration-300 group-hover:rotate-45"
                                />
                            </div>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={toggleMenu}
                                className="w-12 h-12 flex items-center justify-center text-white hover:text-gray-300 transition-colors bg-white/10 rounded-full backdrop-blur-md"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <MobileMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                        navLinks={navLinks}
                        onNavigate={handleNavigation}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default GlassNavbar;
