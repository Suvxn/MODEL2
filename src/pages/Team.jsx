import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import logoUrl from '../assets/images/logo.png';

const teamMembers = [
    {
        id: 1,
        name: "Alex Vance",
        role: "Mission Commander",
        image: "https://i.pravatar.cc/300?img=11",
        bio: "Leading the astronomical quest with a focus on deep sky observations.",
    },
    {
        id: 2,
        name: "Sarah Jenkins",
        role: "Lead Astrophotographer",
        image: "https://i.pravatar.cc/300?img=47",
        bio: "Capturing the cosmos through cutting-edge telescopic lenses.",
    },
    {
        id: 3,
        name: "Marcus Chen",
        role: "Stellar Navigator",
        image: "https://i.pravatar.cc/300?img=33",
        bio: "Specializing in celestial coordinate mappings and trajectory tracking.",
    },
    {
        id: 4,
        name: "Elena Rostova",
        role: "Payload Engineer",
        image: "https://i.pravatar.cc/300?img=44",
        bio: "Maintaining the Celestron CPC 800GPS and other advanced arrays.",
    },
    {
        id: 5,
        name: "David Kim",
        role: "Flight Data Officer",
        image: "https://i.pravatar.cc/300?img=15",
        bio: "Analyzing spectral data to uncover the universe's hidden secrets.",
    },
    {
        id: 6,
        name: "Zoe Patel",
        role: "Chief Observer",
        image: "https://i.pravatar.cc/300?img=32",
        bio: "Orchestrating late-night stargazing sessions for the technical society.",
    },
    {
        id: 7,
        name: "James Holden",
        role: "Systems Architect",
        image: "https://i.pravatar.cc/300?img=12",
        bio: "Designing robust infrastructure for our data-heavy astronomical logs.",
    },
    {
        id: 8,
        name: "Aria Solis",
        role: "Outreach Coordinator",
        image: "https://i.pravatar.cc/300?img=20",
        bio: "Fostering enduring connections with the universe for all students.",
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 100, damping: 20 }
    }
};

const Team = () => {
    return (
        <div className="min-h-screen bg-black text-white py-24 px-8 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[20%] left-[10%] w-[30rem] h-[30rem] bg-cyan-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[40rem] h-[40rem] bg-purple-600/10 rounded-full blur-[150px]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 font-['Ethnocentric'] tracking-widest flex items-center justify-center select-none flex-wrap gap-4">
                        <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            EXECUTIVE
                        </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F3FF] to-[#7000FF] drop-shadow-[0_0_20px_rgba(0,243,255,0.4)]">
                            BODY
                        </span>
                    </h1>

                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {teamMembers.map((member) => (
                        <motion.div
                            key={member.id}
                            variants={cardVariants}
                            className="bg-zinc-900/50 backdrop-blur-md rounded-2xl overflow-hidden group relative h-[28rem]"
                        >
                            {/* Full Card Image Background */}
                            <img
                                src={member.image}
                                alt={member.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110 z-0"
                            />

                            {/* Base Gradient Overlay for Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 z-0 transition-opacity duration-500 group-hover:opacity-80"></div>
                            
                            {/* Hover Colored Glow Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/60 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay z-0"></div>

                            {/* Logo at Top Left */}
                            <div className="absolute top-4 left-4 z-20">
                                <img 
                                    src={logoUrl} 
                                    alt="AstroNITR Logo" 
                                    className="w-8 h-8 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                                />
                            </div>

                            <div className="p-6 relative z-10 flex flex-col items-center justify-end text-center h-full pt-32">
                                {/* Details Container (Slides up on hover) */}
                                <div className="transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform translate-y-4 group-hover:-translate-y-4 w-full flex flex-col items-center">
                                    <h3 className="text-2xl font-bold text-white mb-1 tracking-wide group-hover:text-cyan-300 transition-colors duration-300 drop-shadow-md">{member.name}</h3>
                                    <p className="text-cyan-400 text-xs font-semibold uppercase tracking-widest drop-shadow-sm">{member.role}</p>

                                    {/* Social Links (Revealed on Hover) */}
                                    <div className="flex gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-100">
                                        <a href="#" className="p-2.5 bg-white/10 backdrop-blur-sm rounded-full hover:bg-[#0A66C2] hover:text-white transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(10,102,194,0.6)] border border-white/10">
                                            <Linkedin size={18} />
                                        </a>
                                        <a href="#" className="p-2.5 bg-white/10 backdrop-blur-sm rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(239,68,68,0.6)] border border-white/10">
                                            <Mail size={18} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Team;
