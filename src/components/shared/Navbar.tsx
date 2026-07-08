"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LaptopMinimal, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "../theme-toggle";

const navLinks = [
  { href: "/", label: "Home", id: "home" },
  { href: "#about", label: "About", id: "about" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#education", label: "Education", id: "education" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Among sections currently crossing the "active band", pick the one
        // closest to the top of the viewport — avoids flicker when two
        // sections are both partially visible.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Treat the middle band of the viewport as "active" — top 40% and
        // bottom 55% are excluded so a section counts as active only once
        // it's substantially in view.
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900 shadow-lg text-white py-4 border-b border-white/10">
      <div className="w-full max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg md:text-xl font-bold border border-white/20 rounded-md px-3 py-1.5 hover:border-sky-400/60 hover:bg-sky-400/10 hover:text-sky-300 transition-colors duration-300"
        >
          <LaptopMinimal size={20} />
          Abdul Mazid Akash
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-2 font-semibold">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                  isActive
                    ? "bg-sky-400/15 text-sky-300"
                    : "hover:bg-sky-400/10 hover:text-sky-300 text-white/90"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 hover:text-sky-300"
              >
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-slate-900 border border-white/10 text-white w-48"
            >
              {navLinks.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <DropdownMenuItem
                    key={link.label}
                    asChild
                    className={`hover:bg-sky-400/10 hover:text-sky-300 focus:bg-sky-400/10 focus:text-sky-300 ${
                      isActive ? "bg-sky-400/15 text-sky-300" : ""
                    }`}
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}