import { motion } from 'framer-motion';
import { useState } from 'react';

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'creative';
  description: string;
}

const skills: Skill[] = [
  { name: 'React', level: 90, category: 'frontend', description: 'Développement d\'applications web modernes avec hooks, context et état global' },
  { name: 'JavaScript', level: 85, category: 'frontend', description: 'ES6+, DOM manipulation, APIs, programmation asynchrone' },
  { name: 'HTML5', level: 95, category: 'frontend', description: 'Structure sémantique, accessibilité, SEO' },
  { name: 'CSS3', level: 90, category: 'frontend', description: 'Flexbox, Grid, animations, responsive design' },
  { name: 'Tailwind CSS', level: 85, category: 'frontend', description: 'Utility-first CSS framework, design systems' },
  { name: 'Bootstrap', level: 80, category: 'frontend', description: 'Framework CSS responsive, composants UI prêts à l\'emploi' },
  { name: 'Python', level: 75, category: 'backend', description: 'Flask, traitement d\'images, automatisation, applications desktop' },
  { name: 'PHP', level: 60, category: 'backend', description: 'Développement backend, APIs REST' },
  { name: 'MySQL', level: 55, category: 'backend', description: 'Base de données relationnelles, requêtes SQL' },
  { name: 'OpenCV', level: 70, category: 'tools', description: 'Traitement d\'images, détection QR codes, vision par ordinateur' },
  { name: 'GitHub', level: 80, category: 'tools', description: 'Contrôle de version, collaboration, CI/CD' },
  { name: 'Inno Setup', level: 65, category: 'tools', description: 'Création d\'installateurs Windows, déploiement d\'applications' },
  { name: 'Design Graphique', level: 95, category: 'creative', description: 'Logo design, identité visuelle, UI/UX' },
  { name: 'Peinture', level: 90, category: 'creative', description: '10+ ans d\'expérience artistique, créativité appliquée' },
];

const categoryColors = {
  frontend: 'bg-emerald-500',
  backend: 'bg-amber-600',
  tools: 'bg-blue-500',
  creative: 'bg-purple-500',
};

const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Outils',
  creative: 'Créativité',
};

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = selectedCategory 
    ? skills.filter(skill => skill.category === selectedCategory)
    : skills;

  return (
    <section className="max-w-6xl mx-auto p-6 mt-12">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-foreground mb-4">Compétences & Expertise</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Une combinaison unique de compétences techniques et créatives, 
          forgée par 10 ans d'art et 6 ans d'entrepreneuriat dans le café.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === null
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          Toutes
        </button>
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === key
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onHoverStart={() => setHoveredSkill(skill.name)}
            onHoverEnd={() => setHoveredSkill(null)}
            className="glass-panel p-6 rounded-2xl hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-3 h-3 rounded-full ${categoryColors[skill.category]}`}></div>
              <h4 className="font-semibold text-foreground">{skill.name}</h4>
              <span className="text-xs text-muted-foreground ml-auto">
                {categoryLabels[skill.category]}
              </span>
            </div>
            
            {/* Skill level bar */}
            <div className="mb-3">
              <div className="flex justify-between text-sm text-muted-foreground mb-1">
                <span>Niveau</span>
                <span>{skill.level}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <motion.div
                  className="bg-primary h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                ></motion.div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {skill.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Special highlight for creative skills */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 glass-panel p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10"
      >
        <div className="text-center">
          <h4 className="text-xl font-bold text-foreground mb-4">
            🎨 L'Art au Service du Code
          </h4>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Mon background artistique (10 ans de peinture) et entrepreneurial (6 ans dans le café) 
            apporte une perspective unique à mes projets web. Cette expérience me permet de créer 
            des interfaces non seulement fonctionnelles, mais aussi esthétiquement remarquables 
            et émotionnellement engageantes.
          </p>
        </div>
      </motion.div>
    </section>
  );
}