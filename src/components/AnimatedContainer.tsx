"use client"
import { useEffect, useRef } from "react"
import type React from "react"

import { gsap } from "gsap"

interface AnimatedContainerProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function AnimatedContainer({ children, delay = 0, className = "" }: AnimatedContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        scale: 0.95,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        delay,
        ease: "power2.out",
      },
    )
  }, [delay])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
