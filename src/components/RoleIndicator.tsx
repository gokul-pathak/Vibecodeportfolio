import { motion } from 'motion/react';
import { Briefcase, User, Code, Palette, Terminal, Database, RefreshCw } from 'lucide-react';
import { UserRole } from './RoleSelector';

interface RoleIndicatorProps {
  role: UserRole;
  onChangeRole: () => void;
}

export function RoleIndicator({ role, onChangeRole }: RoleIndicatorProps) {
  if (!role) return null;

  const roleConfig = {
    'hiring-manager': {
      icon: <Briefcase className="w-4 h-4" />,
      label: 'Hiring Manager',
      color: 'from-purple-600 to-pink-600',
      bgColor: 'from-purple-600/20 to-pink-600/20',
    },
    developer: {
      icon: <Code className="w-4 h-4" />,
      label: 'Developer',
      color: 'from-blue-600 to-cyan-600',
      bgColor: 'from-blue-600/20 to-cyan-600/20',
    },
    designer: {
      icon: <Palette className="w-4 h-4" />,
      label: 'Designer',
      color: 'from-pink-600 to-rose-600',
      bgColor: 'from-pink-600/20 to-rose-600/20',
    },
    devops: {
      icon: <Terminal className="w-4 h-4" />,
      label: 'DevOps',
      color: 'from-green-600 to-teal-600',
      bgColor: 'from-green-600/20 to-teal-600/20',
    },
    backend: {
      icon: <Database className="w-4 h-4" />,
      label: 'Backend',
      color: 'from-red-600 to-orange-600',
      bgColor: 'from-red-600/20 to-orange-600/20',
    },
    visitor: {
      icon: <User className="w-4 h-4" />,
      label: 'Visitor',
      color: 'from-cyan-600 to-teal-600',
      bgColor: 'from-cyan-600/20 to-teal-600/20',
    },
  };

  const config = roleConfig[role];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed top-1/2 -translate-y-1/2 right-4 sm:right-6 z-50"
    >
      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r ${config.bgColor} backdrop-blur-xl border border-white/20 shadow-xl`}>
          <div className={`text-transparent bg-clip-text bg-gradient-to-r ${config.color}`}>
            {config.icon}
          </div>
          <span className="text-xs sm:text-sm text-white">{config.label} View</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={onChangeRole}
          className="p-2.5 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all shadow-xl"
          title="Change role"
        >
          <RefreshCw className="w-4 h-4 text-white" />
        </motion.button>
      </div>
    </motion.div>
  );
}