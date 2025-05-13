import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const WebGLBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleReducedMotionChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 50;
    
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance', // Optimize for performance
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
    
    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = prefersReducedMotion ? 800 : 1500; // Reduce particle count for reduced motion
    
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    const colorArray = new Float32Array(particlesCount * 3);
    
    // Create particles with varied distributions for more organic look
    for (let i = 0; i < particlesCount * 3; i += 3) {
      let radius, theta, phi;
      
      // Mix of spherical and flat distributions
      if (Math.random() > 0.3) {
        // Spherical distribution (70%)
        radius = 30 + Math.random() * 20;
        theta = Math.random() * Math.PI * 2;
        phi = Math.acos((Math.random() * 2) - 1);
        
        posArray[i] = radius * Math.sin(phi) * Math.cos(theta);     // x
        posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta); // y
        posArray[i + 2] = radius * Math.cos(phi) - 25;              // z
      } else {
        // Flat rectangular distribution (30%)
        posArray[i] = (Math.random() - 0.5) * 80;       // x
        posArray[i + 1] = (Math.random() - 0.5) * 60;   // y
        posArray[i + 2] = (Math.random() - 0.5) * 10 - 15;  // z
      }
      
      // Varied blue gradient colors
      const blueIntensity = Math.random();
      colorArray[i] = 0.05 + blueIntensity * 0.1;      // R: very low for deep blue
      colorArray[i + 1] = 0.2 + blueIntensity * 0.5;   // G: mid-low range
      colorArray[i + 2] = 0.7 + blueIntensity * 0.3;   // B: high for blue dominance
      
      // Random particle sizes, but keep them small
      scaleArray[i/3] = Math.random() * 0.4 + 0.1;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    // Material with vertex colors
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true, // Particles further away appear smaller
    });
    
    // Points
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Mouse interaction with parallax effect
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0
    };
    
    const handleMouseMove = (event: MouseEvent) => {
      // Calculate normalized mouse position (-1 to 1)
      mouse.targetX = (event.clientX / width) * 2 - 1;
      mouse.targetY = -(event.clientY / height) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop with time-based changes
    const animate = () => {
      if (prefersReducedMotion) {
        // Static or minimal animation for reduced motion preference
        renderer.render(scene, camera);
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      // Increment time for animation
      timeRef.current += 0.0015; // Slower time progression for subtlety
      
      // Smooth mouse tracking for parallax effect
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      
      // Very subtle rotation based on time and smooth mouse position
      particlesMesh.rotation.y += 0.0003;
      particlesMesh.rotation.x += (mouse.y * 0.03 - particlesMesh.rotation.x) * 0.05;
      particlesMesh.rotation.z += (mouse.x * 0.03 - particlesMesh.rotation.z) * 0.05;
      
      // Subtle position shift for parallax (mouse movement affects position)
      particlesMesh.position.x = mouse.x * 2;
      particlesMesh.position.y = mouse.y * 2;
      
      // Update colors for very subtle animation - only on select particles
      const colors = particlesGeometry.attributes.color.array as Float32Array;
      for (let i = 0; i < colors.length; i += 9) { // Only animate every 3rd particle for performance
        const offset = i * 0.00002; // Very small offset for subtle variation
        
        // Create occasional "pulses" of neon blue
        if (Math.random() > 0.99) { // Small chance for a neon highlight
          colors[i] = 0.1; // R
          colors[i + 1] = 0.6; // G
          colors[i + 2] = 1.0; // B - bright neon blue
        } else {
          // Subtle color animation for most particles
          colors[i] = 0.05 + Math.sin(timeRef.current + offset) * 0.05; // R - subtle variation
          colors[i + 1] = 0.3 + Math.cos(timeRef.current + offset) * 0.1; // G - subtle variation 
          colors[i + 2] = 0.7 + Math.sin(timeRef.current + offset * 2) * 0.1; // B - subtle variation
        }
      }
      particlesGeometry.attributes.color.needsUpdate = true;
      
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
      
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [prefersReducedMotion]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-30"
      aria-hidden="true"
    />
  );
};

export default WebGLBackground;
