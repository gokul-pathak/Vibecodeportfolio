import { Code2, Palette, Sparkles, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export function About() {
  const skills = [
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Creating intuitive and visually stunning interfaces using Figma, Adobe XD, and modern design principles.',
      tools: ['Figma', 'Adobe XD', 'Sketch', 'Photoshop']
    },
    {
      icon: Code2,
      title: 'Frontend Development',
      description: 'Building responsive, performant web applications with the latest technologies and best practices.',
      tools: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js']
    },
    {
      icon: Sparkles,
      title: 'Interaction Design',
      description: 'Crafting delightful micro-interactions and animations that enhance user experience.',
      tools: ['Framer Motion', 'GSAP', 'CSS Animations', 'Lottie']
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing applications for speed, accessibility, and seamless user experiences across devices.',
      tools: ['Lighthouse', 'Webpack', 'Vite', 'Core Web Vitals']
    }
  ];

  return (
    <section id="about" className="py-24 px-4 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-slate-900 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          <motion.p 
            className="text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            I'm a designer-developer hybrid who bridges the gap between aesthetics and functionality. 
            With a keen eye for design and strong technical skills, I bring ideas to life with precision and care.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-xl hover:shadow-2xl transition-all group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-slate-900 mb-3">{skill.title}</h3>
                <p className="text-slate-600 mb-4">{skill.description}</p>
                <div className="flex flex-wrap gap-2">
                  {skill.tools.map((tool, toolIndex) => (
                    <motion.span 
                      key={toolIndex}
                      className="bg-slate-50 px-3 py-1 rounded-full text-slate-700 border border-slate-200"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + toolIndex * 0.05 }}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgb(226, 232, 240)' }}
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>

                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}