import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

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

const staticProjects: Project[] = [
  {
    id: 1,
    title: "Senegal Energy Xool",
    summary: "Découvrez ce projet, une application web moderne et performante.",
    link: "https://senegal-energy-xool.lovable.app",
    tag: "Web App",
    image_url: "/placeholder.svg",
    technologies: ["React", "TypeScript", "Next.js"],
  },
  {
    id: 2,
    title: "Empreinte Parfumée",
    summary: "Découvrez ce projet, une application web moderne et performante.",
    link: "https://empreinte-parfumee.lovable.app",
    tag: "Web App",
    image_url: "/placeholder.svg",
    technologies: ["React", "TypeScript", "Next.js"],
  },
  {
    id: 3,
    title: "GLX Thiès Senegal",
    summary: "Découvrez ce projet, une application web moderne et performante.",
    link: "https://glx-thies-senegal.lovable.app",
    tag: "Web App",
    image_url: "/placeholder.svg",
    technologies: ["React", "TypeScript", "Next.js"],
  },
  {
    id: 4,
    title: "Guide Enseignement",
    summary: "Découvrez ce projet, une application web moderne et performante.",
    link: "https://guide-enseignement.lovable.app",
    tag: "Web App",
    image_url: "/placeholder.svg",
    technologies: ["React", "TypeScript", "Next.js"],
  },
  {
    id: 5,
    title: "Precis Tag",
    summary: "Découvrez ce projet, une application web moderne et performante.",
    link: "https://precis-tag.lovable.app",
    tag: "Web App",
    image_url: "/placeholder.svg",
    technologies: ["React", "TypeScript", "Next.js"],
  },
  {
    id: 6,
    title: "Touhfatou Délices",
    summary: "Découvrez ce projet, une application web moderne et performante.",
    link: "https://touhfatou-delices-152604-c0083.web.app/",
    tag: "Firebase App",
    image_url: "/placeholder.svg",
    technologies: ["React", "Firebase"],
  },
    {
    id: 7,
    title: "Le Magnifique",
    summary: "Découvrez ce projet, une application web moderne et performante.",
    link: "#", // Placeholder, waiting for user confirmation
    tag: "Firebase App",
    image_url: "/placeholder.svg",
    technologies: ["React", "Firebase"],
  },
];

export default function ProjectsGrid({ onOpen }: ProjectsGridProps) {
  const [projects, setProjects] = useState<Project[]>(staticProjects);

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
