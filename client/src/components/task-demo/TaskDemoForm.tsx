import { useEffect, useState, type FormEvent } from 'react';
import type { Task, TaskFormValues } from '../../taskTypes';

type TaskDemoFormProps = {
  onSubmit: (values: TaskFormValues) => Promise<void>;
  editingTask: Task | null;
  onCancelEdit: () => void;
  isSubmitting: boolean;
};

const emptyForm: TaskFormValues = {
  title: '',
  description: '',
  priority: 'Medium',
  dueDate: ''
};

export function TaskDemoForm({ onSubmit, editingTask, onCancelEdit, isSubmitting }: TaskDemoFormProps) {
  const [values, setValues] = useState<TaskFormValues>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof TaskFormValues, string>>>({});

  useEffect(() => {
    if (editingTask) {
      setValues({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate
      });
      setErrors({});
      return;
    }

    setValues(emptyForm);
  }, [editingTask]);

  const validate = () => {
    const nextErrors: Partial<Record<keyof TaskFormValues, string>> = {};

    if (!values.title.trim()) {
      nextErrors.title = 'Please enter a task title.';
    }

    if (values.title.trim().length > 80) {
      nextErrors.title = 'Keep the title under 80 characters.';
    }

    if (values.description.trim().length > 240) {
      nextErrors.description = 'Keep the description under 240 characters.';
    }

    if (!values.dueDate) {
      nextErrors.dueDate = 'Choose a due date.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = <Key extends keyof TaskFormValues>(field: Key, value: TaskFormValues[Key]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    await onSubmit({
      title: values.title.trim(),
      description: values.description.trim(),
      priority: values.priority,
      dueDate: values.dueDate
    });

    if (!editingTask) {
      setValues(emptyForm);
    }
  };

  return (
    <section className="panel p-6">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slateblue dark:text-slate-300">
          {editingTask ? 'Edit task' : 'Add task'}
        </p>
        <h4 className="mt-3 text-2xl font-semibold text-ink dark:text-white">
          {editingTask ? 'Update task' : 'Create a new task'}
        </h4>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Title
          <input
            value={values.title}
            onChange={(event) => handleChange('title', event.target.value)}
            className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-slateblue dark:bg-slate-900"
          />
          {errors.title ? <span className="mt-2 block text-sm text-rose-600">{errors.title}</span> : null}
        </label>

        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Description
          <textarea
            rows={4}
            value={values.description}
            onChange={(event) => handleChange('description', event.target.value)}
            className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-slateblue dark:bg-slate-900"
          />
          {errors.description ? (
            <span className="mt-2 block text-sm text-rose-600">{errors.description}</span>
          ) : null}
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Priority
            <select
              value={values.priority}
              onChange={(event) => handleChange('priority', event.target.value as TaskFormValues['priority'])}
              className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-slateblue dark:bg-slate-900"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>

          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Due date
            <input
              type="date"
              value={values.dueDate}
              onChange={(event) => handleChange('dueDate', event.target.value)}
              className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-slateblue dark:bg-slate-900"
            />
            {errors.dueDate ? <span className="mt-2 block text-sm text-rose-600">{errors.dueDate}</span> : null}
          </label>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-slateblue px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#27445f] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Saving...' : editingTask ? 'Save Changes' : 'Add Task'}
          </button>

          {editingTask ? (
            <button
              type="button"
              onClick={onCancelEdit}
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cancel Edit
            </button>
          ) : null}
        </div>
      </form>
    </section>
  );
}
