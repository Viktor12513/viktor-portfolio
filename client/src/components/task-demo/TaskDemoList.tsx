import { CalendarDays, Pencil, Trash2 } from 'lucide-react';
import type { Task } from '../../taskTypes';

type TaskDemoListProps = {
  tasks: Task[];
  busyTaskId: number | null;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => Promise<void>;
  onToggleComplete: (task: Task) => Promise<void>;
};

const priorityStyles = {
  Low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  High: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
};

export function TaskDemoList({ tasks, busyTaskId, onEdit, onDelete, onToggleComplete }: TaskDemoListProps) {
  if (tasks.length === 0) {
    return (
      <section className="panel p-8 text-center">
        <h4 className="text-2xl font-semibold text-ink dark:text-white">No tasks match this filter</h4>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          Try a different filter or add a new task in the demo form.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      {tasks.map((task) => {
        const isBusy = busyTaskId === task.id;

        return (
          <article key={task.id} className="panel p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-4">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleComplete(task)}
                  disabled={isBusy}
                  className="mt-1 h-5 w-5 rounded border-slate-300 text-slateblue focus:ring-slateblue"
                />

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4
                      className={`text-lg font-semibold ${
                        task.completed
                          ? 'text-slate-400 line-through dark:text-slate-500'
                          : 'text-ink dark:text-white'
                      }`}
                    >
                      {task.title}
                    </h4>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[task.priority]}`}>
                      {task.priority}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {task.description || 'No description added.'}
                  </p>

                  <p className="mt-3 inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <CalendarDays size={16} />
                    Due {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => onEdit(task)}
                  disabled={isBusy}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-white disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <Pencil size={16} />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(task.id)}
                  disabled={isBusy}
                  className="inline-flex items-center gap-2 rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:-translate-y-0.5 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-70 dark:border-rose-950 dark:text-rose-300 dark:hover:bg-rose-950/40"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
