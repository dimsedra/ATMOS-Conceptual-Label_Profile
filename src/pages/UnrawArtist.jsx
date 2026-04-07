import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import YouTubePlayer from '../components/YouTubePlayer';
import ParallaxMemberCard from '../components/ParallaxMemberCard';
import ScrambleText from '../components/ScrambleText';
import AtmosTopNav from '../components/AtmosTopNav';
import './UnrawArtist.css';

// Local Member Assets Migration
import natty1 from '../components/img/members/natty/natty-unraw-profile-1.jpg';
import natty2 from '../components/img/members/natty/natty-unraw-profile-2.jpg';
import natty3 from '../components/img/members/natty/natty-unraw-profile-3.jpg';

import yujin1 from '../components/img/members/yujin/yujin-unraw-profile-1.jpg';
import yujin2 from '../components/img/members/yujin/yujin-unraw-profile-2.jpg';
import yujin3 from '../components/img/members/yujin/yujin-unraw-profile-3.jpg';

import danielle1 from '../components/img/members/danielle/danielle-unraw-profile-1.jpg';
import danielle2 from '../components/img/members/danielle/danielle-unraw-profile-2.jpg';
import danielle3 from '../components/img/members/danielle/danielle-unraw-profile-3.jpg';

import minji1 from '../components/img/members/minji/minji-unraw-profile-1.jpg';
import minji2 from '../components/img/members/minji/minji-unraw-profile-2.jpg';
import minji3 from '../components/img/members/minji/minji-unraw-profile-3.jpg';

export default function UnrawArtist() {
  const kineticCoreRef = useRef(null);
  const [activeSection, setActiveSection] = useState('sec-00');

  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounting, setIsMounting] = useState(true);

  useEffect(() => {
    // 1. Always start at top immediately on route load
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
      window.lenis.stop(); // Lock scroll for immersive intro
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.body.style.overflow = 'hidden';
    }

    // 2. Unlock and fade in rest of UI after sequence
    const timer = setTimeout(() => {
      setIsMounting(false);
      if (window.lenis) {
        window.lenis.start();
      } else {
        document.body.style.overflow = '';
      }
    }, 2800);

    return () => {
      clearTimeout(timer);
      if (window.lenis) window.lenis.start();
      document.body.style.overflow = '';
    };
  }, []);

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
      <AtmosTopNav />
      <motion.nav 
        className="unraw-sys-nav"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isMounting ? 0 : 1, y: isMounting ? -20 : 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: isMounting ? 'none' : 'auto' }}
      >
        <button onClick={() => scrollToSection('sec-00')} className={`unraw-nav-node ${activeSection === 'sec-00' ? 'active' : ''}`}><ScrambleText text="00" /></button>
        <button onClick={() => scrollToSection('sec-01')} className={`unraw-nav-node ${activeSection === 'sec-01' ? 'active' : ''}`}><ScrambleText text="01" /></button>
        <button onClick={() => scrollToSection('sec-02')} className={`unraw-nav-node ${activeSection === 'sec-02' ? 'active' : ''}`}><ScrambleText text="02" /></button>
        <button onClick={() => scrollToSection('sec-03')} className={`unraw-nav-node ${activeSection === 'sec-03' ? 'active' : ''}`}><ScrambleText text="03" /></button>
      </motion.nav>

      <section className="unraw-hero target-section" id="sec-00">
        
        {/* ATMOSPHERIC BACKGROUND VIDEO */}
        <motion.div 
          className="unraw-hero-bg"
          initial={{ filter: 'blur(20px)', scale: 1.1 }}
          animate={{ filter: 'blur(0px)', scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          <div className="unraw-hero-overlay"></div>
          <iframe 
            src="https://www.youtube.com/embed/YedDBwTikzk?autoplay=1&mute=1&controls=0&loop=1&playlist=YedDBwTikzk&playsinline=1&modestbranding=1" 
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="UNRAW Kinetic State Background"
          />
        </motion.div>

        <motion.div 
          className="data-overlay data-tl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          SYS.STATE: KINETIC HIGH-COMPRESSION<br/>
          NO LOADING SCREEN
        </motion.div>
        
        <motion.h1 
          className={`hero-title-unraw ${isScrolled ? 'paused' : ''}`} 
          id="kinetic-core" 
          ref={kineticCoreRef}
          initial={{ opacity: 0, scale: 0.85, letterSpacing: '1.5rem', filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, letterSpacing: '-0.02em', filter: 'blur(0px)' }}
          transition={{ delay: 0.5, duration: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          UNRAW
        </motion.h1>
        
        <motion.div 
          className="data-overlay data-br"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          ATMOS // ARCHITECTURAL LABEL<br/>
          NOT A CONCEPT. A WORLDVIEW.
        </motion.div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: isMounting ? 0 : 1, y: isMounting ? 40 : 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: isMounting ? 'none' : 'auto' }}
      >
        <section className="target-section" id="sec-01">
        <div className="unraw-section-header">
          <h2>THE SONIC<br/>ARCHITECTURE</h2>
          <div className="unraw-sys-id">SEC. 01</div>
        </div>
        <div className="unraw-video-wrapper">
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
            images={[natty1, natty2, natty3]}
            alt="Natty"
            role="THE RHYTHM & GROOVE ANCHOR"
            name="NATTY"
            desc="Native R&B fluency. The group's sonic heartbeat driving the 'Pocket Groove' with sophisticated runs."
          />
          <ParallaxMemberCard 
            images={[yujin1, yujin2, yujin3]}
            alt="Yujin"
            role="THE TEXTURED CORE"
            name="YUJIN"
            desc="The stabilizing weight. Neutral, androgynous vocal grain with a rhythmic, delay-type vibrato."
          />
          <ParallaxMemberCard 
            images={[danielle1, danielle2, danielle3]}
            alt="Danielle"
            role="THE ATMOSPHERIC NARRATOR"
            name="DANIELLE"
            desc="The emotional compass. Warm, storytelling vocal quality providing conversational ad-libs and clarity."
          />
          <ParallaxMemberCard 
            images={[minji1, minji2, minji3]}
            alt="Minji"
            role="THE WARM FOUNDATION"
            name="MINJI"
            desc="The acoustic anchor. Lower-frequency register offering 'Low-End Sophistication' and sensory proximity."
          />
        </div>
      </section>

      </motion.div>
    </motion.div>
  );
}
