import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';

function App() {
  return (
    <main className="bg-[#050505] min-h-screen text-white">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Services />
      <Projects />

      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-white/20 text-sm tracking-widest uppercase">
          &copy; 2026 Cyizere. Built for the modern web.
        </p>
      </footer>
    </main>
  );
}

export default App;
