import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import { supabase } from '../../lib/supabaseClient';

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
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from('projects').select('*');
      if (error) {
        console.error('Error fetching projects:', JSON.stringify(error, null, 2));
      } else {
        setProjects(data as Project[]);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} onOpen={onOpen} />
      ))}
    </section>
  );
}
