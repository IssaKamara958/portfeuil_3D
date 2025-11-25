import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { supabase } from '../../lib/supabaseClient';

// Updated Project interface to better match the data structure and card needs
interface Project {
  id: number;
  title: string;
  summary: string;
  link: string;
  tag: string;
  image_url: string;
  technologies: string[];
}

interface ProjectsGridProps {
  onOpen: (project: Project) => void;
}

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
};

export default function ProjectsGrid({ onOpen }: ProjectsGridProps) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      // Fetch all projects
      const { data, error } = await supabase.from('projects').select('*');

      if (error) {
        console.error('Error fetching projects:', JSON.stringify(error, null, 2));
      } else if (data) {
        // 1. Map Supabase data to the component's Project interface
        const formattedProjects: Project[] = data.map((p: any) => ({
          id: p.id,
          title: p.title,
          summary: p.description, // Map DB `description` to `summary`
          link: p.project_url,    // Map DB `project_url` to `link`
          tag: p.technologies?.[0] || 'Web App', // Use the first technology as a tag
          image_url: p.image_url,
          technologies: p.technologies,
        }));

        // 2. Filter for projects that are online (link is not a placeholder '#')
        const onlineProjects = formattedProjects.filter(
          p => p.link && p.link.trim() !== '#' && p.link.trim() !== ''
        );

        setProjects(onlineProjects);
      }
    };

    fetchProjects();
  }, []);

  return (
    <motion.section
      id="projects"
      className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8"
      variants={gridVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {projects.map((p) => (
        <motion.div
          key={p.id}
          variants={cardVariants}
        >
          <ProjectCard project={p} onOpen={onOpen} />
        </motion.div>
      ))}
    </motion.section>
  );
}
