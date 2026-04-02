import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { RequireAuth } from './components/RequireAuth';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { onMessageSubscription } from './services/notifications';
import { NotificationInvite } from './components/NotificationInvite';
import { showToast } from './utils/toast';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Sermons = lazy(() => import('./pages/Sermons'));
const Events = lazy(() => import('./pages/Events'));
const Ministries = lazy(() => import('./pages/Ministries'));
const Contact = lazy(() => import('./pages/Contact'));
const Giving = lazy(() => import('./pages/Giving'));
const Login = lazy(() => import('./pages/Login'));
const Admin = lazy(() => import('./pages/Admin'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));

const DailyWord = lazy(() => import('./features/bible/routes/DailyWord'));
const BibleReader = lazy(() => import('./features/bible/routes/BibleReader'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-10 w-10 border-2 border-t-brand-sage border-brand-cream" />
  </div>
);

function App() {
  const recaptchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    // Listen for messages using subscription pattern for reliability
    let unsubscribe: () => void = () => {};
    
    onMessageSubscription((payload: any) => {
      console.log('Received foreground message:', payload);
      // Show notification as a toast when the app is in foreground
      if (payload.notification) {
        showToast(`${payload.notification.title}: ${payload.notification.body}`, 'info');
      }
    }).then(unsub => {
      unsubscribe = unsub;
    });

    return () => unsubscribe();
  }, []);

  return (
    <HelmetProvider>
      <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey ? recaptchaKey : ""}>
        <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-brand-cream text-brand-darkGrey font-sans">
            <Navbar />
            <main className="flex-grow overflow-x-hidden">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/sermons" element={<Sermons />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/ministries" element={<Ministries />} />
                  <Route path="/giving" element={<Giving />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/daily-word" element={<DailyWord />} />
                  <Route path="/bible" element={<BibleReader />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/admin"
                    element={
                      <RequireAuth>
                        <Admin />
                      </RequireAuth>
                    }
                  />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <PWAInstallPrompt />
            <NotificationInvite />
          </div>
        </Router>
      </GoogleReCaptchaProvider>
    </HelmetProvider>
  );
}

export default App;
