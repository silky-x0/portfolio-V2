"use client";
import { useState } from "react";
import Hero from "@/components/Hero";
//import Intro from "@/components/Intro";

// export default function Home() {
//   const [showIntro, setShowIntro] = useState(true);

//   return showIntro ? (
//     <Intro onComplete={() => setShowIntro(false)} />
//   ) : (
//     <Hero />
//   );
// }

export default function Home() {
  return (
    <>
    <div className=" w-full h-full bg-zinc-950 flex justify-center items-center overflow-hidden">
        <Hero/>
    </div>
    </>
  )
}