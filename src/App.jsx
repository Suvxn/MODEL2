import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InitialLoader from './components/InitialLoader';
import Home from './pages/Home';
import Astronomica from './pages/Astronomica';
import Team from './pages/Team';
import Gallery from './pages/Gallery';
import Orbits from './pages/Orbits';
import Contact from './pages/Contact';
import { AnimatePresence } from 'framer-motion';
import './App.css';

// Wrapper component to handle routing logic for the loader
const AppContent = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false); // Track if animation played once

  useEffect(() => {
    // Only trigger loader if we haven't played it yet, AND we just navigated to '/'
    if (location.pathname === '/' && !hasLoaded) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [location.pathname, hasLoaded]);

  const handleLoaderComplete = () => {
    setIsLoading(false);
    setHasLoaded(true); // Ensure it doesn't run again for this session
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <InitialLoader onComplete={handleLoaderComplete} />}
      </AnimatePresence>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home isLoading={isLoading} />} />
        <Route path="/astronomica" element={<Astronomica />} />
        <Route path="/team" element={<Team />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/orbits" element={<Orbits />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
