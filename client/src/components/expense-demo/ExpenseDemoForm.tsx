import { useState, type FormEvent } from 'react';
import type { ExpenseFormValues } from '../../expenseTypes';

type ExpenseDemoFormProps = {
  onSubmit: (values: ExpenseFormValues) => Promise<void>;
  isSubmitting: boolean;
};

const initialValues: ExpenseFormValues = {
  title: '',
  amount: '',
  category: '',
  type: 'expense',
  date: '',
  notes: ''
};

export function ExpenseDemoForm({ onSubmit, isSubmitting }: ExpenseDemoFormProps) {
  const [values, setValues] = useState<ExpenseFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof ExpenseFormValues, string>>>({});

  const validate = () => {
    const nextErrors: Partial<Record<keyof ExpenseFormValues, string>> = {};

    if (!values.title.trim()) {
      nextErrors.title = 'Please enter a title.';
    }

    if (!values.category.trim()) {
      nextErrors.category = 'Please enter a category.';
    }

    if (!values.amount.trim()) {
      nextErrors.amount = 'Please enter an amount.';
    } else if (Number(values.amount) <= 0) {
      nextErrors.amount = 'Amount must be greater than 0.';
    }

    if (!values.date) {
      nextErrors.date = 'Please choose a date.';
    }

    if (values.notes.trim().length > 200) {
      nextErrors.notes = 'Keep notes under 200 characters.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = <Key extends keyof ExpenseFormValues>(field: Key, value: ExpenseFormValues[Key]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    await onSubmit(values);
    setValues(initialValues);
    setErrors({});
  };

  return (
    <section className="panel p-6">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slateblue dark:text-slate-300">
          Add entry
        </p>
        <h4 className="mt-3 text-2xl font-semibold text-ink dark:text-white">Log income or expenses</h4>
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

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Amount
            <input
              type="number"
              min="0"
              step="0.01"
              value={values.amount}
              onChange={(event) => handleChange('amount', event.target.value)}
              className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-slateblue dark:bg-slate-900"
            />
            {errors.amount ? <span className="mt-2 block text-sm text-rose-600">{errors.amount}</span> : null}
          </label>

          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Type
            <select
              value={values.type}
              onChange={(event) => handleChange('type', event.target.value as ExpenseFormValues['type'])}
              className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-slateblue dark:bg-slate-900"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Category
            <input
              value={values.category}
              onChange={(event) => handleChange('category', event.target.value)}
              className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-slateblue dark:bg-slate-900"
            />
            {errors.category ? <span className="mt-2 block text-sm text-rose-600">{errors.category}</span> : null}
          </label>

          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Date
            <input
              type="date"
              value={values.date}
              onChange={(event) => handleChange('date', event.target.value)}
              className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-slateblue dark:bg-slate-900"
            />
            {errors.date ? <span className="mt-2 block text-sm text-rose-600">{errors.date}</span> : null}
          </label>
        </div>

        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Notes
          <textarea
            rows={4}
            value={values.notes}
            onChange={(event) => handleChange('notes', event.target.value)}
            className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-slateblue dark:bg-slate-900"
          />
          {errors.notes ? <span className="mt-2 block text-sm text-rose-600">{errors.notes}</span> : null}
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-slateblue px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#27445f] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Saving...' : 'Add Entry'}
        </button>
      </form>
    </section>
  );
}
