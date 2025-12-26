import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    // Throttle scroll event for better performance
    let rafId: number;
    
    const handleScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          rafId = 0;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const navItems = ['Home', 'About', 'Projects', 'Blog', 'Contact'];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-slate-900 shadow-xl border-b border-indigo-500/30' 
            : 'bg-slate-900/90 border-b border-white/10'
        }`}
        style={{ backdropFilter: 'blur(12px)' }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {'<AM />'}
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              <motion.a
                href="#contact"
                className="relative px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Hire Me</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-white"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left"
          style={{ width: progressWidth }}
        />
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-0 bg-slate-900/95 backdrop-blur-lg z-40 md:hidden"
        initial={{ opacity: 0, x: '100%' }}
        animate={{
          opacity: isOpen ? 1 : 0,
          x: isOpen ? 0 : '100%'
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white text-2xl"
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: isOpen ? 1 : 0,
                x: isOpen ? 0 : 50
              }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setIsOpen(false)}
            >
              {item}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </>
  );
}