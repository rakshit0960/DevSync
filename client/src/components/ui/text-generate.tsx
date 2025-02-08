"use client";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export function TextGenerateEffect({
  words,
  className = "",
}: {
  words: string;
  className?: string;
}) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: { staggerChildren: 0.014 }
    });
  }, [controls]);

  const letters = words.split("");
  
  return (
    <motion.div
      className={`inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={controls}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
} 