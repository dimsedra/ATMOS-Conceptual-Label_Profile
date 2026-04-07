import React, { useState, useEffect } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=~';

export default function ScrambleText({ text, trigger, as: Component = 'span', className = '', ...props }) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);

  const active = trigger !== undefined ? trigger : isHovering;

  useEffect(() => {
    if (!active) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => 
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (letter === ' ') return ' ';
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join('')
      );

      // Increment slowly for a "subtle" decoding effect
      iteration += 1 / 3;

      if (iteration >= text.length) {
        clearInterval(interval);
      }
    }, 30); // 30ms

    return () => clearInterval(interval);
  }, [active, text]);

  return (
    <Component 
      className={className} 
      onMouseEnter={() => setIsHovering(true)} 
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      {displayText}
    </Component>
  );
}
