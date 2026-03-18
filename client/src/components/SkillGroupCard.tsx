import type { SkillGroup } from '../types';

type SkillGroupCardProps = {
  group: SkillGroup;
};

export function SkillGroupCard({ group }: SkillGroupCardProps) {
  return (
    <div className="panel p-6">
      <h3 className="text-xl font-semibold text-ink dark:text-white">{group.title}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span
            key={item}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
