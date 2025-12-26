import { ArrowRight, Github, Linkedin, Mail, Sparkles, Code, Layers, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedBackground } from './AnimatedBackground';
import { useEffect, useState } from 'react';
import { TypewriterText } from './TypewriterText';
import { NepalFlag } from './NepalFlag';

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Throttle mouse movement for better performance
    let rafId: number;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setMousePosition({ x: lastX, y: lastY });
          rafId = 0;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const roles = ['Designer', 'Frontend Developer', 'Creative Coder', 'UI/UX Expert'];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <AnimatedBackground />
      
      {/* Simplified floating orbs */}
      <motion.div
        className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: mousePosition.x * 0.01,
          y: mousePosition.y * 0.01,
        }}
        style={{ top: '20%', left: '10%' }}
      />
      <motion.div
        className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: mousePosition.x * -0.01,
          y: mousePosition.y * -0.01,
        }}
        style={{ bottom: '20%', right: '10%' }}
      />

      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">
        <motion.div 
          className="space-y-6 sm:space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4">
            <motion.p 
              className="text-indigo-300 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hello, I'm
            </motion.p>
            <motion.h1 
              className="text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Alex Morgan
            </motion.h1>
            
            {/* Nepal Badge */}
            <motion.div
              className="flex items-center gap-3 py-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <NepalFlag />
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-600/20 to-blue-600/20 backdrop-blur-sm border border-white/10">
                <MapPin className="w-4 h-4 text-red-400" />
                <span className="text-sm text-slate-300">Crafted in Nepal 🇳🇵</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="h-20 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                <TypewriterText
                  texts={[
                    'Designer & Developer',
                    'Frontend Specialist',
                    'Creative Coder',
                    'UI/UX Expert',
                    'From the Himalayas 🏔️'
                  ]}
                  typingSpeed={80}
                  deletingSpeed={40}
                  pauseDuration={2000}
                />
              </h2>
            </motion.div>
          </div>
          
          <motion.p 
            className="text-slate-300 text-lg leading-relaxed max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            I create beautiful, functional digital experiences that blend stunning design with clean, efficient code.
          </motion.p>
          
          <motion.div 
            className="flex gap-4 flex-wrap pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button 
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/30"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('contact')}
              className="border-2 border-indigo-400/50 text-indigo-300 px-8 py-4 rounded-xl hover:bg-indigo-400/10 transition-colors backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="flex gap-6 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {[Github, Linkedin, Mail].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-slate-400 hover:text-indigo-400 transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>

          {/* Stats Row */}
          <motion.div
            className="flex gap-6 pt-6 border-t border-indigo-500/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { icon: Code, label: '50+ Projects', color: 'from-blue-500 to-cyan-500' },
              { icon: Sparkles, label: '100+ Components', color: 'from-purple-500 to-pink-500' },
              { icon: Layers, label: '10+ Years', color: 'from-indigo-500 to-purple-500' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`p-2 bg-gradient-to-br ${stat.color} rounded-lg`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300 text-sm">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="relative hidden md:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div 
            className="aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/30 border border-indigo-500/20"
            animate={{
              rotateY: mousePosition.x * 0.005,
              rotateX: -mousePosition.y * 0.005,
            }}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1672581437674-3186b17b405a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjUzMjkxODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Futuristic workspace"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div 
            className="absolute -bottom-8 -right-8 bg-gradient-to-br from-indigo-600 to-purple-600 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-white/10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: 'spring' }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.p 
              className="text-white text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.span
                className="text-3xl block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                5+
              </motion.span> Years
            </motion.p>
            <p className="text-purple-200 mt-1">Experience</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}