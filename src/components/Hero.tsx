"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { gsap } from "gsap";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import ScatterText from "./ScatterText";
import AnimatedText from "./AnimatedText";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
	resumeUrl: "/resume.pdf",
	projectsUrl: "/projects",
	social: {
		github: "https://github.com/silky-x0",
		linkedin: "https://linkedin.com/in/akhil-is-dev100",
		email: "10akhil.t@gmail.com",
	},
};

function FloatingOrb({
  className,
  delay = 0,
  size = 200,
  color = "rgba(255, 255, 255, 0.1)",
  duration = 20,
}: {
  className?: string;
  delay?: number;
  size?: number;
  color?: string;
  duration?: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  useEffect(() => {
    const animateX = animate(x, [0, 100, -100, 0], {
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    });

    const animateY = animate(y, [0, -100, 100, 0], {
      duration: duration * 0.8,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay * 1.2,
    });

    return () => {
      animateX.stop();
      animateY.stop();
    };
  }, [x, y, duration, delay]);

  return (
    <motion.div
      className={cn("absolute rounded-full blur-xl", className)}
      style={{
        x,
        y,
        rotateX,
        rotateY,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, delay }}
    />
  );
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      life: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        life: Math.random() * 100 + 50,
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
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.5 + 0.2,
            life: Math.random() * 100 + 50,
          };
        }

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
          `,
        }}
      />
      
      <FloatingOrb
        className="top-1/4 left-1/4"
        delay={0}
        size={300}
        color="rgba(120, 119, 198, 0.2)"
        duration={25}
      />
      
      <FloatingOrb
        className="top-1/3 right-1/4"
        delay={2}
        size={250}
        color="rgba(255, 119, 198, 0.15)"
        duration={30}
      />
      
      <FloatingOrb
        className="bottom-1/4 left-1/3"
        delay={4}
        size={200}
        color="rgba(120, 219, 255, 0.2)"
        duration={35}
      />
      
      <FloatingOrb
        className="bottom-1/3 right-1/3"
        delay={1}
        size={180}
        color="rgba(255, 255, 255, 0.1)"
        duration={28}
      />
    </div>
  );
}

function MinimalBg() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#14213d] to-[#000000]">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#14213d] to-[#000000]" />
        
        {/* Animated gradient mesh */}
        <GradientMesh />
        
        {/* Particle field */}
        <ParticleField />
        
        {/* Noise overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#000000]/20" />
      </div>
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
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className='min-h-screen relative'>
			{/* MinimalBg Background */}
			<MinimalBg />

			<section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
				{/* Animated Background Gradient */}
				<div
					ref={backgroundRef}
					className='absolute inset-0 bg-gradient-to-r from-[#14213d]/20 via-[#fca311]/10 to-[#14213d]/20 bg-[length:400%_400%] pointer-events-none'
				/>

				{/* Background Pattern */}
				<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23fca311%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40 pointer-events-none" />
				
				{/* Content Container */}
				<div className='relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					{/* Availability Indicator */}
					<AnimatedText
						delay={0.1}
						className='mb-6'
					>
						<div className='inline-flex items-center gap-2 bg-[#14213d]/60 backdrop-blur-md rounded-full px-3 py-2 sm:px-4 sm:py-2 border border-[#fca311]/30'>
							<div className='w-2 h-2 bg-[#fca311] rounded-full animate-pulse'></div>
							<span className='text-xs sm:text-sm text-[#e5e5e5]'>
								Available for work
							</span>
						</div>
					</AnimatedText>
					{/* Introduction */}
					<AnimatedText
						delay={0.2}
						className='mb-4'
					>
						<p className='text-[#e5e5e5] text-lg sm:text-xl font-medium'>
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
						<h2 className='text-xl sm:text-2xl md:text-3xl text-[#ffffff] font-light'>
							{heroConfig.title}
						</h2>
					</AnimatedText>

					{/* Description */}
					<AnimatedText
						delay={0.8}
						className='mb-10'
					>
						<p className='text-[#e5e5e5] text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed'>
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
									className='skill-tag px-3 py-1.5 sm:px-4 sm:py-2 bg-[#14213d]/80 backdrop-blur-sm border border-[#fca311]/30 rounded-full text-[#ffffff] text-sm sm:text-base font-medium hover:bg-[#fca311]/20 hover:border-[#fca311] transition-all duration-300 cursor-default'
								>
									{skill}
								</span>
							))}
						</div>
					</AnimatedText>

					{/* Call to Action Buttons */}
					<AnimatedText
						delay={1.2}
						className='mb-12'
					>
						<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
							<Button
								size='lg'
								className='bg-[#fca311] hover:bg-[#fca311]/80 text-[#000000] px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 group shadow-lg shadow-[#fca311]/25'
								onClick={() => window.open(heroConfig.projectsUrl, "_blank")}
							>
								View My Projects
								<ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
							</Button>

							<Button
								variant='outline'
								size='lg'
								className='border-[#e5e5e5]/50 hover:text-[#ffffff] hover:bg-[#fca311]/20 hover:border-[#fca311] px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 group bg-transparent'
								onClick={() => window.open(heroConfig.resumeUrl, "_blank")}
							>
								<Download className='mr-2 h-5 w-5 group-hover:scale-110 transition-transform' />
								Download Resume
							</Button>
						</div>
					</AnimatedText>

					{/* Social Links */}
					<AnimatedText delay={1.4}>
						<div className='flex justify-center space-x-6'>
							<a
								href={heroConfig.social.github}
								target='_blank'
								rel='noopener noreferrer'
								className='text-[#e5e5e5] hover:text-[#fca311] transition-colors duration-300 transform hover:scale-110'
								aria-label='GitHub Profile'
							>
								<FaGithub className='h-6 w-6' />
							</a>
							<a
								href={heroConfig.social.linkedin}
								target='_blank'
								rel='noopener noreferrer'
								className='text-[#e5e5e5] hover:text-[#fca311] transition-colors duration-300 transform hover:scale-110'
								aria-label='LinkedIn Profile'
							>
								<FaLinkedin className='h-6 w-6' />
							</a>
							<a
								href={`mailto:${heroConfig.social.email}`}
								className='text-[#e5e5e5] hover:text-[#fca311] transition-colors duration-300 transform hover:scale-110'
								aria-label='Email Contact'
							>
								<Mail className='h-6 w-6' />
							</a>
						</div>
					</AnimatedText>
				</div>

				{/* Scroll Indicator */}
				{showScrollIndicator && (
					<div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block'>
						<div className='w-6 h-10 border-2 border-[#fca311]/60 rounded-full flex justify-center'>
							<div className='w-1 h-3 bg-[#fca311] rounded-full mt-2 animate-pulse' />
						</div>
					</div>
				)}
			</section>
		</div>
	);
}