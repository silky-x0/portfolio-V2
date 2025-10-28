"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { gsap } from "gsap";
import ScatterText from "./ScatterText";
import AnimatedText from "./AnimatedText";
import { Button } from "@/components/button";
import LightRays from "./LightRays";
import { ThemeSwitcher } from "./ThemeSwitcher";
// import DotGrid from "./DotGrid";

const heroConfig = {
	name: "Akhilesh Tiwari",
	title: "Junior Backend Engineer",
	description:
		"I build scalable backend systems, design clean APIs, and work across cloud, databases, and distributed architecture to keep things fast and reliable.",
	skills: [
		"Node.js",
		"TypeScript",
		"Next.js",
		"AWS",
		"Docker",
		"CI/CD",
		"PostgreSQL",
		"Redis",
	],
	resumeUrl:
		"https://drive.google.com/file/d/14RTDuS4q_Srh0Kfz59ZZ4tRHhmnPtQBW/view?usp=sharing",
	projectsUrl: "/projects",
	social: {
		github: "https://github.com/silky-x0",
		linkedin: "https://linkedin.com/in/akhil-is-dev100",
		email: "10akhil.t@gmail.com",
	},
};

function MinimalBg() {
	return (
		<div className='absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none'>
			{/* Lightrays Bg */}
			<LightRays />
		</div>
	);
}


export default function Hero() {
	const backgroundRef = useRef<HTMLDivElement>(null);
	const skillsRef = useRef<HTMLDivElement>(null);
	const [showScrollIndicator, setShowScrollIndicator] = useState(false);

	useEffect(() => {
		// Animated background gradient
		if (backgroundRef.current) {
			gsap.to(backgroundRef.current, {
				backgroundPosition: "200% 200%",
				duration: 20,
				repeat: -1,
				yoyo: true,
				ease: "none",
			});
		}

		// Staggered skill tags animation
		if (skillsRef.current) {
			const skillTags = skillsRef.current.querySelectorAll(".skill-tag");
			gsap.fromTo(
				skillTags,
				{
					opacity: 0,
					scale: 0.8,
					y: 20,
				},
				{
					opacity: 1,
					scale: 1,
					y: 0,
					duration: 0.5,
					stagger: 0.1,
					delay: 1.5,
					ease: "back.out(1.7)",
				}
			);
		}

		const timer = setTimeout(() => setShowScrollIndicator(true), 1800); // 1.8s delay
		return clearTimeout(timer);
	}, []);

	return (
		<>  
			<div className="absolute top-4 right-4 z-30">
				<ThemeSwitcher />
			</div>
			<div className='min-h-screen relative'>
				{/* MinimalBg Background */}
				<MinimalBg />

				<section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
					{/* Content Container */}
					<div className='relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
						
						{/* Introduction */}
						<AnimatedText
							delay={0.2}
							className='mb-4'
						>
							<p className='text-foreground'>
								Hello, I&apos;m {heroConfig.name}
							</p>
						</AnimatedText>

						{/* Main Title with Scatter Animation */}
						<div className='mb-6'>
							<ScatterText />
						</div>

						{/* Subtitle */}
						<AnimatedText
							delay={0.6}
							className='mb-8'
						>
							<h2 className='text-xl sm:text-2xl md:text-3xl text-foreground'>
								{heroConfig.title}
							</h2>
						</AnimatedText>

						{/* Description */}
						<AnimatedText
							delay={0.8}
							className='mb-10'
						>
							<p className='text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed'>
								{heroConfig.description}
							</p>
						</AnimatedText>

						{/* Skills Tags */}
						<AnimatedText
							delay={1.0}
							className='mb-12'
						>
							<div
								ref={skillsRef}
								className='flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto'
							>
								{heroConfig.skills.map((skill, index) => (
									<span
										key={index}
										className='skill-tag px-3 py-1.5 sm:px-4 sm:py-2 bg-secondary/80 backdrop-blur-sm border border-accent/30 rounded-full text-secondary-foreground text-sm sm:text-base font-medium hover:bg-accent/20 hover:border-accent transition-all duration-300 cursor-default'
									>
										{skill}
									</span>
								))}
							</div>
						</AnimatedText>

						{/* Call to Action Buttons */}
						<div className='mb-12'>
							<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
								<Button
									size='lg'
									className='bg-primary hover:bg-primary/80 text-primary-foreground px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 group shadow-lg shadow-primary/25 cursor-pointer'
									onClick={() => {
										console.log('Projects button clicked!');
										window.open(heroConfig.projectsUrl, "_blank");
									}}
								>
									View My Projects
									<ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
								</Button>

								<Button
									variant='outline'
									size='lg'
									className='border-border/50 hover:text-foreground hover:bg-accent/20 hover:border-accent px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 group bg-transparent cursor-pointer'
									onClick={() => {
										console.log('Resume button clicked!');
										window.open(heroConfig.resumeUrl, "_blank");
									}}
								>
									<Download className='mr-2 h-5 w-5 group-hover:scale-110 transition-transform' />
									Download Resume
								</Button>
							</div>
						</div>

						{/* Social Links */}
						<div className='flex justify-center space-x-6'>
							<a
								href={heroConfig.social.github}
								target='_blank'
								rel='noopener noreferrer'
								className='text-muted-foreground hover:text-accent transition-colors duration-300 transform hover:scale-110 cursor-pointer'
								onClick={() => console.log('GitHub link clicked!')}
							>
								<FaGithub className='h-6 w-6' />
							</a>
							<a
								href={heroConfig.social.linkedin}
								target='_blank'
								rel='noopener noreferrer'
								className='text-[#e5e5e5] hover:text-[#fca311] transition-colors duration-300 transform hover:scale-110 cursor-pointer'
								aria-label='LinkedIn Profile'
							>
								<FaLinkedin className='h-6 w-6' />
							</a>
							<a
								href={`mailto:${heroConfig.social.email}`}
								className='text-[#e5e5e5] hover:text-[#fca311] transition-colors duration-300 transform hover:scale-110 cursor-pointer'
								aria-label='Email Contact'
							>
								<Mail className='h-6 w-6' />
							</a>
						</div>
					</div>

					{/* Scroll Indicator */}
					{showScrollIndicator && (
						<div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block z-20'>
							<div className='w-6 h-10 border-2 border-accent/60 rounded-full flex justify-center'>
								<div className='w-1 h-3 bg-accent rounded-full mt-2 animate-pulse' />
							</div>
						</div>
					)}
				</section>
			</div>
			
		</>
	);
}
