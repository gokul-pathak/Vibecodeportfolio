import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { 
  Rocket, 
  Target, 
  Lightbulb, 
  Users, 
  Clock, 
  Shield,
  Code2,
  Palette,
  CheckCircle
} from 'lucide-react';

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function BenefitCard({ icon, title, description, delay }: BenefitCardProps) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
      
      <div className="relative p-6 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300 h-full">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30">
            {icon}
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl text-white mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
          </div>

          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
        </div>
      </div>
    </motion.div>
  );
}

export function WhyHireMe() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const benefits = [
    {
      icon: <Rocket className="w-6 h-6 text-purple-400" />,
      title: 'Fast Execution',
      description: 'I deliver projects ahead of schedule without compromising quality. My efficient workflow ensures rapid prototyping and deployment.'
    },
    {
      icon: <Target className="w-6 h-6 text-blue-400" />,
      title: 'Results-Driven',
      description: 'Every design decision is backed by data and user research. I focus on metrics that matter to your business goals.'
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-cyan-400" />,
      title: 'Innovative Solutions',
      description: 'I bring creative, out-of-the-box thinking to solve complex problems. My designs push boundaries while staying practical.'
    },
    {
      icon: <Users className="w-6 h-6 text-purple-400" />,
      title: 'Team Player',
      description: 'Excellent communication skills and collaborative mindset. I thrive in cross-functional teams and value diverse perspectives.'
    },
    {
      icon: <Code2 className="w-6 h-6 text-blue-400" />,
      title: 'Full-Stack Capability',
      description: 'Unique combination of design expertise and development skills. I can take projects from concept to production.'
    },
    {
      icon: <Clock className="w-6 h-6 text-cyan-400" />,
      title: 'Always Learning',
      description: 'Stay updated with latest technologies and design trends. Continuously improving skills through courses and projects.'
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-400" />,
      title: 'Quality Assurance',
      description: 'Meticulous attention to detail and comprehensive testing. I ensure pixel-perfect designs and bug-free code.'
    },
    {
      icon: <Palette className="w-6 h-6 text-blue-400" />,
      title: 'User-Centric Design',
      description: 'Deep understanding of UX principles and accessibility. I create experiences that users love and trust.'
    }
  ];

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/10 to-slate-950" />
      
      {/* Animated grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDQwTDQwIDBNNDAgNDBMMCA0MCIgc3Ryb2tlPSJyZ2JhKDEyNywgMCwgMjU1LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-20" />

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
              <Target className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">For Hiring Managers</span>
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            Why Hire Me?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            I bring a unique blend of creative vision, technical expertise, and business acumen 
            that drives real results for your organization
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              {...benefit}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Key differentiators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 rounded-3xl blur-2xl" />
          
          <div className="relative p-8 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-4">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-xl text-white mb-2">Perfect Fit</h3>
                <p className="text-slate-400 text-sm">
                  My skills align perfectly with modern tech stack requirements
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 mb-4">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-xl text-white mb-2">Quick Onboarding</h3>
                <p className="text-slate-400 text-sm">
                  Hit the ground running with minimal ramp-up time
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 mb-4">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="text-xl text-white mb-2">Long-Term Value</h3>
                <p className="text-slate-400 text-sm">
                  I build scalable solutions that grow with your business
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <p className="text-slate-300 mb-4">
                Ready to discuss how I can contribute to your team?
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#contact"
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg shadow-purple-500/25"
                >
                  Schedule Interview
                </a>
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '#'; // Replace with actual resume URL
                    link.download = 'Resume.pdf';
                    link.click();
                  }}
                  className="px-8 py-3 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-all border border-white/10"
                >
                  Download Resume
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
