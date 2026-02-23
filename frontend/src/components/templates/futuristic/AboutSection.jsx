import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const AboutSection = ({ data }) => {
  const [ref, isVisible] = useScrollAnimation();
  const [expRef, expVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="relative py-32 px-6 overflow-hidden" id="about">
      <div 
        className="absolute inset-0 opacity-30"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, hsl(270 60% 55% / 0.15) 0%, transparent 50%)' }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm tracking-widest uppercase mb-4 block">About</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            The Story<span className="text-gradient">.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              {data.bio || 'A passionate developer crafting digital experiences that push the boundaries of what\'s possible on the web.'}
            </p>
          </motion.div>

          <div ref={expRef} className="space-y-8">
            {data.experience.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-6 text-muted-foreground tracking-wide uppercase">Experience</h3>
                <div className="space-y-6">
                  {data.experience.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      className="glass-card p-6 rounded-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={expVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-foreground">{exp.title}</h4>
                          <p className="text-primary">{exp.company}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{exp.period}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">{exp.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {data.education.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-6 text-muted-foreground tracking-wide uppercase">Education</h3>
                <div className="space-y-4">
                  {data.education.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      className="flex justify-between items-center p-4 rounded-lg border border-border/50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={expVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.2 + 0.1 * index, duration: 0.5 }}
                    >
                      <div>
                        <h4 className="font-medium text-foreground">{edu.degree}</h4>
                        <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      </div>
                      <span className="text-sm text-primary">{edu.year}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
