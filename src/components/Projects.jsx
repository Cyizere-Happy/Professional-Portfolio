import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Database, Server, Shield, Cpu } from 'lucide-react';

const ProjectCard = ({ id, title, description, tech, delay, rotation, xOffset, yOffset }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50, rotate: rotation - 5 }}
        whileInView={{ opacity: 1, scale: 1, y: 0, rotate: rotation }}
        whileHover={{ scale: 1.02, rotate: 0, zIndex: 50 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="relative bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full md:w-[320px] aspect-square flex flex-col justify-between group cursor-pointer"
        style={{
            translateY: yOffset,
            translateX: xOffset,
        }}
    >
        <div className="flex justify-between items-start">
            <span className="text-white/10 font-heading text-xl font-bold">{id}</span>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                <ExternalLink size={18} className="text-white group-hover:text-black" />
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

const Projects = () => {
    const projects = [
        {
            id: "01",
            title: "PlanShift API",
            description: "Distributed microservices for 3D architectural data sync. Engineered with Go/gRPC for sub-10ms latency processing.",
            tech: ["Go", "gRPC", "Redis", "PostgreSQL"],
            rotation: -3,
            xOffset: "0%",
            yOffset: "0px",
            delay: 0.1
        },
        {
            id: "02",
            title: "SecureGate",
            description: "Enterprise-grade OAuth2 provider with biometric validation and distributed session management patterns.",
            tech: ["Java", "Spring", "Security", "JWT"],
            rotation: 2,
            xOffset: "10%",
            yOffset: "-40px",
            delay: 0.2
        },
        {
            id: "03",
            title: "DataStream",
            description: "Real-time ETL pipeline processing millions of events per second with exactly-once delivery semantics.",
            tech: ["Node", "Kafka", "ClickHouse", "Nest"],
            rotation: -1,
            xOffset: "-5%",
            yOffset: "40px",
            delay: 0.3
        },
        {
            id: "04",
            title: "CloudMesh",
            description: "Serverless provisioning engine for hybrid cloud infrastructures with automated security auditing.",
            tech: ["Swift", "Vapor", "AWS", "Terraform"],
            rotation: 4,
            xOffset: "5%",
            yOffset: "-20px",
            delay: 0.4
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
                            <ProjectCard {...project} />
                        </div>
                    ))}
                </div>

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
