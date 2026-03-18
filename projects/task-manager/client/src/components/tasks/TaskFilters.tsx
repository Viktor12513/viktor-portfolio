import type { TaskStatusFilter } from '../../types/task';

type TaskFiltersProps = {
  activeFilter: TaskStatusFilter;
  onFilterChange: (filter: TaskStatusFilter) => void;
};

const filters: TaskStatusFilter[] = ['all', 'active', 'completed'];

export function TaskFilters({ activeFilter, onFilterChange }: TaskFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => {
        const isActive = filter === activeFilter;

        return (
          <button
            key={filter}
            type="button"
            onClick={() => onFilterChange(filter)}
            className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
              isActive
                ? 'bg-slateblue text-white'
                : 'border border-slate-300 text-slate-700 hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
