import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { RequireAuth } from './features/auth/components/RequireAuth';
import AppInstallFAB from './features/misc/components/AppInstallFAB';
import NotificationModal from './features/misc/components/NotificationModal';
import OfflineIndicator from './features/misc/components/OfflineIndicator';

import ScrollToTop from './components/layout/ScrollToTop';
import ScrollUpButton from './components/layout/ScrollUpButton';
import AppBootloader from './components/layout/AppBootloader';
import OnboardingController from './components/layout/OnboardingController';
import { BibleSyncProvider } from './providers/BibleSyncProvider';

// Lazy-loaded routes for code splitting — reduces initial bundle size
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const PastorProfile = lazy(() => import('./pages/PastorProfile'));
const Sermons = lazy(() => import('./features/sermons/routes/Sermons'));
const Events = lazy(() => import('./features/events/routes/Events'));
const Ministries = lazy(() => import('./features/ministries/routes/Ministries'));
const Giving = lazy(() => import('./pages/Giving'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./features/auth/routes/Login'));
const Admin = lazy(() => import('./features/admin/routes/Admin'));
const SermonDetail = lazy(() => import('./features/sermons/routes/SermonDetail'));
const EventDetail = lazy(() => import('./features/events/routes/EventDetail'));
const MinistryDetail = lazy(() => import('./features/ministries/routes/MinistryDetail'));
const DailyWord = lazy(() => import('./features/bible/routes/DailyWord'));
const BibleReader = lazy(() => import('./features/bible/routes/BibleReader'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const AppInstallPage = lazy(() => import('./features/misc/routes/AppInstallPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" aria-label="Loading page" />
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <BibleSyncProvider>
        <Router>
          <ScrollToTop />
          <OnboardingController />
          <AppBootloader>
            <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
              <AppInstallFAB />
              <ScrollUpButton />
              <NotificationModal />
              <OfflineIndicator />
              <Navbar />
              <main className="flex-grow overflow-x-hidden">
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/about/pastors/:id" element={<PastorProfile />} />
                    <Route path="/sermons" element={<Sermons />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/ministries" element={<Ministries />} />
                    <Route path="/ministries/:id" element={<MinistryDetail />} />
                    <Route path="/daily-word" element={<DailyWord />} />
                    <Route path="/bible" element={<BibleReader />} />
                    <Route path="/app" element={<AppInstallPage />} />
                    <Route path="/giving" element={<Giving />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/sermons/:id" element={<SermonDetail />} />
                    <Route path="/events/:id" element={<EventDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                      path="/admin"
                      element={
                        <RequireAuth>
                          <Admin />
                        </RequireAuth>
                      }
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </AppBootloader>
        </Router>
      </BibleSyncProvider>
    </HelmetProvider>
  );
}

export default App;
