interface NavbarProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export default function Navbar({ theme, setTheme }: NavbarProps) {
  return (
    <header className="fixed top-4 left-4 right-4 z-30 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl hero-gradient shadow-lg flex items-center justify-center text-white font-bold">
          IK
        </div>
        <div className="hidden sm:block">
          <h1 className="text-foreground text-lg font-semibold">Issa KAMARA — Portfolio</h1>
          <p className="text-muted-foreground text-xs">Frontend • Design • Art • Café</p>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-2 glass-panel p-2 rounded-lg">
        <a href="#home" className="px-3 py-1 rounded-md text-sm text-foreground hover:bg-secondary/20">Accueil</a>
        <a href="#projects" className="px-3 py-1 rounded-md text-sm text-foreground hover:bg-secondary/20">Projets</a>
        <a href="#other-projects" className="px-3 py-1 rounded-md text-sm text-foreground hover:bg-secondary/20">Autres projets</a>
        <a href="#skills" className="px-3 py-1 rounded-md text-sm text-foreground hover:bg-secondary/20">Compétences</a>
        <a href="#about" className="px-3 py-1 rounded-md text-sm text-foreground hover:bg-secondary/20">À propos</a>
      </nav>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="glass-button px-3 py-2 rounded-lg text-sm text-foreground"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <a 
          href="#contact"
          className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:scale-105 transform transition"
        >
          Contact
        </a>
      </div>
    </header>
  );
}