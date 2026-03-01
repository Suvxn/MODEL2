import React from 'react';
import SolarSystem from '../components/SolarSystem';
import Navbar from '../components/Navbar'; // Using the standard or GlassNavbar?
// Let's check App.jsx to see what Navbar is used generally, usually it's global.
// Usage in previous files suggests Navbar might be handled in Layout or App. 
// But if I'm replacing the whole page content, I should be careful. 
// The user just said "in blog page add the solar system".
// I will just render SolarSystem component for now as the main content.

const Orbits = () => {
    return (
        <div className="w-full h-screen bg-black overflow-hidden relative">
            {/* Background Solar System - Full Screen interactivity as requested */}
            <SolarSystem />

            {/* Overlay Content (Optional, if we want actual blogs over it, but user focused on the model) */}
            {/* For now, the SolarSystem component handles its own full screen Canvas */}
        </div>
    );
};

export default Orbits;
