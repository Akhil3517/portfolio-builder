import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import TemplateSelector from '@/components/generator/TemplateSelector';
import PortfolioEditor from '@/components/generator/PortfolioEditor';
import PortfolioPreview from '@/components/generator/PortfolioPreview';
import { defaultPortfolioData } from '@/data/defaultPortfolio';
import { Eye, Pencil, Sparkles, ExternalLink, Maximize2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const STORAGE_KEY = 'portfolio-preview-draft';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [step, setStep] = useState('template');
  const [selectedTemplate, setSelectedTemplate] = useState('futuristic');
  const [portfolioData, setPortfolioData] = useState(defaultPortfolioData);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const state = location.state;
    if (state?.returnToEditor) {
      setStep('edit');
      if (state.template) setSelectedTemplate(state.template);
      if (state.data) setPortfolioData(state.data);
    }
  }, [location.state]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleNextStep = () => {
    if (step === 'template') setStep('edit');
    else if (step === 'edit') setStep('preview');
  };

  const handlePrevStep = () => {
    if (step === 'edit') setStep('template');
    else if (step === 'preview') setStep('edit');
  };

  const handlePublishClick = () => {
    navigate('/publish-confirmation', {
      state: {
        templateId: selectedTemplate,
        portfolioData,
      },
    });
  };

  const handleFullPreview = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        template: selectedTemplate,
        data: portfolioData,
      }));
    } catch (_) {}
    navigate('/preview', { state: { template: selectedTemplate, data: portfolioData } });
  };

  const stepLabels = {
    template: 'Choose Template',
    edit: 'Customize',
    preview: 'Preview & Publish',
  };

  return (
    <div className="min-h-screen bg-background text-foreground noise-overlay overflow-auto">
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">PortfolioAI</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['template', 'edit', 'preview'].map((s, i) => (
              <button
                key={s}
                onClick={() => setStep(s)}
                className={`flex items-center gap-2 transition-colors ${
                  step === s ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
                data-magnetic="true"
              >
                <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center ${
                  step === s ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                }`}>
                  {i + 1}
                </span>
                <span className="text-sm font-medium">{stepLabels[s]}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Login / Register
              </Link>
            )}

            {step === 'preview' && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all"
                style={{ background: 'var(--gradient-primary)' }}
                whileHover={{ scale: 1.05 }}
                data-magnetic="true"
                onClick={handlePublishClick}
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-white">Publish</span>
              </motion.button>
            )}
          </div>
        </div>
      </header>

      <main className="pt-24 min-h-screen">
        <AnimatePresence mode="wait">
          {step === 'template' && (
            <motion.div
              key="template"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto px-6 py-12"
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  Create Your <span className="text-gradient">Cinematic</span> Portfolio
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Transform your work into an immersive experience. Choose a template, customize it, and publish in minutes.
                </p>
              </div>

              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onSelect={handleTemplateSelect}
              />

              <div className="mt-12 text-center">
                <button
                  onClick={handleNextStep}
                  className="px-8 py-4 rounded-full text-lg font-medium transition-all glow-primary hover:scale-105"
                  style={{ background: 'var(--gradient-primary)' }}
                  data-magnetic="true"
                >
                  <span className="text-white">Continue to Editor</span>
                </button>
              </div>
            </motion.div>
          )}

          {(step === 'edit' || step === 'preview') && (
            <motion.div
              key="editor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[calc(100vh-6rem)]"
            >
              <div className={`h-full ${isMobile ? '' : 'grid grid-cols-12 gap-0'}`}>
                {(!isMobile || !showMobilePreview) && (
                  <div className={`${isMobile ? 'h-full' : 'col-span-5 xl:col-span-4'} border-r border-border bg-card overflow-hidden flex flex-col`}>
                    <div className="p-6 border-b border-border flex items-center justify-between">
                      <h2 className="font-semibold">Editor</h2>
                      {isMobile && (
                        <button
                          onClick={() => setShowMobilePreview(true)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          Preview
                        </button>
                      )}
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 pb-24">
                      <PortfolioEditor data={portfolioData} onChange={setPortfolioData} />
                    </div>
                  </div>
                )}

                {(!isMobile || showMobilePreview) && (
                  <div className={`${isMobile ? 'h-full' : 'col-span-7 xl:col-span-8'} bg-muted/30 overflow-hidden flex flex-col`}>
                    <div className="p-4 border-b border-border flex items-center justify-between bg-card">
                      <div className="flex items-center gap-4">
                        {isMobile && (
                          <button
                            onClick={() => setShowMobilePreview(false)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm"
                          >
                            <Pencil className="w-4 h-4" />
                            Edit
                          </button>
                        )}
                        <span className="text-sm text-muted-foreground">Live Preview</span>
                        <button
                          onClick={handleFullPreview}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          Full Preview
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        {['futuristic', 'minimal', 'developer-studio'].map((t) => (
                          <button
                            key={t}
                            onClick={() => setSelectedTemplate(t)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                              selectedTemplate === t
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                            }`}
                          >
                            {t === 'developer-studio' ? 'Studio' : t.charAt(0).toUpperCase() + t.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 p-4 overflow-hidden">
                      <PortfolioPreview template={selectedTemplate} data={portfolioData} />
                    </div>
                  </div>
                )}
              </div>

              <div className="fixed bottom-0 left-0 right-0 p-4 bg-card/80 backdrop-blur-lg border-t border-border">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                  <button
                    onClick={handlePrevStep}
                    className="px-6 py-2.5 rounded-full text-sm font-medium bg-secondary hover:bg-secondary/80 transition-colors"
                    data-magnetic="true"
                  >
                    Back
                  </button>
                  <div className="flex gap-3">
                    {step === 'edit' && (
                      <button
                        onClick={handleNextStep}
                        className="px-6 py-2.5 rounded-full text-sm font-medium text-white transition-all hover:scale-105"
                        style={{ background: 'var(--gradient-primary)' }}
                        data-magnetic="true"
                      >
                        Preview & Publish
                      </button>
                    )}
                    {step === 'preview' && (
                      <button
                        onClick={handlePublishClick}
                        className="px-8 py-2.5 rounded-full text-sm font-medium text-white transition-all hover:scale-105 glow-primary"
                        style={{ background: 'var(--gradient-primary)' }}
                        data-magnetic="true"
                      >
                        Publish Portfolio
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
