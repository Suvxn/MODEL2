/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import stellarNight from '../assets/images/stellar_night.jpg';
import starTalk from '../assets/images/star_talk.png';
import workshop from '../assets/images/workshop.png';
import webinar from '../assets/images/webinar.png';
import astrophotography from '../assets/images/astrophotography.png';

const LeftItem = ({ item, index, scrollYProgress }) => {
    // 5 items = 0.2 per item
    const start = index * 0.2
    const end = start + 0.2

    const y = useTransform(
        scrollYProgress,
        [start, end],
        [100, -100]
    )

    const opacity = useTransform(
        scrollYProgress,
        [start, start + 0.05, end - 0.05, end],
        [0, 1, 1, 0]
    )

    return (
        <motion.div
            style={{ y, opacity }}
            className={`absolute inset-0 h-screen flex items-center justify-center p-8 md:p-16 ${item.bg}`}
        >
            {item.type === 'text' ? (
                <div className="max-w-lg">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${item.textColor} font-['Ethnocentric']`} style={{ color: '#00F3FF' }}>
                        {item.title}
                    </h2>
                    <p className={`text-sm md:text-base leading-relaxed ${item.textColor} opacity-90 font-light text-justify`}>
                        {item.description}
                    </p>
                </div>
            ) : (
                <div className="w-full h-full flex items-center justify-center p-4">
                    <img
                        src={item.src}
                        alt={item.alt}
                        className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-[0_0_30px_rgba(103,232,249,0.3)] border border-white/10"
                    />
                </div>
            )}
        </motion.div>
    )
}

const RightItem = ({ item, index, scrollYProgress }) => {
    const start = index * 0.2
    const end = start + 0.2

    const y = useTransform(
        scrollYProgress,
        [start, end],
        [-100, 100] // Opposite direction
    )

    const opacity = useTransform(
        scrollYProgress,
        [start, start + 0.05, end - 0.05, end],
        [0, 1, 1, 0]
    )

    return (
        <motion.div
            style={{ y, opacity }}
            className={`absolute inset-0 h-screen flex items-center justify-center p-8 md:p-16 ${item.bg}`}
        >
            {item.type === 'text' ? (
                <div className="max-w-lg">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${item.textColor} font-['Ethnocentric']`} style={{ color: '#00F3FF' }}>
                        {item.title}
                    </h2>
                    <p className={`text-sm md:text-base leading-relaxed ${item.textColor} opacity-90 font-light text-justify`}>
                        {item.description}
                    </p>
                </div>
            ) : (
                <div className="w-full h-full flex items-center justify-center p-4">
                    <img
                        src={item.src}
                        alt={item.alt}
                        className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.3)] border border-white/10"
                    />
                </div>
            )}
        </motion.div>
    )
}

const OppositeScroll = () => {
    const containerRef = useRef(null)

    // 5 items, so height needs to accommodate them. 
    // Each item sequence is roughly 20% of scroll.
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const leftItems = [
        {
            id: 1,
            type: "text",
            title: "Stellar Night",
            description: "Apart from our exclusive activities AstroNITR also participates in INNOVISION, the Annual Techno-Management Fest of NIT Rourkela, which also happens to be the largest Tech-Fest in Eastern India, where we organize STELLAR NIGHT which is crowned as a Flagship Event, which gets a footfall of over 2500 space-enthusiasts. An Open Telescopic Session for all the tech-fest participants is planned every year, where they observe celestial bodies including Saturn, Jupiter, Orion Nebula Earth’s own Moon, and much more.",
            bg: "bg-black/50 backdrop-blur-md",
            textColor: "text-white"
        },
        {
            id: 2,
            type: "image",
            src: starTalk,
            alt: "Star Talk Event",
            bg: "bg-transparent",
        },
        {
            id: 3,
            type: "text",
            title: "Workshop",
            description: "One of the most fundamental and quintessential aspects of our club is peer learning and focused analogy. In recent years, our lineup of workshops has been diverse and engaging. Among these, AstroNITR proudly collaborated with the Space Academy to host a Model Rocketry Workshop, offering participants hands-on experience in crafting model rockets with cutting-edge software like SPACECAD and SOLIDWORKS. Additionally, we were honoured to host \"Exposure,\" a session led by the esteemed Master Prathamesh Jaju. Renowned for his amazing moon photography, Master Jaju shared invaluable insights into capturing celestial beauty and elevating images through advanced post-processing techniques.",
            bg: "bg-black/50 backdrop-blur-md",
            textColor: "text-white"
        },
        {
            id: 4,
            type: "image",
            src: webinar,
            alt: "Webinar Session",
            bg: "bg-transparent",
        },
        {
            id: 5,
            type: "image",
            src: astrophotography, // User asked: "left side content: astrophotography.png"
            alt: "Astrophotography",
            bg: "bg-transparent",
            textColor: "text-white"
        },
    ]

    const rightItems = [
        {
            id: 6,
            type: "image",
            src: stellarNight,
            alt: "Stellar Night Event",
            bg: "bg-transparent",
        },
        {
            id: 7,
            type: "text",
            title: "Star Talk",
            description: "AstroNITR also organise Astro Talks during the fest where we invite prominent astrophotographers, influencers, professors, and scientists such as Prathmesh Jaju, Kaushik Bhattacharjee, Abhay Pratap Yadav, and many others to enlighten our participants and give insights on the current and upcoming scenario of Space Science.",
            bg: "bg-black/50 backdrop-blur-md",
            textColor: "text-white"
        },
        {
            id: 8,
            type: "image",
            src: workshop,
            alt: "Workshop Event",
            bg: "bg-transparent",
        },
        {
            id: 9,
            type: "text",
            title: "Webinar",
            description: "AstroNITR have organized an array of engaging webinars, featuring captivating talks like \"Exploring Multiple Star Systems\" with Ayush Moharana, a Ph.D. Scholar at Nicolas Copernicus Astronomical Centre, \"Introduction to Gravitational Wave Astronomy\" by Dr. Anuj Mishra, a Ph.D. Scholar at Inter-University Centre of Astronomy and Astrophysics, “Astrobiology and Space Medicine” by Deepsundar Sahoo, a graduate of the University of Texas, and \"The Birth, Evolution, and Final Fate of Stars\" led by our esteemed professor, Dr. Abhay Pratap Yadav, alongside numerous other thought-provoking sessions. Moreover, we've extended invitations to esteemed professors to host an enlightening Astro-talk series titled 'Stellar Odyssey'.",
            bg: "bg-black/50 backdrop-blur-md",
            textColor: "text-white"
        },
        {
            id: 10,
            type: "text",
            title: "Astrophotography", // User asked: "right side content: astrophotography"
            description: "During our celestial observation expeditions, AstroNITR meticulously capture stunning images of celestial phenomena and events, which are subsequently showcased on our website and Instagram platforms. Our gallery features an array of breathtaking photographs, including captures of Saturn, Jupiter, the Moon, and its intricate craters, the Sun with its dynamic sunspots, mesmerizing solar eclipses, the awe-inspiring Orion Nebula, and even the elusive Comet C2022/E3, widely known as the green comet, among numerous others. To achieve these remarkable images, we utilize cutting-edge equipment, including the Celestron CPC 800GPS (XLT) and Nexstar 130SLT Computerized Telescopes, specially tailored for astrophotography. Through advanced techniques such as stacking and processing multiple long and short-exposure images, AstroNITR strive to present a refined and enhanced perspective of these celestial wonders. Join us in exploring the wonders of the universe through our meticulously crafted astrophotography.",
            bg: "bg-black/50 backdrop-blur-md",
            textColor: "text-white"
        },
    ]

    return (
        <div ref={containerRef} className="relative h-[350vh] bg-black">
            <div className="sticky top-0 h-screen overflow-hidden flex">
                {/* Left Column */}
                <div className="w-1/2 relative bg-zinc-950/50 border-r border-white/10">
                    {leftItems.map((item, index) => (
                        <LeftItem key={item.id} item={item} index={index} scrollYProgress={scrollYProgress} />
                    ))}
                </div>

                {/* Right Column */}
                <div className="w-1/2 relative bg-zinc-950/50">
                    {rightItems.map((item, index) => (
                        <RightItem key={item.id} item={item} index={index} scrollYProgress={scrollYProgress} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OppositeScroll
