import { motion } from 'motion/react';

export function NepalTheme() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Himalayan mountain silhouette at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 md:h-48 opacity-3">
        <svg
          viewBox="0 0 1200 200"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          
          {/* Mount Everest inspired peaks */}
          <motion.path
            d="M0,200 L100,180 L200,120 L300,80 L400,40 L500,60 L600,20 L700,50 L800,90 L900,130 L1000,160 L1100,180 L1200,200 Z"
            fill="url(#mountainGradient)"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          
          {/* Second layer */}
          <motion.path
            d="M0,200 L150,170 L250,140 L350,100 L450,120 L550,80 L650,110 L750,130 L850,150 L950,170 L1050,185 L1200,200 Z"
            fill="url(#mountainGradient)"
            opacity="0.5"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 0.5 }}
            transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
          />
        </svg>
      </div>

      {/* Subtle mandala pattern in corner - only visible on larger screens */}
      <motion.div
        className="hidden lg:block absolute top-10 right-10 w-24 h-24 opacity-3"
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 360, opacity: 0.03 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.5" fill="none" />
          <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="0.5" fill="none" />
          <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="0.5" fill="none" />
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            return (
              <g key={i}>
                <line
                  x1="50"
                  y1="50"
                  x2={50 + Math.cos(angle) * 40}
                  y2={50 + Math.sin(angle) * 40}
                  stroke="white"
                  strokeWidth="0.3"
                />
                <circle
                  cx={50 + Math.cos(angle) * 30}
                  cy={50 + Math.sin(angle) * 30}
                  r="2"
                  fill="white"
                />
              </g>
            );
          })}
        </svg>
      </motion.div>

      <motion.div
        className="hidden lg:block absolute bottom-20 left-10 w-20 h-20 opacity-3"
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: -360, opacity: 0.03 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="35" stroke="white" strokeWidth="0.5" fill="none" />
          <circle cx="50" cy="50" r="25" stroke="white" strokeWidth="0.5" fill="none" />
          <circle cx="50" cy="50" r="15" stroke="white" strokeWidth="0.5" fill="none" />
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={50 + Math.cos(angle) * 35}
                y2={50 + Math.sin(angle) * 35}
                stroke="white"
                strokeWidth="0.3"
              />
            );
          })}
        </svg>
      </motion.div>
    </div>
  );
}
