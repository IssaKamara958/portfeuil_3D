import { motion } from 'framer-motion';

interface Project {
  title: string;
  summary: string;
  link?: string;
}

interface ModalProps {
  open: boolean;
  project: Project | null;
  onClose: () => void;
}

export default function Modal({ open, project, onClose }: ModalProps) {
  if (!open || !project) return null;
  
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div 
        initial={{ y: 50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        className="relative z-50 w-[90%] max-w-3xl glass-panel p-6 rounded-2xl"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 glass-button px-3 py-1 rounded"
        >
          Fermer
        </button>
        <h2 className="text-foreground text-2xl font-semibold">{project.title}</h2>
        <p className="text-muted-foreground mt-3">{project.summary}</p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-44 glass-panel rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground">Aperçu du projet</span>
          </div>
          <div className="p-3 glass-panel rounded-lg">
            <h3 className="text-foreground font-medium">Technologies utilisées</h3>
            <ul className="text-sm text-muted-foreground mt-2 list-disc ml-5">
              <li>React + Vite</li>
              <li>TailwindCSS</li>
              <li>Design responsive</li>
              <li>Optimisations performance</li>
            </ul>
            {project.link && (
              <div className="mt-4">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
                >
                  Voir le projet
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}