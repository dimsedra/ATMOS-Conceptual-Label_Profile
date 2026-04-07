import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import YouTubePlayer from '../components/YouTubePlayer';
import ParallaxMemberCard from '../components/ParallaxMemberCard';
import ScrambleText from '../components/ScrambleText';
import './UnrawArtist.css';

export default function UnrawArtist() {
  const kineticCoreRef = useRef(null);
  const [activeSection, setActiveSection] = useState('sec-00');

  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      if (latest > 50 && !isScrolled) setIsScrolled(true);
      if (latest <= 50 && isScrolled) setIsScrolled(false);
    });
  }, [scrollY, isScrolled]);

  useEffect(() => {
    // Section Intersection Observer for Navigation
    const sectionElements = document.querySelectorAll('.target-section');
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionElements.forEach(sec => observer.observe(sec));

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if(el) {
      if (window.lenis) {
        window.lenis.scrollTo(el, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      } else {
        window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.div 
      className="unraw-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <nav className="unraw-nav">
        <Link to="/" className="back-to-atmos"><ScrambleText text="← ATMOS" /></Link>
        <button onClick={() => scrollToSection('sec-00')} className={`unraw-nav-node ${activeSection === 'sec-00' ? 'active' : ''}`}><ScrambleText text="00" /></button>
        <button onClick={() => scrollToSection('sec-01')} className={`unraw-nav-node ${activeSection === 'sec-01' ? 'active' : ''}`}><ScrambleText text="01" /></button>
        <button onClick={() => scrollToSection('sec-02')} className={`unraw-nav-node ${activeSection === 'sec-02' ? 'active' : ''}`}><ScrambleText text="02" /></button>
        <button onClick={() => scrollToSection('sec-03')} className={`unraw-nav-node ${activeSection === 'sec-03' ? 'active' : ''}`}><ScrambleText text="03" /></button>
      </nav>

      <section className="unraw-hero target-section" id="sec-00">
        
        {/* ATMOSPHERIC BACKGROUND VIDEO */}
        <div className="unraw-hero-bg">
          <div className="unraw-hero-overlay"></div>
          <iframe 
            src="https://www.youtube.com/embed/YedDBwTikzk?autoplay=1&mute=1&controls=0&loop=1&playlist=YedDBwTikzk&playsinline=1&modestbranding=1" 
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="UNRAW Kinetic State Background"
          />
        </div>

        <div className="data-overlay data-tl">
          SYS.STATE: KINETIC HIGH-COMPRESSION<br/>
          NO LOADING SCREEN
        </div>
        <h1 className={`hero-title-unraw ${isScrolled ? 'paused' : ''}`} id="kinetic-core" ref={kineticCoreRef}>UNRAW</h1>
        <div className="data-overlay data-br">
          ATMOS // ARCHITECTURAL LABEL<br/>
          NOT A CONCEPT. A WORLDVIEW.
        </div>
      </section>

      <section className="target-section" id="sec-01">
        <div className="unraw-section-header">
          <h2>THE SONIC<br/>ARCHITECTURE</h2>
          <div className="unraw-sys-id">SEC. 01</div>
        </div>
        <div style={{ padding: '0 3rem 4rem 3rem', borderBottom: '1px solid var(--grid-line)' }}>
          <YouTubePlayer videoId="S-VLzICd2FE" title="UNRAW KINETIC STATE MV" />
        </div>
        <div className="unraw-grid-container layout-3">
          <div className="unraw-grid-cell sonic-card">
            <h3>R&B ENGINE</h3>
            <p>Not mid-tempo nostalgia. The propulsive, high-BPM groove of peak Timbaland and early Destiny’s Child, stripped of softness. A rhythmic furnace that forces an output. The groove does not suggest movement; <strong>it mandates it</strong>.</p>
          </div>
          <div className="unraw-grid-cell sonic-card">
            <h3>POP PRECISION</h3>
            <p>Drawing from high-stakes theatricality, providing melodic compression and cold intensity. <strong>"Full-Scale Pop"</strong>—dramatic, nonstop, and intentionally over-engineered to feel like a persona, not a performance.</p>
          </div>
          <div className="unraw-grid-cell sonic-card">
            <h3>PLATEAU EFFECT</h3>
            <p>Every release is a non-stop sequence. No slow fade-in. You are immediately in the middle of a confrontation. High-momentum energy established in ten seconds and <strong>never released</strong>. The bass is an industrial constant.</p>
          </div>
        </div>
      </section>

      <section className="target-section" id="sec-02">
        <div className="unraw-section-header">
          <h2>DUAL-MODE<br/>INDUSTRIALISM</h2>
          <div className="unraw-sys-id">SEC. 02</div>
        </div>
        <div className="unraw-grid-container layout-2">
          <div className="unraw-grid-cell mode-panel mode-a">
            <div className="unraw-sys-id" style={{marginBottom: '1rem'}}>MODE A</div>
            <h3>THE POP<br/>KINETIC</h3>
            <p>Centrifugal: Energy exploding outward; a digital "glitch" in the machine. No room for error. Movements are sharp, sudden, and precise.</p>
            <div className="tech-spec">
              <div className="spec-row">
                <div className="spec-label">CAMERA</div>
                <p>Reactive & Chaotic: Shaky-cam, camcorder grit, and high-frequency cuts.</p>
              </div>
              <div className="spec-row">
                <div className="spec-label">EDITING</div>
                <p>High Action-Per-Second: Rhythmic micro-cuts synced to every snare hit.</p>
              </div>
              <div className="spec-row">
                <div className="spec-label">LIGHTING</div>
                <p>Flickering strobes and harsh, surgical white flashes.</p>
              </div>
            </div>
          </div>
          <div className="unraw-grid-cell mode-panel mode-b">
            <div className="unraw-sys-id" style={{marginBottom: '1rem'}}>MODE B</div>
            <h3>THE R&B<br/>MOMENTUM</h3>
            <p>Centripetal: A heavy, gravitational pull that locks the viewer into the lane. The look is Real-Life Ready—wardrobes designed for movement.</p>
            <div className="tech-spec">
              <div className="spec-row">
                <div className="spec-label">CAMERA</div>
                <p>Locked & Smooth: 3rd-person "tracking" shots that glide with the group.</p>
              </div>
              <div className="spec-row">
                <div className="spec-label">EDITING</div>
                <p>Torque-Based: Long, sweeping takes and momentum-based transitions.</p>
              </div>
              <div className="spec-row">
                <div className="spec-label">LIGHTING</div>
                <p>Steady, atmospheric sodium-vapor and mercury-glows.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="target-section" id="sec-03">
        <div className="unraw-section-header">
          <h2>THE INNER<br/>CIRCLE</h2>
          <div className="unraw-sys-id">SEC. 03</div>
        </div>
        <div className="unraw-grid-container layout-4">
          <ParallaxMemberCard 
            images={[
              "https://i.pinimg.com/1200x/e3/bb/c3/e3bbc3a84ee6bc1ea3cc0c3a1c4807ad.jpg",
              "https://i.pinimg.com/1200x/3f/a3/01/3fa301257ce3cb11109276c57c5bdadf.jpg",
              "https://i.pinimg.com/736x/bc/24/77/bc2477127bf8040421fda5551510f2d6.jpg"
            ]}
            alt="Natty"
            role="THE RHYTHM & GROOVE ANCHOR"
            name="NATTY"
            desc="Native R&B fluency. The group's sonic heartbeat driving the 'Pocket Groove' with sophisticated runs."
          />
          <ParallaxMemberCard 
            images={[
              "https://i.pinimg.com/1200x/50/32/b6/5032b6e8917a55a45524aebfc3b569f4.jpg",
              "https://i.pinimg.com/736x/5c/d5/45/5cd54543e84bd18523336c837fadac01.jpg",
              "https://i.pinimg.com/736x/34/56/df/3456dfd2b5f604638f6ca2e6979f9892.jpg"
            ]}
            alt="Yujin"
            role="THE TEXTURED CORE"
            name="YUJIN"
            desc="The stabilizing weight. Neutral, androgynous vocal grain with a rhythmic, delay-type vibrato."
          />
          <ParallaxMemberCard 
            images={[
              "https://i.pinimg.com/736x/22/85/95/2285957107dee8bf7964e77fa839f126.jpg",
              "https://i.pinimg.com/736x/05/c9/bc/05c9bcdb35339c84e87c7344c14157bf.jpg",
              "https://i.pinimg.com/736x/a8/05/47/a8054723010b191de7101f68e16f63a4.jpg"
            ]}
            alt="Danielle"
            role="THE ATMOSPHERIC NARRATOR"
            name="DANIELLE"
            desc="The emotional compass. Warm, storytelling vocal quality providing conversational ad-libs and clarity."
          />
          <ParallaxMemberCard 
            images={[
              "https://i.pinimg.com/736x/5e/34/ef/5e34ef90bd31d773658d3d57e004c4bc.jpg",
              "https://i.pinimg.com/736x/05/c9/bc/05c9bcdb35339c84e87c7344c14157bf.jpg",
              "https://i.pinimg.com/736x/47/c7/45/47c745e737465ea8f386ae5d03db884b.jpg"
            ]}
            alt="Minji"
            role="THE WARM FOUNDATION"
            name="MINJI"
            desc="The acoustic anchor. Lower-frequency register offering 'Low-End Sophistication' and sensory proximity."
          />
        </div>
      </section>

      <footer className="unraw-footer">
        <div>© 2026 ATMOS LABEL</div>
        <div style={{color: 'var(--strike)', fontWeight: '800'}}>FUNCTIONAL BRUTALISM</div>
        <div>SEOUL // GLOBAL</div>
      </footer>
    </motion.div>
  );
}
