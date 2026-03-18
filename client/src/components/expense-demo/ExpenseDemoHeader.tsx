import { Landmark } from 'lucide-react';

export function ExpenseDemoHeader() {
  return (
    <div className="panel p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <div className="rounded-2xl bg-pine p-3 text-white shadow-panel">
          <Landmark size={22} />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slateblue dark:text-slate-300">
            Live Demo
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight text-ink dark:text-white">
            Expense Tracker
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            This is a working portfolio demo of the Expense Tracker project. You can add income and expenses,
            delete entries, and see the balance and category summaries update immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
