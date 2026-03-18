import type { CategorySummary, ExpenseEntry } from '../../expenseTypes';

type ExpenseDemoSummaryProps = {
  entries: ExpenseEntry[];
  summaries: CategorySummary[];
};

export function ExpenseDemoSummary({ entries, summaries }: ExpenseDemoSummaryProps) {
  const totalIncome = entries.filter((entry) => entry.type === 'income').reduce((sum, entry) => sum + entry.amount, 0);
  const totalExpenses = entries
    .filter((entry) => entry.type === 'expense')
    .reduce((sum, entry) => sum + entry.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Balance', value: `$${balance.toFixed(2)}`, accent: 'text-slateblue' },
          { label: 'Income', value: `$${totalIncome.toFixed(2)}`, accent: 'text-emerald-600' },
          { label: 'Expenses', value: `$${totalExpenses.toFixed(2)}`, accent: 'text-rose-600' }
        ].map((item) => (
          <article key={item.label} className="panel p-5">
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
            <p className={`mt-3 text-3xl font-semibold tracking-tight ${item.accent}`}>{item.value}</p>
          </article>
        ))}
      </section>

      <section className="panel p-6">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slateblue dark:text-slate-300">
            Category summary
          </p>
          <h4 className="mt-3 text-2xl font-semibold text-ink dark:text-white">Simple breakdown</h4>
        </div>

        {summaries.length === 0 ? (
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
            Add a few entries to see totals grouped by category.
          </p>
        ) : (
          <div className="space-y-4">
            {summaries.map((summary) => (
              <div key={`${summary.type}-${summary.category}`} className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-ink dark:text-white">{summary.category}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      {summary.type}
                    </p>
                  </div>
                  <p
                    className={`text-sm font-semibold ${
                      summary.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    ${summary.total.toFixed(2)}
                  </p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className={`h-full rounded-full ${
                      summary.type === 'income' ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.min(summary.total, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
