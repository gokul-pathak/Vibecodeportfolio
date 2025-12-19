import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Palette, Zap, Globe, Database, Cpu } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: any;
  color: string;
}

export function InteractiveSkills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills: Skill[] = [
    { name: 'React', level: 95, category: 'frontend', icon: Code2, color: '#61DAFB' },
    { name: 'TypeScript', level: 90, category: 'frontend', icon: Code2, color: '#3178C6' },
    { name: 'Tailwind CSS', level: 95, category: 'frontend', icon: Palette, color: '#06B6D4' },
    { name: 'Next.js', level: 88, category: 'frontend', icon: Globe, color: '#000000' },
    { name: 'Figma', level: 92, category: 'design', icon: Palette, color: '#F24E1E' },
    { name: 'Adobe XD', level: 85, category: 'design', icon: Palette, color: '#FF61F6' },
    { name: 'Framer Motion', level: 90, category: 'animation', icon: Zap, color: '#FF0055' },
    { name: 'GSAP', level: 82, category: 'animation', icon: Zap, color: '#88CE02' },
    { name: 'Three.js', level: 75, category: 'animation', icon: Cpu, color: '#000000' },
    { name: 'Node.js', level: 80, category: 'backend', icon: Database, color: '#339933' },
    { name: 'REST APIs', level: 88, category: 'backend', icon: Globe, color: '#FF6C37' },
    { name: 'GraphQL', level: 78, category: 'backend', icon: Database, color: '#E10098' },
  ];

  const categories = [
    { id: 'all', name: 'All Skills', color: 'from-slate-500 to-slate-700' },
    { id: 'frontend', name: 'Frontend', color: 'from-blue-500 to-cyan-500' },
    { id: 'design', name: 'Design', color: 'from-pink-500 to-rose-500' },
    { id: 'animation', name: 'Animation', color: 'from-purple-500 to-indigo-500' },
    { id: 'backend', name: 'Backend', color: 'from-green-500 to-emerald-500' },
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  return (
    <section className="py-24 px-4 bg-slate-900 relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-white mb-4">Interactive Skills Matrix</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Hover over skills to see proficiency levels. Filter by category to explore specific expertise areas.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-all ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                  onHoverStart={() => setHoveredSkill(skill.name)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  className="relative bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-indigo-500 transition-all group overflow-hidden"
                >
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                    animate={{
                      scale: hoveredSkill === skill.name ? [1, 1.5, 1] : 1,
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="p-2 bg-slate-700 rounded-lg"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="w-5 h-5 text-indigo-400" />
                        </motion.div>
                        <h3 className="text-white">{skill.name}</h3>
                      </div>
                      <motion.span
                        className="text-indigo-400"
                        animate={{
                          scale: hoveredSkill === skill.name ? [1, 1.2, 1] : 1,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.05 }}
                      />
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/50 to-transparent rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.05 }}
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        style={{
                          transition: 'opacity 2s ease-in-out infinite',
                        }}
                      />
                    </div>

                    {/* Particle Effect on Hover */}
                    {hoveredSkill === skill.name && (
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-indigo-400 rounded-full"
                            initial={{
                              x: '50%',
                              y: '50%',
                              opacity: 1,
                            }}
                            animate={{
                              x: `${50 + (Math.random() - 0.5) * 100}%`,
                              y: `${50 + (Math.random() - 0.5) * 100}%`,
                              opacity: 0,
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Stats Summary */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { label: 'Total Skills', value: skills.length },
            { label: 'Avg Proficiency', value: `${Math.round(skills.reduce((acc, s) => acc + s.level, 0) / skills.length)}%` },
            { label: 'Expert Level', value: skills.filter(s => s.level >= 90).length },
            { label: 'Categories', value: categories.length - 1 },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, borderColor: 'rgb(99, 102, 241)' }}
            >
              <motion.div
                className="text-indigo-400 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}