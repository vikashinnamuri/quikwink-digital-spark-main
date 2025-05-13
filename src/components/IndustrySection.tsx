
import React, { useState } from 'react';

interface Industry {
  name: string;
  challenges: string[];
  solutions: string;
}

interface IndustrySectionProps {
  industries: Industry[];
}

const IndustrySection: React.FC<IndustrySectionProps> = ({ industries }) => {
  const [activeIndustry, setActiveIndustry] = useState(industries[0]);
  
  return (
    <div className="grid md:grid-cols-5 gap-8">
      <div className="md:col-span-2">
        <div className="flex flex-col space-y-1 md:space-y-0 md:block">
          {industries.map((industry) => (
            <button
              key={industry.name}
              onClick={() => setActiveIndustry(industry)}
              className={`text-left py-4 px-6 mb-2 rounded-lg transition-all duration-300 md:border-l-4 ${
                activeIndustry.name === industry.name
                  ? 'bg-quikwink-neon/10 md:border-l-quikwink-neon text-white'
                  : 'md:border-l-transparent text-white/60 hover:text-white/90'
              }`}
            >
              <h3 className="font-semibold text-xl">{industry.name}</h3>
            </button>
          ))}
        </div>
      </div>
      
      <div className="md:col-span-3">
        <div className="card-custom h-full flex flex-col">
          <h4 className="heading-sm mb-4">Key Challenges</h4>
          <ul className="space-y-3 mb-6">
            {activeIndustry.challenges.map((challenge, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block mr-2 mt-1 h-2 w-2 rounded-full bg-quikwink-neon"></span>
                <span className="text-white/80">{challenge}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <h4 className="heading-sm mb-4">Our Solutions</h4>
            <p className="text-white/80">{activeIndustry.solutions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustrySection;
