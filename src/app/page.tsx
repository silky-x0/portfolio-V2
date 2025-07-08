"use client";
import { useState } from "react";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return showIntro ? (
    <Intro onComplete={() => setShowIntro(false)} />
  ) : (
    <>
      {/* <Navbar /> */}
      <Hero />
    </>
  );
}