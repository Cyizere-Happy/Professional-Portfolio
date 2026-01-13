import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    const journey = [
        {
            id: "01",
            title: "Project Discovery",
            description: "Deep diving into requirements to understand core logic.",
            x: "25%",
            y: "100", // trough
            align: "bottom"
        },
        {
            id: "02",
            title: "Architecture Design",
            description: "Crafting robust and scalable microservices.",
            x: "50%",
            y: "0", // peak
            align: "top"
        },
        {
            id: "03",
            title: "Scalable Implementation",
            description: "High-performance code and CI/CD pipelines.",
            x: "75%",
            y: "100", // trough
            align: "bottom"
        }
    ];

    return (
        <section id="about" className="relative py-32 px-6 md:px-12 bg-[#050505] overflow-hidden">
            <div className="max-w-4xl mx-auto relative">
                {/* Header Text */}
                <div className="mb-24">
                    <p className="font-body text-white/30 text-[10px] uppercase tracking-[0.4em] mb-4 font-bold">— Engineering Journey</p>
                    <h2 className="font-heading text-4xl md:text-5xl font-light text-white max-w-2xl leading-tight uppercase tracking-tighter">
                        I craft backend systems with <br />
                        <span className="text-white/30 italic">precision and scale.</span>
                    </h2>
                </div>

                {/* Journey Path */}
                <div className="relative h-[400px]">
                    {/* Wavy Line (SVG) */}
                    <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 h-[100px]">
                        <svg
                            className="w-full h-full overflow-visible"
                            viewBox="0 0 1000 100"
                            fill="none"
                            preserveAspectRatio="none"
                        >
                            <motion.path
                                d="M 0 50 C 100 50, 150 100, 250 100 C 350 100, 400 0, 500 0 C 600 0, 650 100, 750 100 C 850 100, 900 50, 1000 50"
                                stroke="rgba(255, 255, 255, 0.05)"
                                strokeWidth="2"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                            <motion.path
                                d="M 0 50 C 100 50, 150 100, 250 100 C 350 100, 400 0, 500 0 C 600 0, 650 100, 750 100 C 850 100, 900 50, 1000 50"
                                stroke="white"
                                strokeWidth="2"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
                            />
                        </svg>
                    </div>

                    {journey.map((step, idx) => (
                        <div
                            key={idx}
                            className="absolute top-1/2 -translate-y-1/2"
                            style={{ left: step.x }}
                        >
                            {/* Dot exactly on the line */}
                            <div
                                className="absolute left-1/2 -translate-x-1/2 z-30"
                                style={{ top: step.y === "0" ? "-50px" : "50px" }}
                            >
                                <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,1)]" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/20 animate-ping" />
                            </div>

                            {/* Content Tooltip-style */}
                            <motion.div
                                initial={{ opacity: 0, y: step.align === 'top' ? -20 : 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.4 }}
                                viewport={{ once: true }}
                                className={`absolute left-1/2 -translate-x-1/2 w-64 ${step.align === 'top' ? '-translate-y-36' : 'translate-y-24'}`}
                            >
                                <span className="absolute -top-12 left-0 text-7xl font-black text-white/5 pointer-events-none select-none">
                                    {step.id}
                                </span>
                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
