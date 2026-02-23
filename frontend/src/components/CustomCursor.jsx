import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = ({ isActive = true, containerRef }) => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isInsideContainer, setIsInsideContainer] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const updateSize = () => {
      setContainerSize({
        width: container.clientWidth,
        height: container.clientHeight,
      });
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [containerRef]);

  useEffect(() => {
    if (isMobile || !isActive) return;

    const container = containerRef?.current;
    if (!container) return;
    
    const handleMouseMove = (e) => {
      const bounds = container.getBoundingClientRect();
      
      const relativeX = e.clientX - bounds.left;
      const relativeY = e.clientY - bounds.top;
      
      const isInside = (
        relativeX >= 0 &&
        relativeX <= bounds.width &&
        relativeY >= 0 &&
        relativeY <= bounds.height
      );
      
      setIsInsideContainer(isInside);
      
      if (isInside) {
        const clampedX = Math.max(0, Math.min(relativeX, bounds.width));
        const clampedY = Math.max(0, Math.min(relativeY, bounds.height));
        
        cursorX.set(clampedX);
        cursorY.set(clampedY);
      }
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.dataset.magnetic === 'true'
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const handleContainerLeave = () => {
      setIsInsideContainer(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseover', handleMouseEnter);
    container.addEventListener('mouseout', handleMouseLeave);
    container.addEventListener('mouseleave', handleContainerLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseover', handleMouseEnter);
      container.removeEventListener('mouseout', handleMouseLeave);
      container.removeEventListener('mouseleave', handleContainerLeave);
    };
  }, [cursorX, cursorY, isMobile, isActive, containerRef]);

  if (isMobile || !isActive || !containerRef?.current || !isInsideContainer) return null;

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="absolute pointer-events-none z-[9999] mix-blend-screen"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: '-50%',
          y: '-50%',
        }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width: isHovering ? 80 : 24,
            height: isHovering ? 80 : 24,
            backgroundColor: isHovering 
              ? 'rgba(96, 165, 250, 0.15)' 
              : 'rgba(96, 165, 250, 0.4)',
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            filter: 'blur(2px)',
          }}
        />
      </motion.div>

      <motion.div
        className="absolute pointer-events-none z-[9999]"
        style={{
          left: cursorX,
          top: cursorY,
          x: '-50%',
          y: '-50%',
        }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: isHovering ? 6 : 4,
            height: isHovering ? 6 : 4,
            opacity: isHovering ? 0.8 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
