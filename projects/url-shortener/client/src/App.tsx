import { FeedbackBanner } from './components/common/FeedbackBanner';
import { LoadingPanel } from './components/common/LoadingPanel';
import { AppHeader } from './components/shortener/AppHeader';
import { HowItWorks } from './components/shortener/HowItWorks';
import { LinkAnalytics } from './components/shortener/LinkAnalytics';
import { LinkList } from './components/shortener/LinkList';
import { ProjectHero } from './components/shortener/ProjectHero';
import { ShortenForm } from './components/shortener/ShortenForm';
import { StatsOverview } from './components/shortener/StatsOverview';
import { useUrlShortener } from './hooks/useUrlShortener';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme, toggleTheme } = useTheme();
  const {
    links,
    selectedLink,
    isLoading,
    isSubmitting,
    errorMessage,
    stats,
    createShortLink,
    selectLink,
    copyShortLink
  } = useUrlShortener();

  return (
    <div className="min-h-screen">
      <AppHeader theme={theme} onToggleTheme={toggleTheme} />

      <main className="section-spacing">
        <div className="container-shell space-y-8">
          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <ProjectHero />
            <ShortenForm onSubmit={createShortLink} isSubmitting={isSubmitting} />
          </section>

          <StatsOverview
            totalLinks={stats.totalLinks}
            totalClicks={stats.totalClicks}
            activeLinks={stats.activeLinks}
          />
          <HowItWorks />

          {errorMessage ? <FeedbackBanner message={errorMessage} /> : null}

          <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            {isLoading ? (
              <LoadingPanel
                title="Loading links"
                description="The app is fetching shortened links and preparing the analytics overview."
              />
            ) : (
              <LinkList
                links={links}
                selectedLinkId={selectedLink?.id ?? null}
                onSelectLink={selectLink}
                onCopyLink={copyShortLink}
              />
            )}

            <LinkAnalytics link={selectedLink} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
