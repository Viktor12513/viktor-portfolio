import { AlertCircle } from 'lucide-react';

type StatusBannerProps = {
  message: string;
};

export function StatusBanner({ message }: StatusBannerProps) {
  return (
    <section className="panel flex items-start gap-3 border border-rose-200 p-5 text-rose-700 dark:border-rose-950 dark:text-rose-300">
      <AlertCircle className="mt-0.5" size={18} />
      <p className="text-sm leading-7">{message}</p>
    </section>
  );
}
