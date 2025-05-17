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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={cn(
            "relative rounded-xl p-6 bg-quikwink-dark/80 backdrop-blur-sm border border-white/10",
            "transition-all duration-300 ease-out hover:shadow-[0_0_20px_rgba(0,191,255,0.15)] hover:-translate-y-2",
            "h-full flex flex-col shadow-lg",
            "hover:border-quikwink-neon/30",
            card.className
          )}
        >
          <div className={cn("flex items-center justify-center h-16 w-16 rounded-lg mb-4 bg-quikwink-neon/10", card.iconClassName)}>
            {card.icon}
          </div>
          <h3 className={cn("heading-sm mb-3", card.titleClassName)}>{card.title}</h3>
          <p className="text-white/70 flex-grow">{card.description}</p>
          {card.date && (
            <p className="text-sm text-white/50 mt-4">{card.date}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default DisplayCards;
