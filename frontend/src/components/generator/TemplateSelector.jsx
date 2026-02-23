import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const templates = [
  {
    id: 'futuristic',
    name: 'Futuristic',
    description: 'Dark, abstract 3D elements with reactive cursor and floating geometry.',
    tags: ['3D', 'WebGL', 'Dark'],
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, Apple-inspired design with subtle animations and elegant typography.',
    tags: ['Clean', 'Elegant', 'Light'],
  },
  {
    id: 'developer-studio',
    name: 'Developer Studio',
    description: 'Cinematic 3D developer at a desk with glowing laptop. Scroll zooms into content.',
    tags: ['3D', 'Cinematic', 'Dark'],
  },
];

const TemplateSelector = ({ selectedTemplate, onSelect }) => {
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Choose Template</h2>
          <p className="text-muted-foreground mt-1">Select a visual style for your portfolio</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <motion.button
            key={template.id}
            onClick={() => onSelect(template.id)}
            onMouseEnter={() => setHoveredTemplate(template.id)}
            onMouseLeave={() => setHoveredTemplate(null)}
            className={`relative text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
              selectedTemplate === template.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 bg-card'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-magnetic="true"
          >
            <div 
              className="aspect-video rounded-lg mb-4 overflow-hidden"
              style={{
                background: template.id === 'futuristic' 
                  ? 'linear-gradient(135deg, #0a0a0a 0%, #1e1b4b 50%, #0a0a0a 100%)'
                  : template.id === 'developer-studio'
                  ? 'linear-gradient(135deg, #0a0a0a 0%, #0d2137 40%, #1a0a2e 100%)'
                  : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <AnimatePresence>
                  {(hoveredTemplate === template.id || selectedTemplate === template.id) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`w-16 h-16 rounded-full ${
                        template.id === 'futuristic'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                          : 'bg-gradient-to-r from-gray-300 to-gray-400'
                      }`}
                      style={{ filter: 'blur(0.5px)' }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{template.description}</p>

            <div className="flex gap-2">
              {template.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            {selectedTemplate === template.id && (
              <motion.div
                className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500 }}
              >
                <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
