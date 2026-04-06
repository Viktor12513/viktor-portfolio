import { useEffect, useState } from 'react';
import { AlertCircle, LoaderCircle } from 'lucide-react';
import { AppHeader } from './components/blog/AppHeader';
import { HowItWorks } from './components/blog/HowItWorks';
import { PostForm } from './components/blog/PostForm';
import { PostList } from './components/blog/PostList';
import { PostStats } from './components/blog/PostStats';
import { ProjectHero } from './components/blog/ProjectHero';
import { useTheme } from './hooks/useTheme';
import { postApi } from './lib/postApi';
import type { BlogPost, PostFormValues } from './types/post';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [busyPostId, setBusyPostId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const response = await postApi.getPosts();
        setPosts(response);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Could not load posts.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadPosts();
  }, []);

  const handleSavePost = async (values: PostFormValues) => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      if (editingPost) {
        const updatedPost = await postApi.updatePost(editingPost.id, values);
        setPosts((currentPosts) =>
          currentPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
        );
        setEditingPost(null);
      } else {
        const createdPost = await postApi.createPost(values);
        setPosts((currentPosts) => [createdPost, ...currentPosts]);
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not save this post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePost = async (postId: number) => {
    setBusyPostId(postId);
    setErrorMessage('');

    try {
      await postApi.deletePost(postId);
      setPosts((currentPosts) => currentPosts.filter((post) => post.id !== postId));

      if (editingPost?.id === postId) {
        setEditingPost(null);
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not delete this post.');
    } finally {
      setBusyPostId(null);
    }
  };

  return (
    <div className="min-h-screen">
      <AppHeader theme={theme} onToggleTheme={toggleTheme} />

      <main className="section-spacing">
        <div className="container-shell space-y-8">
          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <ProjectHero />
            <PostForm
              editingPost={editingPost}
              onSubmit={handleSavePost}
              onCancelEdit={() => setEditingPost(null)}
              isSubmitting={isSubmitting}
            />
          </section>

          <PostStats posts={posts} />
          <HowItWorks />

          {errorMessage ? (
            <section className="panel flex items-start gap-3 border border-rose-200 p-5 text-rose-700 dark:border-rose-950 dark:text-rose-300">
              <AlertCircle className="mt-0.5" size={18} />
              <p className="text-sm leading-7">{errorMessage}</p>
            </section>
          ) : null}

          {isLoading ? (
            <section className="panel flex min-h-64 flex-col items-center justify-center p-8 text-center">
              <LoaderCircle className="animate-spin text-slateblue" size={30} />
              <h2 className="mt-5 text-2xl font-semibold text-ink dark:text-white">Loading posts</h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                The app is fetching posts from the backend API and preparing the content dashboard.
              </p>
            </section>
          ) : (
            <PostList posts={posts} busyPostId={busyPostId} onEdit={setEditingPost} onDelete={handleDeletePost} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
