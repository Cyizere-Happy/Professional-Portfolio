import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExperienceNode = ({ id, company, role, period, description, x, y, delay, isExpanded, onHover }) => {
    return (
        <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
            style={{ left: `${x}%`, top: `${y}%` }}
            onMouseEnter={onHover}
        >
            {/* Interactive Node Dot */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay }}
                viewport={{ once: true }}
                className="relative cursor-pointer group"
            >
                <div className={`w-4 h-4 rounded-full transition-all duration-500 ${isExpanded ? 'bg-white scale-125 shadow-[0_0_20px_rgba(255,255,255,0.8)]' : 'bg-white/20 group-hover:bg-white/60 group-hover:scale-110'}`} />
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/10 transition-opacity duration-500 ${isExpanded ? 'opacity-100 animate-ping' : 'opacity-0'}`} />
            </motion.div>

            {/* Content Tooltip / Card */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 p-6 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl z-30 pointer-events-none"
                    >
                        <span className="text-white/20 text-[10px] uppercase tracking-widest font-mono block mb-2">{period}</span>
                        <h3 className="text-white font-heading text-lg font-bold mb-1">{role}</h3>
                        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold mb-4">{company}</p>
                        <p className="text-white/60 text-xs leading-relaxed font-body">
                            {description}
                        </p>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0a0a0a] border-b border-r border-white/10 rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Static Label (Visible when not expanded) */}
            {!isExpanded && (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: delay + 0.3 }}
                    className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-center pointer-events-none"
                >
                    <span className="text-white/20 text-[9px] uppercase tracking-[0.3em] font-bold block mb-1">{id}.</span>
                    <span className="text-white/40 text-[11px] font-heading font-medium tracking-wide">{company}</span>
                </motion.div>
            )}
        </div>
    );
};

const Experience = () => {
    const [activeId, setActiveId] = useState("01");

    const experiences = [
        {
            id: "01",
            role: "Full Stack Developer",
            company: "Hotel Management (Restaurant)",
            period: "2024 — 2025",
            description: "Engineered a comprehensive hospitality system focusing on restaurant operations. Mastered Node.js and Express using plain JavaScript for scalable architecture.",
            x: 10,
            y: 85,
            delay: 0.2
        },
        {
            id: "02",
            role: "Laravel Developer",
            company: "Lavender Fashion Kigali",
            period: "2025",
            description: "Developed a robust stock management system using Laravel and PHP. Focused on inventory synchronization and real-time reporting modules.",
            x: 35,
            y: 75,
            delay: 0.4
        },
        {
            id: "03",
            role: "Backend Developer",
            company: "Ngwino In Cycles",
            period: "2025",
            description: "Optimized backend workflows and database structures for cycle management systems, focusing on data integrity and high availability.",
            x: 65,
            y: 55,
            delay: 0.6
        },
        {
            id: "04",
            role: "Founder & Lead",
            company: "4Ward",
            period: "Present",
            description: "Leading technical direction for independent ventures. Evolving in advanced backend systems and integrating immersive 3D experiences with Three.js.",
            x: 90,
            y: 35,
            delay: 0.8
        }
    ];

    return (
        <section id="experience" className="relative py-40 px-6 md:px-12 bg-[#050505] overflow-hidden">
            <div className="max-w-4xl mx-auto relative h-[700px]">

                {/* Header Section */}
                <div className="mb-20 relative z-10 text-left">
                    <p className="text-white/30 text-[10px] uppercase tracking-[0.4em] mb-4 font-bold">— Career Path</p>
                    <h2 className="font-heading text-4xl md:text-5xl font-light text-white tracking-tighter uppercase mb-6">
                        Engineering <span className="font-bold italic">Trajectory</span>
                    </h2>
                    <p className="text-white/20 text-xs md:text-sm max-w-lg leading-relaxed italic font-medium uppercase tracking-[0.2em]">
                        "Evolution through complex high-performance systems and architectural design."
                    </p>
                </div>

                {/* Timeline Visualization */}
                <div className="absolute inset-0 top-64 pointer-events-none">
                    {/* Trajectory Line (SVG) - Precise coordination */}
                    <svg className="w-full h-full overflow-visible opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <motion.path
                            d="M 10 85 C 20 85, 25 75, 35 75 S 55 55, 65 55 S 80 35, 90 35"
                            stroke="white"
                            strokeWidth="0.5"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        {/* Secondary Flow Glow */}
                        <motion.path
                            d="M 10 85 C 20 85, 25 75, 35 75 S 55 55, 65 55 S 80 35, 90 35"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            fill="none"
                            className="blur-[2px] opacity-40"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                    </svg>

                    {/* Nodes Container */}
                    <div className="absolute inset-0 pointer-events-auto">
                        {experiences.map((exp) => (
                            <ExperienceNode
                                key={exp.id}
                                {...exp}
                                isExpanded={activeId === exp.id}
                                onHover={() => setActiveId(exp.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* Background Text Decoration - High Visibility */}
                <div className="absolute inset-0 flex items-end justify-center pointer-events-none pb-12">
                    <span className="text-[12vw] md:text-[180px] font-black text-white/[0.04] uppercase tracking-tighter leading-none select-none">
                        Evolution
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Experience;
