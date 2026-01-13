import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Zap, Palette, Wrench, FolderOpen, MessageCircle, Mail } from 'lucide-react';

const Navbar = () => {
    const [hoveredItem, setHoveredItem] = useState(null);

    const navItems = [
        { icon: <Home size={20} />, label: 'Home', id: 'home' },
        { icon: <User size={20} />, label: 'About', id: 'about' },
        { icon: <Briefcase size={20} />, label: 'Experience', id: 'experience' },
        { icon: <Zap size={20} />, label: 'Skills', id: 'skills' },
        { icon: <Palette size={20} />, label: 'Expertise', id: 'expertise' },
        { icon: <Wrench size={20} />, label: 'Services', id: 'services' },
        { icon: <FolderOpen size={20} />, label: 'Projects', id: 'projects' },
        { icon: <MessageCircle size={20} />, label: 'Testimonials', id: 'testimonials' },
        { icon: <Mail size={20} />, label: 'Contact', id: 'contact' },
    ];

    const handleClick = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <nav className="pill-nav px-6 py-3 rounded-full flex items-center gap-4 shadow-2xl backdrop-blur-xl">
                {navItems.map((item, index) => (
                    <div
                        key={index}
                        className="relative"
                        onMouseEnter={() => setHoveredItem(index)}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <motion.a
                            href={`#${item.id}`}
                            onClick={(e) => handleClick(e, item.id)}
                            whileHover={{ scale: 1.2, y: -4 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-white/60 hover:text-white transition-colors duration-300 cursor-pointer p-2 rounded-full hover:bg-white/10 block"
                        >
                            {item.icon}
                        </motion.a>

                        {/* Premium Tooltip */}
                        <AnimatePresence>
                            {hoveredItem === index && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute -top-14 left-1/2 -translate-x-1/2 pointer-events-none"
                                >
                                    <div className="relative">
                                        {/* Tooltip Content */}
                                        <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl">
                                            <span className="text-white text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap">
                                                {item.label}
                                            </span>
                                        </div>
                                        {/* Arrow */}
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/10 border-r border-b border-white/20 rotate-45" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default Navbar;
