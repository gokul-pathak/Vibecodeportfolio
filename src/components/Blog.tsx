import { motion } from 'motion/react';
import { Calendar, Clock, ArrowRight, Eye, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export function Blog() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const blogPosts = [
    {
      title: 'The Future of Web Development: AI-Powered Design Systems',
      excerpt: 'Explore how artificial intelligence is revolutionizing the way we build and maintain design systems.',
      image: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjB0aGlua2luZ3xlbnwxfHx8fDE3NjUzNzMyNjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'AI & Design',
      date: 'Dec 8, 2025',
      readTime: '8 min',
      views: '12.5K',
      comments: 234
    },
    {
      title: 'Building 3D Experiences with WebGL and Three.js',
      excerpt: 'A comprehensive guide to creating immersive 3D web experiences with performance optimization.',
      image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NjUzODA0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: '3D Development',
      date: 'Dec 5, 2025',
      readTime: '12 min',
      views: '18.2K',
      comments: 456
    },
    {
      title: 'Designing for the Metaverse: UX Principles for Virtual Worlds',
      excerpt: 'Discover the key design principles for creating intuitive experiences in VR and AR environments.',
      image: 'https://images.unsplash.com/photo-1566709603326-610ec233ee77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwYmxvZyUyMHdyaXRpbmd8ZW58MXx8fHwxNzY1MzgwODAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'XR Design',
      date: 'Dec 1, 2025',
      readTime: '10 min',
      views: '15.7K',
      comments: 312
    }
  ];

  return (
    <section id="blog" className="py-20 px-4 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-slate-900 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Latest Articles
          </motion.h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Sharing knowledge about design, development, and the future of digital experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <motion.div
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-indigo-300 transition-all h-full flex flex-col shadow-sm hover:shadow-xl"
                whileHover={{ y: -8 }}
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-video">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredCard === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </span>
                  </div>

                  {/* Read overlay */}
                  <motion.div
                    className="absolute inset-0 bg-indigo-600/95 backdrop-blur-sm flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="text-white flex items-center gap-2"
                      initial={{ y: 20 }}
                      animate={{ y: hoveredCard === index ? 0 : 20 }}
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-3 text-slate-500 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-4 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-4 text-slate-500 text-sm">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}