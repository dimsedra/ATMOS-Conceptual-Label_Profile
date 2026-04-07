import { motion } from 'framer-motion';

export default function SmoothReveal({ text, delay = 0, className = "" }) {
  const words = text.split(" ");

  return (
    <div className={`smooth-reveal ${className}`} style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1.2,
            delay: delay + i * 0.1,
            ease: [0.16, 1, 0.3, 1]
          }}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
