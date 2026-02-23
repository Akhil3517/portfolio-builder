import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FuturisticTemplate from '@/components/templates/futuristic';
import MinimalTemplate from '@/components/templates/minimal';
import DeveloperStudioTemplate from '@/components/templates/developer-studio';
import { defaultPortfolioData } from '@/data/defaultPortfolio';
import { ArrowLeft } from 'lucide-react';

const STORAGE_KEY = 'portfolio-preview-draft';

const PreviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollRef = useRef(null);

  const [template, setTemplate] = useState('futuristic');
  const [data, setData] = useState(defaultPortfolioData);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const state = location.state;
    if (state?.template && state?.data) {
      setTemplate(state.template);
      setData(state.data);
      setReady(true);
      return;
    }
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.template) setTemplate(parsed.template);
        if (parsed.data) setData(parsed.data);
      }
    } catch (_) {}
    setReady(true);
  }, [location.state]);

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

  if (!ready) return null;

  return (
    <div className="fixed inset-0 bg-background">
      <div
        ref={scrollRef}
        className="w-full h-full overflow-y-auto"
        style={{ position: 'relative' }}
      >
        {renderTemplate()}
      </div>

      <button
        onClick={() => navigate('/', { state: { returnToEditor: true, template, data } })}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-card/90 backdrop-blur border border-border hover:bg-card transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Editor
      </button>
    </div>
  );
};

export default PreviewPage;
