import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const MinimalHeroSection = ({ data, containerRef }) => {
  const [ref, isVisible] = useScrollAnimation();

  const scrollToSection = (id) => {
    const container = containerRef?.current;
    if (!container) return;
    const target = container.querySelector(`#${id}`);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6" id="hero">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(217 91% 60% / 0.05) 0%, transparent 70%)' }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="w-12 h-px bg-primary" />
            <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">{data.role}</span>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.9] mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {data.name.split(' ').map((word, i) => (
              <span key={i} className={i === 0 ? 'block font-medium' : 'block text-muted-foreground'}>
                {word}
              </span>
            ))}
          </motion.h1>

          {data.tagline && (
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {data.tagline}
            </motion.p>
          )}

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="inline-flex items-center gap-3 text-sm tracking-widest uppercase group"
              data-magnetic="true"
            >
              <span>View Work</span>
              <motion.span 
                className="w-8 h-px bg-foreground group-hover:w-12 transition-all duration-300"
              />
            </button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Scroll</span>
      </motion.div>
    </section>
  );
};

export default MinimalHeroSection;
