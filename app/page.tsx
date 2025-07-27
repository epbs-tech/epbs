'use client';
// import { CallToAction } from '@/sections/CallToAction';
// import { Functionalities } from '@/sections/Functionalities';
import  Hero  from '@/sections/Hero';
import LogoTicker  from '@/sections/LogoTicker';

import Calendly from '@/sections/Calendly';
import ExpertisesSection from '@/sections/Expertises';
import PourquoiNousSection from '@/sections/PourquoiNous';
import CTASection from '@/sections/CTA';
import ProgressButtonCTA from '@/sections/ProgressButton';

export default function Home() {
  return (
    <>
      <Hero />
      <LogoTicker />
      <ExpertisesSection />
      <PourquoiNousSection />
      <CTASection />
      
      
      
      {/* <ProductShowcase />
      <StatsSection />
      
      <Functionalities />
      <Pricing />
      <Testimonials />
      <CallToAction /> */}
      <Calendly/>
      <ProgressButtonCTA/>
      {/* <ContactBar/> */}
    </>
  );
}