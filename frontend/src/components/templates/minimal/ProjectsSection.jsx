import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowUpRight } from 'lucide-react';

const MinimalProjectsSection = ({ data }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="relative py-40 px-6" id="projects">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          className="flex items-baseline justify-between mb-20"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">Selected Work</span>
          <span className="text-sm text-muted-foreground">{data.projects.length} Projects</span>
        </motion.div>

        <div className="space-y-1">
          {data.projects.map((project, index) => (
            <motion.article
              key={project.id}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <a
                href={project.liveUrl || project.githubUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-8 border-t border-border group-last:border-b hover:bg-secondary/30 transition-colors px-4 -mx-4"
                data-magnetic="true"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-light tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 max-w-lg">{project.description}</p>
                    <div className="flex gap-2 mt-4">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </a>
            </motion.article>
          ))}
        </div>

        {data.projects.length === 0 && (
          <p className="text-center text-muted-foreground py-20">No projects yet.</p>
        )}
      </div>
    </section>
  );
};

export default MinimalProjectsSection;
