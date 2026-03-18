import { CalendarDays, Trash2 } from 'lucide-react';
import type { ExpenseEntry } from '../../types/expense';

type RecentEntriesProps = {
  entries: ExpenseEntry[];
  busyEntryId: number | null;
  onDelete: (entryId: number) => Promise<void>;
};

export function RecentEntries({ entries, busyEntryId, onDelete }: RecentEntriesProps) {
  if (entries.length === 0) {
    return (
      <section className="panel p-8 text-center">
        <h2 className="text-2xl font-semibold text-ink dark:text-white">No entries yet</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          Add your first income or expense entry to start tracking your balance.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      {entries.map((entry) => {
        const isBusy = busyEntryId === entry.id;

        return (
          <article key={entry.id} className="panel p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-ink dark:text-white">{entry.title}</h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      entry.type === 'income'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {entry.type}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {entry.category}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {entry.notes || 'No notes added for this entry.'}
                </p>

                <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays size={16} />
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                  <span
                    className={`font-semibold ${
                      entry.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {entry.type === 'income' ? '+' : '-'}${entry.amount.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onDelete(entry.id)}
                disabled={isBusy}
                className="inline-flex items-center gap-2 self-start rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:-translate-y-0.5 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-70 dark:border-rose-950 dark:text-rose-300 dark:hover:bg-rose-950/40"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
}
