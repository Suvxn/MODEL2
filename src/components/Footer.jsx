/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/images/logo.png';
import { Facebook, Instagram, Linkedin, Twitter, MessageCircle } from 'lucide-react';

const Footer = () => {
    // Brand Icons as SVGs for better accuracy if Lucide is generic, 
    // but Lucide icons are quite clean. I'll use Lucide where possible 
    // and fallback/custom where needed.
    // Lucide doesn't have a specific "WhatsApp" icon usually, suggesting MessageCircle or custom.
    // I will use custom SVGs for the brands to be precise, especially X.com.

    const socialLinks = [
        {
            name: 'Facebook',
            url: 'https://www.facebook.com/astronitr/',
            icon: <Facebook size={24} />
        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/astro_nitr',
            icon: <Instagram size={24} />
        },
        {
            name: 'X',
            url: 'https://x.com/AstroNITR',
            // Custom X icon since Lucide Twitter might be the bird
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231h.001zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
                </svg>
            )
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/company/astronitr/',
            icon: <Linkedin size={24} />
        },
        {
            name: 'WhatsApp',
            url: 'https://chat.whatsapp.com/IiSG9dYoKSc3dRfeCcSyZP',
            // Custom WhatsApp icon
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            )
        }
    ];

    return (
        <footer className="w-full bg-[#020005] border-t border-white/10 relative z-30">
            <div className="max-w-7xl mx-auto px-6 py-4 md:py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">

                    {/* Left: Logo and Branding */}
                    <div className="flex items-center gap-4">
                        <img src={logo} alt="AstroNITR Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
                        <span className="text-xl md:text-2xl font-bold text-white font-['Ethnocentric'] tracking-widest">
                            Astro<span className="text-[#674dff]">NITR</span>
                        </span>
                    </div>

                    {/* Right: Social Links */}
                    <div className="flex items-center gap-6">
                        {socialLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.url}
                                target="_blank" // Opens in new tab
                                rel="noopener noreferrer" // Security best practice
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-gray-400 hover:text-[#00F3FF] transition-colors duration-300"
                                aria-label={link.name}
                            >
                                {link.icon}
                            </motion.a>
                        ))}
                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;
