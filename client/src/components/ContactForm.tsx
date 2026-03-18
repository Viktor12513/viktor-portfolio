export function ContactForm() {
  return (
    <form
      className="panel p-6"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Name
          <input
            type="text"
            placeholder="Your name"
            className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-slateblue dark:bg-slate-900"
          />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Email
          <input
            type="email"
            placeholder="your@email.com"
            className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-slateblue dark:bg-slate-900"
          />
        </label>
      </div>

      <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-200">
        Message
        <textarea
          rows={5}
          placeholder="Tell me a little about your project or opportunity."
          className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-slateblue dark:bg-slate-900"
        />
      </label>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">This form is a frontend-only demo.</p>
        <button
          type="submit"
          className="rounded-full bg-pine px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#18231c]"
        >
          Send Message
        </button>
      </div>
    </form>
  );
}
