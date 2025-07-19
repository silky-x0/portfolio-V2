"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface IntroProps {
	onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const maskCircleRef = useRef<SVGCircleElement>(null);
	const subtitleRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const tl = gsap.timeline({ onComplete });
		// Animate the SVG mask circle to reveal the text
		tl.fromTo(
			maskCircleRef.current,
			{ r: 0 },
			{
				r: 120,
				duration: 1.2,
				ease: "power3.inOut",
			}
		)
			// Fade in subtitle
			.fromTo(
				subtitleRef.current,
				{ opacity: 0, y: 30 },
				{ opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
				"-=0.5"
			)
			// Fade out the whole intro
			.to(
				containerRef.current,
				{ opacity: 0, duration: 0.6, delay: 0.8, ease: "power2.in" }
			);
	}, [onComplete]);

	return (
		<div
			ref={containerRef}
			className="fixed top-0 left-0 z-[100] w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#14213d] to-[#0f172a]"
		>
			{/* SVG Masked Text */}
			<svg
				width="320"
				height="180"
				viewBox="0 0 320 180"
				className="block mx-auto"
			>
				<defs>
					<mask id="reveal-mask">
						<rect width="320" height="180" fill="white" />
						<circle
							ref={maskCircleRef}
							cx="160"
							cy="90"
							r="0"
							fill="black"
						/>
					</mask>
				</defs>
				<g mask="url(#reveal-mask)">
					<text
						x="50%"
						y="50%"
						textAnchor="middle"
						dominantBaseline="middle"
						fontSize="56"
						fontWeight="bold"
						fill="#fca311"
						style={{ fontFamily: 'inherit', letterSpacing: 2 }}
					>
						Hello
					</text>
				</g>
			</svg>
			{/* Subtitle */}
			<div
				ref={subtitleRef}
				className="absolute bottom-32 left-0 w-full text-center"
			>
				<p className="text-lg md:text-2xl text-[#e5e5e5]/90 font-light tracking-wide">
					Hola Amigo, kaise ho thik ho?
				</p>
			</div>
		</div>
	);
};

export default Intro;
