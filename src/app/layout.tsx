import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/shared/Navbar";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from "@/components/shared/Footer";
import ParticlesBackground from "@/components/particles-background";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Abdul Mazid Akash | Portfolio",
  description: "Full-stack developer portfolio built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body>
        <Providers>
          {/* Particle Background */}
          <div className="fixed top-0 left-0 w-full h-full z-10">
            <ParticlesBackground />
          </div>

          {/* Actual content */}
          <div className="relative z-10">
            <div className="mb-8">
              <Navbar />
            </div>
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}