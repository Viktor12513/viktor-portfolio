export function ProjectHero() {
  return (
    <section className="panel p-7 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slateblue dark:text-slate-300">
        Standalone project
      </p>
      <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-ink dark:text-white sm:text-5xl">
        Shorten links, redirect visitors, and review analytics through a clean fullstack workflow.
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
        This app focuses on API design, request validation, MongoDB data modeling, redirect handling, and click
        analytics while keeping the structure clear enough to explain in an interview.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <span className="rounded-full bg-slateblue px-4 py-2 text-sm font-semibold text-white">MongoDB + Mongoose</span>
        <span className="rounded-full bg-pine px-4 py-2 text-sm font-semibold text-white">Express API</span>
        <span className="rounded-full bg-clay px-4 py-2 text-sm font-semibold text-pine">Analytics tracking</span>
      </div>
    </section>
  );
}
