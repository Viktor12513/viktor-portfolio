import { LoaderCircle } from 'lucide-react';

type LoadingPanelProps = {
  title: string;
  description: string;
};

export function LoadingPanel({ title, description }: LoadingPanelProps) {
  return (
    <section className="panel flex min-h-64 flex-col items-center justify-center p-8 text-center">
      <LoaderCircle className="animate-spin text-slateblue" size={30} />
      <h2 className="mt-5 text-2xl font-semibold text-ink dark:text-white">{title}</h2>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{description}</p>
    </section>
  );
}
