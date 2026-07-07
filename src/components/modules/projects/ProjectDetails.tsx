"use client";

import React from "react";
import { FaArrowUpRightFromSquare, FaGithub, FaWrench } from "react-icons/fa6";
import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useQuery } from "@tanstack/react-query";

interface Project {
  id: string | number;
  name: string;
  description: string;
  imageUrl: string;
  liveLink: string;
  githubLink: string;
  technologies: string | string[];
  challenges: string[];
  improvements: string[];
}

// 1. Declare an explicit interface for the component props
interface ProjectDetailsProps {
  id: string;
}

// 2. Accept 'id' as a destructured parameter prop here
export default function ProjectDetails({ id }: ProjectDetailsProps) {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  // 3. Pass the prop id straight to your React Query setup
  const { data: project, isLoading, isError } = useQuery<Project | null>({
    queryKey: ["project", id],
    queryFn: async () => {
      if (!id) return null;
      const response = await fetch("/projects.json");
      const projects: Project[] = await response.json();
      return projects.find((p) => String(p.id) === String(id)) || null;
    },
  });

  if (isLoading) return <p className="text-center text-lg py-20">Loading...</p>;
  if (isError || !project) return <p className="text-center text-red-500 py-20">Project not found!</p>;

  const techColors: Record<string, string> = {
    React: "badge-primary",
    "Tailwind CSS": "badge-secondary",
    MongoDB: "badge-success",
    Stripe: "badge-warning",
  };

  const techList = typeof project.technologies === "string"
    ? project.technologies.split(",")
    : project.technologies || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`container mx-auto px-4 rounded-lg my-8 py-10 shadow-lg ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className={`card bg-base-100 rounded-xl overflow-hidden ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}>
        <motion.img
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          src={project.imageUrl}
          alt={project.name}
          className="w-full h-96 object-cover rounded-lg"
        />
        <div className="card-body p-6">
          <h2 className="card-title text-3xl font-bold">{project.name}</h2>
          <p className="text-sm mt-2 text-justify opacity-90">{project.description}</p>

          <h3 className="text-xl font-bold mt-4">Technologies Used:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {techList.map((tech, index) => {
              const trimmedTech = tech.trim();
              return (
                <span 
                  className={`badge p-3 font-medium ${techColors[trimmedTech] || "badge-neutral"}`} 
                  key={index}
                >
                  {trimmedTech}
                </span>
              );
            })}
          </div>

          {/* Challenges Section */}
          {project.challenges && project.challenges.length > 0 && (
            <>
              <h3 className="text-xl font-bold mt-4 flex items-center gap-2">
                <FaExclamationTriangle className="text-yellow-500" /> Challenges Faced:
              </h3>
              <ul className="list-disc list-inside mt-2 space-y-1 opacity-90">
                {project.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </>
          )}

          {/* Improvements Section */}
          {project.improvements && project.improvements.length > 0 && (
            <>
              <h3 className="text-xl font-bold mt-4 flex items-center gap-2">
                <FaWrench className="text-blue-500" /> Potential Improvements:
              </h3>
              <ul className="list-disc list-inside mt-2 space-y-1 opacity-90">
                {project.improvements.map((improvement, index) => (
                  <li key={index}>{improvement}</li>
                ))}
              </ul>
            </>
          )}

          {/* Action Links */}
          <div className="mt-6 flex gap-4">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all"
            >
              <FaArrowUpRightFromSquare /> Live Project
            </a>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all"
            >
              <FaGithub /> GitHub
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}