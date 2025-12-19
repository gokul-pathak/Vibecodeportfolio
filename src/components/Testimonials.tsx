import { motion, useInView } from 'motion/react';
import { Star, Quote, Award, TrendingUp, Users, Zap } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

export function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CEO at TechVision',
      company: 'Fortune 500',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      content: 'Working with Alex was transformative. The design system they created increased our development velocity by 300% and user satisfaction went through the roof.',
      rating: 5,
      project: 'Enterprise Design System'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO at NexaLabs',
      company: 'YC Backed',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      content: 'The AI-powered platform Alex built is revolutionary. We went from concept to Series A in 6 months. Their technical expertise is unmatched.',
      rating: 5,
      project: 'AI SaaS Platform'
    }
  ];

  const stats = [
    { icon: Users, label: 'Happy Clients', value: 150, suffix: '+' },
    { icon: Award, label: 'Awards Won', value: 25, suffix: '+' },
    { icon: TrendingUp, label: 'Success Rate', value: 98, suffix: '%' },
    { icon: Zap, label: 'Projects Completed', value: 200, suffix: '+' }
  ];

  return (
    <section className="py-20 px-4 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Stats Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <motion.h2
              className="text-slate-900 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              Proven Track Record
            </motion.h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Numbers that speak louder than words. Here's the impact I've made over the years.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm hover:shadow-lg transition-all"
                    whileHover={{ y: -5 }}
                  >
                    <motion.div
                      className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <div className="text-slate-900 text-3xl mb-2">
                      <AnimatedCounter end={stat.value} />
                      {stat.suffix}
                    </div>
                    <div className="text-slate-600">{stat.label}</div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <motion.h2
              className="text-slate-900 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Client Testimonials
            </motion.h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Don't just take my word for it. Here's what industry leaders say about working with me.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="bg-white p-8 rounded-2xl border border-slate-200 h-full shadow-sm hover:shadow-lg transition-all"
                  whileHover={{ y: -5 }}
                >
                  {/* Quote icon */}
                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                    <Quote className="w-6 h-6 text-indigo-600" />
                  </div>

                  {/* Content */}
                  <p className="text-slate-700 mb-6 italic leading-relaxed">&quot;{testimonial.content}&quot;</p>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full border-2 border-indigo-200"
                    />
                    <div>
                      <div className="text-slate-900">{testimonial.name}</div>
                      <div className="text-slate-600">{testimonial.role}</div>
                      <div className="text-indigo-600">{testimonial.company}</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}