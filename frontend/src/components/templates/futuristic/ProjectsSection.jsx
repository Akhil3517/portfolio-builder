import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ExternalLink, Github } from 'lucide-react';

const ProjectsSection = ({ data }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="relative py-32 px-6" id="projects">
      <div 
        className="absolute inset-0 opacity-20"
        style={{ background: 'radial-gradient(ellipse at 70% 30%, hsl(217 91% 60% / 0.2) 0%, transparent 50%)' }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm tracking-widest uppercase mb-4 block">Work</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Selected Projects<span className="text-gradient">.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {data.projects.map((project, index) => (
            <motion.article
              key={project.id}
              className="group project-card-3d"
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
            >
              <div className="relative glass-card rounded-2xl overflow-hidden p-1">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary mb-6">
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, hsl(${217 + index * 30} 70% 50% / 0.3) 0%, hsl(${270 + index * 20} 60% 40% / 0.3) 100%)`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-foreground/10">{index + 1}</span>
                  </div>
                  
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full glass-card hover:scale-110 transition-transform"
                        data-magnetic="true"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full glass-card hover:scale-110 transition-transform"
                        data-magnetic="true"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs bg-secondary text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {data.projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No projects yet. Add some to showcase your work!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
