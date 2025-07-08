"use client";
import { useState } from "react";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Navbar from "@/components/Navbar";

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