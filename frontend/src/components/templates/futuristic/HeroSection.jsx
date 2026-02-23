import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CanvasScene from '@/components/3d/CanvasScene';
import FloatingOrb from '@/components/3d/FloatingOrb';
import ParticleField from '@/components/3d/ParticleField';

const HeroSection = ({ data, containerRef }) => {
  const [ref, isVisible] = useScrollAnimation();

  const scrollToSection = (id) => {
    const container = containerRef?.current;
    if (!container) return;
    const target = container.querySelector(`#${id}`);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <CanvasScene>
          <FloatingOrb position={[0, 0, 0]} size={2} color="#60a5fa" distort={0.5} />
          <ParticleField count={300} color="#60a5fa" spread={15} />
        </CanvasScene>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
      <div 
        className="absolute inset-0 z-5 opacity-40"
        style={{ background: 'var(--gradient-hero)' }}
      />

      <div ref={ref} className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="inline-block mb-6 px-4 py-2 rounded-full glass-card text-sm tracking-widest uppercase text-muted-foreground"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {data.role}
          </motion.span>

          <h1 className="hero-title mb-6">
            <span className="block text-foreground">{data.name.split(' ')[0]}</span>
            <span className="block text-gradient">{data.name.split(' ').slice(1).join(' ') || 'Developer'}</span>
          </h1>

          {data.tagline && (
            <motion.p
              className="hero-subtitle max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {data.tagline}
            </motion.p>
          )}

          <motion.div
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <button
              data-magnetic="true"
              onClick={() => scrollToSection('projects')}
              className="magnetic-button px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium tracking-wide hover:scale-105 transition-all duration-300 glow-primary"
            >
              View Projects
            </button>
            <button
              data-magnetic="true"
              onClick={() => scrollToSection('contact')}
              className="magnetic-button px-8 py-4 rounded-full glass-card text-foreground font-medium tracking-wide hover:scale-105 transition-all duration-300"
            >
              Contact Me
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
