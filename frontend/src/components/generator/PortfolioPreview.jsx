import { useRef } from 'react';
import FuturisticTemplate from '@/components/templates/futuristic';
import MinimalTemplate from '@/components/templates/minimal';
import DeveloperStudioTemplate from '@/components/templates/developer-studio';
import CustomCursor from '@/components/CustomCursor';

const PortfolioPreview = ({ template, data }) => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  const renderTemplate = () => {
    switch (template) {
      case 'futuristic':
        return <FuturisticTemplate data={data} isPreview containerRef={scrollRef} />;
      case 'minimal':
        return <MinimalTemplate data={data} isPreview containerRef={scrollRef} />;
      case 'developer-studio':
        return <DeveloperStudioTemplate data={data} isPreview containerRef={scrollRef} />;
      default:
        return <FuturisticTemplate data={data} isPreview containerRef={scrollRef} />;
    }
  };

  const isDeveloperStudio = template === 'developer-studio';

  return (
    <div
      ref={containerRef}
      className="portfolio-preview-container w-full h-full rounded-2xl border border-border bg-background"
      style={{
        position: 'relative',
        isolation: 'isolate',
        cursor: isDeveloperStudio ? 'auto' : 'none',
        overflow: 'hidden',
      }}
    >
      <div
        ref={scrollRef}
        className="w-full h-full overflow-y-auto"
        style={{ position: 'relative' }}
      >
        {renderTemplate()}
      </div>

      {!isDeveloperStudio && <CustomCursor isActive={true} containerRef={containerRef} />}
    </div>
  );
};

export default PortfolioPreview;
