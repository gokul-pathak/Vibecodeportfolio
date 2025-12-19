import { motion } from 'motion/react';

export function NepalFlag() {
  return (
    <motion.svg
      width="30"
      height="40"
      viewBox="0 0 120 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      className="drop-shadow-lg"
    >
      {/* White border outline */}
      <motion.path
        d="M 10 10 L 60 70 L 10 70 Z"
        stroke="white"
        strokeWidth="4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />
      <motion.path
        d="M 10 75 L 90 140 L 10 140 Z"
        stroke="white"
        strokeWidth="4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
      
      {/* Crimson red background - upper triangle */}
      <motion.path
        d="M 12 14 L 56 70 L 12 70 Z"
        fill="#DC143C"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      />
      
      {/* Crimson red background - lower triangle */}
      <motion.path
        d="M 12 77 L 86 140 L 12 140 Z"
        fill="#DC143C"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      />
      
      {/* Blue border inside */}
      <motion.path
        d="M 14 16 L 54 70 L 14 70 Z"
        stroke="#003893"
        strokeWidth="2"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      />
      <motion.path
        d="M 14 79 L 84 140 L 14 140 Z"
        stroke="#003893"
        strokeWidth="2"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      />
      
      {/* Upper crescent moon */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
      >
        {/* Moon */}
        <circle cx="30" cy="35" r="8" fill="white" />
        <circle cx="32" cy="35" r="6.5" fill="#DC143C" />
      </motion.g>
      
      {/* Lower sun with 12 rays */}
      <motion.g
        initial={{ opacity: 0, rotate: -90, scale: 0 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ delay: 1.4, type: 'spring' }}
      >
        {/* Sun circle */}
        <circle cx="40" cy="108" r="10" fill="white" />
        
        {/* 12 Sun rays */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 40 + Math.cos(angle) * 10;
          const y1 = 108 + Math.sin(angle) * 10;
          const x2 = 40 + Math.cos(angle) * 14;
          const y2 = 108 + Math.sin(angle) * 14;
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="white"
              strokeWidth="1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 + i * 0.05 }}
            />
          );
        })}
      </motion.g>
    </motion.svg>
  );
}
