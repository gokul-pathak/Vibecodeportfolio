import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Download, Calendar, X, Clock, MapPin, DollarSign } from 'lucide-react';

interface HiringBannerProps {
  onDismiss?: () => void;
}

export function HiringBanner({ onDismiss }: HiringBannerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="fixed top-[72px] left-0 right-0 z-50 pointer-events-none px-4"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="relative overflow-hidden rounded-xl backdrop-blur-xl bg-gradient-to-r from-indigo-600/95 via-purple-600/95 to-pink-600/95 border border-white/20 shadow-2xl pointer-events-auto"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          
          <div className="relative px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Left side - Info */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex-shrink-0 border border-white/30">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium">
                    <span className="hidden sm:inline">👋 Hiring Manager? </span>
                    <span className="font-semibold">Available for Opportunities!</span>
                  </p>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-xs text-white/90 hover:text-white underline underline-offset-2 transition-colors font-medium mt-0.5"
                  >
                    {isExpanded ? 'Show less ↑' : 'View details ↓'}
                  </button>
                </div>
              </div>

              {/* Right side - Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Schedule Call Button */}
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-white text-indigo-600 rounded-lg hover:bg-white/95 transition-all shadow-lg font-medium text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Call</span>
                </motion.a>

                {/* Mobile Schedule Button */}
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="sm:hidden flex items-center gap-1.5 px-3 py-2 bg-white text-indigo-600 rounded-lg hover:bg-white/95 transition-all text-xs font-medium"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Call</span>
                </motion.a>

                {/* Resume Button */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '#';
                    link.download = 'Resume.pdf';
                    link.click();
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all backdrop-blur-sm border border-white/30 font-medium text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Resume</span>
                </motion.button>

                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDismiss?.()}
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