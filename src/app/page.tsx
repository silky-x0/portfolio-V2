'use client';

import Hero from '@/components/Hero';
import ExperiencePage from './experiance/page';
import Contact from './contact/page';
import MorphingNavbar from '@/components/MorphingNavbar';
export default function Home() {
  return (
    <div>
      
      <MorphingNavbar />
      <div className="sticky top-0 z-0">
        <Hero />
      </div>
      <div className="relative z-10 bg-black">
        <ExperiencePage />
        <Contact />
      </div>
    </div>
  );
}
