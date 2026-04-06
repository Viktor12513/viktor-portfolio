const steps = [
  {
    title: 'Submit a long URL',
    description: 'Paste a full link and optionally set an expiration date before creating a short version.'
  },
  {
    title: 'Store the short code',
    description: 'The backend generates a unique code, saves the link, and returns a shortened URL.'
  },
  {
    title: 'Track visits',
    description: 'Each redirect increases the click count and adds a visit timestamp for simple analytics.'
  }
];

export function HowItWorks() {
  return (
    <section className="panel p-6">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slateblue dark:text-slate-300">
          How it works
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-ink dark:text-white">A backend-focused request flow</h2>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.title} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/60">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slateblue text-sm font-semibold text-white">
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-ink dark:text-white">{step.title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
