"use client"

import type React from "react"
import { useState, useEffect } from "react"
import AnimatedText from "./AnimatedText"
import AnimatedContainer from "./AnimatedContainer"


import { Menu, X } from "lucide-react";

const MorphingNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <div
        className={`fixed top-5 z-50 transition-all duration-700 ease-in-out left-1/2 -translate-x-1/2 ${
          isScrolled ? "w-[calc(100%-2rem)] md:w-[calc(100%-4rem)]" : "w-auto"
        }`}
        style={{
          transformOrigin: "center center",
          willChange: "width"
        }}
      >
        <div
          className={`relative overflow-hidden transition-all duration-700 ease-in-out rounded-full backdrop-blur-md border border-[#fca311]/30 ${
            isScrolled ? "bg-gradient-to-b from-black/70 to-black/10 p-2 md:p-4" : "bg-[#14213d]/60 px-3 py-2 sm:px-4 sm:py-2"
          }`}
          style={{
            transformOrigin: "center center",
          }}
        >
          <AnimatedContainer delay={0.2}>
            <div
              className={`transition-all duration-500 ease-in-out ${
                isScrolled ? "opacity-0 scale-95 -translate-y-2" : "opacity-100 scale-100"
              }`}
            >
              <AnimatedText delay={0.4}>
                <div className="inline-flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#fca311] rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm text-[#e5e5e5] whitespace-nowrap">Available for work</span>
                </div>
              </AnimatedText>
            </div>
          </AnimatedContainer>

          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              isScrolled ? "opacity-100 scale-100" : "opacity-0 scale-95 translate-y-2"
            }`}
          >
            <div className="max-w-6xl mx-auto flex justify-between items-center h-full px-4">
              <div className="text-white font-medium text-2xl" style={{ fontFamily: "'Migae', sans-serif" }}>
                Akhil.
              </div>
              {/* Desktop Navigation */}
              <nav className={`hidden md:flex transition-all duration-300 ${isScrolled ? "opacity-100" : "opacity-0"}`}>
                <ul className="flex space-x-4">
                  <li><a href="#home" className="text-gray-300 hover:text-white transition-colors duration-200">Home</a></li>
                  <li><a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200">About</a></li>
                  <li><a href="#projects" className="text-gray-300 hover:text-white transition-colors duration-200">Projects</a></li>
                  <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-200">Contact</a></li>
                </ul>
              </nav>
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                  {isMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 p-4 bg-black/80 backdrop-blur-md border border-[#fca311]/30 rounded-lg">
            <ul className="flex flex-col space-y-4 items-center">
              <li><a href="#home" className="text-gray-300 hover:text-white transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Home</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>About</a></li>
              <li><a href="#projects" className="text-gray-300 hover:text-white transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Projects</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default MorphingNavbar;
