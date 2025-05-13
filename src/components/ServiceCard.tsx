
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
    <div 
      className="card-custom h-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,191,255,0.1)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className={`flex items-center justify-center h-16 w-16 rounded-lg mb-4 bg-quikwink-neon/10`}
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
          className: `text-quikwink-neon transition-colors duration-300 ${isHovered ? 'text-quikwink-neon-bright' : ''}`,
        })}
      </motion.div>
      <h3 className="heading-sm mb-3">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
};

export default ServiceCard;
