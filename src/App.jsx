import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import AtmosLabel from './pages/AtmosLabel';
import UnrawArtist from './pages/UnrawArtist';
import CustomCursor from './components/CustomCursor';
import NoiseOverlay from './components/NoiseOverlay';

function App() {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // Extended for heavy, high-momentum cinematic feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <NoiseOverlay />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AtmosLabel />} />
          <Route path="/unraw" element={<UnrawArtist />} />
        </Routes>
      </AnimatePresence>
      <CustomCursor />
    </>
  );
}

export default App;
