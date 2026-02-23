import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Github, Linkedin, Twitter, Mail, Globe } from 'lucide-react';

const ContactSection = ({ data }) => {
  const [ref, isVisible] = useScrollAnimation();

  const socialLinks = [
    { key: 'github', icon: Github, url: data.social.github },
    { key: 'linkedin', icon: Linkedin, url: data.social.linkedin },
    { key: 'twitter', icon: Twitter, url: data.social.twitter },
    { key: 'email', icon: Mail, url: data.social.email ? `mailto:${data.social.email}` : undefined },
    { key: 'website', icon: Globe, url: data.social.website },
  ].filter(link => link.url);

  return (
    <section className="relative py-32 px-6 min-h-screen flex items-center" id="contact">
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-40"
          style={{ 
            background: 'radial-gradient(ellipse at 50% 100%, hsl(217 91% 60% / 0.2) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, hsl(270 60% 55% / 0.15) 0%, transparent 40%)'
          }}
        />
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-20 animate-pulse-glow"
          style={{ background: 'var(--gradient-primary)' }}
        />
      </div>

      <div ref={ref} className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary text-sm tracking-widest uppercase mb-6 block">Contact</span>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-8">
            Let's build something{' '}
            <span className="text-gradient-accent">extraordinary</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Have a project in mind or just want to chat? I'd love to hear from you.
          </p>

          <motion.a
            href={data.social.email ? `mailto:${data.social.email}` : '#'}
            className="inline-block px-10 py-5 rounded-full text-lg font-medium tracking-wide transition-all duration-500"
            style={{ background: 'var(--gradient-primary)' }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 60px hsl(217 91% 60% / 0.5)',
            }}
            whileTap={{ scale: 0.98 }}
            data-magnetic="true"
          >
            <span className="text-white">Get in Touch</span>
          </motion.a>

          {socialLinks.length > 0 && (
            <motion.div
              className="mt-16 flex justify-center gap-6"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full glass-card text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  data-magnetic="true"
                >
                  <link.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>
          )}
        </motion.div>

        <motion.footer
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-muted-foreground/50"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p>© {new Date().getFullYear()} {data.name}. Built with passion.</p>
        </motion.footer>
      </div>
    </section>
  );
};

export default ContactSection;
