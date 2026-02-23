import { useRef } from 'react';
import { useLenis } from '@/hooks/useLenis';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import SkillsSection from './SkillsSection';
import ContactSection from './ContactSection';

const FuturisticTemplate = ({ data, isPreview = false, containerRef }) => {
  const contentRef = useRef(null);
  
  useLenis(isPreview ? {} : { 
    duration: 1.2,
    wrapper: containerRef,
    content: contentRef,
  });

  return (
    <div ref={contentRef} className="relative min-h-screen bg-background text-foreground noise-overlay">
      {!isPreview && (
        <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
          {['hero', 'about', 'projects', 'skills', 'contact'].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className="w-3 h-3 rounded-full bg-muted-foreground/30 hover:bg-primary transition-colors"
              data-magnetic="true"
            />
          ))}
        </nav>
      )}

      <main>
        <div id="hero">
          <HeroSection data={data} isPreview={isPreview} containerRef={containerRef} />
        </div>
        {data.visibleSections?.about !== false && <AboutSection data={data} isPreview={isPreview} />}
        {data.visibleSections?.projects !== false && <ProjectsSection data={data} isPreview={isPreview} />}
        {data.visibleSections?.skills !== false && <SkillsSection data={data} isPreview={isPreview} />}
        {data.visibleSections?.contact !== false && <ContactSection data={data} isPreview={isPreview} />}
      </main>
    </div>
  );
};

export default FuturisticTemplate;
