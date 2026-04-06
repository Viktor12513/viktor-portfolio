import { Link2, Moon, Sun } from 'lucide-react';

type AppHeaderProps = {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
};

export function AppHeader({ theme, onToggleTheme }: AppHeaderProps) {
  return (
    <header className="border-b border-white/60 bg-sand/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
      <div className="container-shell flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-slateblue p-3 text-white shadow-panel">
            <Link2 size={22} />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slateblue dark:text-slate-300">
              Standalone fullstack app
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-ink dark:text-white">
              URL Shortener with Analytics
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              A short-link dashboard with redirects, stored links, and simple click analytics.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          className="inline-flex items-center gap-2 self-start rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          {theme === 'light' ? 'Dark mode' : 'Light mode'}
        </button>
      </div>
    </header>
  );
}
