import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ServiceItem = ({ id, title, description, tags, isExpanded, onToggle, image }) => {
    return (
        <div className="border-b border-white/5 last:border-0">
            <button
                onClick={onToggle}
                className="w-full py-8 flex items-center justify-between text-left group transition-all duration-300"
            >
                <div className="flex items-center gap-8 md:gap-16">
                    <span className="text-white/10 text-xs md:text-sm font-mono tracking-widest">{id}.</span>
                    <h3 className={`text-xl md:text-3xl font-heading tracking-tight transition-colors duration-300 ${isExpanded ? 'text-white' : 'text-white/40 group-hover:text-white/80'}`}>
                        {title}
                    </h3>
                </div>
                <div className={`relative w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-white border-white rotate-45' : 'group-hover:border-white/40'}`}>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        className={`transition-colors duration-300 ${isExpanded ? 'stroke-black' : 'stroke-white/40 group-hover:stroke-white'}`}
                    >
                        <path d="M6 1V11M1 6H11" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="pb-12 pt-4 flex flex-col lg:flex-row gap-12 items-start">
                            <div className="flex-1 space-y-8">
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[10px] uppercase tracking-widest text-white/60 font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-xl font-body">
                                    {description}
                                </p>
                                {image && (
                                    <div className="relative rounded-2xl overflow-hidden aspect-[16/9] w-full max-w-2xl bg-white/5 border border-white/5">
                                        <img
                                            src={image}
                                            alt={title}
                                            className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Services = () => {
    const [expandedId, setExpandedId] = useState("01");

    const services = [
        {
            id: "01",
            title: "Scalable API Design",
            description: "Architecting high-performance RESTful and gRPC interfaces with a focus on data integrity, rate limiting, and seamless scalability for distributed systems.",
            tags: ["NestJS", "Spring Boot", "Vapor", "FastAPI"],
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop" // Temporary fallback
        },
        {
            id: "02",
            title: "Microservices Architecture",
            description: "Designing decoupled, event-driven architectures that ensure fault tolerance and high availability using modern messaging patterns and service meshes.",
            tags: ["Docker", "Kubernetes", "Redis", "Kafka"],
            image: "/backend_services_vizualization.png"
        },
        {
            id: "03",
            title: "Security & Authentication",
            description: "Implementing enterprise-grade security protocols, including OAuth2, JWT, and multi-factor authentication, ensuring bulletproof protection for global applications.",
            tags: ["Spring Security", "Bcrypt", "RBAC", "Auditing"],
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop"
        },
        {
            id: "04",
            title: "Database Engineering",
            description: "Optimization of complex relational schemas and NoSQL models to handle millions of transactions with minimal latency and maximum uptime.",
            tags: ["PostgreSQL", "MongoDB", "ACID", "Sharding"],
            image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2000&auto=format&fit=crop"
        }
    ];

    return (
        <section id="services" className="relative py-32 px-6 md:px-12 bg-[#050505]">
            <div className="max-w-4xl mx-auto">
                <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <p className="text-white/30 text-[10px] uppercase tracking-[0.4em] mb-4 font-bold">— Specialization</p>
                        <h2 className="font-heading text-4xl md:text-5xl font-light text-white tracking-tighter uppercase">
                            Services <span className="font-bold">I Provide</span>
                        </h2>
                    </div>
                    <p className="text-white/30 text-sm md:text-base max-w-[280px] leading-relaxed italic">
                        Delivering precision-engineered solutions for complex backend challenges.
                    </p>
                </div>

                <div className="border-t border-white/5">
                    {services.map((service) => (
                        <ServiceItem
                            key={service.id}
                            {...service}
                            isExpanded={expandedId === service.id}
                            onToggle={() => setExpandedId(expandedId === service.id ? null : service.id)}
                            image={service.id === "02" ? "/backend_services_vizualization.png" : service.image}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
