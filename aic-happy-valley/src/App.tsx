import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { RequireAuth } from './components/RequireAuth';
import PWAInstallPrompt from './components/PWAInstallPrompt';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Sermons = lazy(() => import('./pages/Sermons'));
const Events = lazy(() => import('./pages/Events'));
const Ministries = lazy(() => import('./pages/Ministries'));
const Contact = lazy(() => import('./pages/Contact'));
const Giving = lazy(() => import('./pages/Giving'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Login = lazy(() => import('./pages/Login'));
const Admin = lazy(() => import('./pages/Admin'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-10 w-10 border-2 border-t-brand-sage border-brand-cream" />
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <Router>
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
                <Route path="/gallery" element={<Gallery />} />
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
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
