import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const categoryColors = {
  frontend: 'from-blue-500 to-cyan-500',
  backend: 'from-purple-500 to-pink-500',
  ai: 'from-amber-500 to-orange-500',
  tools: 'from-green-500 to-teal-500',
};

const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  ai: 'AI & ML',
  tools: 'Tools',
};

const SkillsSection = ({ data }) => {
  const [ref, isVisible] = useScrollAnimation();

  const groupedSkills = data.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section className="relative py-32 px-6" id="skills">
      <div 
        className="absolute inset-0 opacity-20"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, hsl(180 100% 50% / 0.1) 0%, transparent 50%)' }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm tracking-widest uppercase mb-4 block">Expertise</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Skills & Tools<span className="text-gradient">.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {Object.entries(groupedSkills).map(([category, skills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * categoryIndex, duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${categoryColors[category]}`} />
                <h3 className="text-lg font-semibold tracking-wide">{categoryLabels[category]}</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="skill-bubble"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.1 * categoryIndex + 0.05 * skillIndex, duration: 0.4 }}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: '0 0 30px hsl(217 91% 60% / 0.3)',
                    }}
                    data-magnetic="true"
                  >
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {data.skills.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Add your skills to showcase your expertise!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
