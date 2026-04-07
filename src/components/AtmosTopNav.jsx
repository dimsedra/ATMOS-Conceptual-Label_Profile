import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAtmos } from '../context/AtmosContext';
import ScrambleText from './ScrambleText';
import atmosLogoOffWhite from './img/atmos-logo/ATMOS-Off-White.png';
import './AtmosTopNav.css';

export default function AtmosTopNav({ hideLogo = false }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { bagItems, toggleBag } = useAtmos();
  const location = useLocation();

  const handleMobileNav = () => setMobileMenuOpen(false);

  const rosterItems = [
    { name: 'UNRAW', path: '/unraw' }
  ];

  const mainLinks = [
    { to: '/', label: 'HOME', id: '00' },
    { to: '/shop', label: 'SHOP', id: '01' },
    { to: '/community', label: 'COMMUNITY', id: '02' },
    { to: '/unraw', label: 'ROSTER', id: '03' },
    { to: '/auth', label: 'MEMBERSHIP', id: '04' },
  ];

  return (
    <header className="global-top-nav">
      <div className="nav-left">
        <Link to="/" className="nav-logo-area">
          {!hideLogo && (
            <motion.img 
              layoutId="main-atmos-logo"
              src={atmosLogoOffWhite}
              alt="ATMOS"
              className="nav-logo-matrix"
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
          {!hideLogo && (
             <motion.span 
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 1, duration: 0.8 }}
               className="nav-logo-text"
             >
               <ScrambleText text="ATMOS" />
             </motion.span>
          )}
        </Link>
      </div>

      <nav className="nav-center">
         <Link to="/community" className={`nav-link ${location.pathname === '/community' ? 'active' : ''}`}><ScrambleText text="COMMUNITY" /></Link>
         <Link to="/shop" className={`nav-link ${location.pathname === '/shop' ? 'active' : ''}`}><ScrambleText text="SHOP" /></Link>
         
         <div 
            className="nav-dropdown-wrapper"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span className={`nav-link ${location.pathname === '/unraw' ? 'active' : ''}`} style={{cursor: 'pointer'}}>
              <ScrambleText text="ROSTER" />
            </span>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div 
                  className="nav-dropdown-menu"
                  initial={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -5, filter: 'blur(5px)', transition: { duration: 0.2 } }}
                >
                  {rosterItems.map(item => (
                    <Link key={item.name} to={item.path} className="dropdown-item">
                      <ScrambleText text={item.name} trigger={dropdownOpen} />
                      <div className="hover-line"></div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

         <Link to="/auth" className={`nav-link ${location.pathname === '/auth' ? 'active' : ''}`}><ScrambleText text="MEMBERSHIP" /></Link>
      </nav>

      <div className="nav-right">
         <button className="nav-bag-btn" onClick={toggleBag}>
            BAG [{bagItems.length}]
         </button>
         <Link to="/auth" className="sys-status-btn desktop-only">
            <div className="dot blink"></div>
            <ScrambleText text="ACCOUNT" />
         </Link>
         <button 
           className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
           aria-label="Toggle navigation menu"
         >
           <span className="hamburger-line"></span>
           <span className="hamburger-line"></span>
         </button>
      </div>

      {/* Mini-Silo Drawer (Fixed Opaque Hub) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              className="drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleMobileNav}
            />
            <motion.div 
              className="drawer-hub"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="drawer-header">
                <div className="sys-head-meta">
                  <span className="blink-dot"></span>
                  <span className="sys-id">ATMOS v2.4</span>
                </div>
              </div>

              <nav className="drawer-links">
                {mainLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link 
                      to={link.to} 
                      className={`drawer-link ${location.pathname === link.to ? 'active' : ''}`}
                      onClick={handleMobileNav}
                    >
                      <span className="link-num">{link.id}</span>
                      <span className="link-text">{link.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="drawer-footer">
                <Link to="/auth" className="drawer-account-btn" onClick={handleMobileNav}>
                   ACCOUNT
                </Link>
                <div className="sys-path">PATH: {location.pathname.toUpperCase()}</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
