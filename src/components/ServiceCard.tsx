import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="relative rounded-xl p-6 bg-quickwink-dark/80 backdrop-blur-sm border border-white/10 
                transition-all duration-300 shadow-lg h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -8,
        boxShadow: "0 0 20px rgba(0, 191, 255, 0.15)",
        borderColor: "rgba(0, 191, 255, 0.3)"
      }}
    >
      <motion.div 
        className="flex items-center justify-center h-16 w-16 rounded-lg mb-4 bg-quickwink-neon/10"
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      >
        {React.cloneElement(icon as React.ReactElement, { 
          size: 32, 
          className: `text-quickwink-neon transition-colors duration-300 ${isHovered ? 'text-quickwink-neon-bright' : ''}`,
        })}
      </motion.div>
      <h3 className="heading-sm mb-3">{title}</h3>
      <p className="text-white/70 flex-grow">{description}</p>
    </motion.div>
  );
};

export default ServiceCard;
