import { ExternalLink, Github, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projects = [
    {
      title: 'AI-Powered E-Commerce Platform',
      description: 'Next-gen shopping experience with AI recommendations and AR try-on features.',
      image: 'https://images.unsplash.com/photo-1719464521902-4dc9595b182d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY1MzgwMzc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      tags: ['React', 'Three.js', 'AI/ML'],
      stats: { users: '50K+', rating: '4.9' },
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Neural Design System',
      description: 'Intelligent design system that adapts to user behavior and generates components.',
      image: 'https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMG5ldXJhbCUyMG5ldHdvcmt8ZW58MXx8fHwxNzY1MzcyNzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      tags: ['Figma', 'React', 'TypeScript'],
      stats: { components: '200+', downloads: '100K' },
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Quantum Banking App',
      description: 'Revolutionary banking interface with biometric auth and real-time transactions.',
      image: 'https://images.unsplash.com/photo-1661246627162-feb0269e0c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMG1vYmlsZSUyMGFwcHxlbnwxfHx8fDE3NjUzODAzNzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      tags: ['React Native', 'Blockchain'],
      stats: { transactions: '1M+', security: '100%' },
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Metaverse Architecture Studio',
      description: 'Immersive 3D workspace for architects to design and collaborate in VR.',
      image: 'https://images.unsplash.com/photo-1616418534243-ab757ff8ce3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBkZXNpZ258ZW58MXx8fHwxNzY1MzcyNzU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      tags: ['WebGL', 'Three.js', 'VR'],
      stats: { users: '25K+', projects: '10K' },
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Blockchain Analytics Dashboard',
      description: 'Real-time crypto analytics with predictive AI and smart contract auditing.',
      image: 'https://images.unsplash.com/photo-1666816943035-15c29931e975?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjUzNjEyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      tags: ['Next.js', 'Web3', 'D3.js'],
      stats: { chains: '20+', accuracy: '96%' },
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Holographic Workspace',
      description: 'Next-gen productivity suite with gesture controls and AI assistant.',
      image: 'https://images.unsplash.com/photo-1755985022555-09c0ec136e95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY1MzUzNjk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      tags: ['WebGL', 'Computer Vision'],
      stats: { productivity: '+150%', satisfaction: '98%' },
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-12"
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
            Featured Projects
          </motion.h2>
          <motion.p 
            className="text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Cutting-edge solutions that push the boundaries of innovation and design excellence.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <motion.div
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-indigo-300 transition-all duration-300 shadow-sm hover:shadow-xl"
                whileHover={{ y: -8 }}
              >
                <div className="relative overflow-hidden aspect-video bg-slate-100">
                  <motion.img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Video play overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </motion.div>
                  </motion.div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-slate-900 mb-2">{project.title}</h3>
                  <p className="text-slate-600 mb-4">{project.description}</p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-indigo-600">{value}</div>
                        <div className="text-slate-500 capitalize text-sm">{key}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200 text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <motion.a
                      href={project.liveUrl}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:from-indigo-700 hover:to-purple-700 transition-all text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      View
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      className="bg-slate-100 text-slate-700 p-2 rounded-lg hover:bg-slate-200 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}