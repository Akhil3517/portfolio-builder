import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const templateLabel = (id) => {
  if (id === 'developer-studio') return 'Developer Studio';
  if (id === 'minimal') return 'Minimal';
  if (id === 'futuristic') return 'Futuristic';
  return id || 'Unknown Template';
};

const Dashboard = () => {
  const { token, user, isInitializing } = useAuth();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPortfolios = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      setError('');
      try {
        const res = await fetch(`${API_BASE_URL}/api/portfolio/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || 'Failed to load portfolios');
        }
        setPortfolios(data.portfolios || []);
      } catch (err) {
        setError(err.message || 'Failed to load portfolios');
      } finally {
        setLoading(false);
      }
    };

    if (!isInitializing) {
      fetchPortfolios();
    }
  }, [token, isInitializing]);

  const handleDelete = async (id) => {
    if (!token) return;
    const confirmDelete = window.confirm('Are you sure you want to delete this portfolio?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/portfolio/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete portfolio');
      }
      setPortfolios((prev) => prev.filter((p) => (p.id || p._id) !== id));
    } catch (err) {
      alert(err.message || 'Failed to delete portfolio');
    }
  };

  if (!token && !isInitializing) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <Link
            to="/"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            ← Back to editor
          </Link>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
            Dashboard
          </p>
          <h1 className="text-2xl font-semibold">
            {user?.name ? `${user.name}'s Portfolios` : 'Your Portfolios'}
          </h1>
        </div>

        {loading && (
          <p className="text-sm text-muted-foreground">Loading portfolios...</p>
        )}

        {error && !loading && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive-foreground">
            {error}
          </div>
        )}

        {!loading && !error && portfolios.length === 0 && (
          <p className="text-sm text-muted-foreground">
            You haven&apos;t published any portfolios yet.
          </p>
        )}

        {!loading && portfolios.length > 0 && (
          <div className="space-y-3">
            {portfolios.map((p) => {
              const id = p.id || p._id;
              const createdAt = p.createdAt ? new Date(p.createdAt) : null;
              const link = id ? `/portfolio/${id}` : '#';

              return (
                <div
                  key={id}
                  className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span>{templateLabel(p.templateId)}</span>
                      </span>
                      {p.isPublished && (
                        <span className="text-[10px] uppercase tracking-wide text-green-400/80">
                          Published
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Created{' '}
                      {createdAt
                        ? createdAt.toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : 'Unknown date'}
                    </p>
                    {id && (
                      <p className="text-xs text-muted-foreground">
                        Public link:{' '}
                        <Link
                          to={link}
                          className="text-[hsl(var(--primary))] hover:underline"
                        >
                          {link}
                        </Link>
                      </p>
                    )}
                  </div>
                  {id && (
                    <div className="ml-4 flex items-center gap-2">
                      <Link
                        to={link}
                        className="inline-flex items-center justify-center rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-secondary transition-colors"
                      >
                        View
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(id)}
                        className="inline-flex items-center justify-center rounded-full border border-border bg-background px-3 py-1.5 text-[10px] font-medium text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

