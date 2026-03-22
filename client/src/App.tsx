import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, FolderCode, Github, Linkedin, LoaderCircle, Mail, MapPin } from 'lucide-react';
import { blogApi } from './blogApi';
import type { BlogPost, PostFormValues } from './blogTypes';
import { BlogDemoForm } from './components/blog-demo/BlogDemoForm';
import { BlogDemoHeader } from './components/blog-demo/BlogDemoHeader';
import { BlogDemoList } from './components/blog-demo/BlogDemoList';
import { BlogDemoStats } from './components/blog-demo/BlogDemoStats';
import { ContactForm } from './components/ContactForm';
import { ExpenseDemoForm } from './components/expense-demo/ExpenseDemoForm';
import { ExpenseDemoHeader } from './components/expense-demo/ExpenseDemoHeader';
import { ExpenseDemoList } from './components/expense-demo/ExpenseDemoList';
import { ExpenseDemoSummary } from './components/expense-demo/ExpenseDemoSummary';
import { Header } from './components/Header';
import { ProjectCard } from './components/ProjectCard';
import { SectionHeading } from './components/SectionHeading';
import { SkillGroupCard } from './components/SkillGroupCard';
import { UrlDemoAnalytics } from './components/url-demo/UrlDemoAnalytics';
import { UrlDemoForm } from './components/url-demo/UrlDemoForm';
import { UrlDemoHeader } from './components/url-demo/UrlDemoHeader';
import { UrlDemoList } from './components/url-demo/UrlDemoList';
import { TaskDemoFilters } from './components/task-demo/TaskDemoFilters';
import { TaskDemoForm } from './components/task-demo/TaskDemoForm';
import { TaskDemoHeader } from './components/task-demo/TaskDemoHeader';
import { TaskDemoList } from './components/task-demo/TaskDemoList';
import { portfolioContent } from './data/portfolio';
import { expenseApi } from './expenseApi';
import type { CategorySummary, ExpenseEntry, ExpenseFormValues } from './expenseTypes';
import { useShortenerDemo } from './hooks/useShortenerDemo';
import { taskApi } from './taskApi';
import type { ShortenValues } from './shortenerTypes';
import type { Task, TaskFormValues, TaskStatusFilter } from './taskTypes';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [isSubmittingPost, setIsSubmittingPost] = useState(false);
  const [busyPostId, setBusyPostId] = useState<number | null>(null);
  const [postError, setPostError] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeFilter, setActiveFilter] = useState<TaskStatusFilter>('all');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [isSubmittingTask, setIsSubmittingTask] = useState(false);
  const [busyTaskId, setBusyTaskId] = useState<number | null>(null);
  const [taskError, setTaskError] = useState('');
  const [entries, setEntries] = useState<ExpenseEntry[]>([]);
  const [isLoadingEntries, setIsLoadingEntries] = useState(true);
  const [isSubmittingEntry, setIsSubmittingEntry] = useState(false);
  const [busyEntryId, setBusyEntryId] = useState<number | null>(null);
  const [entryError, setEntryError] = useState('');
  const {
    links,
    selectedLink,
    isLoading: isLoadingLinks,
    isSubmitting: isSubmittingLink,
    errorMessage: linkError,
    createLink,
    selectLink,
    copyLink
  } = useShortenerDemo();

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoadingPosts(true);
      setPostError('');

      try {
        const response = await blogApi.getPosts();
        setPosts(response);
      } catch (error) {
        setPostError(error instanceof Error ? error.message : 'Could not load blog demo data.');
      } finally {
        setIsLoadingPosts(false);
      }
    };

    void loadPosts();
  }, []);

  useEffect(() => {
    const loadTasks = async () => {
      setIsLoadingTasks(true);
      setTaskError('');

      try {
        const response = await taskApi.getTasks();
        setTasks(response);
      } catch (error) {
        setTaskError(error instanceof Error ? error.message : 'Could not load task demo data.');
      } finally {
        setIsLoadingTasks(false);
      }
    };

    void loadTasks();
  }, []);

  useEffect(() => {
    const loadEntries = async () => {
      setIsLoadingEntries(true);
      setEntryError('');

      try {
        const response = await expenseApi.getEntries();
        setEntries(response);
      } catch (error) {
        setEntryError(error instanceof Error ? error.message : 'Could not load expense demo data.');
      } finally {
        setIsLoadingEntries(false);
      }
    };

    void loadEntries();
  }, []);

  const filteredTasks = useMemo(() => {
    if (activeFilter === 'active') {
      return tasks.filter((task) => !task.completed);
    }

    if (activeFilter === 'completed') {
      return tasks.filter((task) => task.completed);
    }

    return tasks;
  }, [activeFilter, tasks]);

  const categorySummaries = useMemo<CategorySummary[]>(() => {
    const groupedEntries = new Map<string, CategorySummary>();

    entries.forEach((entry) => {
      const key = `${entry.type}-${entry.category.toLowerCase()}`;
      const existingSummary = groupedEntries.get(key);

      if (existingSummary) {
        existingSummary.total += entry.amount;
        return;
      }

      groupedEntries.set(key, {
        category: entry.category,
        total: entry.amount,
        type: entry.type
      });
    });

    return [...groupedEntries.values()].sort((firstSummary, secondSummary) => secondSummary.total - firstSummary.total);
  }, [entries]);

  const handleSavePost = async (values: PostFormValues) => {
    setIsSubmittingPost(true);
    setPostError('');

    try {
      if (editingPost) {
        const updatedPost = await blogApi.updatePost(editingPost.id, values);
        setPosts((currentPosts) =>
          currentPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
        );
        setEditingPost(null);
        return;
      }

      const createdPost = await blogApi.createPost(values);
      setPosts((currentPosts) => [createdPost, ...currentPosts]);
    } catch (error) {
      setPostError(error instanceof Error ? error.message : 'Could not save this post.');
    } finally {
      setIsSubmittingPost(false);
    }
  };

  const handleDeletePost = async (postId: number) => {
    setBusyPostId(postId);
    setPostError('');

    try {
      await blogApi.deletePost(postId);
      setPosts((currentPosts) => currentPosts.filter((post) => post.id !== postId));

      if (editingPost?.id === postId) {
        setEditingPost(null);
      }
    } catch (error) {
      setPostError(error instanceof Error ? error.message : 'Could not delete this post.');
    } finally {
      setBusyPostId(null);
    }
  };

  const handleCreateOrUpdateTask = async (values: TaskFormValues) => {
    setIsSubmittingTask(true);
    setTaskError('');

    try {
      if (editingTask) {
        const updatedTask = await taskApi.updateTask(editingTask.id, values);
        setTasks((current) => current.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
        setEditingTask(null);
        return;
      }

      const newTask = await taskApi.createTask(values);
      setTasks((current) => [newTask, ...current]);
    } catch (error) {
      setTaskError(error instanceof Error ? error.message : 'Could not save the task.');
    } finally {
      setIsSubmittingTask(false);
    }
  };

  const handleToggleTaskComplete = async (task: Task) => {
    setBusyTaskId(task.id);
    setTaskError('');

    try {
      const updatedTask = await taskApi.updateTask(task.id, { completed: !task.completed });
      setTasks((current) => current.map((item) => (item.id === updatedTask.id ? updatedTask : item)));
      if (editingTask?.id === updatedTask.id) {
        setEditingTask(updatedTask);
      }
    } catch (error) {
      setTaskError(error instanceof Error ? error.message : 'Could not update this task.');
    } finally {
      setBusyTaskId(null);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    setBusyTaskId(taskId);
    setTaskError('');

    try {
      await taskApi.deleteTask(taskId);
      setTasks((current) => current.filter((task) => task.id !== taskId));
      if (editingTask?.id === taskId) {
        setEditingTask(null);
      }
    } catch (error) {
      setTaskError(error instanceof Error ? error.message : 'Could not delete this task.');
    } finally {
      setBusyTaskId(null);
    }
  };

  const handleCreateEntry = async (values: ExpenseFormValues) => {
    setIsSubmittingEntry(true);
    setEntryError('');

    try {
      const createdEntry = await expenseApi.createEntry({
        title: values.title.trim(),
        amount: Number(values.amount),
        category: values.category.trim(),
        type: values.type,
        date: values.date,
        notes: values.notes.trim()
      });

      setEntries((currentEntries) => [createdEntry, ...currentEntries]);
    } catch (error) {
      setEntryError(error instanceof Error ? error.message : 'Could not save this entry.');
    } finally {
      setIsSubmittingEntry(false);
    }
  };

  const handleDeleteEntry = async (entryId: number) => {
    setBusyEntryId(entryId);
    setEntryError('');

    try {
      await expenseApi.deleteEntry(entryId);
      setEntries((currentEntries) => currentEntries.filter((entry) => entry.id !== entryId));
    } catch (error) {
      setEntryError(error instanceof Error ? error.message : 'Could not delete this entry.');
    } finally {
      setBusyEntryId(null);
    }
  };

  return (
    <div className="min-h-screen">
      <Header
        name={portfolioContent.name}
        theme={theme}
        onToggleTheme={toggleTheme}
        github={portfolioContent.github}
        linkedin={portfolioContent.linkedin}
        email={portfolioContent.email}
      />

      <main>
        <section id="home" className="section-spacing">
          <div className="container-shell">
            <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="animate-rise">
                <p className="text-sm font-semibold uppercase tracking-[0.34em] text-slateblue dark:text-slate-300">
                  Building with curiosity
                </p>
                <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-tight text-ink dark:text-white sm:text-6xl">
                  {portfolioContent.name}
                </h1>
                <p className="mt-4 font-serif text-3xl italic text-slateblue dark:text-slate-200 sm:text-4xl">
                  {portfolioContent.title}
                </p>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                  {portfolioContent.intro}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="#projects"
                    className="rounded-full bg-slateblue px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#27445f]"
                  >
                    View Projects
                  </a>
                  <a
                    href="#contact"
                    className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
                  >
                    Contact
                  </a>
                </div>

                <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-600 dark:text-slate-300">
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={16} />
                    {portfolioContent.location}
                  </span>
                  <a
                    href={`mailto:${portfolioContent.email}`}
                    className="inline-flex items-center gap-2 hover:text-slateblue"
                  >
                    <Mail size={16} />
                    {portfolioContent.email}
                  </a>
                </div>
              </div>

              <div className="panel animate-rise p-6 [animation-delay:120ms]">
                <div className="rounded-[1.75rem] bg-gradient-to-br from-slateblue via-[#4e7c98] to-pine p-8 text-white">
                  <p className="text-sm uppercase tracking-[0.28em] text-white/80">Junior portfolio snapshot</p>
                  <div className="mt-8 space-y-5">
                    {portfolioContent.heroStats.map((stat) => (
                      <div key={stat.label} className="border-b border-white/20 pb-5 last:border-b-0 last:pb-0">
                        <p className="text-sm text-white/75">{stat.label}</p>
                        <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section-spacing">
          <div className="container-shell">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="max-w-2xl">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-slateblue dark:text-slate-300">
                  About
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-ink dark:text-white sm:text-4xl">
                  Learning fullstack development one project at a time
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                  I have been building hands-on projects to improve how I work across both frontend
                  and backend development. My goal is to keep turning what I learn into practical
                  apps that feel clear, useful, and well structured.
                </p>
                <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                  Most of my recent work has focused on CRUD flows, API integration, validation,
                  and understanding how data moves through an application from the UI to the server.
                </p>

                <div className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  <p>Building projects that are simple, realistic, and easy to explain</p>
                  <p>Improving confidence with React, TypeScript, Node.js, and Express</p>
                  <p>Practicing clean structure, readable code, and practical problem solving</p>
                </div>
              </div>

              <div className="panel p-8">
                <p className="text-base leading-8 text-slate-600 dark:text-slate-300">{portfolioContent.about}</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/60">
                    <p className="text-sm font-semibold text-ink dark:text-white">CRUD apps</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      Practicing create, read, update, and delete flows across frontend and backend.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/60">
                    <p className="text-sm font-semibold text-ink dark:text-white">APIs</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      Getting comfortable with REST routes, fetching data, and handling client state.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/60">
                    <p className="text-sm font-semibold text-ink dark:text-white">Backend basics</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      Learning app structure, validation, and how data moves through a server.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section-spacing">
          <div className="container-shell">
            <SectionHeading
              eyebrow="Projects"
              title="Realistic projects that show practical fullstack skills"
              description="These projects are meant to show practical frontend and backend skills through realistic junior-level applications, with embedded demos for the main portfolio pieces."
            />

            <div className="panel mt-8 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-slateblue p-3 text-white">
                  <FolderCode size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink dark:text-white">Included project source</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    `projects/task-manager/*`, `projects/blog-platform/*`, `projects/expense-tracker/*`, and
                    `projects/url-shortener/*`
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {portfolioContent.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section id="task-manager-demo" className="section-spacing">
          <div className="container-shell">
            <SectionHeading
              eyebrow="Project Demo"
              title="Task Manager Demo: practicing everyday CRUD workflows"
              description="This embedded Task Manager shows the core flow of a simple fullstack app: creating tasks, updating details, marking items as complete, and filtering results through a connected API."
            />

            <div className="mt-10 space-y-6">
              <TaskDemoHeader />

              <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                <TaskDemoForm
                  onSubmit={handleCreateOrUpdateTask}
                  editingTask={editingTask}
                  onCancelEdit={() => setEditingTask(null)}
                  isSubmitting={isSubmittingTask}
                />

                <div className="space-y-6">
                  <div className="panel p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slateblue dark:text-slate-300">
                          Demo Tasks
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold text-ink dark:text-white">Try the CRUD flow</h3>
                      </div>
                      <TaskDemoFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
                    </div>
                  </div>

                  {taskError ? (
                    <section className="panel flex items-start gap-3 border border-rose-200 p-5 text-rose-700 dark:border-rose-950 dark:text-rose-300">
                      <AlertCircle className="mt-0.5" size={18} />
                      <p className="text-sm leading-7">{taskError}</p>
                    </section>
                  ) : null}

                  {isLoadingTasks ? (
                    <section className="panel flex min-h-64 flex-col items-center justify-center p-8 text-center">
                      <LoaderCircle className="animate-spin text-slateblue" size={30} />
                      <h3 className="mt-5 text-2xl font-semibold text-ink dark:text-white">Loading demo tasks</h3>
                    </section>
                  ) : (
                    <TaskDemoList
                      tasks={filteredTasks}
                      busyTaskId={busyTaskId}
                      onEdit={setEditingTask}
                      onDelete={handleDeleteTask}
                      onToggleComplete={handleToggleTaskComplete}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="blog-platform-demo" className="section-spacing">
          <div className="container-shell">
            <SectionHeading
              eyebrow="Project Demo"
              title="Blog Platform Demo: a simple content management workflow"
              description="This section highlights a beginner-friendly blog dashboard where posts can be written, edited, published, and removed. It is meant to show form handling, reusable components, and a clean REST-based content flow."
            />

            <div className="mt-10 space-y-6">
              <BlogDemoHeader />
              <BlogDemoStats posts={posts} />

              <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                <BlogDemoForm
                  editingPost={editingPost}
                  onSubmit={handleSavePost}
                  onCancelEdit={() => setEditingPost(null)}
                  isSubmitting={isSubmittingPost}
                />

                <div className="space-y-6">
                  {postError ? (
                    <section className="panel flex items-start gap-3 border border-rose-200 p-5 text-rose-700 dark:border-rose-950 dark:text-rose-300">
                      <AlertCircle className="mt-0.5" size={18} />
                      <p className="text-sm leading-7">{postError}</p>
                    </section>
                  ) : null}

                  {isLoadingPosts ? (
                    <section className="panel flex min-h-64 flex-col items-center justify-center p-8 text-center">
                      <LoaderCircle className="animate-spin text-slateblue" size={30} />
                      <h3 className="mt-5 text-2xl font-semibold text-ink dark:text-white">Loading demo posts</h3>
                    </section>
                  ) : (
                    <BlogDemoList
                      posts={posts}
                      busyPostId={busyPostId}
                      onEdit={setEditingPost}
                      onDelete={handleDeletePost}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="expense-tracker-demo" className="section-spacing">
          <div className="container-shell">
            <SectionHeading
              eyebrow="Project Demo"
              title="Expense Tracker Demo: tracking entries and viewing summaries"
              description="This embedded Expense Tracker focuses on adding income and expense entries, removing them, and presenting totals in a clear way. It shows how frontend state, form validation, and backend data can work together in a simple project."
            />

            <div className="mt-10 space-y-6">
              <ExpenseDemoHeader />

              <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                <ExpenseDemoForm onSubmit={handleCreateEntry} isSubmitting={isSubmittingEntry} />

                <div className="space-y-6">
                  {entryError ? (
                    <section className="panel flex items-start gap-3 border border-rose-200 p-5 text-rose-700 dark:border-rose-950 dark:text-rose-300">
                      <AlertCircle className="mt-0.5" size={18} />
                      <p className="text-sm leading-7">{entryError}</p>
                    </section>
                  ) : null}

                  <ExpenseDemoSummary entries={entries} summaries={categorySummaries} />

                  {isLoadingEntries ? (
                    <section className="panel flex min-h-64 flex-col items-center justify-center p-8 text-center">
                      <LoaderCircle className="animate-spin text-slateblue" size={30} />
                      <h3 className="mt-5 text-2xl font-semibold text-ink dark:text-white">Loading demo entries</h3>
                    </section>
                  ) : (
                    <ExpenseDemoList entries={entries} busyEntryId={busyEntryId} onDelete={handleDeleteEntry} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="url-shortener-demo" className="section-spacing">
          <div className="container-shell">
            <SectionHeading
              eyebrow="Project Demo"
              title="URL Shortener Demo: link creation and basic analytics"
              description="This demo is more backend-focused. It shows how a short link can be created, stored, and tracked, with simple analytics that display click activity and make the request flow easier to understand."
            />

            <div className="mt-10 space-y-6">
              <UrlDemoHeader />

              <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                <UrlDemoForm onSubmit={(values: ShortenValues) => createLink(values)} isSubmitting={isSubmittingLink} />

                <div className="space-y-6">
                  {linkError ? (
                    <section className="panel flex items-start gap-3 border border-rose-200 p-5 text-rose-700 dark:border-rose-950 dark:text-rose-300">
                      <AlertCircle className="mt-0.5" size={18} />
                      <p className="text-sm leading-7">{linkError}</p>
                    </section>
                  ) : null}

                  {isLoadingLinks ? (
                    <section className="panel flex min-h-64 flex-col items-center justify-center p-8 text-center">
                      <LoaderCircle className="animate-spin text-slateblue" size={30} />
                      <h3 className="mt-5 text-2xl font-semibold text-ink dark:text-white">Loading short links</h3>
                    </section>
                  ) : (
                    <UrlDemoList
                      links={links}
                      selectedLinkId={selectedLink?.id ?? null}
                      onSelectLink={selectLink}
                      onCopyLink={copyLink}
                    />
                  )}

                  <UrlDemoAnalytics link={selectedLink} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section-spacing">
          <div className="container-shell">
            <SectionHeading
              eyebrow="Skills"
              title="Tools and technologies I am actively working with"
              description="Grouped clearly to make it easy for recruiters and hiring managers to scan."
            />

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {portfolioContent.skills.map((group) => (
                <SkillGroupCard key={group.title} group={group} />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-spacing">
          <div className="container-shell">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <SectionHeading
                  eyebrow="Contact"
                  title="Let's connect"
                  description="This section gives you a professional place to share your contact details and a simple message form."
                />

                <div className="panel mt-8 space-y-4 p-6">
                  <a
                    href={`mailto:${portfolioContent.email}`}
                    className="flex items-center gap-3 text-sm text-slate-700 hover:text-slateblue dark:text-slate-200"
                  >
                    <Mail size={18} />
                    {portfolioContent.email}
                  </a>
                  <a
                    href={portfolioContent.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-sm text-slate-700 hover:text-slateblue dark:text-slate-200"
                  >
                    <Github size={18} />
                    GitHub Profile
                  </a>
                  <a
                    href={portfolioContent.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-sm text-slate-700 hover:text-slateblue dark:text-slate-200"
                  >
                    <Linkedin size={18} />
                    LinkedIn Profile
                  </a>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
