import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Upload, Eye, EyeOff } from 'lucide-react';

const PortfolioEditor = ({ data, onChange }) => {
  const [activeTab, setActiveTab] = useState('basic');

  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: 'New Project',
      description: 'Project description',
      techStack: [],
    };
    updateField('projects', [...data.projects, newProject]);
  };

  const updateProject = (id, updates) => {
    updateField(
      'projects',
      data.projects.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const removeProject = (id) => {
    updateField('projects', data.projects.filter((p) => p.id !== id));
  };

  const addSkill = (category) => {
    const newSkill = {
      name: 'New Skill',
      category,
    };
    updateField('skills', [...data.skills, newSkill]);
  };

  const removeSkill = (index) => {
    updateField('skills', data.skills.filter((_, i) => i !== index));
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      title: 'Job Title',
      company: 'Company',
      period: '2024 - Present',
      description: 'Job description',
    };
    updateField('experience', [...data.experience, newExp]);
  };

  const updateExperience = (id, updates) => {
    updateField(
      'experience',
      data.experience.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
  };

  const removeExperience = (id) => {
    updateField('experience', data.experience.filter((e) => e.id !== id));
  };

  const toggleSection = (section) => {
    updateField('visibleSections', {
      ...data.visibleSections,
      [section]: !data.visibleSections[section],
    });
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'sections', label: 'Sections' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 transition-colors">
        <label className="flex flex-col items-center justify-center cursor-pointer">
          <Upload className="w-10 h-10 text-muted-foreground mb-3" />
          <span className="text-sm font-medium mb-1">Upload Resume</span>
          <span className="text-xs text-muted-foreground">PDF, DOC (Auto-fill coming soon)</span>
          <input type="file" className="hidden" accept=".pdf,.doc,.docx" disabled />
        </label>
      </div>

      <div className="flex gap-2 p-1 rounded-lg bg-secondary">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'basic' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Role / Title</label>
            <input
              type="text"
              value={data.role}
              onChange={(e) => updateField('role', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tagline</label>
            <input
              type="text"
              value={data.tagline || ''}
              onChange={(e) => updateField('tagline', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
              placeholder="A short tagline about yourself"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              value={data.bio}
              onChange={(e) => updateField('bio', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none transition-colors resize-none"
              placeholder="Tell your story..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={data.social.email || ''}
                onChange={(e) => updateField('social', { ...data.social, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">GitHub</label>
              <input
                type="url"
                value={data.social.github || ''}
                onChange={(e) => updateField('social', { ...data.social, github: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">LinkedIn</label>
              <input
                type="url"
                value={data.social.linkedin || ''}
                onChange={(e) => updateField('social', { ...data.social, linkedin: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Twitter</label>
              <input
                type="url"
                value={data.social.twitter || ''}
                onChange={(e) => updateField('social', { ...data.social, twitter: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'projects' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {data.projects.map((project) => (
            <div key={project.id} className="p-4 rounded-xl bg-secondary/50 border border-border space-y-3">
              <div className="flex justify-between items-start">
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => updateProject(project.id, { title: e.target.value })}
                  className="text-lg font-semibold bg-transparent border-none focus:outline-none"
                />
                <button
                  onClick={() => removeProject(project.id)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, { description: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors resize-none text-sm"
              />
              <input
                type="text"
                value={project.techStack.join(', ')}
                onChange={(e) => updateProject(project.id, { techStack: e.target.value.split(',').map((s) => s.trim()) })}
                placeholder="Tech stack (comma separated)"
                className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors text-sm"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="url"
                  value={project.liveUrl || ''}
                  onChange={(e) => updateProject(project.id, { liveUrl: e.target.value })}
                  placeholder="Live URL"
                  className="px-3 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors text-sm"
                />
                <input
                  type="url"
                  value={project.githubUrl || ''}
                  onChange={(e) => updateProject(project.id, { githubUrl: e.target.value })}
                  placeholder="GitHub URL"
                  className="px-3 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors text-sm"
                />
              </div>
            </div>
          ))}

          <button
            onClick={addProject}
            className="w-full py-3 rounded-xl border-2 border-dashed border-border hover:border-primary text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Project
          </button>
        </motion.div>
      )}

      {activeTab === 'skills' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {['frontend', 'backend', 'ai', 'tools'].map((category) => (
            <div key={category}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium capitalize">{category === 'ai' ? 'AI & ML' : category}</h3>
                <button
                  onClick={() => addSkill(category)}
                  className="text-xs text-primary hover:underline"
                >
                  + Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.skills
                  .filter((s) => s.category === category)
                  .map((skill, idx) => {
                    const globalIdx = data.skills.findIndex(
                      (s) => s.name === skill.name && s.category === skill.category
                    );
                    return (
                      <div
                        key={`${skill.name}-${idx}`}
                        className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-sm"
                      >
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => {
                            const newSkills = [...data.skills];
                            newSkills[globalIdx] = { ...skill, name: e.target.value };
                            updateField('skills', newSkills);
                          }}
                          className="bg-transparent border-none focus:outline-none w-auto min-w-[60px]"
                          style={{ width: `${skill.name.length + 1}ch` }}
                        />
                        <button
                          onClick={() => removeSkill(globalIdx)}
                          className="opacity-0 group-hover:opacity-100 text-destructive transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {activeTab === 'experience' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {data.experience.map((exp) => (
            <div key={exp.id} className="p-4 rounded-xl bg-secondary/50 border border-border space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => updateExperience(exp.id, { title: e.target.value })}
                    className="w-full font-semibold bg-transparent border-none focus:outline-none"
                    placeholder="Job Title"
                  />
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                    className="w-full text-sm text-primary bg-transparent border-none focus:outline-none"
                    placeholder="Company"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={exp.period}
                    onChange={(e) => updateExperience(exp.id, { period: e.target.value })}
                    className="text-sm text-muted-foreground bg-transparent border-none focus:outline-none text-right w-32"
                    placeholder="2024 - Present"
                  />
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors resize-none text-sm"
                placeholder="Description..."
              />
            </div>
          ))}

          <button
            onClick={addExperience}
            className="w-full py-3 rounded-xl border-2 border-dashed border-border hover:border-primary text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Experience
          </button>
        </motion.div>
      )}

      {activeTab === 'sections' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Choose which sections to display in your portfolio.
          </p>
          {[
            { key: 'about', label: 'About', description: 'Your bio and personal info' },
            { key: 'projects', label: 'Projects', description: 'Showcase your work' },
            { key: 'skills', label: 'Skills', description: 'Technical skills and tools' },
            { key: 'experience', label: 'Experience', description: 'Work history and roles' },
            { key: 'contact', label: 'Contact', description: 'Contact form and social links' },
          ].map((section) => (
            <button
              key={section.key}
              onClick={() => toggleSection(section.key)}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-colors ${
                data.visibleSections[section.key]
                  ? 'border-primary/50 bg-primary/5'
                  : 'border-border bg-secondary/30'
              }`}
            >
              <div className="text-left">
                <span className="font-medium text-sm">{section.label}</span>
                <p className="text-xs text-muted-foreground mt-0.5">{section.description}</p>
              </div>
              {data.visibleSections[section.key] ? (
                <Eye className="w-5 h-5 text-primary" />
              ) : (
                <EyeOff className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default PortfolioEditor;
