"use client";

import { animate, hover } from "motion";
import { splitText } from "motion-plus";
import { useMotionValue } from "motion/react";
import { useEffect, useRef } from "react";

export default function ScatterText() {
	const containerRef = useRef<HTMLDivElement>(null);
	const velocityX = useMotionValue(0);
	const velocityY = useMotionValue(0);
	const prevEvent = useRef(0);

	useEffect(() => {
		if (!containerRef.current) return;

		const scatterElement = containerRef.current.querySelector(".scatter-h1");
		if (!scatterElement) return;

		const { chars } = splitText(scatterElement);

		const handlePointerMove = (event: PointerEvent) => {
			const now = performance.now();
			const timeSinceLastEvent = Math.max(
				(now - prevEvent.current) / 1000,
				0.001
			); // Prevent division by zero
			prevEvent.current = now;

			// Smooth velocity calculation with bounds
			const maxVelocity = 800;
			const newVelX = Math.max(
				-maxVelocity,
				Math.min(maxVelocity, event.movementX / timeSinceLastEvent)
			);
			const newVelY = Math.max(
				-maxVelocity,
				Math.min(maxVelocity, event.movementY / timeSinceLastEvent)
			);

			velocityX.set(newVelX);
			velocityY.set(newVelY);
		};

		document.addEventListener("pointermove", handlePointerMove);

		// Enhanced hover effect with better physics
		hover(chars, (element) => {
			const speed = Math.sqrt(
				velocityX.get() * velocityX.get() + velocityY.get() * velocityY.get()
			);
			const angle = Math.atan2(velocityY.get(), velocityX.get());
			const distance = Math.min(speed * 0.08, 50); // Adjusted multiplier and max distance

			// Add some randomness for more organic feel
			const randomOffset = (Math.random() - 0.5) * 10;
			const finalDistance = distance + randomOffset;

			animate(
				element,
				{
					x: Math.cos(angle) * finalDistance,
					y: Math.sin(angle) * finalDistance,
					scale: 1.2,
					color: "#06b6d4",
					textShadow: "0 0 20px #06b6d4, 0 0 40px #0891b2",
					filter: "brightness(1.3)",
				},
				{
					type: "spring",
					stiffness: 150,
					damping: 20,
					duration: 0.3,
				}
			).finished.then(() => {
				animate(
					element,
					{
						x: 0,
						y: 0,
						scale: 1,
						color: "#ffffff",
						textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
						filter: "brightness(1)",
					},
					{
						duration: 0.8,
						easing: "ease-out",
					}
				);
			});
		});

		return () => {
			document.removeEventListener("pointermove", handlePointerMove);
		};
	}, [velocityX, velocityY]);

	return (
		<div
			className='container flex justify-center items-center min-h-[50vh] select-none cursor-none'
			ref={containerRef}
		>
			<h1 className='scatter-h1 text-6xl md:text-8xl font-black text-white tracking-tight text-center leading-tight'>
				Creative{" "}
				<span className='bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent'>
					Developer
				</span>
				<br />
				<span className='text-4xl md:text-5xl font-light text-gray-300'>
					& Digital Artist
				</span>
			</h1>
		</div>
	);
}
