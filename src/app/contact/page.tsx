'use client';

import GridDistortion from '@/components/GridDistortion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Contact() {
  const { theme } = useTheme();
  const [imageSrc, setImageSrc] = useState('/img/contactBGLight.jpg');

  useEffect(() => {
    setImageSrc(theme === 'dark' ? '/img/contactBGDark.jpg' : '/img/contactBGLight.jpg');
  }, [theme]);

  return (
    <div className="relative w-full h-screen bg-background">
      <div className="absolute inset-0 z-0">
        <GridDistortion imageSrc={imageSrc} grid={10} mouse={0.1} strength={0.15} />
      </div>
      <div className="relative z-10 flex items-center justify-center h-full pointer-events-none">
        <div className="max-w-md w-full p-8 bg-background/50 backdrop-blur-md rounded-2xl border border-border">
          <h1 className="text-4xl font-bold text-foreground text-center mb-8 font-migae">Contact Me</h1>
          <form className="space-y-6 pointer-events-auto">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full bg-secondary/50 border border-border rounded-md py-3 px-4 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full bg-secondary/50 border border-border rounded-md py-3 px-4 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-muted-foreground">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 block w-full bg-secondary/50 border border-border rounded-md py-3 px-4 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition"
                placeholder="Your message..."
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/25"
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
