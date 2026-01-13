import React from 'react';
import { motion } from 'framer-motion';

const CircularProgress = ({ percentage, label }) => {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="50%"
                        cy="50%"
                        r="40%"
                        stroke="rgba(255,255,255,0.03)"
                        strokeWidth="3"
                        fill="transparent"
                    />
                    <motion.circle
                        cx="50%"
                        cy="50%"
                        r="40%"
                        stroke="white"
                        strokeWidth="3"
                        strokeDasharray="251%"
                        initial={{ strokeDashoffset: "251%" }}
                        whileInView={{ strokeDashoffset: `${251 - (251 * percentage) / 100}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        fill="transparent"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]"
                    />
                </svg>
                <div className="absolute flex flex-col items-center">
                    <span className="text-sm md:text-base font-medium text-white/90">{percentage}%</span>
                </div>
            </div>
            <span className="text-white/30 text-[9px] uppercase tracking-[0.25em] font-semibold text-center leading-tight max-w-[80px]">{label}</span>
        </div>
    );
};

const SkillBar = ({ skill, percentage }) => {
    return (
        <div className="w-full space-y-2">
            <div className="flex justify-between items-center px-0.5">
                <span className="text-white/70 text-[11px] md:text-xs font-semibold uppercase tracking-widest">{skill}</span>
                <span className="text-[9px] font-mono text-white/20">{percentage}%</span>
            </div>
            <div className="relative h-[1px] w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="h-full bg-white/80 rounded-full"
                />
            </div>
        </div>
    );
};

const SkillTag = ({ name }) => (
    <motion.span
        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.08)', color: '#fff' }}
        className="px-4 py-1.5 rounded-md bg-white/[0.03] border border-white/5 text-white/40 text-[9px] font-bold transition-all duration-300 cursor-default uppercase tracking-[0.15em] whitespace-nowrap"
    >
        {name}
    </motion.span>
);

const Skills = () => {
    const coreSpecialties = [
        { label: "Backend Engineering", percentage: 95 },
        { label: "System Security", percentage: 92 },
        { label: "Scalable Architecture", percentage: 88 },
        { label: "3D Visual Systems", percentage: 80 },
    ];

    const techStack = [
        { skill: "Java (Spring Boot / Security)", percentage: 94 },
        { skill: "Node.js (Nest / Express)", percentage: 92 },
        { skill: "Laravel / PHP", percentage: 85 },
        { skill: "Swift (Vapor)", percentage: 80 },
    ];

    const techTags = [
        "PostgreSQL", "Redis", "Distributed Systems", "Docker", "Kubernetes",
        "gRPC", "REST APIs", "AWS", "Google Cloud", "Three.js", "Spline",
        "CI/CD", "Authentication", "Microservices", "Security Auditing"
    ];

    return (
        <section id="skills" className="relative py-28 px-6 md:px-12 bg-[#050505] overflow-hidden min-h-screen flex flex-col justify-center">
            {/* Background Grain/Grid */}
            <div className="absolute inset-0 grid-bg opacity-[0.03]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[400px] glow-white opacity-[0.05] blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10 w-full">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className="font-heading text-4xl md:text-5xl font-light text-white mb-6 tracking-tighter uppercase">Technical Expertise</h2>
                    <p className="font-body text-white/30 text-sm md:text-base max-w-xl mx-auto leading-relaxed italic">
                        Robust Engineering Foundations & Scalable Backend Solutions
                    </p>
                </motion.div>

                {/* Core Specialties - Circular indicators */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-32">
                    {coreSpecialties.map((skill, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <CircularProgress {...skill} />
                        </motion.div>
                    ))}
                </div>

                {/* Detailed Proficiencies */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
                    {/* Main Stack (Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-10 w-full"
                    >
                        <div className="space-y-4">
                            <h3 className="text-white/20 text-[10px] font-bold tracking-[0.4em] uppercase mb-8">System Proficiency</h3>
                            <div className="space-y-7">
                                {techStack.map((item, idx) => (
                                    <SkillBar key={idx} {...item} />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Extended Ecosystem (Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h3 className="text-white/20 text-[10px] font-bold tracking-[0.4em] uppercase mb-8">Ecosystem & Tools</h3>
                        <div className="flex flex-wrap gap-2.5">
                            {techTags.map((name, idx) => (
                                <SkillTag key={idx} name={name} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
