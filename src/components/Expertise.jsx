import React from 'react';
import { motion } from 'framer-motion';
import videoImg from '../assets/video_making.png';
import splineImg from '../assets/spline_3d.png';
import frontendImg from '../assets/frontend_dev.png';

const expertiseItems = [
    {
        title: "Video Making",
        description: "Cinematic storytelling and high-end post-production.",
        image: videoImg,
        tag: "Motion"
    },
    {
        title: "Spline 3D",
        description: "Immersive 3D environments for the modern web.",
        image: splineImg,
        tag: "Design"
    },
    {
        title: "Frontend Dev",
        description: "Pixel-perfect, performance-driven user interfaces.",
        image: frontendImg,
        tag: "Tech"
    }
];

const ExpertiseCard = ({ item, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, rotateY: 20 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="group relative h-[500px] w-full max-w-[350px] overflow-hidden rounded-3xl cursor-pointer perspective-1000"
        >
            <motion.div
                whileHover={{ rotateY: -10, rotateX: 5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-full h-full relative"
            >
                {/* Image */}
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-8 w-full">
                    <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest mb-4 border border-white/10">
                        {item.tag}
                    </span>
                    <h3 className="text-3xl font-heading font-bold mb-2 group-hover:translate-x-2 transition-transform duration-500">{item.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">
                        {item.description}
                    </p>
                </div>

                {/* Decorative border on hover */}
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 rounded-3xl transition-all duration-500 scale-95 group-hover:scale-100" />
            </motion.div>
        </motion.div>
    );
};

const Expertise = () => {
    return (
        <section id="expertise" className="py-32 px-6 relative bg-[#050505]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-6xl md:text-8xl font-heading font-bold tracking-tighter uppercase leading-none">
                            Creative <br />
                            <span className="text-white/20">Expertise</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-xs"
                    >
                        <p className="text-white/40 text-sm italic uppercase tracking-[0.2em] mb-4">Blending art and technology</p>
                        <p className="text-white/60 leading-relaxed">
                            Crafting unique digital narratives through cinematic visuals and interactive technology.
                        </p>
                    </motion.div>
                </div>

                <div className="flex flex-wrap lg:flex-nowrap gap-8 justify-center items-center">
                    {expertiseItems.map((item, index) => (
                        <ExpertiseCard key={item.title} item={item} index={index} />
                    ))}
                </div>

                {/* Navigation Hint */}
                <div className="mt-20 flex justify-center gap-4">
                    <div className="w-12 h-[1px] bg-white/10" />
                    <div className="flex gap-2">
                        {[0, 1, 2].map(i => (
                            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 1 ? 'bg-white' : 'bg-white/10'}`} />
                        ))}
                    </div>
                    <div className="w-12 h-[1px] bg-white/10" />
                </div>
            </div>
        </section>
    );
};

export default Expertise;
