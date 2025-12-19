import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, MapPin, Briefcase, CheckCircle2, XCircle } from 'lucide-react';

export function AvailabilityStatus() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  // Simulate real-time status (in real app, this would come from a database)
  useEffect(() => {
    const interval = setInterval(() => {
      // Update timestamp every minute to show real-time feel
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-12 overflow-hidden">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Glow effect */}
          <div className={`absolute inset-0 rounded-2xl blur-2xl ${
            isAvailable 
              ? 'bg-gradient-to-r from-green-600/30 to-emerald-600/30' 
              : 'bg-gradient-to-r from-orange-600/30 to-red-600/30'
          }`} />

          <div className="relative rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 overflow-hidden">
            {/* Animated border */}
            <div className={`absolute inset-0 bg-gradient-to-r ${
              isAvailable 
                ? 'from-green-500/20 via-emerald-500/20 to-green-500/20' 
                : 'from-orange-500/20 via-red-500/20 to-orange-500/20'
            } animate-pulse`} />

            <div className="relative p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Status indicator */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`absolute inset-0 rounded-full ${
                        isAvailable ? 'bg-green-500' : 'bg-orange-500'
                      } blur-md`}
                    />
                    <div className={`relative w-4 h-4 rounded-full ${
                      isAvailable ? 'bg-green-500' : 'bg-orange-500'
                    }`} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {isAvailable ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-orange-400" />
                      )}
                      <h3 className="text-xl text-white">
                        {isAvailable ? 'Available for Work' : 'Currently Engaged'}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-400">
                      {isAvailable 
                        ? 'Open to new opportunities and collaborations' 
                        : 'Available starting March 2025'}
                    </p>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowDetails(!showDetails)}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors border border-white/10 text-sm"
                  >
                    {showDetails ? 'Hide Details' : 'View Details'}
                  </motion.button>

                  {isAvailable && (
                    <motion.a
                      href="#contact"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg shadow-green-500/25 text-sm"
                    >
                      Let's Talk
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Detailed information */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-purple-400" />
                            <p className="text-xs text-slate-400">Start Date</p>
                          </div>
                          <p className="text-white">
                            {isAvailable ? 'Immediate' : 'March 2025'}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-blue-400" />
                            <p className="text-xs text-slate-400">Work Mode</p>
                          </div>
                          <p className="text-white">Remote / Hybrid</p>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                          <div className="flex items-center gap-2 mb-2">
                            <Briefcase className="w-4 h-4 text-cyan-400" />
                            <p className="text-xs text-slate-400">Type</p>
                          </div>
                          <p className="text-white">Full-time / Contract</p>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-green-400" />
                            <p className="text-xs text-slate-400">Timezone</p>
                          </div>
                          <p className="text-white">Flexible (UTC-5)</p>
                        </div>
                      </div>

                      {isAvailable && (
                        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20">
                          <p className="text-sm text-slate-300">
                            <span className="text-green-400">✓</span> Currently reviewing opportunities. 
                            Response time: <span className="text-white">within 24 hours</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Additional hiring info */}
        {isAvailable && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-center"
          >
            <p className="text-sm text-slate-400">
              💼 Particularly interested in:{' '}
              <span className="text-purple-400">Design Systems</span>,{' '}
              <span className="text-blue-400">Web3/Blockchain</span>,{' '}
              <span className="text-cyan-400">AI/ML Products</span>
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
