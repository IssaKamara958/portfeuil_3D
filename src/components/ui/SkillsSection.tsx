import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'creative';
  description: string;
}

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

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase.from('skills').select('*');
      if (error) {
        console.error('Error fetching skills:', JSON.stringify(error, null, 2));
      } else {
        setSkills(data as Skill[]);
      }
    };

    fetchSkills();
  }, []);

  const filteredSkills = selectedCategory
    ? skills.filter(skill => skill.category === selectedCategory)
    : skills;

  return (
    <motion.section 
      className="max-w-6xl mx-auto p-6 mt-12"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-foreground mb-4">Compétences & Expertise</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Une combinaison unique de compétences techniques et créatives,
          forgée par 10 ans d'art et 6 ans d'entrepreneuriat dans le café.
        </p>
      </div>

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

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={gridVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredSkills.map((skill) => (
          <motion.div
            key={skill.name}
            variants={skillVariants}
            whileHover={{ scale: 1.05, rotate: 1, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="glass-panel p-6 rounded-2xl cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-3 h-3 rounded-full ${categoryColors[skill.category]}`}></div>
              <h4 className="font-semibold text-foreground">{skill.name}</h4>
              <span className="text-xs text-muted-foreground ml-auto">
                {categoryLabels[skill.category]}
              </span>
            </div>

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
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                ></motion.div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              {skill.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
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
    </motion.section>
  );
}