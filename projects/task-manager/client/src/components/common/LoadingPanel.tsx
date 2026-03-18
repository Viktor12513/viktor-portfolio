import { LoaderCircle, ServerCrash } from 'lucide-react';

type LoadingPanelProps = {
  title: string;
  description?: string;
  mode?: 'loading' | 'error';
};

export function LoadingPanel({ title, description, mode = 'loading' }: LoadingPanelProps) {
  const Icon = mode === 'loading' ? LoaderCircle : ServerCrash;

  return (
    <section className="panel flex min-h-64 flex-col items-center justify-center p-8 text-center">
      <Icon className={mode === 'loading' ? 'animate-spin text-slateblue' : 'text-rose-500'} size={30} />
      <h2 className="mt-5 text-2xl font-semibold text-ink dark:text-white">{title}</h2>
      {description ? <p className="mt-3 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p> : null}
    </section>
  );
}
