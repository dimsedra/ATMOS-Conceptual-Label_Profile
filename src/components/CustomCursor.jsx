import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Snappy physics for the dot
  const springConfig = { damping: 25, stiffness: 400, mass: 0.2 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Heavier, dragging physics for the trail
  const trailSpringConfig = { damping: 20, stiffness: 100, mass: 1 };
  const trailXSpring = useSpring(cursorX, trailSpringConfig);
  const trailYSpring = useSpring(cursorY, trailSpringConfig);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      // Offset by half dimensions to center (Dot is 12x12, Trail is 40x40)
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const selectors = ['H1','H2','H3','A','BUTTON','TH','TD'];
      if (
        selectors.includes(e.target.tagName) || 
        e.target.classList.contains('card') || 
        e.target.classList.contains('atmos-card') || 
        e.target.classList.contains('sonic-card') || 
        e.target.classList.contains('member-card') || 
        e.target.classList.contains('unraw-nav-node') ||
        e.target.closest('a') || e.target.closest('button')
      ) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e) => {
      setIsHovered(false);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="cursor-atmos"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          // CSS uses translate(-50%, -50%) which gets overridden by framer 'x'/'y'.
          // Using margin mapping guarantees pure centering without math limits
          marginLeft: '-6px', 
          marginTop: '-6px'
        }}
        animate={{
          scale: isHovered ? 3 : 1,
          backgroundColor: isHovered ? 'transparent' : '#ffffff',
          border: isHovered ? '1px solid #ffffff' : '0px solid #ffffff'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      <motion.div
        className="cursor-trail-atmos"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          marginLeft: '-20px',
          marginTop: '-20px'
        }}
        animate={{
          scale: isHovered ? 1.2 : 1,
          opacity: isHovered ? 0 : 1
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
