import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="home" className="relative h-screen w-full overflow-hidden">
            {/* Spline Background - The whole Hero section */}
            <div className="absolute inset-0 z-0">
                <Spline scene="https://prod.spline.design/yMjsxRfN0A26aT5h/scene.splinecode" />
            </div>

            {/* Decorative Shadow/Gradient Bottom */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-5" />
        </section>
    );
};

export default Hero;
