import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import soraVideo from '../assets/sora_smart.mp4';
import codiVideo from '../assets/CodiSwift.mp4';
import cherryVideo from '../assets/CherryLoves.mp4';
import planShiftVideo from '../assets/PlanShift.mp4';
import { ExternalLink, Github, Maximize2, Play, Pause, SkipForward, Share2 } from 'lucide-react';

const ProjectCard = ({ id, title, description, tech, delay, rotation, xOffset, yOffset, link, video, onClick }) => {

    const handleCardClick = () => {
        if (video) {
            onClick();
        } else if (link) {
            window.open(link, '_blank', 'noreferrer');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50, rotate: rotation - 5 }}
            whileInView={{ opacity: 1, scale: 1, y: 0, rotate: rotation }}
            whileHover={{ scale: 1.02, rotate: 0, zIndex: 50 }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            onClick={handleCardClick}
            className="relative bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full md:w-[320px] aspect-square flex flex-col justify-between group cursor-pointer"
            style={{
                translateY: yOffset,
                translateX: xOffset,
            }}
        >
            <div className="flex justify-between items-start">
                <span className="text-white/10 font-heading text-xl font-bold">{id}</span>
                <div className="flex gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick();
                        }}
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300"
                        title={video ? "View Project Details" : "View Code on GitHub"}
                    >
                        {video ? (
                            <Maximize2 size={18} className="text-white group-hover:text-black" />
                        ) : (
                            <Github size={18} className="text-white group-hover:text-black" />
                        )}
                    </button>
                    {link && video && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300"
                            title="View Code"
                        >
                            <Github size={18} className="text-white group-hover:text-black" />
                        </a>
                    )}
                </div>
            </div>

            <div>
                <h3 className="text-white font-heading text-2xl font-bold mb-3 tracking-tight">{title}</h3>
                <p className="text-white/40 text-xs leading-relaxed font-body">
                    {description}
                </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-4">
                {tech.map((t, idx) => (
                    <span key={idx} className="text-[9px] uppercase tracking-widest font-bold text-white/30 bg-white/5 px-2 py-1 rounded">
                        {t}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

const ProjectModal = ({ item, isOpen, onClose }) => {
    const videoRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            if (videoRef.current) {
                videoRef.current.play().catch(e => console.log("Autoplay blocked", e));
            }
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleMouseMove = () => {
        // No-op for now as controls are persistent
    };

    const togglePlay = (e) => {
        e.stopPropagation();
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
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
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={onClose} />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="relative w-full max-w-6xl aspect-video bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-[0_0_150px_rgba(0,0,0,0.8)] border border-white/10 group/modal flex flex-col"
                    >
                        {/* Video Area - Full Container */}
                        <div className="absolute inset-0 z-0" onClick={togglePlay}>
                            <video
                                ref={videoRef}
                                src={item.video || soraVideo}
                                autoPlay
                                loop
                                muted={false}
                                onTimeUpdate={handleTimeUpdate}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/40" />

                            {/* Play/Pause Overlay - Only show when paused */}
                            {!isPlaying && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all pointer-events-none">
                                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                                        <Play size={40} className="text-white ml-2" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Top Bar */}
                        <div className="relative z-20 p-8 flex justify-between items-start pointer-events-none">
                            <div /> {/* Spacer */}
                            <button
                                onClick={onClose}
                                className="w-12 h-12 rounded-full bg-black/50 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all backdrop-blur-md border border-white/5 pointer-events-auto"
                            >
                                <Maximize2 size={20} className="rotate-45" />
                            </button>
                        </div>

                        {/* Bottom Interaction Area */}
                        <div className="absolute bottom-0 left-0 w-full z-20 flex flex-col justify-end pointer-events-none">

                            {/* Toggle Button Area */}
                            <div className="w-full flex justify-center pb-8 pointer-events-auto">
                                {!showDetails && (
                                    <motion.button
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        onClick={() => setShowDetails(true)}
                                        className="group flex flex-col items-center gap-2"
                                    >
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors">
                                            View Project Details
                                        </span>
                                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-[#ffbd2e] group-hover:text-black group-hover:border-[#ffbd2e] transition-all">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-up"><path d="m18 15-6-6-6 6" /></svg>
                                        </div>
                                    </motion.button>
                                )}
                            </div>

                            {/* Slide-Up Details Panel */}
                            <AnimatePresence>
                                {showDetails && (
                                    <motion.div
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        exit={{ y: "100%" }}
                                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                        className="w-full bg-[#050505]/95 backdrop-blur-xl border-t border-white/10 pointer-events-auto"
                                    >
                                        {/* Progress Bar (at top of panel) */}
                                        <div className="w-full h-1 bg-white/10 cursor-pointer group/progress relative">
                                            <motion.div
                                                className="h-full bg-[#ffbd2e]"
                                                style={{ width: `${(currentTime / duration) * 100}%` }}
                                            />
                                        </div>

                                        <div className="p-8 md:p-12 relative">
                                            {/* Close Details Button */}
                                            <button
                                                onClick={() => setShowDetails(false)}
                                                className="absolute top-4 right-4 md:top-8 md:right-8 w-8 h-8 flex items-center justify-center text-white/30 hover:text-white transition-colors"
                                            >
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6" /></svg>
                                            </button>

                                            <div className="flex flex-col md:flex-row items-end justify-between gap-8 md:gap-16">
                                                {/* Left: Content */}
                                                <div className="flex-1 max-w-3xl">
                                                    <div className="flex items-center gap-4 mb-3">
                                                        <span className="px-3 py-1 bg-[#ffbd2e] text-black text-[10px] font-bold uppercase tracking-widest rounded-sm">
                                                            {item.id}
                                                        </span>
                                                        <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest">
                                                            {item.fullDescription ? "Deep Dive" : "Project Overview"}
                                                        </span>
                                                    </div>

                                                    <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tighter mb-6 leading-[0.9]">
                                                        {item.title}
                                                    </h2>

                                                    <p className="text-white/70 text-base md:text-lg leading-relaxed font-body text-pretty">
                                                        {item.fullDescription || item.description}
                                                    </p>
                                                </div>

                                                {/* Right: Actions */}
                                                <div className="flex flex-col gap-6 w-full md:w-auto min-w-[200px]">
                                                    <div className="flex flex-col gap-3">
                                                        <span className="text-[#ffbd2e] text-[9px] font-bold uppercase tracking-widest">
                                                            Tech Stack
                                                        </span>
                                                        <div className="flex flex-wrap gap-2">
                                                            {item.tech.slice(0, 4).map(t => (
                                                                <span key={t} className="text-white/60 text-xs font-mono border border-white/10 px-2 py-1 rounded bg-white/5">{t}</span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-3">
                                                        {item.links ? (
                                                            <>
                                                                <a href={item.links.frontend} target="_blank" rel="noopener noreferrer"
                                                                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-white text-black font-bold uppercase tracking-wider text-[10px] hover:bg-[#ffbd2e] transition-colors rounded-sm">
                                                                    <Github size={16} /> Frontend
                                                                </a>
                                                                <a href={item.links.backend} target="_blank" rel="noopener noreferrer"
                                                                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 border border-white/20 text-white font-bold uppercase tracking-wider text-[10px] hover:bg-white hover:text-black transition-all rounded-sm">
                                                                    <Github size={16} /> Backend
                                                                </a>
                                                            </>
                                                        ) : item.link ? (
                                                            <a href={item.link} target="_blank" rel="noopener noreferrer"
                                                                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-white text-black font-bold uppercase tracking-wider text-[10px] hover:bg-[#ffbd2e] transition-colors rounded-sm">
                                                                <Github size={16} /> View Code
                                                            </a>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            id: "01",
            title: "PlanShift",
            description: "PlanShift lets you explore, plan, and visualize building spaces in interactive 3D—making design decisions faster, clearer, and smarter.",
            fullDescription: "Built by me and Kelia as the CEOs of 4WARD. I specialized in the Three.js implementation. PlanShift is a revolutionary platform that allows users to explore, plan, and visualize building spaces in an immersive, interactive 3D environment, significantly accelerating and improving design decision-making.",
            tech: ["Three.js", "React", "Vite", "Tailwind"],
            video: planShiftVideo,
            rotation: -3,
            xOffset: "0%",
            yOffset: "0px",
            delay: 0.1
        },
        {
            id: "02",
            title: "CodiSwift",
            description: "Engineered a scalable Swift/Vapor backend with real-time WebSocket synchronization. Designed a robust infrastructure to handle gamified learning and data persistence.",
            fullDescription: "CodiSwift is a comprehensive language learning app built entirely in Swift. It features a Vapor backend managing authentication, real-time WebSocket game data, and an admin dashboard for content management. I architected both the frontend iOS app and the scalable backend infrastructure.",
            tech: ["Swift", "Vapor", "WebSockets", "iOS"],
            video: codiVideo,
            links: {
                frontend: "https://github.com/Cyizere-Happy/CodiSwift",
                backend: "https://github.com/Cyizere-Happy/CodiSwift-Backend"
            },
            rotation: 2,
            xOffset: "10%",
            yOffset: "-40px",
            delay: 0.2
        },
        {
            id: "03",
            title: "CherryLoves",
            description: "Architected a secure e-commerce backend with Java Spring Boot. Implemented complex JWT authentication and transactional integrity for enterprise-grade order management.",
            fullDescription: "CherryLoves is a full-stack e-commerce platform where I gathered requirements and built the entire system. A key highlight is the robust backend architecture using Java Spring Boot and Spring Security with JWT. I designed accessible endpoints for product management, secure user authentication, and order processing, demonstrating enterprise-grade security practices.",
            tech: ["Java", "Spring Boot", "Spring Security", "JWT"],
            video: cherryVideo,
            link: "https://github.com/Cyizere-Happy/CherryLoves",
            rotation: -1,
            xOffset: "-5%",
            yOffset: "40px",
            delay: 0.3
        },
        {
            id: "04",
            title: "Camp-Feedback",
            description: "Designed a high-performance TypeScript/Node.js backend for DevX SummerCamp feedback. Engineered secure data pipelines and JWT protection for sensitive participant analytics.",
            fullDescription: "Built to streamline feedback submission, provide real-time insights, and help organizers improve future camps. Features include user-friendly forms, data visualization dashboards, and secure data storage. The backend is built with TypeScript, Node.js, and Express, featuring robust JWT authentication.",
            tech: ["TypeScript", "Node.js", "Express", "JWT"],
            link: "https://github.com/Cyizere-Happy/Camp-Feedback",
            rotation: 4,
            xOffset: "5%",
            yOffset: "-20px",
            delay: 0.4
        },
        {
            id: "05",
            title: "Pentest Shell",
            description: "Developed sophisticated backend automation for network security auditing. Created complex Bash logic for vulnerability mapping and automated exploitation verification.",
            tech: ["Shell", "Bash", "Security", "Automation"],
            link: "https://github.com/Cyizere-Happy/Pentest-Tool",
            // video: soraVideo, // No video for Pentest Shell
            rotation: -2,
            xOffset: "-10%",
            yOffset: "20px",
            delay: 0.5
        }
    ];

    return (
        <section id="projects" className="relative py-40 px-6 md:px-12 bg-[#050505] overflow-hidden">
            {/* Minimal Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            <div className="max-w-4xl mx-auto relative">
                {/* Header Section */}
                <div className="mb-32 relative z-10">
                    <span className="inline-block text-white/30 text-[10px] uppercase tracking-[0.4em] mb-6 font-bold">
                        — Portfolio Work
                    </span>
                    <h2 className="font-heading text-4xl md:text-5xl font-light text-white tracking-tighter leading-[0.9] uppercase mb-8">
                        Selected <span className="font-bold">Engineering</span> <br /> Solutions
                    </h2>
                    <p className="font-body text-white/30 text-sm md:text-base max-w-xl leading-relaxed italic">
                        "Robust, scalable, and secure — architectural excellence in every line of code."
                    </p>
                </div>

                {/* Projects Flow Container */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-y-32 gap-x-12 pb-20">
                    {/* Background Connecting Lines (SVG) */}
                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.15]" style={{ zIndex: 0 }}>
                        <motion.path
                            d="M 150 150 Q 400 300 150 600 T 400 1000"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeDasharray="8 8"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2 }}
                        />
                    </svg>

                    {projects.map((project) => (
                        <div key={project.id} className="flex justify-center md:block">
                            <ProjectCard
                                {...project}
                                onClick={() => setSelectedProject(project)}
                            />
                        </div>
                    ))}
                </div>

                <ProjectModal
                    item={selectedProject}
                    isOpen={!!selectedProject}
                    onClose={() => setSelectedProject(null)}
                />

                {/* Footer Tagline */}
                <div className="mt-24 text-center">
                    <p className="font-heading text-white/20 text-xl font-bold uppercase tracking-[0.3em]">
                        Ready to be <span className="text-white/60 italic font-light">Deployed</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Projects;
