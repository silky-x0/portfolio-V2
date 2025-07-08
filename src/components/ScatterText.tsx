"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function ScatterText() {
  const containerRef = useRef<HTMLDivElement>(null)
  const velocityX = useRef(0)
  const velocityY = useRef(0)
  const prevEvent = useRef(0)

  useEffect(() => {
    if (!containerRef.current) return
    const textElement = containerRef.current.querySelector(".scatter-text") as HTMLElement
    if (!textElement) return

    // Simple text splitting - just split by characters
    const text = textElement.textContent || ""
    textElement.innerHTML = ""
    const chars: HTMLElement[] = []

    for (let i = 0; i < text.length; i++) {
      const char = text[i]
      const span = document.createElement("span")

      if (char === " ") {
        span.innerHTML = "&nbsp;"
      } else {
        span.textContent = char
      }

      span.style.display = "inline-block"
      span.style.position = "relative"

      textElement.appendChild(span)
      chars.push(span)
    }

    const handlePointerMove = (event: PointerEvent) => {
      const now = performance.now()
      const timeSinceLastEvent = Math.max((now - prevEvent.current) / 1000, 0.001)
      prevEvent.current = now

      const maxVelocity = 800
      velocityX.current = Math.max(-maxVelocity, Math.min(maxVelocity, event.movementX / timeSinceLastEvent))
      velocityY.current = Math.max(-maxVelocity, Math.min(maxVelocity, event.movementY / timeSinceLastEvent))
    }

    const handleCharHover = (char: HTMLElement) => {
      const speed = Math.sqrt(velocityX.current * velocityX.current + velocityY.current * velocityY.current)
      const angle = Math.atan2(velocityY.current, velocityX.current)
      const distance = Math.min(speed * 0.08, 40)

      const randomOffset = (Math.random() - 0.5) * 8
      const finalDistance = distance + randomOffset
      const moveX = Math.cos(angle) * finalDistance
      const moveY = Math.sin(angle) * finalDistance

      gsap.killTweensOf(char)
      gsap.to(char, {
        x: moveX,
        y: moveY,
        scale: 1.2,
        duration: 0.3,
        ease: "back.out(1.7)",
        onComplete: () => {
          gsap.to(char, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          })
        },
      })
    }

    // Add hover listeners
    chars.forEach((char) => {
      char.addEventListener("mouseenter", () => handleCharHover(char))
    })

    document.addEventListener("pointermove", handlePointerMove)

    return () => {
      document.removeEventListener("pointermove", handlePointerMove)
      chars.forEach((char) => {
        char.removeEventListener("mouseenter", () => handleCharHover(char))
      })
    }
  }, [])

  return (
    <div className="flex justify-center items-center select-none" ref={containerRef}>
      <h1 className="scatter-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white text-center leading-tight">
        Backend Engineer
      </h1>
    </div>
  )
}
