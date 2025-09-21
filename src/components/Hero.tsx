"use client";

export default function Home() {
	return (
		<div className='min-h-screen bg-zinc-900 flex flex-col relative overflow-hidden'>
			{/* Header with logo and navigation */}
			<header className='flex justify-between items-center pt-8 px-8 relative z-10'>
				<div className='text-orange-500 font-black text-2xl tracking-wider'>
					Akhil.
				</div>
				<nav className='flex gap-8'>
					<a
						href='#'
						className='text-gray-400 hover:text-orange-500/70 transition-colors font-medium'
					>
						About
					</a>
					<a
						href='#'
						className='text-gray-400 hover:text-orange-500/70 transition-colors font-medium'
					>
						Services
					</a>
					<a
						href='#'
						className='text-gray-400 hover:text-orange-500/70 transition-colors font-medium'
					>
						Work
					</a>
					<a
						href='#'
						className='text-gray-400 hover:text-orange-500/70 transition-colors font-medium'
					>
						Contact
					</a>
				</nav>
			</header>

			{/* Main content centered */}
			<main className='flex-1 flex items-center justify-center px-8 relative z-10'>
				<div className='text-center max-w-6xl'>
					<h1 className='font-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight'>
						<span className='text-[#FFF6E8]'>DRIVEN BY </span>
						<span className='text-yellow-400'>SYSTEM DESIGN</span>
						<span className='text-yellow-400'>,</span>
						<br />
						<span className='text-[#FFF6E8]'>FASCINATED BY </span>
						<span className='text-green-600'>SCALABLE ARCHITECTURE</span>
						<span className='text-green-600'>,</span>
						<br />
						<span className='text-[#FFF6E8]'>FUELLED BY </span>
						<span className='text-pink-400'>CLEAN CODE</span>
						<span className='text-[#FFF6E8]'> AND</span>
						<br />
						<span className='text-[#FFF6E8]'>POWERED BY </span>
						<span className='text-orange-500'>ROBUST BACKENDS</span>
						<span className='text-orange-500'>.</span>
					</h1>
				</div>
			</main>

			{/* Scrolling banner at bottom */}
			<div className='bg-orange-500 py-4 overflow-hidden relative transform -rotate-3 origin-center'>
				<div className='flex animate-scroll whitespace-nowrap'>
					<div className='flex items-center gap-8 text-white font-bold text-base sm:text-lg tracking-wider'>
						<span>RECTANGLE ARTIST</span>
						<span>•</span>
						<span>TECH ENTHUSIAST</span>
						<span>•</span>
						<span>BRAND CONNOISSEUR</span>
						<span>•</span>
						<span>DESK DECOR</span>
						<span>•</span>
						<span>RECTANGLE ARTIST</span>
						<span>•</span>
						<span>TECH ENTHUSIAST</span>
						<span>•</span>
						<span>BRAND CONNOISSEUR</span>
						<span>•</span>
						<span>DESK DECOR</span>
						<span>•</span>
					</div>
				</div>
			</div>
		</div>
	);
}
