import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    {
        name: "Kayiranga Simbi Kelia",
        role: "Co-CEO, 4WARD",
        content: "A visionary technical leader. She transforms abstract ideas into scalable, high-performance systems with remarkable precision.",
        image: "https://i.pravatar.cc/150?u=kelia"
    },
    {
        name: "Rwagaju Aphrodice",
        role: "Instructor, Rwanda Coding Academy",
        content: "Her rigorous approach to problem-solving sets her apart. She tackles complex engineering challenges with a level of maturity rarely seen.",
        image: "https://i.pravatar.cc/150?u=rwagaju"
    },
    {
        name: "Louis Mukama",
        role: "Instructor, Rwanda Coding Academy",
        content: "Watching her evolve from a student to a high-caliber backend architect has been incredible. She builds systems that are built to last.",
        image: "https://i.pravatar.cc/150?u=mukama"
    },
    {
        name: "RUKUNDO Furaha Divin",
        role: "CEO, Ngwino",
        content: "The backend infrastructure for SafiCycles is flawless. She delivered a system that is both secure and incredibly fast.",
        image: "https://i.pravatar.cc/150?u=divin"
    },
    {
        name: "Uwase Teta Paola",
        role: "Frontend Developer, Ngwino",
        content: "Integrating her APIs was seamless. Clear documentation, perfect data structures, and always available to collaborate.",
        image: "https://i.pravatar.cc/150?u=paola"
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const getVisibleTestimonials = () => {
        const result = [];
        for (let i = 0; i < 3; i++) {
            result.push(testimonials[(currentIndex + i) % testimonials.length]);
        }
        return result;
    };

    return (
        <section id="testimonials" className="relative py-28 px-6 md:px-12 bg-[#050505] overflow-hidden">
            {/* Background Grid - Matching other sections */}
            <div className="absolute inset-0 grid-bg opacity-[0.03]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[400px] glow-white opacity-[0.05] blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side: Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block text-white/30 text-[10px] uppercase tracking-[0.4em] mb-6 font-bold">
                            — Client Voices
                        </span>
                        <h2 className="font-heading text-4xl md:text-5xl font-light text-white tracking-tighter leading-[0.9] uppercase mb-8">
                            What Our <br /> <span className="font-bold">Clients</span> Say
                        </h2>
                        <p className="font-body text-white/30 text-sm md:text-base max-w-sm leading-relaxed mb-10 italic">
                            "Building relationships through exceptional engineering and design."
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={prevTestimonial}
                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                onClick={nextTestimonial}
                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Side: Stacked Cards */}
                    <div className="relative h-[400px] w-full flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
                        <AnimatePresence mode="popLayout">
                            {getVisibleTestimonials().reverse().map((t, index) => {
                                const reversedIndex = 2 - index;
                                return (
                                    <motion.div
                                        key={`${t.name}-${currentIndex}-${reversedIndex}`}
                                        initial={{ opacity: 0, scale: 0.8, x: 50, rotate: reversedIndex * 2 - 2 }}
                                        animate={{
                                            opacity: 1 - reversedIndex * 0.25,
                                            scale: 1 - reversedIndex * 0.05,
                                            y: reversedIndex * 30,
                                            x: reversedIndex * 15,
                                            rotate: reversedIndex * 2 - 1,
                                            zIndex: 30 - reversedIndex
                                        }}
                                        exit={{ opacity: 0, x: -100, scale: 0.8 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className="absolute bg-[#0a0a0a] border border-white/10 p-6 md:p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-[280px] md:max-w-[320px] aspect-square flex flex-col justify-between group cursor-default"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 p-1">
                                                <img src={t.image} alt={t.name} className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700" />
                                            </div>
                                            <div className="text-white/5 opacity-40 group-hover:opacity-100 transition-opacity">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017V10H14.017V4H21.017V16L18.017 21H14.017ZM3.01701 21L3.01701 18C3.01701 16.8954 3.91244 16 5.01701 16H8.01701V10H3.01701V4H10.017V16L7.01701 21H3.01701Z" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-white font-heading text-base font-bold mb-1 tracking-tight">{t.name}</p>
                                            <span className="text-white/20 text-[9px] uppercase tracking-widest font-bold">{t.role}</span>
                                        </div>

                                        <p className="text-white/40 text-[11px] leading-relaxed font-body mt-4 italic">
                                            "{t.content}"
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
