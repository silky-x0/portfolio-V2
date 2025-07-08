"use client"

import { animate, hover } from "motion"
import { splitText } from "motion-plus"
import { useMotionValue } from "motion/react"
import { useEffect, useRef } from "react"

export default function ScatterText() {
    const containerRef = useRef<HTMLDivElement>(null)
    const velocityX = useMotionValue(0)
    const velocityY = useMotionValue(0)
    const prevEvent = useRef(0)

    useEffect(() => {
        if (!containerRef.current) return

        const { chars } = splitText(containerRef.current.querySelector(".scatter-h1")!)

        const handlePointerMove = (event: PointerEvent) => {
            const now = performance.now()
            const timeSinceLastEvent = (now - prevEvent.current) / 1000 // seconds
            prevEvent.current = now
            velocityX.set(event.movementX / timeSinceLastEvent)
            velocityY.set(event.movementY / timeSinceLastEvent)
        }

        document.addEventListener("pointermove", handlePointerMove)

        hover(chars, (element) => {
            const speed = Math.sqrt(
                velocityX.get() * velocityX.get() +
                    velocityY.get() * velocityY.get()
            )
            const angle = Math.atan2(velocityY.get(), velocityX.get())
            const distance = Math.min(speed * 0.15, 40) 

            animate(
                element,
                {
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    color: "#38bdf8", 
                    scale: 1.15,
                    textShadow: "0 4px 24px #38bdf8",
                },
                { type: "spring", stiffness: 120, damping: 18 }
            ).finished.then(() => {
                animate(
                    element,
                    { x: 0, y: 0, color: "#fff", scale: 1, textShadow: "none" },
                    { duration: 0.6, easing: "ease-out" }
                )
            })
        })

        return () => {
            document.removeEventListener("pointermove", handlePointerMove)
        }
    }, [])

    return (
        <div
            className="container flex justify-center items-center min-h-[40vh] select-none"
            ref={containerRef}
        >
            <h1 className="scatter-h1 text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-lg text-center">
                Hey, I&apos;m{" "}
                <span className="text-sky-400" >Akhilesh</span>
                .
            </h1>
        </div>
    )
}

