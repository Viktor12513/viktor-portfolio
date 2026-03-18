import type { Task } from '../../types/task';

type TaskSummaryProps = {
  tasks: Task[];
};

export function TaskSummary({ tasks }: TaskSummaryProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const highPriorityTasks = tasks.filter((task) => task.priority === 'High').length;

  const summaryItems = [
    { label: 'Total tasks', value: totalTasks },
    { label: 'Active', value: activeTasks },
    { label: 'Completed', value: completedTasks },
    { label: 'High priority', value: highPriorityTasks }
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {summaryItems.map((item) => (
        <article key={item.label} className="panel p-5">
          <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-ink dark:text-white">{item.value}</p>
        </article>
      ))}
    </section>
  );
}
