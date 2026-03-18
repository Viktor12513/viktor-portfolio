import { BarChart3, Copy, ExternalLink } from 'lucide-react';
import type { ShortLink } from '../../shortenerTypes';

type UrlDemoListProps = {
  links: ShortLink[];
  selectedLinkId: string | null;
  onSelectLink: (linkId: string) => Promise<void>;
  onCopyLink: (shortUrl: string) => Promise<void>;
};

export function UrlDemoList({ links, selectedLinkId, onSelectLink, onCopyLink }: UrlDemoListProps) {
  if (links.length === 0) {
    return (
      <section className="panel p-8 text-center">
        <h4 className="text-2xl font-semibold text-ink dark:text-white">No links yet</h4>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          Create your first short link to see analytics in the portfolio demo.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      {links.map((link) => (
        <article key={link.id} className="panel p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="truncate text-sm text-slate-500 dark:text-slate-400">{link.originalUrl}</p>
              <a
                href={link.shortUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-slateblue hover:underline"
              >
                {link.shortUrl}
                <ExternalLink size={16} />
              </a>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Clicks: <span className="font-semibold">{link.clickCount}</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onCopyLink(link.shortUrl)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Copy size={16} />
                Copy
              </button>
              <button
                type="button"
                onClick={() => onSelectLink(link.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selectedLinkId === link.id
                    ? 'bg-slateblue text-white'
                    : 'border border-slate-300 text-slate-700 hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <BarChart3 size={16} />
                Analytics
              </button>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
