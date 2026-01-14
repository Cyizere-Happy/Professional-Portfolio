import React from 'react';
import { motion } from 'framer-motion';

const CircularProgress = ({ percentage, label }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
                scale: 1.05,
                y: -8,
            }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="group relative flex flex-col items-center gap-4 p-6 md:p-8 rounded-2xl cursor-default overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
            }}
        >
            {/* Animated gradient border on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
                    padding: '1px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                }}
            />

            {/* Glow effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                style={{
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 70%)',
                }}
            />

            <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                        filter: 'blur(10px)',
                    }}
                />

                <svg className="w-full h-full transform -rotate-90">
                    {/* Background circle */}
                    <circle
                        cx="50%"
                        cy="50%"
                        r="42%"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="4"
                        fill="transparent"
                    />
                    {/* Progress circle with gradient */}
                    <motion.circle
                        cx="50%"
                        cy="50%"
                        r="42%"
                        stroke="url(#gradient)"
                        strokeWidth="4"
                        strokeDasharray="264%"
                        initial={{ strokeDashoffset: "264%" }}
                        whileInView={{ strokeDashoffset: `${264 - (264 * percentage) / 100}%` }}
                        transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                        fill="transparent"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                    />
                    {/* Gradient definition */}
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255,255,255,1)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0.6)" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Center content */}
                <div className="absolute flex flex-col items-center">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl font-bold text-white group-hover:scale-110 transition-transform duration-300"
                        style={{
                            textShadow: '0 0 20px rgba(255,255,255,0.3)',
                        }}
                    >
                        {percentage}
                    </motion.span>
                    <span className="text-[10px] text-white/40 font-semibold tracking-wider">%</span>
                </div>
            </div>

            {/* Label */}
            <span className="relative text-white/60 group-hover:text-white/90 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold text-center leading-tight max-w-[140px] transition-colors duration-300">
                {label}
            </span>

            {/* Bottom accent line */}
            <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
                initial={{ width: '0%' }}
                whileInView={{ width: '60%' }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
            />
        </motion.div>
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

                {/* Core Specialties - Premium Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-32">
                    {coreSpecialties.map((skill, idx) => (
                        <CircularProgress key={idx} {...skill} />
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
