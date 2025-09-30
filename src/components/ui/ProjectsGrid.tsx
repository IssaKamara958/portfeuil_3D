import { useMemo } from 'react';
import ProjectCard from './ProjectCard';

interface Project {
  id: number;
  tag: string;
  title: string;
  summary: string;
  link: string;
}

interface ProjectsGridProps {
  onOpen: (project: Project) => void;
}

export default function ProjectsGrid({ onOpen }: ProjectsGridProps) {
  const projects = useMemo<Project[]>(
    () => [
      { 
        tag: 'Web', 
        title: 'Portfolio Actuel', 
        summary: 'Site portfolio personnel avec design moderne et responsive', 
        link: 'https://issa-portfeuil.netlify.app/', 
        id: 1 
      },
      { 
        tag: 'Ecom', 
        title: 'E-commerce Chackor Organisation Shop', 
        summary: 'Plateforme e-commerce pour Achakourou Café Touba', 
        link: 'https://chackor-shop.netlify.app/', 
        id: 2 
      },
      { 
        tag: 'App', 
        title: 'Kou Ayé ?', 
        summary: 'Application temps réel pour pharmacies de garde au Sénégal', 
        link: 'https://kou-aye.netlify.app/', 
        id: 3 
      },
      { 
        tag: 'Web', 
        title: 'Chackor Organisation', 
        summary: 'Pages dynamiques avec newsletter et formulaires partenaires', 
        link: 'https://chackor-secure.lovable.app/', 
        id: 4 
      },
      { 
        tag: 'Tool', 
        title: 'WiFi QR Code Scanner', 
        summary: 'Logiciel .exe pour scanner QR codes Wi-Fi et connexion automatique', 
        link: 'https://github.com/IssaKamara958', 
        id: 5 
      },
    ],
    []
  );

  return (
    <section id="projects" className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} onOpen={onOpen} />
      ))}
    </section>
  );
}
