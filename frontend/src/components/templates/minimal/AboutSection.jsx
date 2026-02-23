import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const MinimalAboutSection = ({ data }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="relative py-40 px-6" id="about">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <motion.div
            ref={ref}
            className="lg:col-span-3"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">About</span>
          </motion.div>

          <motion.div
            className="lg:col-span-9"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="text-3xl md:text-4xl font-light leading-relaxed tracking-tight">
              {data.bio || 'I craft digital experiences with a focus on simplicity and elegance. Every pixel matters.'}
            </p>

            {data.experience.length > 0 && (
              <div className="mt-20 space-y-8">
                {data.experience.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    className="flex flex-col md:flex-row md:items-baseline gap-4 pb-8 border-b border-border"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  >
                    <span className="text-sm text-muted-foreground w-32 shrink-0">{exp.period}</span>
                    <div>
                      <h3 className="font-medium">{exp.title}</h3>
                      <p className="text-muted-foreground">{exp.company}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MinimalAboutSection;
