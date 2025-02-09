"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

interface Sparkle {
  id: string;
  createdAt: number;
  color: string;
  size: number;
  style: React.CSSProperties;
}

const generateSparkle = (): Sparkle => ({
  id: String(random(10000, 99999)),
  createdAt: Date.now(),
  color: "purple",
  size: random(10, 20),
  style: {
    top: random(0, 100) + "%",
    left: random(0, 100) + "%",
    zIndex: 2,
  },
});

export function Sparkles({ children }: { children: React.ReactNode }) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const sparkle = generateSparkle();
      const nextSparkles = [...sparkles, sparkle]
        .filter(sp => now - sp.createdAt < 750);
      setSparkles(nextSparkles);
    }, 250);

    return () => clearInterval(interval);
  }, [sparkles]);

  return (
    <span className="relative inline-block">
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <motion.span
            key={sparkle.id}
            className="absolute inline-block"
            style={sparkle.style}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 180 }}
            exit={{ scale: 0, rotate: 0 }}
            transition={{ duration: 0.75 }}
          >
            <svg
              className="block"
              width={sparkle.size}
              height={sparkle.size}
              viewBox="0 0 160 160"
              fill="none"
            >
              <path
                d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
                fill="rgba(124,58,237,0.5)"
              />
            </svg>
          </motion.span>
        ))}
      </AnimatePresence>
      <span className="relative inline-block">{children}</span>
    </span>
  );
}