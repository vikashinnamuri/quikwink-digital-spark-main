
import React, { useEffect, useRef, useState } from 'react';

interface StatCardProps {
  value: number;
  suffix: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, suffix, description }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      }, 
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let startCount = 0;
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;
    
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      setCount(Math.floor(value * progress));
      
      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
    
    return () => clearInterval(counter);
  }, [isVisible, value]);
  
  return (
    <div ref={cardRef} className="card-custom flex flex-col items-center transform transition-all duration-500 hover:-translate-y-2">
      <div className="flex items-center justify-center mb-3">
        <span className="text-4xl md:text-5xl font-display font-bold text-white">{count}</span>
        <span className="text-2xl md:text-3xl font-display font-bold text-quikwink-neon ml-1">{suffix}</span>
      </div>
      <p className="text-white/70 text-center">{description}</p>
    </div>
  );
};

export default StatCard;
