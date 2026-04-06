import { LoadingPanel } from './components/common/LoadingPanel';
import { StatusBanner } from './components/common/StatusBanner';
import { AppHeader } from './components/tasks/AppHeader';
import { HowItWorks } from './components/tasks/HowItWorks';
import { ProjectHero } from './components/tasks/ProjectHero';
import { TaskFilters } from './components/tasks/TaskFilters';
import { TaskForm } from './components/tasks/TaskForm';
import { TaskList } from './components/tasks/TaskList';
import { TaskSummary } from './components/tasks/TaskSummary';
import { useTaskManager } from './hooks/useTaskManager';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme, toggleTheme } = useTheme();
  const {
    tasks,
    filteredTasks,
    activeFilter,
    editingTask,
    isLoading,
    isSubmitting,
    busyTaskId,
    errorMessage,
    setActiveFilter,
    setEditingTask,
    saveTask,
    toggleComplete,
    deleteTask
  } = useTaskManager();

  return (
    <div className="min-h-screen">
      <AppHeader theme={theme} onToggleTheme={toggleTheme} />

      <main className="section-spacing">
        <div className="container-shell space-y-8">
          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <ProjectHero />

            <TaskForm
              onSubmit={saveTask}
              editingTask={editingTask}
              onCancelEdit={() => setEditingTask(null)}
              isSubmitting={isSubmitting}
            />
          </section>

          <TaskSummary tasks={tasks} />

          {errorMessage ? <StatusBanner message={errorMessage} /> : null}

          <HowItWorks />

          <section className="panel p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slateblue dark:text-slate-300">
                  Task list
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-ink dark:text-white">Track progress clearly</h2>
              </div>
              <TaskFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            </div>
          </section>

          {isLoading ? (
            <LoadingPanel
              title="Loading tasks"
              description="The app is fetching the current task list from the backend API."
            />
          ) : tasks.length === 0 && errorMessage ? (
            <LoadingPanel
              mode="error"
              title="Could not load tasks"
              description="Make sure the backend is running and the API URL is configured correctly, then refresh the page."
            />
          ) : (
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={toggleComplete}
              onEdit={setEditingTask}
              onDelete={deleteTask}
              busyTaskId={busyTaskId}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
