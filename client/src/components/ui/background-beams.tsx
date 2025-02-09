"use client";
import { LAYER_ORDER } from "@/lib/constants";
import { motion } from "framer-motion";
import { useRef } from "react";

export function BackgroundBeams() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden"
      style={{ zIndex: LAYER_ORDER.beams }}
    >
      <motion.div
        className="absolute -inset-[10px] opacity-50"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.1), transparent 50%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}