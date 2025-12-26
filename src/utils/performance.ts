// Performance utility functions

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const rafThrottle = <T extends (...args: any[]) => any>(
  func: T
): ((...args: Parameters<T>) => void) => {
  let rafId: number | null = null;
  return (...args: Parameters<T>) => {
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        func(...args);
        rafId = null;
      });
    }
  };
};

// Check if device prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Check if device is low-end
export const isLowEndDevice = (): boolean => {
  // Check for low memory or CPU cores
  const memory = (navigator as any).deviceMemory;
  const cores = navigator.hardwareConcurrency;
  
  return (memory && memory < 4) || (cores && cores < 4);
};

// Get optimal particle count based on device
export const getOptimalParticleCount = (baseCount: number): number => {
  const isMobile = window.innerWidth < 768;
  const isLowEnd = isLowEndDevice();
  
  if (isLowEnd) return Math.floor(baseCount * 0.3);
  if (isMobile) return Math.floor(baseCount * 0.5);
  return baseCount;
};
