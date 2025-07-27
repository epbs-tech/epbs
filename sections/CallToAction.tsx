'use client';

import ArrowRight from '@/assets/arrow-right.svg';
import paperPlane from '@/assets/paperPlane.png';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useRef } from 'react';

export const CallToAction = () => {
  const planeRef = useRef<HTMLImageElement | null>(null);
  const controls = useAnimation();

  const handleClick = () => {
    // Natural paper plane trajectory with smooth rotation
    controls.start({
      // Rightward curve then center
      x: [0, 120,160],
      // Upward arc then descent
      y: [0, -100, 500],
      // Smooth rotation sequence:
      // 1. Starts level (0°)
      // 2. Tilts up-right during ascent (25°)
      // 3. Levels out at peak (5°)
      // 4. Tilts down during descent (-15°)
      rotate: [0, 90, 90, 90],
      // Fade effects
      opacity: [0.2, 1, 1, 0],
      transition: {
        duration: 2.2,
        ease: [0.4, 0, 0.2, 1],
        times: [0, 0.3, 0.6, 1]
      }
    }).then(() => {
      document.getElementById('book-meeting')?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        controls.start({
          x: 0,
          y: 0,
          rotate: 0,
          opacity: 0.2,
          transition: { duration: 0 }
        });
      }, 1500);
    });
  };

  return (
    <section className="bg-gradient-to-b from-white to-[#D2DCFF] py-24 overflow-hidden relative">
      {/* Natural Flying Paper Plane */}
      <motion.img
        ref={planeRef}
        src={paperPlane.src}
        alt="Paper Plane"
        className="absolute top-10 left-1/2 z-0 pointer-events-none"
        style={{
          width: '200px',
          x: '-50%', // Center initially
        }}
        initial={{ opacity: 0.2 }}
        animate={controls}
      />

      <div className="container relative z-10">
        <div className="section-heading pt-10 text-center">
          <h2 className="section-title">Make Your Appointment Today</h2>
          <p className="section-description mt-5">
            Celebrate the joy of accomplishment with an app designed to track
            your progress and motivate your efforts.
          </p>
        </div>

        <div className="flex gap-2 mt-10 justify-center">
          <button 
            className="btn btn-primary"
            onClick={handleClick}
          >
            Book a Meeting
          </button>
          <button className="btn btn-text gap-1 group transition-all duration-300 ease-in-out">
            <span>Learn more</span>
            <ArrowRight className="h-5 w-5 transform transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};