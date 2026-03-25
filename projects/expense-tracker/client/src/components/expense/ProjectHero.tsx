export function ProjectHero() {
  return (
    <section className="panel p-7 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slateblue dark:text-slate-300">
        Standalone project
      </p>
      <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-ink dark:text-white sm:text-5xl">
        Track income, expenses, and category totals in one clean personal dashboard.
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
        This app focuses on the fundamentals of a practical fullstack product: adding entries, storing data through an
        API, updating the UI in real time, and keeping the financial summary easy to read.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <span className="rounded-full bg-slateblue px-4 py-2 text-sm font-semibold text-white">React + TypeScript</span>
        <span className="rounded-full bg-pine px-4 py-2 text-sm font-semibold text-white">Express REST API</span>
        <span className="rounded-full bg-clay px-4 py-2 text-sm font-semibold text-pine">Personal finance dashboard</span>
      </div>
    </section>
  );
}
