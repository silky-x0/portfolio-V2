"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='flex justify-between items-center pt-8 px-8 relative z-20'>
      <div className='text-orange-500 font-black text-2xl tracking-wider'>
        Akhil.
      </div>

      {/* Desktop Navigation */}
      <nav className='hidden md:flex gap-8'>
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

      {/* Mobile Menu Button */}
      <button
        className='md:hidden text-gray-400 hover:text-orange-500/70 transition-colors'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className='fixed inset-0 bg-zinc-900/95 z-50 md:hidden'>
          {/* Close button positioned absolutely in the top-right corner */}
          <button
            className='absolute top-8 right-8 text-gray-400 hover:text-orange-500/70 transition-colors'
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={24} />
          </button>

          <nav className='flex flex-col items-center justify-center h-full gap-8'>
            <a
              href='#'
              className='text-gray-400 hover:text-orange-500/70 transition-colors font-medium text-2xl'
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href='#'
              className='text-gray-400 hover:text-orange-500/70 transition-colors font-medium text-2xl'
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </a>
            <a
              href='#'
              className='text-gray-400 hover:text-orange-500/70 transition-colors font-medium text-2xl'
              onClick={() => setIsMenuOpen(false)}
            >
              Work
            </a>
            <a
              href='#'
              className='text-gray-400 hover:text-orange-500/70 transition-colors font-medium text-2xl'
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;