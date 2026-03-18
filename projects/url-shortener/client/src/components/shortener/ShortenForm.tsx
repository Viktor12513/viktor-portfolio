import { useState, type FormEvent } from 'react';
import type { ShortenFormValues } from '../../types/link';

type ShortenFormProps = {
  onSubmit: (values: ShortenFormValues) => Promise<void>;
  isSubmitting: boolean;
};

const initialValues: ShortenFormValues = {
  originalUrl: '',
  expiresAt: ''
};

export function ShortenForm({ onSubmit, isSubmitting }: ShortenFormProps) {
  const [values, setValues] = useState<ShortenFormValues>(initialValues);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!values.originalUrl.trim()) {
      setErrorMessage('Please enter a URL to shorten.');
      return;
    }

    setErrorMessage('');
    await onSubmit(values);
    setValues(initialValues);
  };

  return (
    <section className="panel p-6">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slateblue dark:text-slate-300">
          Create short link
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-ink dark:text-white">Shorten a long URL</h2>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Original URL
          <input
            value={values.originalUrl}
            onChange={(event) => setValues((current) => ({ ...current, originalUrl: event.target.value }))}
            placeholder="https://example.com/very/long/link"
            className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-slateblue dark:bg-slate-900"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Expiration date (optional)
          <input
            type="date"
            value={values.expiresAt}
            onChange={(event) => setValues((current) => ({ ...current, expiresAt: event.target.value }))}
            className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-slateblue dark:bg-slate-900"
          />
        </label>

        {errorMessage ? <p className="text-sm text-rose-600">{errorMessage}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-slateblue px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#27445f] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Generating...' : 'Generate Short URL'}
        </button>
      </form>
    </section>
  );
}
