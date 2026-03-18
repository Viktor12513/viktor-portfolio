import { Link2 } from 'lucide-react';

export function UrlDemoHeader() {
  return (
    <div className="panel p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <div className="rounded-2xl bg-slateblue p-3 text-white shadow-panel">
          <Link2 size={22} />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slateblue dark:text-slate-300">
            Live Demo
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight text-ink dark:text-white">
            URL Shortener with Analytics
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            This portfolio demo shortens URLs, stores them on the backend, and tracks click counts and recent visit timestamps.
          </p>
        </div>
      </div>
    </div>
  );
}
