import { BookOpenText, FilePenLine, Server } from 'lucide-react';

const highlights = [
  {
    title: 'Content CRUD',
    description: 'Create, update, and delete posts while keeping the form flow easy to understand.',
    icon: FilePenLine
  },
  {
    title: 'API Integration',
    description: 'The demo uses portfolio backend routes so the project card opens something real and interactive.',
    icon: Server
  },
  {
    title: 'Beginner-Friendly Structure',
    description: 'The code is split into small components so the project still feels realistic for a junior portfolio.',
    icon: BookOpenText
  }
];

export function BlogDemoHeader() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {highlights.map((item) => {
        const Icon = item.icon;

        return (
          <article key={item.title} className="panel p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-slateblue p-3 text-white">
                <Icon size={18} />
              </div>
              <p className="text-sm font-semibold text-ink dark:text-white">{item.title}</p>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
          </article>
        );
      })}
    </div>
  );
}
