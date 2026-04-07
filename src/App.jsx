import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import AtmosLabel from './pages/AtmosLabel';
import UnrawArtist from './pages/UnrawArtist';
import AuthPage from './pages/AuthPage';
import CommunityEventsPage from './pages/CommunityEventsPage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CustomCursor from './components/CustomCursor';
import NoiseOverlay from './components/NoiseOverlay';
import AtmosBagSidebar from './components/AtmosBagSidebar';
import AtmosFooter from './components/AtmosFooter';

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
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/community" element={<CommunityEventsPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:id" element={<ProductDetailPage />} />
        </Routes>
      </AnimatePresence>
      <AtmosFooter />
      <AtmosBagSidebar />
      <CustomCursor />
    </>
  );
}

export default App;
