"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface IntroProps {
	onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
	const particlesRef = useRef<HTMLCanvasElement>(null);

	useGSAP(() => {
		const tl = gsap.timeline({
			onComplete,
		});

		// Initial setup
		gsap.set(".intro-text", { 
			scale: 0.8, 
			opacity: 0,
			rotationY: -45,
			transformOrigin: "center center"
		});
		
		gsap.set(".intro-subtitle", { 
			y: 50, 
			opacity: 0 
		});
		
		gsap.set(".intro-logo", { 
			scale: 0, 
			rotation: -180,
			opacity: 0
		});

		// Animation sequence
		tl.to(".intro-logo", {
			scale: 1,
			rotation: 0,
			opacity: 1,
			duration: 0.8,
			ease: "back.out(1.7)",
		})
		.to(".intro-text", {
			scale: 1,
			opacity: 1,
			rotationY: 0,
			duration: 1.2,
			ease: "power3.out",
			delay: -0.3,
		})
		.to(".intro-subtitle", {
			y: 0,
			opacity: 1,
			duration: 0.8,
			ease: "power2.out",
			delay: -0.6,
		})
		.to(".intro-content", {
			scale: 1.1,
			duration: 0.5,
			ease: "power2.inOut",
			delay: 0.5,
		})
		.to(".intro-content", {
			scale: 20,
			opacity: 0,
			duration: 1.5,
			ease: "power4.inOut",
			delay: 0.3,
		})
		.to(containerRef.current, {
			opacity: 0,
			duration: 0.5,
			ease: "power2.out",
			delay: -0.5,
		});
	}, [onComplete]);

	// Particle animation
	useEffect(() => {
		const canvas = particlesRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const particles: Array<{
			x: number;
			y: number;
			vx: number;
			vy: number;
			life: number;
			maxLife: number;
			size: number;
		}> = [];

		// Create particles
		for (let i = 0; i < 100; i++) {
			particles.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				vx: (Math.random() - 0.5) * 2,
				vy: (Math.random() - 0.5) * 2,
				life: Math.random() * 60 + 30,
				maxLife: Math.random() * 60 + 30,
				size: Math.random() * 3 + 1,
			});
		}

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			particles.forEach((particle, index) => {
				particle.x += particle.vx;
				particle.y += particle.vy;
				particle.life--;

				if (particle.life <= 0) {
					particles[index] = {
						x: Math.random() * canvas.width,
						y: Math.random() * canvas.height,
						vx: (Math.random() - 0.5) * 2,
						vy: (Math.random() - 0.5) * 2,
						life: Math.random() * 60 + 30,
						maxLife: Math.random() * 60 + 30,
						size: Math.random() * 3 + 1,
					};
				}

				// Wrap around screen
				if (particle.x < 0) particle.x = canvas.width;
				if (particle.x > canvas.width) particle.x = 0;
				if (particle.y < 0) particle.y = canvas.height;
				if (particle.y > canvas.height) particle.y = 0;

				// Draw particle
				const opacity = particle.life / particle.maxLife;
				ctx.save();
				ctx.globalAlpha = opacity * 0.6;
				ctx.fillStyle = "#fca311";
				ctx.beginPath();
				ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
				ctx.fill();
				ctx.restore();
			});

			requestAnimationFrame(animate);
		};

		animate();

		const handleResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div 
			ref={containerRef}
			className='fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-gradient-to-br from-[#000000] via-[#14213d] to-[#000000] flex items-center justify-center'
		>
			{/* Animated particles background */}
			<canvas
				ref={particlesRef}
				className="absolute inset-0 pointer-events-none"
				style={{ mixBlendMode: "screen" }}
			/>

			{/* Gradient overlay */}
			<div className="absolute inset-0 bg-gradient-to-r from-[#14213d]/40 via-transparent to-[#14213d]/40 pointer-events-none" />

			{/* Grid pattern */}
			<div className="absolute inset-0 opacity-10 pointer-events-none">
				<div 
					className="absolute inset-0" 
					style={{
						backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fca311' fill-opacity='0.4'%3E%3Cpath d='M20 20v-20h1v20h19v1h-19v19h-1v-19h-19v-1h19z'/%3E%3C/g%3E%3C/svg%3E\")",
						backgroundSize: "40px 40px"
					}}
				/>
			</div>

			{/* Main content */}
			<div className="intro-content relative z-10 text-center">
				{/* Logo/Icon */}
				<div className="intro-logo mb-8">
					<div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#fca311] to-[#fca311]/70 rounded-2xl flex items-center justify-center shadow-2xl shadow-[#fca311]/25">
						<svg 
							width="40" 
							height="40" 
							viewBox="0 0 24 24" 
							fill="none" 
							stroke="currentColor" 
							strokeWidth="2.5" 
							strokeLinecap="round" 
							strokeLinejoin="round"
							className="text-[#000000]"
						>
							<path d="M9 12l2 2 4-4"/>
							<path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
						</svg>
					</div>
				</div>

				{/* Main text */}
				<div className="intro-text mb-4">
					<h1 className="text-6xl md:text-8xl font-bold text-white mb-2">
						<span className="bg-gradient-to-r from-[#fca311] via-[#ffffff] to-[#fca311] bg-clip-text text-transparent">
							Hello
						</span>
					</h1>
				</div>

				{/* Subtitle */}
				<div className="intro-subtitle">
					<p className="text-xl md:text-2xl text-[#e5e5e5]/80 font-light">
						Welcome to my digital space
					</p>
					<div className="mt-4 w-24 h-1 bg-gradient-to-r from-transparent via-[#fca311] to-transparent mx-auto rounded-full" />
				</div>
			</div>

			{/* Animated rings */}
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				<div className="w-96 h-96 rounded-full border border-[#fca311]/20 animate-pulse" />
				<div className="absolute w-80 h-80 rounded-full border border-[#fca311]/10 animate-ping" style={{ animationDuration: '3s' }} />
				<div className="absolute w-64 h-64 rounded-full border border-[#fca311]/5 animate-pulse" style={{ animationDelay: '1s' }} />
			</div>
		</div>
	);
};

export default Intro;