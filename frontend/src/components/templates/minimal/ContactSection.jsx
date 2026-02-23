import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowUpRight } from 'lucide-react';

const MinimalContactSection = ({ data }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="relative py-40 px-6 min-h-[80vh] flex items-center" id="contact">
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <motion.div
            ref={ref}
            className="lg:col-span-3"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">Contact</span>
          </motion.div>

          <div className="lg:col-span-9">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Let's create something remarkable together.
            </motion.h2>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {data.social.email && (
                <a
                  href={`mailto:${data.social.email}`}
                  className="group flex items-center justify-between py-4 border-t border-border hover:bg-secondary/30 transition-colors px-4 -mx-4"
                  data-magnetic="true"
                >
                  <span className="text-lg">Email</span>
                  <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                    <span>{data.social.email}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>
              )}

              {data.social.linkedin && (
                <a
                  href={data.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-4 border-t border-border hover:bg-secondary/30 transition-colors px-4 -mx-4"
                  data-magnetic="true"
                >
                  <span className="text-lg">LinkedIn</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              )}

              {data.social.github && (
                <a
                  href={data.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-4 border-t border-b border-border hover:bg-secondary/30 transition-colors px-4 -mx-4"
                  data-magnetic="true"
                >
                  <span className="text-lg">GitHub</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
            </motion.div>
          </div>
        </div>

        <motion.footer
          className="mt-32 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <span>© {new Date().getFullYear()} {data.name}</span>
          <span>Made with precision</span>
        </motion.footer>
      </div>
    </section>
  );
};

export default MinimalContactSection;
