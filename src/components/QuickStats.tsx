import { motion } from 'motion/react';
import { Code, Users, Award, Zap, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

interface StatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
  suffix?: string;
}

function AnimatedStat({ icon, value, label, delay, suffix = '' }: StatProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const targetValue = parseInt(value.replace(/[^0-9]/g, ''));

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const increment = targetValue / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= targetValue) {
          setCount(targetValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, targetValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
      
      <div className="relative p-6 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30">
            {icon}
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 rounded-full border-2 border-dashed border-purple-500/30"
          />
        </div>
        
        <div className="space-y-1">
          <motion.p className="text-3xl text-white">
            {count}{suffix}
          </motion.p>
          <p className="text-sm text-slate-400">{label}</p>
        </div>

        {/* Hover effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/10 group-hover:to-blue-600/10 transition-all duration-300"
        />
      </div>
    </motion.div>
  );
}

export function QuickStats() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const stats = [
    { icon: <Code className="w-6 h-6 text-purple-400" />, value: '5', label: 'Years Experience', suffix: '+' },
    { icon: <Users className="w-6 h-6 text-blue-400" />, value: '50', label: 'Projects Completed', suffix: '+' },
    { icon: <Award className="w-6 h-6 text-cyan-400" />, value: '15', label: 'Awards Won', suffix: '+' },
    { icon: <Zap className="w-6 h-6 text-purple-400" />, value: '98', label: 'Client Satisfaction', suffix: '%' },
    { icon: <TrendingUp className="w-6 h-6 text-blue-400" />, value: '200', label: 'GitHub Repos', suffix: '+' },
    { icon: <CheckCircle2 className="w-6 h-6 text-cyan-400" />, value: '100', label: 'On-Time Delivery', suffix: '%' },
  ];

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDEyNywgMCwgMjU1LCAwLjA1KSIvPjwvZz48L3N2Zz4=')] opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-block"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 mb-4">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Quick Overview</span>
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            By The Numbers
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Proven track record of delivering exceptional results for clients worldwide
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <AnimatedStat
              key={index}
              {...stat}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Call to action for recruiters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20">
            <p className="text-slate-300">
              📊 Want detailed metrics and case studies?
            </p>
            <a
              href="#contact"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Request Portfolio
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
