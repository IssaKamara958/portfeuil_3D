import { motion } from 'framer-motion';

interface Project {
  id: number;
  tag: string;
  title: string;
  summary: string;
  link: string;
}

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-panel p-4 rounded-2xl"
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-xl hero-gradient flex items-center justify-center text-white font-bold text-sm">
          {project.tag}
        </div>
        <div className="flex-1">
          <h3 className="text-foreground font-semibold">{project.title}</h3>
          <p className="text-muted-foreground text-sm mt-1">{project.summary}</p>
          <div className="mt-3 flex gap-2">
            <button 
              onClick={() => onOpen(project)} 
              className="glass-button text-sm px-3 py-1 rounded-lg text-foreground"
            >
              Détails
            </button>
            <a 
              href={project.link} 
              target="_blank" 
              rel="noreferrer" 
              className="text-sm px-3 py-1 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
            >
              Voir le projet
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}