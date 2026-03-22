import type { BlogPost } from '../../blogTypes';

type BlogDemoStatsProps = {
  posts: BlogPost[];
};

export function BlogDemoStats({ posts }: BlogDemoStatsProps) {
  const publishedPosts = posts.filter((post) => post.published).length;
  const draftPosts = posts.length - publishedPosts;
  const categories = new Set(posts.map((post) => post.category)).size;

  const items = [
    { label: 'Total posts', value: posts.length },
    { label: 'Published', value: publishedPosts },
    { label: 'Drafts', value: draftPosts },
    { label: 'Categories', value: categories }
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <article key={item.label} className="panel p-5">
          <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-ink dark:text-white">{item.value}</p>
        </article>
      ))}
    </section>
  );
}
