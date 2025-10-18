'use client';

import { motion } from 'framer-motion';
import { experienceConfig } from './experianceConfig';
import { Briefcase } from 'lucide-react';

export default function ExperiencePage() {
  return (
    <main className="min-h-screen py-24 px-4 max-w-5xl mx-auto text-white bg-black">
      <h1 className="text-5xl font-bold mb-16 text-center text-[#ffffff]">
        My Professional Journey
      </h1>
      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-[#fca311]/30 rounded-full" />

        {experienceConfig.map((experience, index) => (
          <motion.div
            key={index}
            className={`mb-12 flex items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="w-1/2">
              <div className={`p-8 bg-[#14213d]/80 backdrop-blur-sm border border-[#fca311]/30 rounded-2xl shadow-lg hover:shadow-[#fca311]/20 transition-all duration-300 transform hover:-translate-y-1 ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'} max-w-md`}>
                <h2 className="text-2xl font-bold text-[#fca311] mb-2">{experience.title}</h2>
                <p className="text-lg font-semibold text-white mb-3">{experience.company}</p>
                <p className="text-md text-[#e5e5e5]/80 mb-4">{experience.duration}</p>
                <ul className="space-y-2 list-disc list-inside text-[#e5e5e5]/90">
                  {experience.responsibilities.map((task, idx) => (
                    <li key={idx}>{task}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-8 h-8 bg-[#fca311] rounded-full z-10 flex items-center justify-center shadow-md">
                  <Briefcase className="text-black" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}