import { motion } from 'motion/react';

export function CompanySlider() {
  const companies = [
    { name: 'Google', logo: '🔍' },
    { name: 'Meta', logo: '👁️' },
    { name: 'Apple', logo: '🍎' },
    { name: 'Amazon', logo: '📦' },
    { name: 'Microsoft', logo: '🪟' },
    { name: 'Tesla', logo: '⚡' },
    { name: 'Netflix', logo: '🎬' },
    { name: 'Spotify', logo: '🎵' },
    { name: 'Adobe', logo: '🎨' },
    { name: 'Airbnb', logo: '🏠' },
  ];

  // Duplicate the array for seamless loop
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <section className="py-16 bg-white border-y border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.p
          className="text-center text-slate-500 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Trusted by leading companies worldwide
        </motion.p>

        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Sliding container */}
          <motion.div
            className="flex gap-16"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          >
            {duplicatedCompanies.map((company, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 flex items-center gap-3 px-6 py-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all group"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <span className="text-3xl">{company.logo}</span>
                <span className="text-slate-700 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
                  {company.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
