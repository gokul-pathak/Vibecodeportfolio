import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Download, Calendar, X, Clock, MapPin, DollarSign } from 'lucide-react';

export function HiringBanner() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed top-20 left-0 right-0 z-40 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="relative overflow-hidden rounded-xl backdrop-blur-xl bg-gradient-to-r from-purple-600/90 via-blue-600/90 to-cyan-600/90 border border-white/20 shadow-2xl pointer-events-auto"
          whileHover={{ scale: 1.01 }}
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-cyan-400/20 animate-pulse" />
          
          <div className="relative p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white">
                    <span className="hidden sm:inline">👋 Hiring Manager? </span>
                    <span className="font-semibold">Available for new opportunities!</span>
                  </p>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-xs text-white/80 hover:text-white underline transition-colors"
                  >
                    {isExpanded ? 'Show less' : 'View quick details'}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-white/90 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Call</span>
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Trigger resume download
                    const link = document.createElement('a');
                    link.href = '#'; // Replace with actual resume URL
                    link.download = 'Resume.pdf';
                    link.click();
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Resume</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsDismissed(true)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2 text-white/90">
                        <Clock className="w-4 h-4" />
                        <div>
                          <p className="text-xs text-white/60">Availability</p>
                          <p className="text-sm">2 weeks notice</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-white/90">
                        <MapPin className="w-4 h-4" />
                        <div>
                          <p className="text-xs text-white/60">Location</p>
                          <p className="text-sm">Remote / Hybrid</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-white/90">
                        <DollarSign className="w-4 h-4" />
                        <div>
                          <p className="text-xs text-white/60">Rate</p>
                          <p className="text-sm">Negotiable</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
