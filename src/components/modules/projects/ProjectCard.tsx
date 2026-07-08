"use client";

import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

interface Project {
  id: string | number;
  name: string;
  description: string;
  imageUrl?: string;
  liveLink: string;
  githubLink: string;
  technologies: string | string[];
}

interface ProjectCardProps {
  project: Project;
}

// ---------------------------------------------------------------------------
// Unified palette: every tag is blue or teal so the row reads as one system,
// not a rainbow. Reserve amber for a single "featured" tag if you ever need
// one to stand out — don't add more base colors here.
// ---------------------------------------------------------------------------
const techColors: Record<string, string> = {
  React: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  "Next.js": "bg-blue-500/10 text-blue-400 border-blue-500/30",
  TypeScript: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  "Tailwind CSS": "bg-teal-500/10 text-teal-400 border-teal-500/30",
  Node: "bg-teal-500/10 text-teal-400 border-teal-500/30",
  Express: "bg-teal-500/10 text-teal-400 border-teal-500/30",
  MongoDB: "bg-teal-500/10 text-teal-400 border-teal-500/30",
  "Firebase Auth": "bg-blue-500/10 text-blue-400 border-blue-500/30",
  Stripe: "bg-teal-500/10 text-teal-400 border-teal-500/30",
  Gemini: "bg-blue-500/10 text-blue-400 border-blue-500/30",
};

const FALLBACK_COLOR_DARK = "bg-gray-800 text-gray-300 border-gray-700";
const FALLBACK_COLOR_LIGHT = "bg-gray-100 text-gray-700 border-gray-300";

// Trim to a word count and only add "…" if something was actually cut.
function truncateWords(text: string, maxWords: number) {
  const words = text?.trim().split(/\s+/) ?? [];
  if (words.length <= maxWords) return text;
  return `${words.slice(0, maxWords).join(" ")}…`;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  const techList = typeof project.technologies === "string"
    ? project.technologies.split(",")
    : project.technologies || [];

  const description = truncateWords(project.description ?? "", 25);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      transition={{ duration: 0.5 }}
      className={`group relative rounded-3xl overflow-hidden border transition-all duration-300
        ${isDarkMode
          ? "bg-gray-900 border-white/10 hover:border-white/20"
          : "bg-white border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl"
        }`}
    >
      {/* Project Image */}
      <div className={`relative w-full h-52 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center text-sm
            ${isDarkMode ? "text-gray-600" : "text-gray-400"}`}>
            No preview available
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        {/* Project Title */}
        <h2 className={`text-xl font-bold mb-3 line-clamp-2 min-h-14
          ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          {project.name}
        </h2>

        {/* Description */}
        <p className={`text-sm leading-relaxed mb-5 line-clamp-3 min-h-15.75
          ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          {description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {techList.slice(0, 3).map((tech, index) => {
            const trimmedTech = tech.trim();
            return (
              <span
                key={index}
                className={`text-xs font-medium px-3 py-1 rounded-full border transition-all
                  ${techColors[trimmedTech] ||
                    (isDarkMode ? FALLBACK_COLOR_DARK : FALLBACK_COLOR_LIGHT)
                  }`}
              >
                {trimmedTech}
              </span>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center rounded-xl border px-3 py-2 text-sm gap-2 transition-all
              ${isDarkMode
                ? "border-white/30 hover:bg-white/10 hover:border-white/50 text-white"
                : "border-gray-300 hover:bg-gray-50 text-gray-900"
              }`}
          >
            Live <FaExternalLinkAlt className="text-xs" />
          </a>

          <Link
            href={`/projects/${project.id}`}
            className={`flex-1 flex items-center justify-center rounded-xl border px-3 py-2 text-sm gap-2 transition-all
              ${isDarkMode
                ? "border-white/30 hover:bg-white/10 hover:border-white/50 text-white"
                : "border-gray-300 hover:bg-gray-50 text-gray-900"
              }`}
          >
            Details <FaExternalLinkAlt className="text-xs" />
          </Link>

          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center rounded-xl border px-3 py-2 text-sm gap-2 transition-all
              ${isDarkMode
                ? "border-white/30 hover:bg-white/10 hover:border-white/50 text-white"
                : "border-gray-300 hover:bg-gray-50 text-gray-900"
              }`}
          >
            GitHub <FaGithub />
          </a>
        </div>
      </div>
    </motion.div>
  );
}