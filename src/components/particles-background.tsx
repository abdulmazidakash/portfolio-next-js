"use client";

import { useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { tsParticles } from "@tsparticles/engine"; // Bypassing wrapper utility functions
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // Directly initialize the engine instance
    loadSlim(tsParticles).then(() => setInit(true));
  }, []);

  const particleColor = resolvedTheme === "dark" ? "#ffffff" : "#888888";

  if (!init) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Particles
        id="tsparticles"
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { 
              value: 300, 
              density: { 
                enable: true, 
                width: 800 
              } 
            },
            color: { value: particleColor },
            shape: { type: "circle" },
            opacity: { value: 0.8, random: true },
            size: { value: { min: 2, max: 8 }, random: true },
            move: { enable: true, direction: "bottom", speed: 1, outModes: { default: "out" } },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
}