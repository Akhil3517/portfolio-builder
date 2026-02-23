import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import DeveloperScene from './DeveloperScene';
import { AboutTerminal, ProjectCards, SkillBadges, ContactMinimal } from './ContentSections';

const DeveloperStudioTemplate = ({ data, isPreview = false, containerRef }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pointerNorm, setPointerNorm] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const handleScroll = useCallback(() => {
    const el = containerRef?.current;
    const hero = heroRef.current;
    if (!el) return;
    const scrollTop = el.scrollTop;
    const heroH = hero?.offsetHeight ?? el.clientHeight;
    const progress = heroH > 0 ? Math.min(scrollTop / heroH, 1) : 0;
    setScrollProgress(progress);
  }, [containerRef]);

  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;
    handleScroll();
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [containerRef, handleScroll]);

  const handlePointerMove = useCallback((e) => {
    const el = containerRef?.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    if (w <= 0 || h <= 0) return;
    const x = (e.clientX - rect.left) / w;
    const y = (e.clientY - rect.top) / h;
    setPointerNorm({
      x: Math.max(-1, Math.min(1, (x - 0.5) * 2)),
      y: Math.max(-1, Math.min(1, (y - 0.5) * 2)),
    });
  }, [containerRef]);

  const handlePointerLeave = useCallback(() => {
    setPointerNorm({ x: 0, y: 0 });
  }, []);

  const overlayOpacity = Math.min(Math.max((scrollProgress - 0.35) / 0.45, 0), 1);
  const sceneFade = 1 - scrollProgress * 0.65;

  return (
    <div className="relative" style={{ background: '#0a0a0a', color: 'hsl(0 0% 95%)' }}>
      <div
        ref={heroRef}
        className="relative"
        style={{ minHeight: '100vh', height: '100vh' }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: sceneFade,
            transition: 'opacity 0.12s ease-out',
            pointerEvents: 'none',
          }}
        >
          <DeveloperScene
            name={data.name}
            role={data.role}
            scrollProgress={scrollProgress}
            pointerNorm={pointerNorm}
          />
        </div>

        {/* Vignette - soft edges */}
        <div
          className="pointer-events-none"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)',
          }}
        />

        {/* Floating name/role overlay - fade-in, subtle glow, no 3D font */}
        <motion.div
          className="absolute left-1/2 top-[28%] -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-2xl md:text-3xl font-bold tracking-tight"
            style={{
              color: '#4fc3f7',
              textShadow: '0 0 24px rgba(79, 195, 247, 0.4), 0 0 48px rgba(79, 195, 247, 0.2)',
            }}
            whileHover={{ textShadow: '0 0 32px rgba(79, 195, 247, 0.5), 0 0 64px rgba(79, 195, 247, 0.25)' }}
            transition={{ duration: 0.2 }}
          >
            {data.name}
          </motion.h1>
          <motion.p
            className="mt-2 text-sm md:text-base font-mono"
            style={{ color: '#7c4dff' }}
          >
            {data.role}
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ opacity: scrollProgress > 0.12 ? 0 : 0.6 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
            Scroll
          </span>
          <motion.div
            className="w-px h-8 bg-[hsl(var(--primary))]"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
          />
        </motion.div>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          background: '#0a0a0a',
          pointerEvents: 'auto',
        }}
      >
        <div
          style={{
            height: '100px',
            background: 'linear-gradient(to bottom, transparent, #0a0a0a)',
            marginTop: '-100px',
            position: 'relative',
            zIndex: 10,
          }}
        />

        <div style={{ background: '#0a0a0a', opacity: overlayOpacity, transition: 'opacity 0.25s ease-out' }}>
          {data.visibleSections?.about !== false && <AboutTerminal data={data} />}
          {data.visibleSections?.projects !== false && <ProjectCards data={data} />}
          {data.visibleSections?.skills !== false && <SkillBadges data={data} />}
          {data.visibleSections?.contact !== false && <ContactMinimal data={data} />}

          <div className="py-12 text-center">
            <p className="text-xs font-mono text-muted-foreground">
              Built with <span className="text-[hsl(var(--primary))]">{'<'}code{'/>'}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperStudioTemplate;
