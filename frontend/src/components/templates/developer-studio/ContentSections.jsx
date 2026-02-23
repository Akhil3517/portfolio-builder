import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Github, Linkedin, Twitter } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

export function AboutTerminal({ data }) {
  const lines = [
    { prefix: '~$', text: `whoami`, color: 'text-[hsl(var(--primary))]' },
    { prefix: '>', text: data.name, color: 'text-foreground' },
    { prefix: '~$', text: `cat bio.txt`, color: 'text-[hsl(var(--primary))]' },
    { prefix: '>', text: data.bio, color: 'text-muted-foreground' },
  ];

  return (
    <section id="about" className="py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="rounded-xl border border-[hsl(var(--border))] overflow-hidden"
          style={{ background: 'hsl(0 0% 5%)' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[hsl(var(--border))]">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-muted-foreground font-mono">about.sh</span>
          </div>
          <div className="p-6 font-mono text-sm space-y-4">
            {lines.map((line, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} className="flex gap-2">
                <span className="text-[hsl(var(--accent))] shrink-0">{line.prefix}</span>
                <span className={line.color}>{line.text}</span>
              </motion.div>
            ))}

            {data.experience && data.experience.length > 0 && (
              <div className="pt-4 space-y-2">
                <div className="flex gap-2">
                  <span className="text-[hsl(var(--accent))] shrink-0">~$</span>
                  <span className="text-[hsl(var(--primary))]">cat experience.log</span>
                </div>
                <div className="space-y-2">
                  {data.experience.map((exp, index) => (
                    <motion.div
                      key={exp.id || index}
                      custom={index}
                      variants={fadeUp}
                      className="pl-4 border-l border-[hsl(var(--border))] space-y-0.5"
                    >
                      <p className="text-foreground">
                        {exp.title} <span className="text-muted-foreground">@ {exp.company}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{exp.period}</p>
                      {exp.description && (
                        <p className="text-xs text-muted-foreground">{exp.description}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function ProjectCards({ data }) {
  return (
    <section id="projects" className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-xs font-mono tracking-[0.3em] uppercase text-muted-foreground mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          // Projects
        </motion.h2>

        <div className="grid gap-4">
          {data.projects.map((project, i) => (
            <motion.div
              key={project.id}
              className="rounded-xl border border-[hsl(var(--border))] overflow-hidden group"
              style={{ background: 'hsl(0 0% 5%)' }}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
              variants={fadeUp}
            >
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[hsl(var(--border))]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-2 text-xs font-mono text-muted-foreground">
                    {project.title.toLowerCase().replace(/\s+/g, '-')}.tsx
                  </span>
                </div>
                {(project.liveUrl || project.githubUrl) && (
                  <a
                    href={project.liveUrl || project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ pointerEvents: 'auto' }}
                  >
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </a>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2 py-1 rounded-md border border-[hsl(var(--border))] text-[hsl(var(--primary))]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {data.projects.length === 0 && (
          <p className="text-center text-muted-foreground font-mono text-sm py-12">// No projects yet</p>
        )}
      </div>
    </section>
  );
}

export function SkillBadges({ data }) {
  const categories = ['frontend', 'backend', 'ai', 'tools'];
  const categoryLabels = {
    frontend: 'Frontend',
    backend: 'Backend',
    ai: 'AI & ML',
    tools: 'DevOps & Tools',
  };

  return (
    <section id="skills" className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-xs font-mono tracking-[0.3em] uppercase text-muted-foreground mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          // Skills
        </motion.h2>

        <div className="space-y-8">
          {categories.map((cat) => {
            const skills = data.skills.filter((s) => s.category === cat);
            if (skills.length === 0) return null;
            return (
              <motion.div
                key={cat}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-sm font-mono text-muted-foreground mb-3">
                  {categoryLabels[cat]}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <motion.span
                      key={skill.name}
                      custom={i}
                      variants={fadeUp}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] hover:shadow-[0_0_12px_hsl(217_91%_60%/0.2)] transition-all duration-300"
                      style={{ background: 'hsl(0 0% 6%)' }}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ContactMinimal({ data }) {
  const socials = [
    { key: 'email', icon: Mail, href: data.social.email ? `mailto:${data.social.email}` : undefined, label: data.social.email },
    { key: 'github', icon: Github, href: data.social.github, label: 'GitHub' },
    { key: 'linkedin', icon: Linkedin, href: data.social.linkedin, label: 'LinkedIn' },
    { key: 'twitter', icon: Twitter, href: data.social.twitter, label: 'Twitter' },
  ].filter((s) => s.href);

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-lg mx-auto text-center">
        <motion.h2
          className="text-xs font-mono tracking-[0.3em] uppercase text-muted-foreground mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          // Contact
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-sm mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Interested in working together? Let's connect.
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-4 flex-wrap"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {socials.map((social, i) => (
            <motion.a
              key={social.key}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[hsl(var(--border))] text-sm text-muted-foreground hover:text-foreground hover:border-[hsl(var(--primary))] transition-all duration-300"
              style={{ pointerEvents: 'auto', background: 'hsl(0 0% 5%)' }}
              custom={i}
              variants={fadeUp}
            >
              <social.icon className="w-4 h-4" />
              {social.label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
