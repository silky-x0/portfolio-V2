"use client"
import { useEffect, useRef } from "react"
import type React from "react"

import { gsap } from "gsap"

interface AnimatedTextProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function AnimatedText({ children, delay = 0, className = "" }: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    gsap.fromTo(
      textRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: "power2.out",
      },
    )
  }, [delay])

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  )
}
