"use client";

import Link from "next/link";
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
  { href: "/", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900 shadow-lg text-white py-4">
      <div className="w-full max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg md:text-xl font-bold border border-white/30 rounded-md px-3 py-1.5 hover:bg-blue-200 hover:text-black transition-colors"
        >
          <LaptopMinimal size={20} />
          Abdul Mazid Akash
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-2 font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:bg-blue-200/40 hover:text-black px-4 py-2 rounded-lg transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-linear-to-tl from-sky-900 to-slate-900 text-white border-none w-48"
            >
              {navLinks.map((link) => (
                <DropdownMenuItem key={link.label} asChild>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}