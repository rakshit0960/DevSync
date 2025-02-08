"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type Card = {
  id: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
};

export function AnimatedCards({ items }: { items: Card[] }) {
  const [cards, setCards] = useState<Card[]>(items);
  const CARD_OFFSET = 10;
  const SCALE_FACTOR = 0.06;

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        newCards.unshift(newCards.pop()!);
        return newCards;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[400px] w-full max-w-md mx-auto">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className="absolute w-full bg-white dark:bg-black rounded-3xl p-8 shadow-xl border border-neutral-200 dark:border-white/[0.1]"
          style={{
            transformOrigin: "top center",
          }}
          animate={{
            top: index * -CARD_OFFSET,
            scale: 1 - index * SCALE_FACTOR,
            zIndex: cards.length - index,
          }}
        >
          <div className="flex flex-col gap-4">
            {card.icon}
            <h3 className="font-semibold text-xl">{card.title}</h3>
            <p className="text-neutral-500 dark:text-neutral-300">{card.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 