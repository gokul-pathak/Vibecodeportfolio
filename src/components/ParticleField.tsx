import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { prefersReducedMotion, isLowEndDevice } from '../utils/performance';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check if device prefers reduced motion
    if (prefersReducedMotion()) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    
    // Debounce resize
    let resizeTimeout: number;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resizeCanvas, 100);
    };
    window.addEventListener('resize', debouncedResize);

    // Reduce particle count significantly for performance
    const isMobile = window.innerWidth < 768;
    const isLowEnd = isLowEndDevice();
    
    let particleCount: number;
    if (isLowEnd) {
      particleCount = Math.min(20, Math.floor((canvas.width * canvas.height) / 50000));
    } else if (isMobile) {
      particleCount = Math.min(30, Math.floor((canvas.width * canvas.height) / 40000));
    } else {
      particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 30000));
    }
    
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.3 + 0.1,
    }));

    // Throttle mouse tracking
    let mouseTimeout: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseTimeout) {
        mouseTimeout = window.setTimeout(() => {
          mouseRef.current = { x: e.clientX, y: e.clientY };
          mouseTimeout = 0;
        }, 50);
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation loop with performance optimization
    let lastFrameTime = 0;
    const fps = 30; // Limit to 30 FPS for better performance
    const frameInterval = 1000 / fps;

    const animate = (currentTime: number) => {
      if (!ctx || !canvas) return;

      // Throttle to target FPS
      if (currentTime - lastFrameTime < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const particleCount = particles.length;

      for (let i = 0; i < particleCount; i++) {
        const particle = particles[i];
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Simplified mouse interaction (only when mouse is in viewport)
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distSq = dx * dx + dy * dy;
        
        if (distSq < 22500) { // 150 * 150
          const dist = Math.sqrt(distSq);
          const force = (150 - dist) / 150;
          particle.vx -= (dx / dist) * force * 0.05;
          particle.vy -= (dy / dist) * force * 0.05;
        }

        // Damping
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Draw particle
        ctx.fillStyle = `rgba(99, 102, 241, ${particle.alpha})`;
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);

        // Reduce connection checks for performance
        if (isMobile) continue;
        
        for (let j = i + 1; j < particleCount; j++) {
          const other = particles[j];
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 10000) { // 100 * 100
            const dist = Math.sqrt(distSq);
            ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - dist / 100) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (resizeTimeout) clearTimeout(resizeTimeout);
      if (mouseTimeout) clearTimeout(mouseTimeout);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: '100vw', height: '100vh', maxWidth: '100vw' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 2 }}
    />
  );
}