'use client';

import GridDistortion from '@/components/GridDistortion';

export default function Contact() {
  return (
    <div className="relative w-full h-screen bg-black">
      <div className="absolute inset-0 z-0">
        <GridDistortion imageSrc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" grid={10} mouse={0.1} strength={0.15} />
      </div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="max-w-md w-full p-8 bg-black/50 backdrop-blur-md rounded-2xl border border-white/10">
          <h1 className="text-4xl font-bold text-white text-center mb-8" style={{ fontFamily: "'Migae', sans-serif" }}>Contact Me</h1>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full bg-white/5 border border-white/10 rounded-md py-3 px-4 text-white focus:ring-2 focus:ring-[#fca311] focus:border-[#fca311] transition"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full bg-white/5 border border-white/10 rounded-md py-3 px-4 text-white focus:ring-2 focus:ring-[#fca311] focus:border-[#fca311] transition"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 block w-full bg-white/5 border border-white/10 rounded-md py-3 px-4 text-white focus:ring-2 focus:ring-[#fca311] focus:border-[#fca311] transition"
                placeholder="Your message..."
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-[#fca311] hover:bg-[#fca311]/80 text-black font-bold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#fca311]/25"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
