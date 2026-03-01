import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InitialLoader from './components/InitialLoader';
import Home from './pages/Home';
import Astronomica from './pages/Astronomica';
import Team from './pages/Team';
import Gallery from './pages/Gallery';
import Orbits from './pages/Orbits';
import Contact from './pages/Contact';
import './App.css';


function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      {isLoading && <InitialLoader onComplete={() => setIsLoading(false)} />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/astronomica" element={<Astronomica />} />
        <Route path="/team" element={<Team />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/orbits" element={<Orbits />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
