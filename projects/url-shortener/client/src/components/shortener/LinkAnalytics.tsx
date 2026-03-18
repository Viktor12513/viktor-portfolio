import { MousePointerClick } from 'lucide-react';
import type { LinkItem } from '../../types/link';

type LinkAnalyticsProps = {
  link: LinkItem | null;
};

export function LinkAnalytics({ link }: LinkAnalyticsProps) {
  if (!link) {
    return (
      <section className="panel p-8 text-center">
        <h2 className="text-2xl font-semibold text-ink dark:text-white">Select a link</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          Choose a shortened link to view click analytics and visit history.
        </p>
      </section>
    );
  }

  return (
    <section className="panel p-6">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slateblue dark:text-slate-300">
          Analytics
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-ink dark:text-white">Link details</h2>
      </div>

      <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
        <div>
          <p className="font-semibold text-ink dark:text-white">Original URL</p>
          <p className="mt-1 break-all">{link.originalUrl}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/60">
            <p className="text-sm text-slate-500 dark:text-slate-400">Short code</p>
            <p className="mt-2 font-semibold text-ink dark:text-white">{link.shortCode}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/60">
            <p className="text-sm text-slate-500 dark:text-slate-400">Total clicks</p>
            <p className="mt-2 inline-flex items-center gap-2 font-semibold text-ink dark:text-white">
              <MousePointerClick size={16} />
              {link.clickCount}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/60">
          <p className="text-sm font-semibold text-ink dark:text-white">Visit timestamps</p>
          {link.visits.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">No visits recorded yet.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {link.visits.slice(-5).reverse().map((visit) => (
                <li key={visit.visitedAt}>{new Date(visit.visitedAt).toLocaleString()}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
