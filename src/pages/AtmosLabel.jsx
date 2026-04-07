import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import ScrambleText from '../components/ScrambleText';
import atmosLogoOffWhite from '../components/img/atmos-logo/ATMOS-Off-White.png';
import './AtmosLabel.css';

export default function AtmosLabel() {
  const containerRef = useRef(null);
  
  // High-performance scroll tracking via Framer Motion
  const { scrollYProgress } = useScroll();

  // Hero Parallax
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);

  // Manifesto Statement 1 Physics
  const m1Opacity = useTransform(scrollYProgress, [0.05, 0.15, 0.25], [0, 1, 0]);
  const m1Scale = useTransform(scrollYProgress, [0.05, 0.15, 0.25], [0.8, 1, 1.2]);
  
  // Manifesto Statement 2 Physics
  const m2Opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0, 1, 0]);
  const m2Y = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [100, 0, -100]);

  // Expandable Div Tracker
  const [activeDivision, setActiveDivision] = useState(null);

  // Preloader State
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Hide preloader after immersive sequence
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 2400); // 2.4s to let the logo breathe before snapping to nav
    return () => clearTimeout(timer);
  }, []);

  // Philosophy section sticky background tracker
  const [activePhil, setActivePhil] = useState(0);
  const philImages = [
    "https://i.pinimg.com/1200x/fb/42/5a/fb425ad6333b8a49fa775171f44e06a1.jpg", // Yujin
    "https://i.pinimg.com/1200x/0c/fd/b2/0cfdb202a2ba0a04987759525b43ec2b.jpg", // Natty
    "https://i.pinimg.com/736x/1c/5d/e5/1c5de5294c035d358c6a8fb99e3fc6b9.jpg"  // Danielle
  ];

  // Mouse Hover Tracker for "Tingly" Floating Images
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 200, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const handleMouse = (e) => {
      // Offset by half dimensions of the floating 250x350 image
      mouseX.set(e.clientX - 125);
      mouseY.set(e.clientY - 175);
    }
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  // Data for accordion
  const divisions = [
    { id: '3.1', name: 'MUSIC DIVISION', focus: 'Plateau-based pop production', mandate: 'Prioritizing a consistent, unbroken atmosphere over traditional "build-and-drop" auditory structures.' },
    { id: '3.2', name: 'VISUAL UNIT', focus: 'Art direction & performance language', mandate: 'Operating strictly under the architectural rule of "Deliberate, not decorative."' },
    { id: '3.3', name: 'APPAREL', focus: 'Functional lifestyle systems', mandate: 'Extending the ATMOS environment into the physical daily routines and urban lives.' }
  ];

  const hoverImages = [
    "https://i.pinimg.com/1200x/9c/09/29/9c0929545eb1f3283d460d2e23a0ca71.jpg", // Natty
    "https://i.pinimg.com/1200x/70/20/12/702012d20e4312fa7d89cc692aba2d4a.jpg", // Minji
    "https://i.pinimg.com/736x/c2/fc/d4/c2fcd47b35f66cbabe93b2a199ce5b15.jpg"  // Danielle
  ];

  return (
    <motion.div 
      className="atmos-container" 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <AnimatePresence>
        {showPreloader && (
          <motion.div
            className="atmos-preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="preloader-logo-container"
            >
              <motion.img 
                layoutId="main-atmos-logo"
                src={atmosLogoOffWhite}
                alt="ATMOS Preloader Logo" 
                className="preloader-logo-img"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Hover Image for highly immersive divisions scrub interaction */}
      <motion.div 
        className="floating-hover-image"
        style={{
          x: springX,
          y: springY,
          opacity: activeDivision !== null ? 1 : 0,
          scale: activeDivision !== null ? 1 : 0.8,
          backgroundImage: activeDivision !== null ? `url('${hoverImages[activeDivision]}')` : 'none'
        }}
      />

      <header className="atmos-header">
        <nav className="atmos-nav">
          <Link to="/" className="atmos-logo-link">
            <div className="nav-logo-wrapper">
              {!showPreloader && (
                <motion.img 
                  layoutId="main-atmos-logo"
                  src={atmosLogoOffWhite}
                  alt="ATMOS"
                  className="nav-logo-img"
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </div>
            {!showPreloader && (
               <motion.span 
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 1, duration: 0.8 }}
                 style={{ marginLeft: '1rem' }}
               >
                 <ScrambleText text="ATMOS" />
               </motion.span>
            )}
          </Link>
          <Link to="/unraw" className="status sys-text" style={{ textDecoration: 'none', borderBottom: '1px solid #555' }}>
            <div className="dot"></div>
            <ScrambleText text="ENTER: UNRAW SYNC" />
          </Link>
        </nav>
      </header>

      {/* Cinematic Hero */}
      <motion.section className="atmos-hero-sticky" style={{ opacity: heroOpacity, scale: heroScale }}>
        
        {/* Massive Background Logo Parallax */}
        <motion.img 
          src={atmosLogoOffWhite}
          alt="ATMOS Massive Background" 
          className="hero-massive-logo"
          style={{
             y: useTransform(scrollYProgress, [0, 1], [0, 1200]),
             rotate: useTransform(scrollYProgress, [0, 1], [0, 25]),
             opacity: 0.04
          }}
        />

        <div className="hero-content" style={{maxWidth: '1200px'}}>
          <div className="sys-text" style={{marginBottom: '2rem'}}>Est. 2025 // Label & Architectural Collective</div>
          <h1 className="hero-title">The<br/>Architectural<br/>Label.</h1>
          <p className="hero-subtitle" style={{fontSize: '1.2rem', maxWidth: '600px', color: 'var(--text-light)'}}>Operating at the intersection of music, design, and lifestyle systems. Rejecting consumption-based cycles to construct continuous sensory environments.</p>
        </div>
      </motion.section>

      {/* Manifesto Journey */}
      <section className="manifesto-track">
        
        {/* Full Viewport Parallax Background Images */}
        <motion.div className="manifesto-bg" style={{ opacity: m1Opacity, backgroundImage: `url('https://i.pinimg.com/1200x/70/20/12/702012d20e4312fa7d89cc692aba2d4a.jpg')` }} />
        <motion.div className="manifesto-bg" style={{ opacity: m2Opacity, backgroundImage: `url('https://i.pinimg.com/1200x/9c/09/29/9c0929545eb1f3283d460d2e23a0ca71.jpg')` }} />
        
        <motion.div className="manifesto-statement" style={{ opacity: m1Opacity, scale: m1Scale }}>
          <h2>REDEFINE<br/>THE SYSTEM.</h2>
          <p>We reject traditional entertainment norms and volatile consumption cycles for stability.</p>
        </motion.div>
        
        <motion.div className="manifesto-statement right-align" style={{ opacity: m2Opacity, y: m2Y }}>
          <h2>CONSTRUCTING<br/>REALITIES.</h2>
          <p>Instead of isolated products, we build continuous, sustained sensory environments.</p>
        </motion.div>
      </section>

      {/* Architecture Sticky Layout */}
      <section className="philosophy-sticky-container">
        <div className="sticky-sidebar">
          {/* Dynamically crossfading Editorial Crops */}
          {philImages.map((src, idx) => (
            <motion.div 
              key={idx}
              className="sidebar-image-bg" 
              style={{ backgroundImage: `url('${src}')` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: activePhil === idx ? 0.35 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          ))}
          <span className="section-num" style={{ position: 'relative', zIndex: 2 }}>02</span>
          <h2 className="section-title" style={{marginTop:'1rem', position: 'relative', zIndex: 2}}><ScrambleText text="PHILOSOPHY" /></h2>
        </div>
        <div className="sticky-content">
          <motion.div className="philosophy-block" onViewportEnter={() => setActivePhil(0)} viewport={{ amount: 0.25, margin: "-10% 0px -10% 0px" }}>
            <h3><ScrambleText text="CONSTANT-STATE" /><br/><ScrambleText text="DESIGN" /></h3>
            <p>Unlike traditional models relying on emotional "spikes" or "hype cycles," ATMOS develops systems to sustain a singular, prolonged feeling.</p>
          </motion.div>
          <motion.div className="philosophy-block" onViewportEnter={() => setActivePhil(1)} viewport={{ amount: 0.25, margin: "-10% 0px -10% 0px" }}>
            <h3><ScrambleText text="ANTI-CONCEPT" /><br/><ScrambleText text="IDENTITY" /></h3>
            <p>The label operates without fixed themes or "eras." Our identity evolves naturally. We rigidly avoid radical, forced rebranding.</p>
          </motion.div>
          <motion.div className="philosophy-block" onViewportEnter={() => setActivePhil(2)} viewport={{ amount: 0.25, margin: "-10% 0px -10% 0px" }}>
            <h3><ScrambleText text="FUNCTIONAL" /><br/><ScrambleText text="AESTHETIC" /></h3>
            <p>If an element does not serve a tangible function in real life, it is permanently excluded. Deliberate. Usable. Stripped of noise.</p>
          </motion.div>
        </div>
      </section>

      {/* Divisions Brutalist Accordion */}
      <section className="divisions-section">
        <div style={{marginBottom: '4rem'}}>
          <span className="section-num">03</span>
          <h2 className="section-title" style={{marginTop:'1rem'}}>CREATIVE DIVISIONS</h2>
        </div>
        
        <div className="accordion-container">
          {divisions.map((div, i) => (
            <div 
              key={div.id} 
              className={`accordion-item ${activeDivision === i ? 'expanded' : ''}`}
              onMouseEnter={() => setActiveDivision(i)}
              onMouseLeave={() => setActiveDivision(null)}
            >
              <div className="accordion-head">
                <span className="accordion-id">{div.id}</span>
                <h3 className="accordion-title"><ScrambleText text={div.name} trigger={activeDivision === i} /></h3>
              </div>
              <div className="accordion-body">
                <div className="accordion-content">
                  <div className="acc-col">
                    <span className="sys-text">PRIMARY FOCUS</span>
                    <p style={{fontSize: '1.25rem'}}>{div.focus}</p>
                  </div>
                  <div className="acc-col">
                    <span className="sys-text">CORE MANDATE</span>
                    <p style={{fontFamily: 'var(--font-mono)', color: 'var(--text-light)', lineHeight: '1.6'}}>{div.mandate}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Extreme Marquee */}
      <div className="marquee-container">
        <div className="marquee-track">
           <span>FUNCTIONAL BRUTALISM // SEOUL GLOBALLY // </span>
           <span>FUNCTIONAL BRUTALISM // SEOUL GLOBALLY // </span>
           <span>FUNCTIONAL BRUTALISM // SEOUL GLOBALLY // </span>
           <span>FUNCTIONAL BRUTALISM // SEOUL GLOBALLY // </span>
        </div>
      </div>

      <footer className="atmos-footer" style={{borderTop:'none', background: 'var(--text-base)', color: 'var(--bg-color)'}}>
        <div className="sys-text" style={{color: 'var(--border-color)'}}>© 2026 ATMOS LABEL</div>
        <div className="sys-text" style={{color: 'var(--border-color)'}}>SEOUL / SOUTH KOREA</div>
        <div className="sys-text" style={{color: 'var(--border-color)'}}>SYSTEM.STATE: STABLE</div>
      </footer>
    </motion.div>
  );
}
