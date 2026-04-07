import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function ParallaxMemberCard({ images, alt, role, name, desc }) {
  const ref = useRef(null);
  const [frameIndex, setFrameIndex] = useState(0);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    // Normalize mouse position between -0.5 and 0.5
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);

    // Highly immersive scrubbing calculation for images
    if (images && images.length === 3) {
      if (mouseX < -0.15) setFrameIndex(0);
      else if (mouseX > 0.15) setFrameIndex(2);
      else setFrameIndex(1);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setFrameIndex(0); // Reset to default frame
  };

  return (
    <motion.div
      ref={ref}
      className="unraw-grid-cell member-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      {images && images.map((imgSrc, idx) => (
        <motion.img 
          key={idx}
          src={imgSrc} 
          alt={`${alt} Frame ${idx}`} 
          className="member-img" 
          style={{ 
            rotateX, 
            rotateY, 
            translateZ: 50,
            scale: 1.15,
            opacity: frameIndex === idx ? 1 : 0,
            // Instantaneous mechanical toggle for maximum reactivity
            transition: 'opacity 0.05s steps(2, end)' 
          }} 
        />
      ))}
      <motion.div 
        className="member-data"
        style={{ translateZ: 70 }}
      >
        <div className="member-role">{role}</div>
        <div className="member-name">{name}</div>
        <p>{desc}</p>
      </motion.div>
    </motion.div>
  );
}
