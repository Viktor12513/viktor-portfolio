import { MousePointerClick } from 'lucide-react';
import type { ShortLink } from '../../shortenerTypes';

type UrlDemoAnalyticsProps = {
  link: ShortLink | null;
};

export function UrlDemoAnalytics({ link }: UrlDemoAnalyticsProps) {
  if (!link) {
    return (
      <section className="panel p-8 text-center">
        <h4 className="text-2xl font-semibold text-ink dark:text-white">Select a link</h4>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          Choose a shortened link to view its click analytics.
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
        <h4 className="mt-3 text-2xl font-semibold text-ink dark:text-white">Link details</h4>
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
          <p className="text-sm font-semibold text-ink dark:text-white">Recent visits</p>
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
