import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    {
        name: "Mehwish",
        role: "Software Engineer",
        content: "Antigravity's vision for minimal yet powerful interfaces is truly inspiring. The attention to detail is unmatched.",
        image: "https://i.pravatar.cc/150?u=mehwish"
    },
    {
        name: "Elizabeth Jeff",
        role: "Product Designer",
        content: "Working with this team was a breeze. They transformed our complex requirements into a sleek, intuitive experience.",
        image: "https://i.pravatar.cc/150?u=elizabeth"
    },
    {
        name: "Emily Thomas",
        role: "Marketing Director",
        content: "The black and white theme isn't just a style, it's a statement. Our clients love the new look and feel of the site.",
        image: "https://i.pravatar.cc/150?u=emily"
    },
    {
        name: "Sarah Jenkins",
        role: "Creative Lead",
        content: "The way they handle complex 3D integrations while keeping the UI fast and responsive is sheer brilliance.",
        image: "https://i.pravatar.cc/150?u=sarah"
    },
    {
        name: "David Chen",
        role: "Founder, TechFlow",
        content: "Exceptional craftsmanship. They don't just build websites; they build digital experiences that leave a lasting impression.",
        image: "https://i.pravatar.cc/150?u=david"
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

    // Helper to get visible testimonials in stack
    const getVisibleTestimonials = () => {
        const result = [];
        for (let i = 0; i < 3; i++) {
            result.push(testimonials[(currentIndex + i) % testimonials.length]);
        }
        return result;
    };

    return (
        <section id="testimonials" className="py-24 px-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 glow-white opacity-20 -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 glow-gray opacity-10 -ml-48 -mb-48" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Side: Text and CTA */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10"
                >
                    <div className="mb-6 flex items-center gap-4">
                        <span className="h-[1px] w-12 bg-white/20"></span>
                        <span className="text-white/40 uppercase tracking-[0.2em] text-xs font-heading">Testimonials</span>
                    </div>

                    <h2 className="text-5xl lg:text-7xl font-heading font-medium tracking-tight mb-8 leading-tight">
                        What Our <br />
                        <span className="text-white/40">Clients Say</span>
                    </h2>

                    <p className="text-white/60 text-lg max-w-md mb-10 leading-relaxed">
                        We believe in building relationships, not just projects. Our clients' success is our ultimate metric.
                    </p>

                    <div className="flex items-center gap-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white text-[#050505] font-heading font-bold rounded-full transition-shadow hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        >
                            Get in Touch
                        </motion.button>

                        <div className="flex gap-4">
                            <button
                                onClick={prevTestimonial}
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                onClick={nextTestimonial}
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Stacked Testimonial Cards */}
                <div className="relative h-[450px] md:h-[500px] w-full flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
                    <AnimatePresence mode="popLayout">
                        {getVisibleTestimonials().reverse().map((t, index) => {
                            // Reverse index so the first item in getVisibleTestimonials is on top
                            const reversedIndex = 2 - index;
                            return (
                                <motion.div
                                    key={`${t.name}-${currentIndex}-${reversedIndex}`}
                                    initial={{ opacity: 0, scale: 0.8, x: 50, rotate: reversedIndex * 2 - 2 }}
                                    animate={{
                                        opacity: 1 - reversedIndex * 0.2,
                                        scale: 1 - reversedIndex * 0.05,
                                        y: reversedIndex * 40,
                                        x: reversedIndex * 20,
                                        rotate: reversedIndex * 2 - 2,
                                        zIndex: 30 - reversedIndex
                                    }}
                                    exit={{ opacity: 0, x: -100, scale: 0.8 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="absolute glass p-6 md:p-8 rounded-2xl w-full max-w-sm flex items-start gap-4 md:gap-6 group border border-white/5"
                                >
                                    <div className="relative flex-shrink-0">
                                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border border-white/10 p-1">
                                            <img src={t.image} alt={t.name} className="w-full h-full object-cover rounded-full filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                                        </div>
                                        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-6 md:h-8 bg-white/20 rounded-full group-hover:bg-white transition-colors" />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2 md:mb-4">
                                            <div>
                                                <h4 className="font-heading font-bold text-base md:text-lg">{t.name}</h4>
                                                <span className="text-white/20 text-[10px] md:text-xs uppercase tracking-widest">{t.role}</span>
                                            </div>
                                            <svg width="20" height="20" md:width="24" md:height="24" viewBox="0 0 24 24" fill="none" className="text-white/10 group-hover:text-white/30 transition-colors">
                                                <path d="M11 14.7C11 15.5 10.7 16.2 10.2 16.7C9.7 17.3 9 17.6 8 17.6C7.1 17.6 6.3 17.3 5.7 16.7C5.1 16.1 4.8 15.3 4.8 14.3C4.8 12.4 5.5 10.6 6.8 8.8L7.6 9.4C6.8 10.6 6.4 11.7 6.4 12.7C6.4 13.1 6.5 13.5 6.7 13.8C6.9 14.1 7.2 14.3 7.6 14.4C7.8 14.4 8.1 14.5 8.3 14.5C9.2 14.5 9.9 14.3 10.4 13.9C10.9 13.5 11.2 12.9 11.2 12.2V11.4C11.2 10.6 11.5 9.9 12 9.4C12.5 8.9 13.2 8.6 14.1 8.6C15 8.6 15.8 8.9 16.4 9.5C17 10.1 17.3 10.9 17.3 12C17.3 13.9 16.6 15.7 15.3 17.5L14.5 16.9C15.3 15.7 15.7 14.6 15.7 13.6C15.7 13.2 15.6 12.8 15.4 12.5C15.2 12.2 14.9 12 14.5 11.9C14.3 11.9 14.1 11.8 13.9 11.8C13 11.8 12.3 12 11.8 12.4C11.3 12.8 11 13.4 11 14.1V14.7Z" fill="currentColor" />
                                            </svg>
                                        </div>
                                        <p className="text-white/50 text-xs md:text-sm italic leading-relaxed">
                                            "{t.content}"
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
