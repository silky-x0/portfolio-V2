'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <div className='min-h-screen bg-zinc-900 flex flex-col relative overflow-hidden'>
      <Header></Header>
     <Hero></Hero>
    </div>
  );
}
