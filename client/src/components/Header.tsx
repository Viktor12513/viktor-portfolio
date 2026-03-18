import { Github, Linkedin, Mail } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

type HeaderProps = {
  name: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  github: string;
  linkedin: string;
  email: string;
};

export function Header({ name, theme, onToggleTheme, github, linkedin, email }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/50 bg-sand/75 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
      <div className="container-shell flex items-center justify-between gap-4 py-4">
        <a href="#home" className="text-lg font-semibold tracking-tight text-ink dark:text-white">
          {name}
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
          <a href="#about" className="hover:text-slateblue dark:hover:text-white">
            About
          </a>
          <a href="#projects" className="hover:text-slateblue dark:hover:text-white">
            Projects
          </a>
          <a href="#skills" className="hover:text-slateblue dark:hover:text-white">
            Skills
          </a>
          <a href="#contact" className="hover:text-slateblue dark:hover:text-white">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${email}`}
            className="hidden rounded-full border border-slate-300 p-2 text-slate-700 transition hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800 sm:inline-flex"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full border border-slate-300 p-2 text-slate-700 transition hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800 sm:inline-flex"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full border border-slate-300 p-2 text-slate-700 transition hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800 sm:inline-flex"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
}
