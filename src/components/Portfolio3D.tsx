import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import Scene from './3d/Scene';
import Navbar from './ui/Navbar';
import ProjectsGrid from './ui/ProjectsGrid';
import OtherProjects from './ui/OtherProjects';
import Modal from './ui/Modal';
import SkillsSection from './ui/SkillsSection';
import ContactForm from './ui/ContactForm';
import AvatarAssistant from './ui/AvatarAssistant';
import profileImage from '../assets/issa-profile.jpg';

interface Project {
  title: string;
  summary: string;
}

export default function Portfolio3D() {
  const [theme, setTheme] = useState('dark');
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [currentSection, setCurrentSection] = useState('home');

  function handleProjectOpen(projectOrIndex: any) {
    const project = typeof projectOrIndex === 'number'
      ? { 
          title: ['Trend Dashboard', 'UX 3D', 'Mini Shop'][projectOrIndex], 
          summary: 'Prototype interactif déclenché depuis la scène 3D' 
        }
      : projectOrIndex;
    setActiveProject(project);
    setModalOpen(true);
  }

  // Apply theme to body
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Track current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'skills', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply theme to body
  useEffect(() => {
  }, [theme]);

  return (
    <div className="min-h-screen portfolio-bg text-foreground">
      <Navbar theme={theme} setTheme={setTheme} />

      <main className="pt-28" id="home">
        <section className="relative h-[60vh] sm:h-[75vh] w-full">
          <Canvas 
            shadows 
            dpr={[1, 2]} 
            camera={{ position: [0, 2.5, 5], fov: 50 }}
          >
            <Suspense fallback={<Html center>Chargement 3D...</Html>}>
              <Scene onProjectClick={handleProjectOpen} />
            </Suspense>
          </Canvas>

          {/* Overlay UI on top of canvas */}
          <div className="absolute left-6 bottom-6 max-w-lg p-4">
            <motion.div 
              initial={{ x: -40, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ delay: 0.2 }} 
              className="glass-panel p-6 rounded-2xl"
            >
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src={profileImage} 
                  alt="Issa KAMARA - Développeur Frontend" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <h2 className="text-xl font-bold text-foreground">Salut — je suis Issa KAMARA.</h2>
                  <p className="text-xs text-muted-foreground">📍 Thiès, Sénégal</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Développeur web front-end passionné par le design, la performance et les solutions digitales accessibles. 
                Artiste peintre depuis plus de 10 ans et producteur de café depuis 6 ans, j'aime combiner créativité et technologie.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a 
                  href="https://issa-portfeuil.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground text-sm hover:opacity-90 transition font-semibold"
                >
                  Mon CV/Portfolio 📄
                </a>
                <a 
                  href="#projects" 
                  className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm hover:opacity-90 transition"
                >
                  Mes projets
                </a>
                <a 
                  href="#contact"
                  className="glass-button px-4 py-2 rounded-md text-sm text-foreground hover:bg-secondary/20"
                >
                  Me contacter
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="projects" className="pt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">Projets récents</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Découvrez mes réalisations, des sites web modernes aux applications innovantes
            </p>
          </div>
          <ProjectsGrid onOpen={handleProjectOpen} />
        </section>

        <section id="other-projects" className="pt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">Autres Projets</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Une sélection de projets supplémentaires hébergés sur Netlify.
            </p>
          </div>
          <OtherProjects onOpen={handleProjectOpen} />
        </section>

        <section id="skills">
          <SkillsSection />
        </section>

        <section id="about" className="max-w-4xl mx-auto p-6 mt-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground">Mon Histoire</h3>
            <p className="text-muted-foreground mt-2">De l'art au code, une passion pour la créativité</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-6 rounded-2xl text-center"
            >
              <div className="text-4xl mb-4">🎨</div>
              <h4 className="font-semibold text-foreground mb-2">10+ ans d'Art</h4>
              <p className="text-muted-foreground text-sm">
                Peintre passionné, j'ai développé un œil artistique et une approche créative 
                qui influence aujourd'hui mon travail de développeur.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-panel p-6 rounded-2xl text-center"
            >
              <div className="text-4xl mb-4">☕</div>
              <h4 className="font-semibold text-foreground mb-2">6 ans d'Entrepreneuriat</h4>
              <p className="text-muted-foreground text-sm">
                Producteur de café, j'ai appris la rigueur, la gestion de projet 
                et l'importance de l'expérience client.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel p-6 rounded-2xl text-center"
            >
              <div className="text-4xl mb-4">💻</div>
              <h4 className="font-semibold text-foreground mb-2">Développeur Passionné</h4>
              <p className="text-muted-foreground text-sm">
                Aujourd'hui, je combine créativité et technologie pour créer 
                des solutions web innovantes et impactantes.
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <blockquote className="text-lg text-foreground italic">
              "Mon objectif est de démocratiser l'accès aux outils web modernes au Sénégal 
              et d'aider les PME à avoir une présence digitale impactante."
            </blockquote>
            <cite className="text-muted-foreground mt-2 block">— Issa KAMARA</cite>
          </motion.div>
        </section>

        <section id="contact" className="max-w-6xl mx-auto p-6 mt-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground">Travaillons Ensemble</h3>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Vous avez un projet en tête ? Discutons de la façon dont je peux vous aider 
              à concrétiser votre vision digitale.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass-panel p-6 rounded-2xl">
              <h4 className="font-semibold text-foreground mb-6 flex items-center gap-2">
                <span>📍</span>
                Informations de contact
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary">📞</span>
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Téléphone</p>
                    <a href="tel:+221776828441" className="text-muted-foreground hover:text-primary transition">
                      +221 77 682 8441
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary">✉️</span>
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Email</p>
                    <a href="mailto:issakamara958@gmail.com" className="text-muted-foreground hover:text-primary transition">
                      issakamara958@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary">📍</span>
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Localisation</p>
                    <p className="text-muted-foreground">Thiès, Sénégal</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary">🌐</span>
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Portfolio</p>
                    <a href="https://issa-portfeuil.netlify.app/" target="_blank" rel="noopener noreferrer" 
                       className="text-muted-foreground hover:text-primary transition">
                      issa-portfeuil.netlify.app
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary">💼</span>
                  </div>
                  <div>
                    <p className="text-foreground font-medium">GitHub</p>
                    <a href="https://github.com/IssaKamara958" target="_blank" rel="noopener noreferrer" 
                       className="text-muted-foreground hover:text-primary transition">
                      github.com/IssaKamara958
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">Disponible pour :</p>
                <div className="flex flex-wrap gap-2">
                  {['Développement web', 'Design UI/UX', 'Consulting', 'Formation'].map(service => (
                    <span key={service} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <ContactForm />
          </div>
        </section>

        <footer className="p-6 text-center text-sm text-muted-foreground border-t border-border mt-12">
          © {new Date().getFullYear()} Issa KAMARA — Développeur Frontend • Artiste • Producteur de café
        </footer>
      </main>

      <Modal 
        open={modalOpen} 
        project={activeProject} 
        onClose={() => setModalOpen(false)} 
      />
      
      <AvatarAssistant currentSection={currentSection} />
    </div>
  );
}