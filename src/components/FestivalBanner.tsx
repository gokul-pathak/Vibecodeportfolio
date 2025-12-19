import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Gift, Heart, Flame, PartyPopper } from 'lucide-react';

interface Festival {
  id: string;
  name: string;
  greeting: string;
  icon: any;
  startDate: { month: number; day: number };
  endDate: { month: number; day: number };
  gradient: string;
  accentColor: string;
  emoji: string;
  type: 'nepali' | 'international';
}

interface FestivalBannerProps {
  showHiringBanner?: boolean;
}

export function FestivalBanner({ showHiringBanner = false }: FestivalBannerProps) {
  const [activeFestivals, setActiveFestivals] = useState<Festival[]>([]);
  const [dismissedFestivals, setDismissedFestivals] = useState<Set<string>>(new Set());

  const festivals: Festival[] = [
    {
      id: 'christmas',
      name: 'Christmas',
      greeting: '🎄 Merry Christmas! Wishing you joy, peace, and happiness this holiday season!',
      icon: Gift,
      startDate: { month: 12, day: 18 },
      endDate: { month: 12, day: 26 },
      gradient: 'from-red-500 via-green-500 to-red-500',
      accentColor: 'border-red-500/30 bg-red-500/10',
      emoji: '🎅',
      type: 'international',
    },
    {
      id: 'newyear',
      name: 'New Year',
      greeting: '🎊 Happy New Year! May this year bring new opportunities and endless possibilities!',
      icon: PartyPopper,
      startDate: { month: 12, day: 25 },
      endDate: { month: 1, day: 7 },
      gradient: 'from-purple-500 via-pink-500 to-yellow-500',
      accentColor: 'border-purple-500/30 bg-purple-500/10',
      emoji: '🎆',
      type: 'international',
    },
    {
      id: 'valentines',
      name: "Valentine's Day",
      greeting: '💝 Happy Valentine\'s Day! Spread love and kindness today and every day!',
      icon: Heart,
      startDate: { month: 2, day: 10 },
      endDate: { month: 2, day: 15 },
      gradient: 'from-pink-500 via-red-500 to-rose-500',
      accentColor: 'border-pink-500/30 bg-pink-500/10',
      emoji: '💖',
      type: 'international',
    },
    {
      id: 'holi',
      name: 'Holi',
      greeting: '🎨 Happy Holi! May your life be filled with vibrant colors of joy and happiness!',
      icon: Sparkles,
      startDate: { month: 3, day: 20 },
      endDate: { month: 3, day: 28 },
      gradient: 'from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500',
      accentColor: 'border-yellow-500/30 bg-yellow-500/10',
      emoji: '🌈',
      type: 'nepali',
    },
    {
      id: 'nepalinewyear',
      name: 'Nepali New Year',
      greeting: 'नयाँ वर्षको शुभकामना! 🇳🇵 Happy Nepali New Year! May this year bring prosperity and success!',
      icon: PartyPopper,
      startDate: { month: 4, day: 8 },
      endDate: { month: 4, day: 20 },
      gradient: 'from-blue-600 via-red-600 to-blue-600',
      accentColor: 'border-blue-500/30 bg-blue-500/10',
      emoji: '🎉',
      type: 'nepali',
    },
    {
      id: 'buddha',
      name: 'Buddha Jayanti',
      greeting: '☸️ Happy Buddha Jayanti! May peace and wisdom illuminate your path!',
      icon: Sparkles,
      startDate: { month: 5, day: 15 },
      endDate: { month: 5, day: 25 },
      gradient: 'from-orange-400 via-yellow-400 to-orange-400',
      accentColor: 'border-orange-500/30 bg-orange-500/10',
      emoji: '🙏',
      type: 'nepali',
    },
    {
      id: 'dashain',
      name: 'Dashain',
      greeting: 'दशैंको शुभकामना! 🙏 Happy Dashain! May this festival bring blessings and prosperity!',
      icon: Sparkles,
      startDate: { month: 10, day: 5 },
      endDate: { month: 10, day: 25 },
      gradient: 'from-red-600 via-yellow-500 to-red-600',
      accentColor: 'border-red-500/30 bg-red-500/10',
      emoji: '🎊',
      type: 'nepali',
    },
    {
      id: 'tihar',
      name: 'Tihar',
      greeting: 'तिहारको शुभकामना! 🪔 Happy Tihar! May the lights brighten your life with joy!',
      icon: Flame,
      startDate: { month: 10, day: 28 },
      endDate: { month: 11, day: 5 },
      gradient: 'from-yellow-500 via-orange-500 to-red-500',
      accentColor: 'border-yellow-500/30 bg-yellow-500/10',
      emoji: '🪔',
      type: 'nepali',
    },
  ];

  useEffect(() => {
    checkActiveFestivals();
  }, []);

  const checkActiveFestivals = () => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // JavaScript months are 0-indexed
    const currentDay = now.getDate();

    const active = festivals.filter(festival => {
      const { startDate, endDate } = festival;

      // Handle year-crossing festivals (like New Year)
      if (startDate.month > endDate.month) {
        // Festival crosses year boundary
        return (
          (currentMonth === startDate.month && currentDay >= startDate.day) ||
          (currentMonth === endDate.month && currentDay <= endDate.day)
        );
      } else if (startDate.month === endDate.month) {
        // Festival within same month
        return (
          currentMonth === startDate.month &&
          currentDay >= startDate.day &&
          currentDay <= endDate.day
        );
      } else {
        // Festival spans multiple months
        return (
          (currentMonth === startDate.month && currentDay >= startDate.day) ||
          (currentMonth === endDate.month && currentDay <= endDate.day) ||
          (currentMonth > startDate.month && currentMonth < endDate.month)
        );
      }
    });

    setActiveFestivals(active);
  };

  const handleDismiss = (festivalId: string) => {
    setDismissedFestivals(prev => new Set([...prev, festivalId]));
  };

  const visibleFestivals = activeFestivals.filter(
    festival => !dismissedFestivals.has(festival.id)
  );

  if (visibleFestivals.length === 0) return null;

  return (
    <div 
      className="fixed left-0 right-0 z-40 px-4 sm:px-6 lg:px-8 pointer-events-none transition-all duration-500 ease-in-out"
      style={{
        top: showHiringBanner ? '140px' : '80px'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="popLayout">
          {visibleFestivals.map((festival, index) => {
            const Icon = festival.icon;
            
            return (
              <motion.div
                key={festival.id}
                layout
                initial={{ y: -100, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ x: 100, opacity: 0, scale: 0.8 }}
                transition={{ 
                  type: 'spring', 
                  damping: 25, 
                  stiffness: 300,
                  delay: index * 0.05,
                  layout: {
                    duration: 0.3
                  }
                }}
                className="pointer-events-auto mb-3"
              >
                <div
                  className={`relative overflow-hidden rounded-2xl border backdrop-blur-xl shadow-2xl ${festival.accentColor}`}
                >
                  {/* Animated gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${festival.gradient} opacity-10 animate-pulse`}
                  />

                  {/* Sparkles animation */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(15)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        initial={{
                          x: Math.random() * 100 + '%',
                          y: Math.random() * 100 + '%',
                          opacity: 0,
                        }}
                        animate={{
                          y: [null, '-100%'],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <div className="relative px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {/* Icon */}
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: 'reverse',
                        }}
                        className="flex-shrink-0"
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${festival.accentColor} border`}>
                          {festival.emoji}
                        </div>
                      </motion.div>

                      {/* Message */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="w-3.5 h-3.5 text-white flex-shrink-0" />
                          <span className="text-xs uppercase tracking-wider text-white/80 font-mono truncate">
                            {festival.type === 'nepali' ? '🇳🇵 Nepal Festival' : '🌍 International'}
                          </span>
                        </div>
                        <p className="text-white text-sm font-medium line-clamp-1">
                          {festival.greeting}
                        </p>
                      </div>
                    </div>

                    {/* Dismiss button */}
                    <button
                      onClick={() => handleDismiss(festival.id)}
                      className="flex-shrink-0 p-2 hover:bg-white/10 rounded-full transition-colors"
                      aria-label="Dismiss banner"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  {/* Bottom border animation */}
                  <motion.div
                    className={`h-0.5 bg-gradient-to-r ${festival.gradient}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{ transformOrigin: 'left' }}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}