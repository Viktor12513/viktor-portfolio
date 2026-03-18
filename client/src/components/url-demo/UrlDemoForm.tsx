import { useState, type FormEvent } from 'react';
import type { ShortenValues } from '../../shortenerTypes';

type UrlDemoFormProps = {
  onSubmit: (values: ShortenValues) => Promise<void>;
  isSubmitting: boolean;
};

export function UrlDemoForm({ onSubmit, isSubmitting }: UrlDemoFormProps) {
  const [originalUrl, setOriginalUrl] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!originalUrl.trim()) {
      setLocalError('Please enter a URL to shorten.');
      return;
    }

    setLocalError('');
    await onSubmit({ originalUrl });
    setOriginalUrl('');
  };

  return (
    <section className="panel p-6">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slateblue dark:text-slate-300">
          Create short link
        </p>
        <h4 className="mt-3 text-2xl font-semibold text-ink dark:text-white">Generate a short URL</h4>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Original URL
          <input
            value={originalUrl}
            onChange={(event) => setOriginalUrl(event.target.value)}
            placeholder="https://example.com/articles/how-to-build-an-api"
            className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-slateblue dark:bg-slate-900"
          />
        </label>

        {localError ? <p className="text-sm text-rose-600">{localError}</p> : null}

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
