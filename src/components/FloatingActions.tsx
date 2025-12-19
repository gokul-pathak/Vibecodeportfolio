import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, MessageCircle, Mail, Download } from 'lucide-react';
import { useState, useEffect } from 'react';

export function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const actions = [
    { icon: MessageCircle, label: 'Chat', color: 'from-green-500 to-emerald-500' },
    { icon: Mail, label: 'Email', color: 'from-blue-500 to-cyan-500' },
    { icon: Download, label: 'Resume', color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <>
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg shadow-indigo-500/50 flex items-center justify-center z-40"
            initial={{ opacity: 0, scale: 0, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 100 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Action Menu */}
      <div className="fixed bottom-8 left-8 z-50">
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="absolute bottom-20 left-0 flex flex-col gap-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {actions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={index}
                    className={`w-14 h-14 bg-gradient-to-r ${action.color} text-white rounded-full shadow-lg flex items-center justify-center relative group`}
                    initial={{ opacity: 0, x: -50, scale: 0 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-6 h-6" />
                    
                    {/* Tooltip */}
                    <motion.div
                      className="absolute left-full ml-4 bg-slate-900 text-white px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      {action.label}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-slate-900" />
                    </motion.div>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB */}
        <motion.button
          className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg shadow-indigo-500/50 flex items-center justify-center relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isMenuOpen ? 45 : 0 }}
        >
          <motion.div
            className="w-6 h-0.5 bg-white absolute"
            animate={{ rotate: isMenuOpen ? 0 : 0 }}
          />
          <motion.div
            className="w-0.5 h-6 bg-white absolute"
            animate={{ opacity: isMenuOpen ? 1 : 1 }}
          />
        </motion.button>

        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full -z-10"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </>
  );
}