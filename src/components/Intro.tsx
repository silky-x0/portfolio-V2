"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Intro({ onComplete }: { onComplete: () => void }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false); // ensure animation only runs once

  useEffect(() => {
    const onScroll = () => {
      if (!hasAnimated.current && dotRef.current) {
        hasAnimated.current = true;

        gsap.to(dotRef.current, {
          scale: 50,
          duration: 1.5,
          ease: "power4.inOut",
          onComplete: onComplete, // show Hero after zoom
        });

        gsap.to(containerRef.current, {
          opacity: 0,
          delay: 1,
          duration: 0.5,
          ease: "power1.out",
        });
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center h-screen text-7xl font-bold bg-black text-white"
    >
      <span>Hi</span>
      <div
        ref={dotRef}
        className="text-pink-500 ml-2"
        style={{
          transformOrigin: "center",
        }}
      >
        .
      </div>
    </div>
  );
}