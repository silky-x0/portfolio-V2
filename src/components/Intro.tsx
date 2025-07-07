"use client";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface IntroProps {
	onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
	useGSAP(() => {
		const tl = gsap.timeline({
			onComplete,
		});

		tl.to(".hiMask-group", {
			rotate: 10,
			duration: 2,
			ease: "Power4.easeInOut",
			transformOrigin: "50% 50%",
		}).to(".hiMask-group", {
			scale: 10,
			duration: 2,
			delay: -1.8,
			ease: "Expo.easeInOut",
			transformOrigin: "50% 50%",
			opacity: 0,
		});
	}, [onComplete]);

	return (
		<div className='svg flex justify-center items-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden'>
			<svg
				viewBox='0 0 800 600'
				preserveAspectRatio='xMidYMid slice'
			>
				<defs>
					<mask id='hiMask'>
						<rect
							width='100%'
							height='100%'
							fill='black'
						/>
						<g className='hiMask-group'>
							<text
								x='50%'
								y='50%'
								fontSize='250'
								textAnchor='middle'
								fill='white'
								dominantBaseline='middle'
								fontFamily='Arial Black'
							>
								Hi
							</text>
						</g>
					</mask>
				</defs>

				<image
					href='https://images.unsplash.com/photo-1506744038136-46273834b3fb'
					width='100%'
					height='100%'
					preserveAspectRatio='xMidYMid slice'
					mask='url(#hiMask)'
				/>
			</svg>
		</div>
	);
};

export default Intro;