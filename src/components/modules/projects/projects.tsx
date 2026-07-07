"use client";

import React, { useRef } from "react";
import { useTheme } from "next-themes";
import { motion, useInView } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import ProjectCard from "./ProjectCard";

// Explicit interface matching your project object schema
interface Project {
  id: string | number;
  name: string;
  description: string;
  imageUrl?: string;
  liveLink: string;
  githubLink: string;
  technologies: string[];
  // Add any other specific properties your project object uses
}

export default function Projects() {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      // Fetches from the public folder (e.g., public/projects.json)
      const response = await fetch("/projects.json"); 
      const data = await response.json();
      return data.slice(0, 6); // Show only 6 featured projects
    },
  });

  return (
    <section id="projects" className="py-20 relative overflow-hidden" ref={sectionRef}>
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Featured Projects<span className="text-purple-500">_</span>
          </h2>
          
          <p className={`text-sm font-medium mb-6 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}>
            Showcasing My Recent Web Development Work
          </p>

          <div className="w-16 h-1 rounded-full bg-linear-to-r from-purple-500 via-indigo-500 to-emerald-400 mx-auto" />
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {projects?.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}