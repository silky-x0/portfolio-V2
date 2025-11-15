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
import CurvedLoop from "./CurvedLoop";
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
		<div className='absolute inset-0 w-full h-full overflow-hidden'>
			{/* Lightrays Bg */}
			<LightRays />
		</div>
	);
}


export default function Hero() {
	const backgroundRef = useRef<HTMLDivElement>(null);
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

		const timer = setTimeout(() => setShowScrollIndicator(true), 1800); // 1.8s delay
		return () => clearTimeout(timer);
	}, []);

  const skillsMarqueeText = "   "+ heroConfig.skills.join("    •    ") + "   •";

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
							<p className='text-muted-foreground'>
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
						<div className='mb-12'>
                <CurvedLoop
                    marqueeText={skillsMarqueeText}
                    speed={1}
                    curveAmount={0} // Adjust as needed
                    className='text-foreground'
                    interactive={true}
                />
            </div>

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
								className='text-foreground hover:text-primary transition-colors duration-300 transform hover:scale-110 cursor-pointer'
								aria-label='GitHub Profile'
							>
								<FaGithub className='h-6 w-6' />
							</a>
							<a
								href={heroConfig.social.linkedin}
								target='_blank'
								rel='noopener noreferrer'
								className='text-foreground hover:text-primary transition-colors duration-300 transform hover:scale-110 cursor-pointer'
								aria-label='LinkedIn Profile'
							>
								<FaLinkedin className='h-6 w-6' />
							</a>
							<a
								href={`mailto:${heroConfig.social.email}`}
								className='text-foreground hover:text-primary transition-colors duration-300 transform hover:scale-110 cursor-pointer'
								aria-label='Email Contact'
							>
								<Mail className='h-6 w-6' />
							</a>
						</div>
					</div>

					{/* Scroll Indicator */}
					{showScrollIndicator && (
						<div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block z-20'>
							<div className='w-6 h-10 border-2 dark:border-accent/60 rounded-full flex justify-center'>
								<div className='w-1 h-3 bg-accent rounded-full mt-2 animate-pulse' />
							</div>
						</div>
					)}
				</section>
			</div>
			
		</>
	);
}
