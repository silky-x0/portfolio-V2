"use client"

import { motion } from "framer-motion";  
import { experienceConfig } from "./experianceConfig";  
export default function ExperiencePage() {
  return (
    <main className="min-h-screen py-24 px-4 max-w-3xl mx-auto text-white bg-black">
      <h1 className="text-4xl font-bold mb-8 text-center">Experience</h1>
      <div className="space-y-8">
        {experienceConfig.map((experience, index) => (
          <motion.div
            key={index}
            className="bg-[#14213d]/80 border border-[#fca311]/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-[#fca311] mb-2">{experience.title}</h2>
            <p className="text-[#e5e5e5] mb-1">{experience.duration}</p>
            <ul className="list-disc list-inside text-[#e5e5e5]/90">
              {experience.responsibilities.map((task, idx) => (
                <li key={idx}>{task}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
