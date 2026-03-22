import { Pencil, Trash2 } from 'lucide-react';
import type { BlogPost } from '../../types/post';

type PostListProps = {
  posts: BlogPost[];
  busyPostId: number | null;
  onEdit: (post: BlogPost) => void;
  onDelete: (postId: number) => Promise<void>;
};

export function PostList({ posts, busyPostId, onEdit, onDelete }: PostListProps) {
  if (posts.length === 0) {
    return (
      <section className="panel p-8 text-center">
        <h2 className="text-2xl font-semibold text-ink dark:text-white">No posts yet</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          Create your first blog post to start building the content dashboard.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      {posts.map((post) => {
        const isBusy = busyPostId === post.id;

        return (
          <article key={post.id} className="panel p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-2xl font-semibold text-ink dark:text-white">{post.title}</h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      post.published
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </div>

                <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{post.content}</p>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <span>By {post.author}</span>
                  <span>{post.category}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => onEdit(post)}
                  disabled={isBusy}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-white disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(post.id)}
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
