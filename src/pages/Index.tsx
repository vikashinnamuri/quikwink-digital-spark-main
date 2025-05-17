import React, { useEffect, useState } from 'react';
import WebGLBackground from '@/components/WebGLBackground';
import Navbar from '@/components/Navbar';
import StatCard from '@/components/StatCard';
import ServiceCard from '@/components/ServiceCard';
import IndustrySection from '@/components/IndustrySection';
import ApproachSection from '@/components/ApproachSection';
import ContactForm from '@/components/ContactForm';
import { BackgroundPaths } from '@/components/ui/background-paths';
import { Search, Info, Users, Settings, Star, Heart, ShoppingCart, Truck, GraduationCap, Code, Bot, Activity, Database, CircuitBoard, Shield } from 'lucide-react';
import DisplayCards from "@/components/ui/display-cards";
import { motion } from "framer-motion";

const Index = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  
  useEffect(() => {
    document.title = "Quikwink - Speed Meets Intelligence";
    
    // Auto-advance the feature showcase
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const features = [
    {
      title: "AI-Powered Analytics",
      description: "Transform your data into actionable insights with our machine learning solutions that identify patterns humans might miss.",
      icon: <Star className="text-quikwink-neon size-12" />,
      color: "from-blue-500/20 to-cyan-400/20"
    },
    {
      title: "Enterprise Integration",
      description: "Seamlessly connect your existing systems with our custom APIs and middleware solutions for improved data flow.",
      icon: <Settings className="text-quikwink-neon size-12" />,
      color: "from-purple-500/20 to-pink-400/20"
    },
    {
      title: "Security First Design",
      description: "Build with confidence knowing that every solution we develop prioritizes data protection and compliance.",
      icon: <Users className="text-quikwink-neon size-12" />,
      color: "from-green-500/20 to-emerald-400/20"
    }
  ];
  
  const services = [
    {
      title: "Data Overload Challenges",
      description: "Transform overwhelming data into actionable insights with our custom analytics solutions that prioritize what matters most to your business.",
      icon: <Database />
    },
    {
      title: "Legacy System Integration",
      description: "Bridge the gap between your existing systems and modern technologies with our seamless integration solutions that preserve your investments.",
      icon: <Settings />
    },
    {
      title: "Security Vulnerabilities",
      description: "Protect your business from evolving cyber threats with our comprehensive security solutions that safeguard your data and maintain customer trust.",
      icon: <Shield />
    },
    {
      title: "Operational Inefficiencies",
      description: "Eliminate bottlenecks and streamline processes with our automation solutions that reduce manual work and increase productivity across your organization.",
      icon: <Activity />
    }
  ];
  
  const industries = [
    {
      name: "Healthcare",
      challenges: [
        "Streamlining patient data management while ensuring compliance",
        "Optimizing resource allocation and staff scheduling",
        "Implementing predictive analytics for improved patient outcomes"
      ],
      solutions: "Our healthcare solutions leverage AI to predict patient admission patterns, optimize resource allocation, and secure sensitive data while maintaining regulatory compliance."
    },
    {
      name: "Retail",
      challenges: [
        "Maintaining inventory accuracy across multiple channels",
        "Personalizing customer experiences at scale",
        "Optimizing pricing strategies in real-time"
      ],
      solutions: "We help retailers implement intelligent inventory management systems, personalized recommendation engines, and data-driven pricing strategies that boost margins and customer satisfaction."
    },
    {
      name: "Logistics",
      challenges: [
        "Optimizing complex delivery networks and routes",
        "Maintaining visibility across supply chains",
        "Balancing cost-efficiency with service quality"
      ],
      solutions: "Our logistics solutions provide real-time tracking, route optimization algorithms, and predictive maintenance systems that reduce costs while improving delivery performance."
    },
    {
      name: "Education",
      challenges: [
        "Personalizing learning experiences for diverse students",
        "Managing complex institutional data securely",
        "Streamlining administrative processes"
      ],
      solutions: "We develop adaptive learning platforms, secure student information systems, and automated administrative tools that help educational institutions deliver better outcomes with fewer resources."
    }
  ];
  
  const approachSteps = [
    {
      number: 1,
      title: "Discovery",
      description: "We begin by deeply understanding your business challenges, objectives, and existing processes through collaborative workshops and in-depth analysis."
    },
    {
      number: 2,
      title: "Design",
      description: "Our experts architect robust solutions tailored to your specific needs, focusing on scalability, security, and seamless integration with your ecosystem."
    },
    {
      number: 3,
      title: "Develop",
      description: "Using agile methodologies, we build your solution iteratively with continuous feedback loops, ensuring alignment with your requirements at every stage."
    },
    {
      number: 4,
      title: "Deploy",
      description: "We implement your solution with minimal disruption, providing comprehensive training and documentation to ensure smooth adoption."
    },
    {
      number: 5,
      title: "UAT",
      description: "Post-launch, we conduct user acceptance testing, monitor performance, gather feedback, and make data-driven refinements to maximize your ROI."
    }
  ];

  const industryCards = [
    {
      icon: <Bot className="size-10 text-quikwink-neon" />,
      title: "Automation",
      description: "Transform repetitive tasks into automated workflows that reduce errors and free up your team to focus on strategic initiatives.",
      iconClassName: "text-quikwink-neon",
      titleClassName: "text-white",
      className: "hover:border-quikwink-neon/30"
    },
    {
      icon: <Code className="size-10 text-quikwink-neon" />,
      title: "Full Stack Development",
      description: "Build resilient, scalable platforms and applications with our comprehensive development expertise across frontend, backend, and DevOps.",
      iconClassName: "text-quikwink-neon",
      titleClassName: "text-white",
      className: "hover:border-quikwink-neon/30"
    },
    {
      icon: <Activity className="size-10 text-quikwink-neon" />,
      title: "Business Analysis",
      description: "Identify opportunities for improvement and innovation with our comprehensive business analysis services that align technology with goals.",
      iconClassName: "text-quikwink-neon",
      titleClassName: "text-white",
      className: "hover:border-quikwink-neon/30"
    },
    {
      icon: <Database className="size-10 text-quikwink-neon" />,
      title: "Data Science",
      description: "Extract meaningful insights from your data with advanced analytics, statistical modeling, and visualization techniques that support decisions.",
      iconClassName: "text-quikwink-neon",
      titleClassName: "text-white",
      className: "hover:border-quikwink-neon/30"
    },
    {
      icon: <CircuitBoard className="size-10 text-quikwink-neon" />,
      title: "ML Implementation",
      description: "Enhance your business capabilities with custom machine learning models that recognize patterns, make predictions, and continuously improve.",
      iconClassName: "text-quikwink-neon",
      titleClassName: "text-white",
      className: "hover:border-quikwink-neon/30"
    },
    {
      icon: <Star className="size-10 text-quikwink-neon" />,
      title: "AI Development",
      description: "Create intelligent systems and applications that adapt to your business needs with our end-to-end AI development services and expertise.",
      iconClassName: "text-quikwink-neon",
      titleClassName: "text-white",
      className: "hover:border-quikwink-neon/30"
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-quikwink-dark to-quikwink-darker overflow-x-hidden">
      <WebGLBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center pt-20 relative">
        <BackgroundPaths title="Speed Meets Intelligence" />
        <div className="container-section relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6 opacity-100">
              <span className="text-gradient">Speed</span> Meets <span className="text-gradient">Intelligence</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 opacity-100" style={{ animationDelay: '0.3s' }}>
              Custom AI & software solutions that deliver measurable results for enterprises facing complex challenges.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 opacity-100" style={{ animationDelay: '0.6s' }}>
              <a href="#contact" className="btn-primary">
                Discuss Your Project
              </a>
              <a href="#services" className="btn-secondary">
                Explore Solutions
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Problem/Solution Snippets */}
      <section id="problems" className="bg-quikwink-darkest/50">
        <div className="container-section py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-custom">
              <h3 className="heading-sm mb-3">Navigating Data Overload?</h3>
              <p className="text-white/70">
                Transform overwhelming data into actionable insights with our custom analytics solutions that prioritize what matters most.
              </p>
            </div>
            
            <div className="card-custom">
              <h3 className="heading-sm mb-3">Manual Processes Slowing Growth?</h3>
              <p className="text-white/70">
                Automate repetitive tasks and workflows, freeing up your team to focus on innovation and strategic initiatives.
              </p>
            </div>
            
            <div className="card-custom">
              <h3 className="heading-sm mb-3">Legacy Systems Creating Friction?</h3>
              <p className="text-white/70">
                Modernize your infrastructure with seamless integrations and future-proof architectures built for scalability.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Credibility Section with Interactive Feature Showcase - Replacing "Trusted by Industry Leaders" */}
      <section id="credibility">
        <div className="container-section">
          <h2 className="heading-lg text-center mb-16">
            Why Partner with <span className="text-gradient">Quikwink</span>?
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            <StatCard value={30} suffix="%" description="Average cost reduction for our clients" />
            <StatCard value={50} suffix="%" description="Improvement in operational efficiency" />
            <StatCard value={99} suffix=".9%" description="System uptime on our managed solutions" />
            <StatCard value={3} suffix="x" description="Faster time-to-market than competitors" />
          </div>
          
          {/* Interactive Feature Showcase - New Section */}
          <div className="py-16 overflow-hidden rounded-xl">
            <h3 className="heading-md text-center mb-8">Core Capabilities</h3>
            
            <div className="flex flex-col lg:flex-row items-center justify-between">
              {/* Feature Navigation */}
              <div className="w-full lg:w-1/3 mb-8 lg:mb-0 space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`cursor-pointer p-4 rounded-lg transition-all duration-300 border ${activeFeature === index ? 'border-quikwink-neon bg-quikwink-neon/10' : 'border-white/5'}`}
                    onClick={() => setActiveFeature(index)}
                    whileHover={{ x: 5 }}
                    animate={{ opacity: activeFeature === index ? 1 : 0.7 }}
                  >
                    <h4 className="font-display font-medium text-lg text-white">{feature.title}</h4>
                  </motion.div>
                ))}
              </div>
              
              {/* Feature Display */}
              <div className="w-full lg:w-2/3 lg:pl-12">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className={`p-8 rounded-xl bg-gradient-to-r ${features[activeFeature].color} border border-white/10 relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-30">
                    {features[activeFeature].icon}
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-white mb-4">{features[activeFeature].title}</h3>
                  <p className="text-white/80">{features[activeFeature].description}</p>
                  
                  <motion.div 
                    className="absolute bottom-2 right-2 w-32 h-32 rounded-full bg-quikwink-neon/10"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="section-divider" />
      
      {/* Industries Section */}
      <section id="industries">
        <div className="container-section">
          <h2 className="heading-lg text-center mb-4">Industries We Serve</h2>
          <p className="text-white/70 text-center max-w-2xl mx-auto mb-16">
            Our expertise spans across multiple domains, allowing us to deliver specialized solutions for various industry needs.
          </p>
          
          <div className="w-full max-w-7xl mx-auto px-4">
            <DisplayCards cards={industryCards} />
          </div>
        </div>
      </section>
      
      <div className="section-divider" />
      
      {/* Services Section */}
      <section id="services">
        <div className="container-section">
          <h2 className="heading-lg text-center mb-4">Our Solutions</h2>
          <p className="text-white/70 text-center max-w-2xl mx-auto mb-16">
            We combine cutting-edge technology with deep domain expertise to deliver solutions that transform how businesses operate and compete.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto px-4">
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>
        </div>
      </section>
      
      <div className="section-divider" />
      
      {/* Approach Section */}
      <section id="approach">
        <div className="container-section">
          <h2 className="heading-lg text-center mb-4">Our Approach</h2>
          <p className="text-white/70 text-center max-w-2xl mx-auto mb-16">
            We follow a proven methodology that ensures alignment with your goals and delivers exceptional results at every phase.
          </p>
          
          <ApproachSection steps={approachSteps} />
        </div>
      </section>
      
      <div className="section-divider" />
      
      {/* About Section */}
      <section id="about">
        <div className="container-section">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-center mb-4">Our Vision</h2>
            <p className="text-white/80 text-center text-xl mb-8">
              We believe technology should simplify complexity, not add to it.
            </p>
            <p className="text-white/70 text-center mb-4">
              At Quikwink, we're committed to developing intelligent solutions that deliver meaningful business outcomes. Our team of experts combines deep technical knowledge with strategic business acumen to ensure every solution we build drives measurable impact.
            </p>
            <p className="text-white/70 text-center">
              We prioritize long-term partnerships over short-term gains, investing in understanding your unique challenges and opportunities to deliver solutions that truly transform how you operate.
            </p>
          </div>
        </div>
      </section>
      
      <div className="section-divider" />
      
      {/* Contact Section */}
      <section id="contact">
        <div className="container-section">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-lg mb-4">Ready to Transform Your Business?</h2>
              <p className="text-white/70 mb-6">
                Let's discuss how Quikwink can help you leverage technology to overcome challenges and unlock new opportunities.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-quikwink-neon/10 flex items-center justify-center mr-4">
                    <Info size={16} className="text-quikwink-neon" />
                  </div>
                  <span className="text-white/80">vikashinnamuri@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-quikwink-neon/10 flex items-center justify-center mr-4">
                    <Info size={16} className="text-quikwink-neon" />
                  </div>
                  <span className="text-white/80">lohapriyamanthiram@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-quikwink-neon/10 flex items-center justify-center mr-4">
                    <Info size={16} className="text-quikwink-neon" />
                  </div>
                  <span className="text-white/80">+91 7013132784</span>
                </div>
              </div>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-quikwink-darkest">
        <div className="container-section py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-display font-bold text-white">
                <span className="text-gradient">Quik</span>wink
              </span>
            </div>
            
            <div className="flex space-x-8">
              <a href="#services" className="text-white/60 hover:text-white transition-colors">Services</a>
              <a href="#industries" className="text-white/60 hover:text-white transition-colors">Industries</a>
              <a href="#approach" className="text-white/60 hover:text-white transition-colors">Approach</a>
              <a href="#contact" className="text-white/60 hover:text-white transition-colors">Contact</a>
            </div>
            
            <div className="mt-4 md:mt-0 text-sm text-white/40">
              &copy; {new Date().getFullYear()} Quikwink. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
