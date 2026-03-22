import { useEffect, useState, type FormEvent } from 'react';
import type { BlogPost, PostFormValues } from '../../types/post';

type PostFormProps = {
  editingPost: BlogPost | null;
  onSubmit: (values: PostFormValues) => Promise<void>;
  onCancelEdit: () => void;
  isSubmitting: boolean;
};

const initialValues: PostFormValues = {
  title: '',
  excerpt: '',
  content: '',
  author: 'Viktor Hagman',
  category: '',
  published: true
};

export function PostForm({ editingPost, onSubmit, onCancelEdit, isSubmitting }: PostFormProps) {
  const [values, setValues] = useState<PostFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof PostFormValues, string>>>({});

  useEffect(() => {
    if (!editingPost) {
      setValues(initialValues);
      setErrors({});
      return;
    }

    setValues({
      title: editingPost.title,
      excerpt: editingPost.excerpt,
      content: editingPost.content,
      author: editingPost.author,
      category: editingPost.category,
      published: editingPost.published
    });
    setErrors({});
  }, [editingPost]);

  const validate = () => {
    const nextErrors: Partial<Record<keyof PostFormValues, string>> = {};

    if (!values.title.trim()) nextErrors.title = 'Please enter a title.';
    if (!values.excerpt.trim()) nextErrors.excerpt = 'Please enter an excerpt.';
    if (!values.content.trim()) nextErrors.content = 'Please enter post content.';
    if (!values.author.trim()) nextErrors.author = 'Please enter an author name.';
    if (!values.category.trim()) nextErrors.category = 'Please enter a category.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    await onSubmit({
      title: values.title.trim(),
      excerpt: values.excerpt.trim(),
      content: values.content.trim(),
      author: values.author.trim(),
      category: values.category.trim(),
      published: values.published
    });

    if (!editingPost) {
      setValues(initialValues);
    }
  };

  return (
    <section className="panel p-6">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slateblue dark:text-slate-300">
          {editingPost ? 'Edit post' : 'New post'}
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-ink dark:text-white">
          {editingPost ? 'Update an existing post' : 'Write a blog post'}
        </h2>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Title
          <input
            value={values.title}
            onChange={(event) => setValues((current) => ({ ...current, title: event.target.value }))}
            className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-slateblue dark:bg-slate-900"
          />
          {errors.title ? <span className="mt-2 block text-sm text-rose-600">{errors.title}</span> : null}
        </label>

        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Excerpt
          <textarea
            rows={3}
            value={values.excerpt}
            onChange={(event) => setValues((current) => ({ ...current, excerpt: event.target.value }))}
            className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-slateblue dark:bg-slate-900"
          />
          {errors.excerpt ? <span className="mt-2 block text-sm text-rose-600">{errors.excerpt}</span> : null}
        </label>

        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Content
          <textarea
            rows={8}
            value={values.content}
            onChange={(event) => setValues((current) => ({ ...current, content: event.target.value }))}
            className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-slateblue dark:bg-slate-900"
          />
          {errors.content ? <span className="mt-2 block text-sm text-rose-600">{errors.content}</span> : null}
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Author
            <input
              value={values.author}
              onChange={(event) => setValues((current) => ({ ...current, author: event.target.value }))}
              className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-slateblue dark:bg-slate-900"
            />
            {errors.author ? <span className="mt-2 block text-sm text-rose-600">{errors.author}</span> : null}
          </label>

          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Category
            <input
              value={values.category}
              onChange={(event) => setValues((current) => ({ ...current, category: event.target.value }))}
              className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-slateblue dark:bg-slate-900"
            />
            {errors.category ? <span className="mt-2 block text-sm text-rose-600">{errors.category}</span> : null}
          </label>
        </div>

        <label className="inline-flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
          <input
            type="checkbox"
            checked={values.published}
            onChange={(event) => setValues((current) => ({ ...current, published: event.target.checked }))}
            className="h-4 w-4 rounded border-slate-300 text-slateblue focus:ring-slateblue"
          />
          Publish immediately
        </label>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-slateblue px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#27445f] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Saving...' : editingPost ? 'Save Changes' : 'Create Post'}
          </button>

          {editingPost ? (
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
