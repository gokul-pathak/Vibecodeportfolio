import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, GraduationCap, Award, Rocket, Code, Sparkles } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  company: string;
  description: string;
  icon: any;
  color: string;
  achievements: string[];
}

export function InteractiveTimeline() {
  const [activeEvent, setActiveEvent] = useState<number>(0);

  const events: TimelineEvent[] = [
    {
      year: '2025',
      title: 'Senior Designer & Developer',
      company: 'Innovation Labs',
      description: 'Leading design and development of cutting-edge web applications with focus on AI integration and 3D experiences.',
      icon: Rocket,
      color: 'from-purple-500 to-pink-500',
      achievements: [
        'Led team of 5 designers and developers',
        'Launched 3 award-winning products',
        'Implemented AI-powered design system',
        '40% increase in user engagement'
      ]
    },
    {
      year: '2023',
      title: 'Lead Frontend Developer',
      company: 'Tech Solutions Inc.',
      description: 'Architected and built complex React applications with focus on performance and user experience.',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      achievements: [
        'Reduced load time by 60%',
        'Built reusable component library',
        'Mentored junior developers',
        'Implemented CI/CD pipeline'
      ]
    },
    {
      year: '2021',
      title: 'UI/UX Designer',
      company: 'Creative Studios',
      description: 'Designed intuitive interfaces for mobile and web applications, focusing on user-centered design principles.',
      icon: Sparkles,
      color: 'from-indigo-500 to-purple-500',
      achievements: [
        'Redesigned 5 major products',
        'Established design system',
        'Conducted 50+ user research sessions',
        'Improved NPS score by 35%'
      ]
    },
    {
      year: '2019',
      title: 'Certification & Awards',
      company: 'Professional Development',
      description: 'Completed advanced certifications and received recognition for outstanding work in design and development.',
      icon: Award,
      color: 'from-amber-500 to-orange-500',
      achievements: [
        'AWS Certified Developer',
        'Google UX Design Certificate',
        'Best Innovation Award 2019',
        'Speaker at 3 conferences'
      ]
    },
    {
      year: '2017',
      title: 'Bachelor\'s in Computer Science',
      company: 'Tech University',
      description: 'Studied computer science with focus on human-computer interaction and web technologies.',
      icon: GraduationCap,
      color: 'from-green-500 to-emerald-500',
      achievements: [
        'Graduated with honors',
        'Published 2 research papers',
        'Led university coding club',
        'Built 10+ student projects'
      ]
    }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <motion.div
        className="absolute top-1/4 right-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
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
        >
          <h2 className="text-slate-900 mb-4">My Journey</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            An interactive timeline showcasing my professional growth and achievements. Click on any milestone to explore details.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Timeline Navigation */}
          <div className="relative">
            {/* Vertical Line */}
            <motion.div
              className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            <div className="space-y-8">
              {events.map((event, index) => {
                const Icon = event.icon;
                const isActive = activeEvent === index;

                return (
                  <motion.div
                    key={index}
                    className="relative flex gap-4 cursor-pointer"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setActiveEvent(index)}
                    whileHover={{ x: 10 }}
                  >
                    {/* Icon */}
                    <motion.div
                      className={`relative z-10 w-12 h-12 rounded-full bg-gradient-to-br ${event.color} flex items-center justify-center shadow-lg`}
                      animate={{
                        scale: isActive ? 1.2 : 1,
                        boxShadow: isActive 
                          ? '0 0 30px rgba(99, 102, 241, 0.5)'
                          : '0 10px 30px rgba(0, 0, 0, 0.2)',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                      
                      {/* Pulse Effect */}
                      {isActive && (
                        <motion.div
                          className={`absolute inset-0 rounded-full bg-gradient-to-br ${event.color}`}
                          initial={{ scale: 1, opacity: 0.5 }}
                          animate={{ scale: 2, opacity: 0 }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1">
                      <motion.div
                        className={`p-4 rounded-lg transition-all ${
                          isActive 
                            ? 'bg-white shadow-xl border-2 border-indigo-500'
                            : 'bg-slate-50 border border-slate-200'
                        }`}
                        animate={{
                          scale: isActive ? 1.05 : 1,
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-3 py-1 rounded-full text-sm bg-gradient-to-r ${event.color} text-white`}>
                            {event.year}
                          </span>
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-3 h-3 bg-green-500 rounded-full"
                            />
                          )}
                        </div>
                        <h3 className="text-slate-900 mb-1">{event.title}</h3>
                        <p className="text-slate-600 text-sm">{event.company}</p>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Details Panel */}
          <div className="sticky top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEvent}
                initial={{ opacity: 0, y: 50, rotateY: -90 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                exit={{ opacity: 0, y: -50, rotateY: 90 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-2xl shadow-2xl border border-slate-200"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <motion.div
                    className={`p-4 rounded-xl bg-gradient-to-br ${events[activeEvent].color}`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {(() => {
                      const Icon = events[activeEvent].icon;
                      return <Icon className="w-8 h-8 text-white" />;
                    })()}
                  </motion.div>
                  <div className="flex-1">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm bg-gradient-to-r ${events[activeEvent].color} text-white mb-3`}>
                      {events[activeEvent].year}
                    </span>
                    <h3 className="text-slate-900 mb-2">{events[activeEvent].title}</h3>
                    <p className="text-slate-600">{events[activeEvent].company}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-700 mb-6 leading-relaxed">
                  {events[activeEvent].description}
                </p>

                {/* Achievements */}
                <div>
                  <h4 className="text-slate-900 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-500" />
                    Key Achievements
                  </h4>
                  <div className="space-y-3">
                    {events[activeEvent].achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 group"
                      >
                        <motion.div
                          className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-2"
                          whileHover={{ scale: 2 }}
                        />
                        <p className="text-slate-700 group-hover:text-slate-900 transition-colors flex-1">
                          {achievement}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <motion.div
                  className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-3 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {[
                    { label: 'Duration', value: activeEvent === 0 ? 'Current' : '2 years' },
                    { label: 'Projects', value: Math.floor(Math.random() * 20) + 10 },
                    { label: 'Impact', value: 'High' },
                  ].map((stat, statIndex) => (
                    <motion.div
                      key={statIndex}
                      className="text-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="text-indigo-600 mb-1">{stat.value}</div>
                      <p className="text-slate-500 text-sm">{stat.label}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress Indicator */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center gap-2">
            {events.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveEvent(index)}
                className={`h-2 rounded-full transition-all ${
                  activeEvent === index 
                    ? 'w-8 bg-gradient-to-r from-indigo-500 to-purple-500'
                    : 'w-2 bg-slate-300'
                }`}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}