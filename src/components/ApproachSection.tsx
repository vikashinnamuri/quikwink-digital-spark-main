import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lightbulb, Compass, Code, Rocket, CheckSquare } from 'lucide-react';

interface ApproachStep {
  number: number;
  title: string;
  description: string;
}

interface ApproachSectionProps {
  steps: ApproachStep[];
}

const ApproachSection: React.FC<ApproachSectionProps> = ({ steps }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  
  // Map step numbers to icons
  const stepIcons = {
    1: <Compass className="w-6 h-6" />,
    2: <Lightbulb className="w-6 h-6" />,
    3: <Code className="w-6 h-6" />,
    4: <Rocket className="w-6 h-6" />,
    5: <CheckSquare className="w-6 h-6" />
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const step = parseInt(entry.target.getAttribute('data-step') || '1');
            setActiveStep(step);
          }
        });
      },
      { threshold: 0.7, root: null }
    );
    
    const elements = document.querySelectorAll('.approach-step');
    elements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  const handleStepClick = (stepNumber: number) => {
    setActiveStep(stepNumber);
    // Find the element and scroll to it
    const element = document.querySelector(`[data-step="${stepNumber}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  
  return (
    <div className="relative">
      {/* Interactive Step Navigation */}
      <div className="flex justify-between mb-12 relative z-20 px-4 max-w-3xl mx-auto">
        {steps.map((step) => (
          <motion.button
            key={`nav-${step.number}`}
            className={`relative flex flex-col items-center group`}
            onClick={() => handleStepClick(step.number)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold 
                transition-all duration-300 shadow-lg
                ${activeStep >= step.number ? 'bg-quikwink-neon text-black' : 'bg-quikwink-dark text-white/70 border border-white/10'}
                ${hoveredStep === step.number ? 'ring-2 ring-quikwink-neon ring-offset-2 ring-offset-black' : ''}
              `}
              onHoverStart={() => setHoveredStep(step.number)}
              onHoverEnd={() => setHoveredStep(null)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: step.number * 0.1 }}
            >
              {stepIcons[step.number as keyof typeof stepIcons] || step.number}
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-8 whitespace-nowrap text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: activeStep === step.number ? 1 : 0.7 }}
            >
              {step.title}
            </motion.div>
            
            {step.number < steps.length && (
              <motion.div 
                className="absolute top-5 left-full w-full hidden md:block"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: activeStep > step.number ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <ArrowRight className={`w-full text-quikwink-neon/50 ${activeStep > step.number ? 'opacity-100' : 'opacity-30'}`} />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Approach steps content */}
      <div ref={containerRef} className="mt-24 relative">
        {/* Main timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-quikwink-neon/70 via-quikwink-neon/40 to-quikwink-neon/10 rounded-full"></div>
        
        {steps.map((step) => (
          <motion.div 
            key={step.number}
            className="approach-step relative flex flex-col md:flex-row items-start mb-20 last:mb-0"
            data-step={step.number}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className={`w-16 h-16 z-10 rounded-full flex items-center justify-center text-xl font-semibold 
                backdrop-blur-md shadow-glow
                ${activeStep >= step.number ? 'bg-quikwink-neon text-black' : 'bg-secondary/30 text-white/70 border border-white/10'}
                transition-all duration-500 absolute left-0 md:left-1/2 md:-ml-8
              `}
              whileHover={{ scale: 1.1 }}
              animate={{ 
                boxShadow: activeStep === step.number ? [
                  '0 0 0 rgba(0, 191, 255, 0)',
                  '0 0 20px rgba(0, 191, 255, 0.7)',
                  '0 0 0 rgba(0, 191, 255, 0)'
                ] : 'none'
              }}
              transition={{ 
                boxShadow: { repeat: Infinity, duration: 2 }
              }}
            >
              {stepIcons[step.number as keyof typeof stepIcons] || step.number}
            </motion.div>
            
            <motion.div 
              className={`md:w-1/2 md:pr-16 md:text-right ml-24 md:ml-0 bg-quikwink-dark/30 backdrop-blur-sm p-6 rounded-xl border border-white/5
                ${step.number % 2 === 0 ? 'md:order-2 md:pl-16 md:pr-0 md:text-left md:ml-auto' : ''}
                ${activeStep === step.number ? 'shadow-glow-sm border-quikwink-neon/20' : ''}
              `}
              whileHover={{ scale: 1.02 }}
              initial={{ x: step.number % 2 === 0 ? 50 : -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className={`heading-md mb-3 ${activeStep >= step.number ? 'text-quikwink-neon' : 'text-white/70'}`}>
                {step.title}
              </h3>
              <p className={`${activeStep >= step.number ? 'text-white/90' : 'text-white/50'}`}>
                {step.description}
              </p>
              
              {/* Visual indicator for active step */}
              {activeStep === step.number && (
                <motion.div 
                  className="w-2 h-2 rounded-full bg-quikwink-neon absolute top-3 right-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ApproachSection;
