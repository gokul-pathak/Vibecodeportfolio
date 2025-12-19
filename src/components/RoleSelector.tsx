import { motion } from 'motion/react';
import { Briefcase, User, Code, Palette } from 'lucide-react';

export type UserRole = 'hiring-manager' | 'visitor' | 'developer' | 'designer' | null;

interface RoleSelectorProps {
  onSelectRole: (role: UserRole) => void;
}

interface RoleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  role: UserRole;
  onClick: (role: UserRole) => void;
  delay: number;
}

function RoleCard({ icon, title, description, color, role, onClick, delay }: RoleCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(role)}
      className="relative group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <div className="relative p-8 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-300 h-full">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={`p-6 rounded-2xl bg-gradient-to-br ${color.replace('from-', 'from-').replace('to-', 'to-').replace('/30', '/20')} border border-white/20`}>
            {icon}
          </div>
          
          <div>
            <h3 className="text-2xl text-white mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
          </div>

          <div className="pt-4">
            <div className="px-6 py-2 rounded-full bg-white/10 text-white text-sm group-hover:bg-white/20 transition-colors">
              Continue as {title}
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export function RoleSelector({ onSelectRole }: RoleSelectorProps) {
  const roles = [
    {
      icon: <Briefcase className="w-12 h-12 text-purple-400" />,
      title: 'Hiring Manager',
      description: 'View professional credentials, achievements, and availability for hiring opportunities',
      color: 'from-purple-600/30 to-pink-600/30',
      role: 'hiring-manager' as UserRole,
    },
    {
      icon: <Code className="w-12 h-12 text-blue-400" />,
      title: 'Developer',
      description: 'Explore technical projects, code samples, tech stack, and development expertise',
      color: 'from-blue-600/30 to-cyan-600/30',
      role: 'developer' as UserRole,
    },
    {
      icon: <Palette className="w-12 h-12 text-pink-400" />,
      title: 'Designer',
      description: 'Discover design portfolio, creative process, design systems, and visual work',
      color: 'from-pink-600/30 to-rose-600/30',
      role: 'designer' as UserRole,
    },
    {
      icon: <User className="w-12 h-12 text-cyan-400" />,
      title: 'Visitor',
      description: 'Browse general portfolio, blog posts, and get to know me better',
      color: 'from-cyan-600/30 to-teal-600/30',
      role: 'visitor' as UserRole,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDEyNywgMCwgMjU1LCAwLjA1KSIvPjwvZz48L3N2Zz4=')] opacity-20" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mx-auto">
              <span className="text-4xl">👋</span>
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-6xl text-white mb-4">
            Welcome!
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            I'm a designer & frontend developer. Choose your role to see a personalized portfolio experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {roles.map((role, index) => (
            <RoleCard
              key={role.role}
              {...role}
              onClick={onSelectRole}
              delay={0.3 + index * 0.1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <button
            onClick={() => onSelectRole('visitor')}
            className="text-slate-500 hover:text-slate-400 text-sm transition-colors underline"
          >
            Skip and browse as visitor
          </button>
        </motion.div>
      </div>
    </div>
  );
}
