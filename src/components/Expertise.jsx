import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import videoPlaceholderImg from '../assets/video_making.png';
import soraVideo from '../assets/sora_smart.mp4';
import splineImg from '../assets/spline_3d.png';
import frontendImg from '../assets/frontend_dev.png';

const expertiseItems = [
    {
        title: "Video Motion",
        description: "Cinematic storytelling and high-end post-production. Promoting our vision through visual excellence.",
        fullDescription: "Video Motion is our specialized approach to digital narratives. We combine cinematic techniques with high-end post-production to create compelling visuals that promote and elevate brand storytelling.",
        video: soraVideo,
        image: videoPlaceholderImg,
        tag: "Motion Design",
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

const ExpertiseCard = ({ item, index, onOpen }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

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

    const handleClick = (e) => {
        if (item.hasVideo) {
            e.preventDefault();
            e.stopPropagation();
            onOpen(item);
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
            onClick={handleClick}
            className="w-full h-full relative p-8 border border-white/10 shadow-2xl transition-all duration-500 group-hover:border-white/40 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] cursor-pointer"
        >
            {/* Background Color Layer - Behind everything */}
            <div className="absolute inset-0 bg-[#0a0a0a] -z-10" style={{ transform: "translateZ(-60px)" }} />

            {/* Background Asset - In the middle */}
            <div
                style={{ transform: "translateZ(-30px)" }}
                className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem]"
            >
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 opacity-100"
                />

                {item.hasVideo && (
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

                {/* Stronger overlay for guaranteed visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 opacity-90 transition-opacity" />
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

                <h3 className="text-4xl font-heading font-black mb-4 tracking-tighter leading-none text-white group-hover:translate-x-1 transition-transform duration-300 drop-shadow-2xl">
                    {item.title}
                </h3>

                <p className="text-white/90 text-sm leading-relaxed font-body max-w-[90%] drop-shadow-xl">
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

const VideoModal = ({ item, isOpen, onClose }) => {
    const videoRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const controlsTimeoutRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Reset controls visibility
            setShowControls(true);
            // Hide controls after 3 seconds
            startControlsTimeout();
        } else {
            document.body.style.overflow = 'unset';
            clearControlsTimeout();
        }
        return () => {
            document.body.style.overflow = 'unset';
            clearControlsTimeout();
        };
    }, [isOpen]);

    const startControlsTimeout = () => {
        clearControlsTimeout();
        controlsTimeoutRef.current = setTimeout(() => {
            setShowControls(false);
        }, 3000);
    };

    const clearControlsTimeout = () => {
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
    };

    const handleMouseMove = () => {
        if (!showControls) {
            setShowControls(true);
        }
        startControlsTimeout();
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
            setDuration(videoRef.current.duration);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose} />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onMouseMove={handleMouseMove}
                        className="relative w-full max-w-7xl aspect-video bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10 group/modal"
                    >
                        {/* Background Video */}
                        <video
                            ref={videoRef}
                            src={item.video}
                            autoPlay
                            loop
                            onTimeUpdate={handleTimeUpdate}
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        {/* Dark Overlay for Text Readability */}
                        <AnimatePresence>
                            {showControls && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-10"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent pt-12 pl-12" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Top Bar - Simplified */}
                        <div className="absolute top-6 left-8 flex gap-2 z-20">
                            {/* Window controls removed as requested */}
                        </div>

                        {/* Content Area */}
                        <AnimatePresence>
                            {showControls && (
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute top-24 right-12 z-20 max-w-xl text-right md:text-left md:left-12"
                                >
                                    <h2 className="text-5xl md:text-7xl font-heading font-black text-white tracking-tighter mb-4">
                                        {item.title}
                                    </h2>

                                    <div className="flex items-center gap-4 mb-8">
                                        <span className="text-white/60 text-sm font-bold uppercase tracking-[0.2em]">Showcase - {formatTime(duration)}</span>
                                        <span className="px-2 py-0.5 border border-white/40 rounded text-[10px] font-bold text-white/40 italic">PRODUCTION</span>
                                    </div>

                                    <p className="text-white/80 text-lg leading-relaxed font-body max-w-lg drop-shadow-xl">
                                        {item.fullDescription || item.description}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Bottom Playback Controls */}
                        <AnimatePresence>
                            {showControls && (
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 20, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute bottom-12 left-12 right-12 z-20"
                                >
                                    {/* Progress Bar */}
                                    <div className="relative w-full h-1 bg-white/10 rounded-full mb-8 overflow-hidden group/progress cursor-pointer">
                                        <motion.div
                                            className="absolute top-0 left-0 h-full bg-[#ffbd2e]"
                                            style={{ width: `${(currentTime / duration) * 100}%` }}
                                        />
                                        <div className="absolute top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity"
                                            style={{ left: `${(currentTime / duration) * 100}%` }}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-8">
                                            <span className="text-white/40 text-xs font-mono">{formatTime(currentTime)}</span>
                                            <div className="flex items-center gap-6 text-white/60">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="hover:text-white cursor-pointer transition-colors">
                                                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z" />
                                                </svg>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="hover:text-white cursor-pointer transition-colors">
                                                    <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
                                                </svg>
                                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                                    </svg>
                                                </div>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="hover:text-white cursor-pointer transition-colors">
                                                    <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
                                                </svg>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="hover:text-white cursor-pointer transition-colors">
                                                    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <span className="text-white/40 text-xs font-mono">{formatTime(duration)}</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>


                        {/* Close button for safety/accessibility */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-8 text-white/20 hover:text-white transition-colors z-30"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const Expertise = () => {
    const [selectedItem, setSelectedItem] = useState(null);

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
                        <ExpertiseCard
                            key={item.title}
                            item={item}
                            index={index}
                            onOpen={(clickedItem) => setSelectedItem(clickedItem)}
                        />
                    ))}
                </div>

                {/* Bottom navigation hint */}
                <div className="flex justify-center items-center gap-8 mt-12 opacity-20 hover:opacity-100 transition-opacity duration-700">
                    <div className="h-[1px] w-24 bg-white" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.4em]">Design & Code</span>
                    <div className="h-[1px] w-24 bg-white" />
                </div>
            </div>

            {/* Cinematic Video Modal */}
            <VideoModal
                item={selectedItem}
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
            />
        </section>
    );
};

export default Expertise;
