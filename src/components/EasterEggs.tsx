import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, Zap, Star, Gift, Code } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  unlocked: boolean;
}

export function EasterEggs() {
  const [konamiProgress, setKonamiProgress] = useState<number>(0);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'explorer',
      title: 'Explorer',
      description: 'Scrolled through the entire page',
      icon: Sparkles,
      unlocked: false,
    },
    {
      id: 'konami',
      title: 'Konami Master',
      description: 'Found the secret code! ↑↑↓↓←→←→BA',
      icon: Trophy,
      unlocked: false,
    },
    {
      id: 'speedster',
      title: 'Speedster',
      description: 'Visited all sections in under 30 seconds',
      icon: Zap,
      unlocked: false,
    },
    {
      id: 'curious',
      title: 'Curious Mind',
      description: 'Clicked on 10+ interactive elements',
      icon: Star,
      unlocked: false,
    },
  ]);
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [startTime] = useState(Date.now());
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());

  // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      if (key === konamiCode[konamiProgress].toLowerCase()) {
        const newProgress = konamiProgress + 1;
        setKonamiProgress(newProgress);
        
        if (newProgress === konamiCode.length) {
          unlockAchievement('konami');
          setKonamiProgress(0);
          
          // Special effect
          document.body.style.animation = 'rainbow 2s ease-in-out';
          setTimeout(() => {
            document.body.style.animation = '';
          }, 2000);
        }
      } else {
        setKonamiProgress(0);
      }
    };

    // Track clicks
    const handleClick = () => {
      setClickCount(prev => {
        const newCount = prev + 1;
        if (newCount >= 10) {
          unlockAchievement('curious');
        }
        return newCount;
      });
    };

    // Track scrolling (throttled for performance)
    let rafId: number;
    const handleScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
          
          if (scrollPercentage >= 95) {
            unlockAchievement('explorer');
          }

          // Track section visits
          const sections = document.querySelectorAll('section[id]');
          sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
              setVisitedSections(prev => {
                const newSet = new Set(prev);
                newSet.add(section.id);
                
                // Check speedster achievement
                if (newSet.size >= 5 && (Date.now() - startTime) < 30000) {
                  unlockAchievement('speedster');
                }
                
                return newSet;
              });
            }
          });
          
          rafId = 0;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Add rainbow animation keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rainbow {
        0%, 100% { filter: hue-rotate(0deg); }
        50% { filter: hue-rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      document.head.removeChild(style);
    };
  }, [konamiProgress, startTime]);

  const unlockAchievement = (id: string) => {
    setAchievements(prev => {
      const achievement = prev.find(a => a.id === id);
      if (achievement && !achievement.unlocked) {
        const updated = prev.map(a => 
          a.id === id ? { ...a, unlocked: true } : a
        );
        setShowAchievement({ ...achievement, unlocked: true });
        
        // Hide after 5 seconds
        setTimeout(() => setShowAchievement(null), 5000);
        
        return updated;
      }
      return prev;
    });
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <>
      {/* Achievement Notification */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="fixed top-24 right-6 z-50 bg-gradient-to-br from-amber-500 to-orange-500 text-white p-6 rounded-xl shadow-2xl max-w-sm"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
            >
              {(() => {
                const Icon = showAchievement.icon;
                return <Icon className="w-6 h-6 text-amber-500" />;
              })()}
            </motion.div>
            
            <div className="ml-6">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">Achievement Unlocked!</span>
              </div>
              <h4 className="mb-1">{showAchievement.title}</h4>
              <p className="text-white/90 text-sm">{showAchievement.description}</p>
            </div>

            {/* Confetti Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  initial={{
                    x: Math.random() * 300,
                    y: -20,
                    opacity: 1,
                  }}
                  animate={{
                    y: 400,
                    opacity: 0,
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.05,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Progress Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-24 left-6 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4 rounded-full shadow-xl group"
          onClick={() => {
            const modal = document.getElementById('achievements-modal');
            if (modal) modal.style.display = 'flex';
          }}
        >
          <Gift className="w-6 h-6" />
          
          {/* Badge */}
          {unlockedCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-xs"
            >
              {unlockedCount}
            </motion.div>
          )}

          {/* Tooltip */}
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Achievements ({unlockedCount}/{achievements.length})
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
          </div>
        </motion.button>
      </motion.div>

      {/* Achievements Modal */}
      <div
        id="achievements-modal"
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 items-center justify-center hidden"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            e.currentTarget.style.display = 'none';
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-slate-900 mb-2">Achievements</h2>
              <p className="text-slate-600">
                Unlock all achievements by exploring the portfolio
              </p>
            </div>
            <button
              onClick={(e) => {
                const modal = document.getElementById('achievements-modal');
                if (modal) modal.style.display = 'none';
              }}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all ${
                    achievement.unlocked
                      ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300'
                      : 'bg-slate-50 border-slate-200 opacity-50'
                  }`}
                >
                  <div className={`p-3 rounded-lg ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white'
                      : 'bg-slate-200 text-slate-400'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-slate-900">{achievement.title}</h3>
                      {achievement.unlocked && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-amber-500"
                        >
                          ✓
                        </motion.div>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm">{achievement.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-700">Progress</span>
              <span className="text-indigo-600">
                {unlockedCount} / {achievements.length}
              </span>
            </div>
            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Konami Code Progress Indicator (Hidden, for debugging) */}
      {konamiProgress > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 bg-indigo-500 text-white px-4 py-2 rounded-full text-sm z-50"
        >
          Konami Code: {konamiProgress}/{konamiCode.length}
        </motion.div>
      )}
    </>
  );
}
