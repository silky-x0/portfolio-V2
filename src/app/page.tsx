"use client";
import { useState } from "react";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import ExperiencePage from "./experiance/page";
export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return showIntro ? (
    <Intro onComplete={() => setShowIntro(false)} />
  ) : (
    <>
      {/* <Navbar /> */}
      <Hero />
      <ExperiencePage />
    </>
  );
}