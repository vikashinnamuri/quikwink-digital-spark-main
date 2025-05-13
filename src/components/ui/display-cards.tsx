
"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface Card {
  icon: React.ReactNode;
  title: string;
  description: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  className?: string;
}

interface DisplayCardsProps {
  cards: Card[];
}

const DisplayCards = ({ cards }: DisplayCardsProps) => {
  return (
    <div className="relative flex flex-col md:flex-row gap-6 justify-center items-center">
      {cards.map((card, index) => (
        <div
          key={index}
          className={cn(
            "relative w-full md:w-[320px] rounded-xl p-6 bg-secondary/80 backdrop-blur-sm border border-white/5",
            "transition-all duration-500 ease-out hover:shadow-lg hover:-translate-y-2",
            card.className
          )}
        >
          <div className={cn("mb-4", card.iconClassName)}>{card.icon}</div>
          <h3 className={cn("heading-sm mb-3", card.titleClassName)}>{card.title}</h3>
          <p className="text-white/70">{card.description}</p>
          {card.date && (
            <p className="text-sm text-white/50 mt-4">{card.date}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default DisplayCards;
