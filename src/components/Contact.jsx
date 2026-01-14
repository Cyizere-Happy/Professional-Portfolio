import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', formData);
        alert('Thank you for your message! I will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    const socialLinks = [
        { name: 'GitHub', icon: '⚡', url: 'https://github.com/Cyizere-Happy' },
        { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
        { name: 'Email', icon: '✉️', url: 'mailto:your.email@example.com' },
    ];

    return (
        <section id="contact" className="relative min-h-screen py-32 px-6 md:px-12 bg-[#050505] overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Central Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-white/[0.02] blur-[150px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center"
                >
                    <span className="text-white/30 text-[10px] uppercase tracking-[0.5em] font-bold">
                        — Let's Connect
                    </span>
                    <h2 className="font-heading text-6xl md:text-8xl font-black tracking-tighter leading-[0.8] uppercase text-white mt-6">
                        Get In <br />
                        <span className="text-white/20">Touch</span>
                    </h2>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Side - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-2 lg:order-1"
                    >
                        {/* Contact Info */}
                        <div className="mb-12">
                            <p className="text-white/60 text-base leading-relaxed mb-8">
                                Have a project in mind or just want to chat? I'm always open to discussing new opportunities,
                                creative ideas, or potential collaborations.
                            </p>

                            {/* Social Links */}
                            <div className="flex flex-wrap gap-4 mb-12">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className="group px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-3 hover:bg-white/10 hover:border-white/20 transition-all"
                                    >
                                        <span className="text-xl">{social.icon}</span>
                                        <span className="text-sm font-bold uppercase tracking-wider text-white/60 group-hover:text-white transition-colors">
                                            {social.name}
                                        </span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Contact Form */}
                        <motion.form
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="space-y-6"
                        >
                            {/* Name Input */}
                            <div className="group">
                                <label htmlFor="name" className="block text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-3 group-focus-within:text-white/80 transition-colors">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-white placeholder-white/30 focus:bg-white/10 focus:border-white/30 focus:outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>

                            {/* Email Input */}
                            <div className="group">
                                <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-3 group-focus-within:text-white/80 transition-colors">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-white placeholder-white/30 focus:bg-white/10 focus:border-white/30 focus:outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>

                            {/* Message Input */}
                            <div className="group">
                                <label htmlFor="message" className="block text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-3 group-focus-within:text-white/80 transition-colors">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="6"
                                    className="w-full px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-white placeholder-white/30 focus:bg-white/10 focus:border-white/30 focus:outline-none transition-all resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full px-8 py-4 bg-white text-black font-heading font-bold uppercase tracking-[0.2em] text-sm rounded-2xl hover:bg-white/90 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                            >
                                Send Message
                            </motion.button>
                        </motion.form>
                    </motion.div>

                    {/* Right Side - Spline 3D Scene */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-1 lg:order-2 h-[500px] lg:h-[700px] relative rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a]"
                    >
                        <Spline
                            scene="https://prod.spline.design/g1ku9Y5vIh2fLG1G/scene.splinecode"
                            className="w-full h-full"
                        />

                        {/* Decorative Corner Accents */}
                        <div className="absolute top-6 right-6 w-12 h-12 opacity-20 border-t-2 border-r-2 border-white pointer-events-none" />
                        <div className="absolute bottom-6 left-6 w-12 h-12 opacity-20 border-b-2 border-l-2 border-white pointer-events-none" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
