import { LoadingPanel } from './components/common/LoadingPanel';
import { StatusBanner } from './components/common/StatusBanner';
import { AppHeader } from './components/expense/AppHeader';
import { CategorySummary } from './components/expense/CategorySummary';
import { ExpenseForm } from './components/expense/ExpenseForm';
import { ProjectHero } from './components/expense/ProjectHero';
import { RecentEntries } from './components/expense/RecentEntries';
import { SummaryCards } from './components/expense/SummaryCards';
import { useExpenseTracker } from './hooks/useExpenseTracker';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { entries, categorySummaries, isLoading, isSubmitting, busyEntryId, errorMessage, createEntry, deleteEntry } =
    useExpenseTracker();

  return (
    <div className="min-h-screen">
      <AppHeader theme={theme} onToggleTheme={toggleTheme} />

      <main className="section-spacing">
        <div className="container-shell space-y-8">
          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <ProjectHero />

            <ExpenseForm onSubmit={createEntry} isSubmitting={isSubmitting} />
          </section>

          <SummaryCards entries={entries} />

          {errorMessage ? <StatusBanner message={errorMessage} /> : null}

          <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
            <CategorySummary summaries={categorySummaries} />

            {isLoading ? (
              <LoadingPanel
                title="Loading entries"
                description="The app is fetching your current income and expense data."
              />
            ) : (
              <RecentEntries entries={entries} busyEntryId={busyEntryId} onDelete={deleteEntry} />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
