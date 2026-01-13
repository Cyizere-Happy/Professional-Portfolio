import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import videoPlaceholderImg from '../assets/video_making.png';
import soraVideo from '../assets/sora_smart.mp4';
import splineImg from '../assets/spline_3d.png';
import frontendImg from '../assets/frontend_dev.png';

const expertiseItems = [
    {
        title: "Video Making",
        description: "Cinematic storytelling and high-end post-production for digital narratives. Showcasing 'Sora Smart' production.",
        video: soraVideo,
        image: videoPlaceholderImg,
        tag: "Motion",
        hasVideo: true
    },
    {
        title: "Spline 3D",
        description: "Immersive 3D environments and interactive sculptures. Explore the live project at Vercel.",
        image: splineImg,
        tag: "3D Design",
        link: "https://3-d-web-wubx.vercel.app/"
    },
    {
        title: "Frontend Dev",
        description: "Built my own portfolio from scratch without any pre-made designs, focusing on unique architecture and performance.",
        image: frontendImg,
        tag: "Tech"
    }
];

const ExpertiseCard = ({ item, index }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleVideoClick = (e) => {
        if (item.hasVideo) {
            e.preventDefault();
            e.stopPropagation();
            if (videoRef.current) {
                if (isPlaying) {
                    videoRef.current.pause();
                    setIsPlaying(false);
                } else {
                    videoRef.current.play();
                    setIsPlaying(true);
                }
            }
        }
    };

    const CardContent = (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full h-full relative p-8 border border-white/10 shadow-2xl transition-all duration-500 group-hover:border-white/40 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]"
        >
            {/* Background Color Layer - Behind everything */}
            <div className="absolute inset-0 bg-[#0a0a0a] -z-10" style={{ transform: "translateZ(-60px)" }} />

            {/* Background Asset - In the middle */}
            <div
                style={{ transform: "translateZ(-30px)" }}
                className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem] cursor-pointer"
                onClick={handleVideoClick}
            >
                {item.hasVideo ? (
                    <>
                        {/* Thumbnail Image */}
                        <img
                            src={item.image}
                            alt={item.title}
                            className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
                        />
                        {/* Video Element */}
                        <video
                            ref={videoRef}
                            src={item.video}
                            loop
                            playsInline
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
                        />
                        {/* Play Button Overlay */}
                        {!isPlaying && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                            >
                                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white" className="ml-1">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </motion.div>
                        )}
                    </>
                ) : (
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                )}
                {/* Lighter overlay for better visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            </div>

            {/* Content - Elevated for 3D effect */}
            <div
                style={{ transform: "translateZ(40px)" }}
                className="relative z-10 h-full flex flex-col justify-end"
            >
                <div className="mb-auto">
                    <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-[0.3em] border border-white/20 text-white group-hover:bg-white/20 transition-all">
                        {item.tag}
                    </span>
                </div>

                <h3 className="text-4xl font-heading font-black mb-4 tracking-tighter leading-none text-white group-hover:translate-x-1 transition-transform duration-300">
                    {item.title}
                </h3>

                <p className="text-white/80 text-sm leading-relaxed font-body max-w-[90%] drop-shadow-md">
                    {item.description}
                </p>

                {item.link && (
                    <div className="mt-8 flex items-center gap-3 text-white/60 group-hover:text-white text-[10px] uppercase tracking-[0.2em] font-bold transition-all">
                        <span className="border-b border-white/20 pb-1">Explore Project</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Subtle Corner Accents */}
            <div className="absolute top-8 right-8 w-6 h-6 opacity-30 border-t-2 border-r-2 border-white group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-8 left-8 w-6 h-6 opacity-30 border-b-2 border-l-2 border-white group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative h-[480px] w-full rounded-[2.5rem] overflow-hidden ${index % 2 === 0 ? 'md:translate-y-10' : ''}`}
        >
            {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                    {CardContent}
                </a>
            ) : (
                CardContent
            )}
        </motion.div>
    );
};

const Expertise = () => {
    return (
        <section id="expertise" className="relative py-40 px-6 md:px-12 bg-[#050505] overflow-hidden">
            {/* Aesthetic Background - Matching other sections */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] glow-white opacity-[0.03] blur-[150px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Modern Section Header */}
                <div className="mb-32 flex flex-col items-start gap-4">
                    <span className="text-white/30 text-[10px] uppercase tracking-[0.5em] font-bold">
                        — My Specialties
                    </span>
                    <h2 className="font-heading text-6xl md:text-8xl font-black tracking-tighter leading-[0.8] uppercase text-white">
                        Creative <br />
                        <span className="text-white/20">Expertise</span>
                    </h2>
                    <p className="font-body text-white/40 text-base max-w-sm leading-relaxed mt-6 italic border-l-2 border-white/5 pl-6">
                        Bridging the gap between technical architecture and visual storytelling.
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
                    {expertiseItems.map((item, index) => (
                        <ExpertiseCard key={item.title} item={item} index={index} />
                    ))}
                </div>

                {/* Bottom navigation hint */}
                <div className="flex justify-center items-center gap-8 mt-12 opacity-20 hover:opacity-100 transition-opacity duration-700">
                    <div className="h-[1px] w-24 bg-white" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.4em]">Design & Code</span>
                    <div className="h-[1px] w-24 bg-white" />
                </div>
            </div>
        </section>
    );
};

export default Expertise;
