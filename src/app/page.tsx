'use client';

import Hero from '@/components/Hero';
import ExperiencePage from './experiance/page';
import Contact from './contact/page';
import { NavBar } from "@/components/ui/tubelight-navbar";
import { Home as HomeIcon, User, Folder, Mail } from "lucide-react";

const navItems = [
  { name: "Home", url: "/", icon: HomeIcon },
  { name: "About", url: "/about", icon: User },
  { name: "Projects", url: "/projects", icon: Folder },
  { name: "Contact", url: "/contact", icon: Mail },
];

export default function Home() {
  return (
    <div>
      <NavBar items={navItems} />
      <div className="sticky top-0 z-0">
        <Hero />
      </div>
      <div className="relative z-10 bg-black">
        <ExperiencePage />
        <Contact />
      </div>
    </div>
  );
}
