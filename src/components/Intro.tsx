"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"

const Intro = ({ onComplete }: { onComplete: () => void }) => {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onComplete
    })

    tl.to(dotRef.current, {
      x: 0,
      duration: 0.8,
      ease: "bounce.out",
    })
    .to(dotRef.current, {
      scale: 20,
      duration: 1,
      ease: "power4.inOut"
    }, "+=0.3")
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div
        ref={dotRef}
        className="w-10 h-10 rounded-full bg-white translate-x-full"
      />
    </div>
  )
}

export default Intro
