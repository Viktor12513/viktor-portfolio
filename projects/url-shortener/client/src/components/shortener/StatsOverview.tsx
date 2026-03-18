type StatsOverviewProps = {
  totalLinks: number;
  totalClicks: number;
  activeLinks: number;
};

export function StatsOverview({ totalLinks, totalClicks, activeLinks }: StatsOverviewProps) {
  const items = [
    { label: 'Links created', value: totalLinks },
    { label: 'Total clicks', value: totalClicks },
    { label: 'Active links', value: activeLinks }
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <article key={item.label} className="panel p-5">
          <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-ink dark:text-white">{item.value}</p>
        </article>
      ))}
    </section>
  );
}
