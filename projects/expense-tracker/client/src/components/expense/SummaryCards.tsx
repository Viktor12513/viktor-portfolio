import type { ExpenseEntry } from '../../types/expense';

type SummaryCardsProps = {
  entries: ExpenseEntry[];
};

export function SummaryCards({ entries }: SummaryCardsProps) {
  const totalIncome = entries
    .filter((entry) => entry.type === 'income')
    .reduce((sum, entry) => sum + entry.amount, 0);
  const totalExpenses = entries
    .filter((entry) => entry.type === 'expense')
    .reduce((sum, entry) => sum + entry.amount, 0);
  const balance = totalIncome - totalExpenses;

  const summaryItems = [
    { label: 'Total balance', value: balance, accent: 'text-slateblue' },
    { label: 'Income', value: totalIncome, accent: 'text-emerald-600' },
    { label: 'Expenses', value: totalExpenses, accent: 'text-rose-600' },
    { label: 'Entries', value: entries.length, accent: 'text-pine' }
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {summaryItems.map((item) => (
        <article key={item.label} className="panel p-5">
          <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
          <p className={`mt-3 text-3xl font-semibold tracking-tight ${item.accent}`}>
            {item.label === 'Entries' ? item.value : `$${item.value.toFixed(2)}`}
          </p>
        </article>
      ))}
    </section>
  );
}
