import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [milestones, setMilestones] = useState<number[]>([]);

  useEffect(() => {
    // Calculate section milestones
    const sections = document.querySelectorAll('section[id]');
    const positions: number[] = [];
    
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const position = (rect.top + scrollTop) / (document.documentElement.scrollHeight - window.innerHeight);
      positions.push(position);
    });
    
    setMilestones(positions);
  }, []);

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-md opacity-50"
          style={{ scaleX }}
        />
      </motion.div>

      {/* Milestone indicators */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[49]">
        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            className="absolute top-0 w-0.5 h-4 bg-white/30"
            style={{
              left: `${milestone * 100}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>
    </>
  );
}
