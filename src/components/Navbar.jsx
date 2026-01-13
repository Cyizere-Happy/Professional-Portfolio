import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Zap, Layers, Hexagon } from 'lucide-react';

const Navbar = () => {
    const navItems = [
        { icon: <Home size={20} />, label: 'Home', id: 'home' },
        { icon: <User size={20} />, label: 'About', id: 'about' },
        { icon: <Briefcase size={20} />, label: 'Experience', id: 'experience' },
        { icon: <Zap size={20} />, label: 'Skills', id: 'skills' },
        { icon: <Layers size={20} />, label: 'Services', id: 'services' },
        { icon: <Hexagon size={20} />, label: 'Projects', id: 'projects' },
    ];

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <nav className="pill-nav px-6 py-3 rounded-full flex items-center gap-6 shadow-2xl">
                {navItems.map((item, index) => (
                    <motion.a
                        key={index}
                        href={`#${item.id}`}
                        whileHover={{ scale: 1.2, y: -4 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-white/60 hover:text-white transition-colors duration-300 cursor-pointer p-2 rounded-full hover:bg-white/10"
                        title={item.label}
                    >
                        {item.icon}
                    </motion.a>
                ))}

                {/* Active Indicator (Mock) */}
                <motion.div
                    className="absolute left-6 w-10 h-10 bg-white/10 rounded-full -z-10"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
            </nav>
        </div>
    );
};

export default Navbar;
