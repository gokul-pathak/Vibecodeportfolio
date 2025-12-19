import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
}

export function HolographicCard({ children, className = '' }: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  
  const gradientX = useSpring(useMotionValue(50), { stiffness: 300, damping: 20 });
  const gradientY = useSpring(useMotionValue(50), { stiffness: 300, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || !isHovered) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      const percentX = deltaX / (rect.width / 2);
      const percentY = deltaY / (rect.height / 2);
      
      rotateX.set(-percentY * 15);
      rotateY.set(percentX * 15);
      
      gradientX.set(50 + percentX * 50);
      gradientY.set(50 + percentY * 50);
      
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered, mouseX, mouseY, rotateX, rotateY, gradientX, gradientY]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    gradientX.set(50);
    gradientY.set(50);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative"
      >
        {/* Holographic Gradient Overlay */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            background: isHovered 
              ? `radial-gradient(circle at ${gradientX.get()}% ${gradientY.get()}%, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.2), transparent 50%)`
              : 'none',
          }}
        />
        
        {/* Shine Effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden"
            style={{
              background: `radial-gradient(circle at ${gradientX.get()}% ${gradientY.get()}%, rgba(255, 255, 255, 0.8), transparent 30%)`,
              mixBlendMode: 'overlay',
            }}
          />
        )}
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-transparent pointer-events-none"
          style={{
            borderColor: isHovered 
              ? `rgba(99, 102, 241, ${0.5 + Math.sin(Date.now() / 1000) * 0.5})`
              : 'transparent',
          }}
          animate={{
            borderColor: isHovered 
              ? ['rgba(99, 102, 241, 0.3)', 'rgba(168, 85, 247, 0.6)', 'rgba(99, 102, 241, 0.3)']
              : 'transparent',
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>
    </motion.div>
  );
}
