'use client';

import { InlineWidget } from 'react-calendly';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const CalendlySection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.1, 0.3], [30, 0]);
  const descOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const descY = useTransform(scrollYProgress, [0.2, 0.4], [30, 0]);

  return (
    <section
      id="book-meeting"
      ref={sectionRef}
      className="bg-gradient-to-b from-[#EAEEFE] to-white py-24 overflow-hidden relative"
    >
      <motion.div
        className="absolute -top-10 left-1/2 opacity-20 -translate-x-1/2 z-0"
        style={{ translateY }}
      >
        <div className="w-[150px] h-[150px] rounded-full bg-[#EAEEFE] blur-3xl" />
      </motion.div>

      <div className="container relative z-10 text-center">
        <motion.h2 
          ref={titleRef}
          className=" font-mont section-title"
          style={{
            opacity: titleOpacity,
            y: titleY
          }}
        >
          Réservez une Consultation Gratuite
        </motion.h2>
        
        <motion.p 
          ref={descRef}
          className="font-lato section-description mt-5 max-w-xl mx-auto"
          style={{
            opacity: descOpacity,
            y: descY
          }}
        >
           Planifiez un appel de 30 minutes pour discuter de vos besoins et découvrir comment notre expertise peut vous aider.
        </motion.p>

        <div className="mt-10">
          <InlineWidget
            url="https://calendly.com/epbsconsulting-sdg-esg-csr/30min"
            styles={{ height: '700px' }}
          />
        </div>
      </div>
    </section>
  );
};

export default CalendlySection;