import ProjectCard from './ProjectCard';

const otherProjects = [
  {
    tag: '3D',
    title: 'trois-d-portfeuil',
    summary: 'Déployé depuis GitHub.',
    link: 'https://trois-d-portfeuil.netlify.app/',
    id: 6
  },
  {
    tag: 'Portfolio',
    title: 'issa-portfeuil',
    summary: 'Déployé depuis GitHub.',
    link: 'https://issa-portfeuil.netlify.app/',
    id: 7
  },
  {
    tag: 'Services',
    title: 'art-mult-services',
    summary: 'Déploiements manuels.',
    link: 'https://art-mult-services.netlify.app/',
    id: 8
  },
  {
    tag: 'Ecom',
    title: 'chackororg-shop',
    summary: 'Déploiements manuels.',
    link: 'https://chackororg-shop.netlify.app/',
    id: 9
  },
  {
    tag: 'Portfolio',
    title: 'issa-kamara',
    summary: 'Déploiements manuels.',
    link: 'https://issa-kamara.netlify.app/',
    id: 10
  },
  {
    tag: 'Mail',
    title: 'mail-fr',
    summary: 'Déployé depuis GitHub.',
    link: 'https://mail-fr.netlify.app/',
    id: 11
  },
  {
    tag: 'Web',
    title: 'kou-aye',
    summary: 'Déployé depuis GitHub.',
    link: 'https://kou-aye.netlify.app/',
    id: 12
  },
  {
    tag: 'Ecom',
    title: 'chackor-shop',
    summary: 'Déployé depuis GitHub avec Next.js.',
    link: 'https://chackor-shop.netlify.app/',
    id: 13
  },
  {
    tag: 'Campagne',
    title: 'nonauxmeurtres',
    summary: 'Déployé depuis GitHub.',
    link: 'https://nonauxmeurtres.netlify.app/',
    id: 14
  }
];

// @ts-ignore
const OtherProjects = ({ onOpen }) => {
  return (
    <section id="other-projects" className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {otherProjects.map((p) => (
        <ProjectCard key={p.id} project={p} onOpen={onOpen} />
      ))}
    </section>
  );
};

export default OtherProjects;
