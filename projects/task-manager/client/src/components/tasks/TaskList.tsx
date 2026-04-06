import { ClipboardList } from 'lucide-react';
import type { Task } from '../../types/task';
import { TaskItem } from './TaskItem';

type TaskListProps = {
  tasks: Task[];
  onToggleComplete: (task: Task) => Promise<void>;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => Promise<void>;
  busyTaskId: number | null;
};

export function TaskList({ tasks, onToggleComplete, onEdit, onDelete, busyTaskId }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <section className="panel flex min-h-64 flex-col items-center justify-center p-8 text-center">
        <div className="rounded-full bg-slate-100 p-4 text-slateblue dark:bg-slate-800">
          <ClipboardList size={28} />
        </div>
        <h2 className="mt-5 text-2xl font-semibold text-ink dark:text-white">No tasks to show</h2>
        <p className="mt-3 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">
          Add a task or switch filters to build your list and keep the workflow moving.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
          isBusy={busyTaskId === task.id}
        />
      ))}
    </section>
  );
}
