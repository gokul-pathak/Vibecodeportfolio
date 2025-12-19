import { motion } from 'motion/react';
import { Briefcase, Code, Palette, User, Terminal, Database } from 'lucide-react';
import { UserRole } from './RoleSelector';

interface RoleBasedWelcomeProps {
  role: UserRole;
}

export function RoleBasedWelcome({ role }: RoleBasedWelcomeProps) {
  if (!role) return null;

  const welcomeMessages = {
    'hiring-manager': {
      icon: <Briefcase className="w-8 h-8 text-purple-400" />,
      title: 'Welcome, Hiring Manager!',
      subtitle: 'View customized content focused on professional credentials and hiring information',
      features: [
        'Professional achievements & metrics',
        'Availability status & hiring details',
        'Why hire me section',
        'Professional timeline & testimonials',
      ],
      color: 'from-purple-600 to-pink-600',
    },
    developer: {
      icon: <Code className="w-8 h-8 text-blue-400" />,
      title: 'Welcome, Fellow Developer!',
      subtitle: 'Explore technical projects, code quality, and development expertise',
      features: [
        'Technical project deep dives',
        'Interactive skills showcase',
        'Development blog & insights',
        'GitHub stats & code samples',
      ],
      color: 'from-blue-600 to-cyan-600',
    },
    designer: {
      icon: <Palette className="w-8 h-8 text-pink-400" />,
      title: 'Welcome, Creative Mind!',
      subtitle: 'Discover design portfolio, creative process, and visual excellence',
      features: [
        'Design-focused project showcase',
        'Creative process & methodology',
        'Design blog & case studies',
        'Visual inspiration & references',
      ],
      color: 'from-pink-600 to-rose-600',
    },
    devops: {
      icon: <Terminal className="w-8 h-8 text-green-400" />,
      title: 'Welcome, DevOps Engineer!',
      subtitle: 'Dive into infrastructure, automation, deployment pipelines, and system architecture',
      features: [
        'Infrastructure as Code & automation',
        'CI/CD pipelines & deployments',
        'Container orchestration & monitoring',
        'System architecture & scaling',
      ],
      color: 'from-green-600 to-teal-600',
    },
    backend: {
      icon: <Database className="w-8 h-8 text-red-400" />,
      title: 'Welcome, Backend Engineer!',
      subtitle: 'Query and explore my portfolio through an interactive SQL database interface',
      features: [
        'Database schema & design patterns',
        'Server-side architecture & APIs',
        'Performance optimization & scaling',
        'SQL queries & data modeling',
      ],
      color: 'from-red-600 to-orange-600',
    },
    visitor: {
      icon: <User className="w-8 h-8 text-cyan-400" />,
      title: 'Welcome, Visitor!',
      subtitle: 'Browse the complete portfolio and get to know me better',
      features: [
        'General portfolio overview',
        'Blog posts & insights',
        'Share & subscribe options',
        'Interactive experiences',
      ],
      color: 'from-cyan-600 to-teal-600',
    },
  };

  const config = welcomeMessages[role];

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.4 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 mb-4"
          >
            {config.icon}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`text-2xl sm:text-3xl md:text-4xl mb-3 text-transparent bg-clip-text bg-gradient-to-r ${config.color}`}
          >
            {config.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-slate-400 mb-6 text-sm sm:text-base px-4"
          >
            {config.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4"
          >
            {config.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="px-3 py-1.5 rounded-full bg-slate-800/50 border border-white/10 text-xs text-slate-300"
              >
                {feature}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}