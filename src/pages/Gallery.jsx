import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const images = [
    "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000",
    "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1000",
    "https://images.unsplash.com/photo-1614730341194-75c60740a070?q=80&w=1000",
    "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?q=80&w=1000",
    "https://images.unsplash.com/photo-1614728853913-1e235898d430?q=80&w=1000",
    "https://images.unsplash.com/photo-1534234528563-02d32315a6e1?q=80&w=1000",
    "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1000",
    "https://images.unsplash.com/photo-1445905595283-21f8ae8a39d2?q=80&w=1000",
    "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1000",
    "https://images.unsplash.com/photo-1454789548728-85d2696cfb9e?q=80&w=1000",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=1000",
    "https://images.unsplash.com/photo-1506318137071-a8bcbf6755dd?q=80&w=1000",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000", // Repeat for volume
    "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1000",
];

// 3D Background Component
function StarField() {
    const ref = useRef();
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });
    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Stars ref={ref} radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </group>
    );
}

const GalleryItem = ({ src, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full mb-6 break-inside-avoid relative group overflow-hidden rounded-xl border border-white/10"
        >
            <motion.img
                src={src}
                alt="Space Gallery"
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-[#00F3FF] font-['Ethnocentric'] text-xs tracking-widest">
                    Cosmos {index + 1}
                </span>
            </div>
        </motion.div>
    );
};

const Gallery = () => {
    const { scrollY } = useScroll();
    const velocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
    const skew = useTransform(smoothVelocity, [-1000, 1000], [-5, 5]); // Skew effect based on speed

    return (
        <div className="relative min-h-screen bg-[#020005] overflow-hidden">

            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <StarField />
                </Canvas>
            </div>

            {/* Header */}
            <div className="relative z-10 pt-32 pb-12 text-center px-4">
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-5xl md:text-8xl font-['Ethnocentric'] text-white tracking-wider mb-4"
                >
                    NEBULA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F3FF] to-[#7000FF]">ARCHIVE</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-gray-400 text-lg md:text-xl font-light tracking-[0.2em] uppercase"
                >
                    A collection of the infinite
                </motion.p>
            </div>

            {/* Gallery Grid - Masonry Style */}
            <motion.div
                style={{ skewY: skew }}
                className="relative z-10 px-4 md:px-8 max-w-[1600px] mx-auto pb-32"
            >
                <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                    {images.map((src, i) => (
                        <GalleryItem key={i} src={src} index={i} />
                    ))}
                </div>
            </motion.div>

        </div>
    );
};

export default Gallery;
