import { useRef } from 'react';
import { useLenis } from '@/hooks/useLenis';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';

const MinimalTemplate = ({ data, isPreview = false, containerRef }) => {
  const contentRef = useRef(null);
  
  useLenis(isPreview ? {} : { 
    duration: 1.4,
    wrapper: containerRef,
    content: contentRef,
  });

  return (
    <div ref={contentRef} className="relative min-h-screen bg-background text-foreground">
      <main>
        <HeroSection data={data} isPreview={isPreview} containerRef={containerRef} />
        {data.visibleSections?.about !== false && <AboutSection data={data} isPreview={isPreview} />}
        {data.visibleSections?.projects !== false && <ProjectsSection data={data} isPreview={isPreview} />}
        {data.visibleSections?.contact !== false && <ContactSection data={data} isPreview={isPreview} />}
      </main>
    </div>
  );
};

export default MinimalTemplate;
