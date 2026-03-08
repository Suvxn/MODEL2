import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

// Fixed precisely 9 images
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

const GalleryItem = ({ src, index, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
            onClick={() => onClick(src)}
            className="w-full h-80 relative group overflow-hidden rounded-xl border border-white/10 cursor-pointer"
        >
            <motion.img
                src={src}
                alt={`Space Gallery ${index + 1}`}
                className="w-full h-full object-cover transform transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110 opacity-50 brightness-50 group-hover:opacity-100 group-hover:brightness-100"
                loading="lazy"
            />
            {/* Hover overlay text */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                <span className="text-white drop-shadow-md font-['Ethnocentric'] text-xs tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    Cosmos {index + 1}
                </span>
            </div>
        </motion.div>
    );
};

// Modal Component for Enlarge View
const ImageModal = ({ src, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-zoom-out"
        >
            <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                src={src}
                alt="Enlarged space view"
                className="max-w-full max-h-full rounded-2xl shadow-[0_0_50px_rgba(0,243,255,0.15)] border border-white/5 object-contain"
                onClick={(e) => e.stopPropagation()} // Prevent close when clicking the image itself
            />
            {/* Close instruction */}
            <div className="absolute top-8 right-8 text-white/50 text-sm tracking-widest font-['Ethnocentric'] pointer-events-none">
                CLICK ANYWHERE TO CLOSE
            </div>
        </motion.div>
    );
};

const Gallery = () => {
    const { scrollY } = useScroll();
    const velocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
    const skew = useTransform(smoothVelocity, [-1000, 1000], [-3, 3]); // Reduced skew for regular grid

    // State to track selected image for the modal
    const [selectedImage, setSelectedImage] = useState(null);

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
                    ASTRO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F3FF] to-[#7000FF] drop-shadow-[0_0_20px_rgba(0,243,255,0.4)]">GALLERY</span>
                </motion.h1>

            </div>

            {/* Gallery Grid - Uniform Fixed Size */}
            <motion.div
                style={{ skewY: skew }}
                className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto pb-32"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((src, i) => (
                        <GalleryItem
                            key={i}
                            src={src}
                            index={i}
                            onClick={setSelectedImage}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Enlarged Modal using AnimatePresence */}
            <AnimatePresence>
                {selectedImage && (
                    <ImageModal
                        src={selectedImage}
                        onClose={() => setSelectedImage(null)}
                    />
                )}
            </AnimatePresence>

        </div>
    );
};

export default Gallery;
