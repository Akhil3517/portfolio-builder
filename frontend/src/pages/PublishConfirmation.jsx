import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const templateLabel = (id) => {
  if (id === 'developer-studio') return 'Developer Studio';
  if (id === 'minimal') return 'Minimal';
  if (id === 'futuristic') return 'Futuristic';
  return id || 'Unknown Template';
};

const PublishConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [templateId, setTemplateId] = useState(null);
  const [portfolioData, setPortfolioData] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const state = location.state;
    if (state?.templateId && state?.portfolioData) {
      setTemplateId(state.templateId);
      setPortfolioData(state.portfolioData);
    } else {
      // If no data was passed, send user back to editor
      navigate('/', { replace: true });
    }
  }, [location.state, navigate]);

  if (!templateId || !portfolioData) {
    return null;
  }

  const handleCancel = () => {
    navigate('/', {
      state: { returnToEditor: true, template: templateId, data: portfolioData },
    });
  };

  const handleConfirm = async () => {
    setError('');

    if (!token) {
      setError('You must be logged in to publish.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/portfolio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          templateId,
          portfolioData,
          isPublished: true,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to publish portfolio');
      }

      const id =
        data.portfolio?.id ||
        data.portfolio?._id ||
        data.id ||
        data._id;

      if (id) {
        navigate(`/portfolio/${id}`);
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Failed to publish portfolio');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] p-6 space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
            Publish
          </p>
          <h1 className="text-2xl font-semibold">Confirm Publication</h1>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Template</p>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>{templateLabel(templateId)}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">User</p>
              <p className="text-sm font-medium">
                {user?.name || portfolioData.name || 'Unknown User'}
              </p>
            </div>
          </div>

          <div className="mt-2 rounded-xl border border-border bg-background/60 px-4 py-3">
            <p className="text-sm font-medium mb-1">
              Are you sure you want to publish this portfolio?
            </p>
            <p className="text-xs text-muted-foreground">
              This will save the current template and content. You can always update and republish later.
            </p>
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive-foreground">
            {error}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-full text-sm font-medium bg-secondary hover:bg-secondary/80 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-full text-sm font-medium text-white transition-all hover:scale-[1.02] disabled:opacity-60"
            style={{ background: 'var(--gradient-primary)' }}
          >
            {isSubmitting ? 'Publishing...' : 'Confirm Publish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishConfirmation;

