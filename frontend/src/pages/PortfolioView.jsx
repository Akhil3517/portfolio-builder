import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import FuturisticTemplate from '@/components/templates/futuristic';
import MinimalTemplate from '@/components/templates/minimal';
import DeveloperStudioTemplate from '@/components/templates/developer-studio';
import CustomCursor from '@/components/CustomCursor';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const PortfolioView = () => {
  const { id } = useParams();
  const containerRef = useRef(null); // for custom cursor / overall page
  const scrollRef = useRef(null); // scroll container for developer-studio
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPortfolio = async () => {
      setError('');
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/portfolio/${id}`);
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || 'Portfolio not found');
        }
        setPortfolio(data.portfolio);
      } catch (err) {
        setError(err.message || 'Portfolio not found');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPortfolio();
    }
  }, [id]);

  const renderTemplate = () => {
    if (!portfolio) return null;
    const { templateId, data } = portfolio;

    switch (templateId) {
      case 'futuristic':
        return <FuturisticTemplate data={data} isPreview />;
      case 'minimal':
        return <MinimalTemplate data={data} isPreview />;
      case 'developer-studio':
        return <DeveloperStudioTemplate data={data} isPreview containerRef={scrollRef} />;
      default:
        return <FuturisticTemplate data={data} isPreview />;
    }
  };

  const isDeveloperStudio = portfolio?.templateId === 'developer-studio';

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background text-foreground flex flex-col"
      style={{ position: 'relative', cursor: isDeveloperStudio ? 'auto' : 'none' }}
    >
      <div className="px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          ← Back to editor
        </Link>
        <span className="text-xs text-muted-foreground">
          Public portfolio view
        </span>
      </div>

      <div className="flex-1">
        {loading && (
          <div className="w-full flex items-center justify-center py-10">
            <p className="text-sm text-muted-foreground">Loading portfolio...</p>
          </div>
        )}

        {!loading && error && (
          <div className="w-full flex items-center justify-center py-10">
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        )}

        {!loading && !error && portfolio && (
          <>
            {isDeveloperStudio ? (
              <div
                ref={scrollRef}
                className="w-full h-full overflow-y-auto"
                style={{ position: 'relative' }}
              >
                {renderTemplate()}
              </div>
            ) : (
              <div className="w-full">
                {renderTemplate()}
              </div>
            )}
          </>
        )}
      </div>
      {!isDeveloperStudio && (
        <CustomCursor isActive={true} containerRef={containerRef} />
      )}
    </div>
  );
};

export default PortfolioView;

