import { useEffect } from 'react';
import { logEvent } from 'firebase/analytics';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Quiz from './pages/Quiz';
import ChatPage from './pages/ChatPage';
import GlossaryPage from './pages/Glossary';
import { analytics } from './services/firebase';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (!analytics) return;

    logEvent(analytics, 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${location.pathname}${location.search}`,
    });
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors dark:bg-gray-900 dark:text-gray-100">
      <a
        href="#main-content"
        className="focus-ring sr-only absolute left-4 top-4 z-50 rounded-md bg-blue-600 px-4 py-2 text-white focus:not-sr-only"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="mx-auto min-h-[calc(100vh-8rem)] max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
