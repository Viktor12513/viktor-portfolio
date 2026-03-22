import { ArrowUpRight, Github } from 'lucide-react';
import type { Project } from '../types';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const liveDemoProps = project.internalDemo
    ? {}
    : {
        target: '_blank',
        rel: 'noreferrer'
      };
  const primaryActionLabel = project.primaryActionLabel ?? 'Live Demo';

  return (
    <article className="panel flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slateblue dark:text-slate-300">
            Fullstack Project
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-ink dark:text-white">{project.name}</h3>
        </div>
        <span className="rounded-full bg-clay/60 px-3 py-1 text-xs font-semibold text-pine dark:bg-slate-800 dark:text-slate-200">
          Junior level
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{project.description}</p>

      <div className="mt-5">
        <p className="text-sm font-semibold text-ink dark:text-white">Tech stack</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.techStack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold text-ink dark:text-white">Key features</p>
        <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          {project.features.map((feature) => (
            <li key={feature}>- {feature}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/60">
        <p className="text-sm font-semibold text-ink dark:text-white">What I built</p>
        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{project.role}</p>
        {project.note ? <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{project.note}</p> : null}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={project.liveDemo}
          {...liveDemoProps}
          className="inline-flex items-center gap-2 rounded-full bg-slateblue px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#27445f]"
        >
          {primaryActionLabel}
          <ArrowUpRight size={16} />
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          GitHub
          <Github size={16} />
        </a>
      </div>
    </article>
  );
}
