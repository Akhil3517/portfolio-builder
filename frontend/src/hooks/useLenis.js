import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export const useLenis = (options = {}) => {
  const lenisRef = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const hasOptions = options.wrapper || options.content || options.smoothWheel !== undefined;
    if (!hasOptions && Object.keys(options).length === 0) return;

    const wrapper = options.wrapper?.current;
    const content = options.content?.current;

    if (options.wrapper && !wrapper) return;

    const lenis = new Lenis({
      duration: options.duration ?? 1.2,
      easing: options.easing ?? ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      smoothWheel: options.smoothWheel ?? true,
      touchMultiplier: options.touchMultiplier ?? 1.5,
      ...(wrapper ? { wrapper, content: content || undefined } : {}),
    });

    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      rafId.current = requestAnimationFrame(raf);
    };

    rafId.current = requestAnimationFrame(raf);

    if (!wrapper) {
      document.documentElement.classList.add('lenis', 'lenis-smooth');
    }

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      lenis.destroy();
      lenisRef.current = null;
      if (!wrapper) {
        document.documentElement.classList.remove('lenis', 'lenis-smooth');
      }
    };
  }, [options.duration, options.easing, options.smoothWheel, options.touchMultiplier, options.wrapper, options.content]);

  return lenisRef;
};

export const useScrollTo = () => {
  const scrollTo = (target, options) => {
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(target, options);
    } else {
      const element = typeof target === 'string' ? document.querySelector(target) : null;
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
    }
  };

  return scrollTo;
};
