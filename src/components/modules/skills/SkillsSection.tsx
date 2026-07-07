"use client";

import React, { useRef } from "react";
import { useTheme } from "next-themes";
import { motion, useInView } from "framer-motion";
import { FaReact } from "react-icons/fa";
import { SiMongodb, SiPostgresql, SiPrisma, SiTypescript, SiShadcnui } from "react-icons/si";
import { RiJavascriptLine } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import { FaNodeJs } from "react-icons/fa6";

// Explicit interface mapping for a clean skill schema
interface SkillItem {
  name: string;
  icon: React.ReactNode;
  proficiency: number;
  color: string;
  glow: string;
}

const skills: SkillItem[] = [
  { name: "JavaScript", icon: <RiJavascriptLine />, proficiency: 85, color: "#eab308", glow: "#eab30840" },
  { name: "TypeScript", icon: <SiTypescript />, proficiency: 75, color: "#2563eb", glow: "#2563eb40" },
  { name: "React", icon: <FaReact />, proficiency: 90, color: "#6366f1", glow: "#6366f140" },
  { name: "MongoDB", icon: <SiMongodb />, proficiency: 80, color: "#16a34a", glow: "#16a34a40" },
  { name: "PostgreSQL", icon: <SiPostgresql />, proficiency: 70, color: "#0ea5e9", glow: "#0ea5e940" },
  { name: "Prisma", icon: <SiPrisma />, proficiency: 75, color: "#94a3b8", glow: "#94a3b840" },
  { name: "Next.js", icon: <TbBrandNextjs />, proficiency: 80, color: "#e2e8f0", glow: "#e2e8f040" },
  { name: "Node.js", icon: <FaNodeJs />, proficiency: 78, color: "#22c55e", glow: "#22c55e40" },
  { name: "shadcn/ui", icon: <SiShadcnui />, proficiency: 85, color: "#a1a1aa", glow: "#a1a1aa40" },
];

const radius = 32;
const circumference = 2 * Math.PI * radius;

interface SkillCardProps {
  skill: SkillItem;
  index: number;
  darkMode: boolean;
}

const SkillCard = ({ skill, index, darkMode }: SkillCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const dashOffset = circumference - (skill.proficiency / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className={`relative group rounded-3xl p-6 flex flex-col items-center gap-4 border transition-all duration-300 overflow-hidden
        ${darkMode
          ? "bg-gray-900/70 border-white/10 hover:border-white/20 hover:bg-gray-900/90"
          : "bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-xl"
        }`}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-6 right-6 h-0.75 rounded-b-full opacity-0 group-hover:opacity-100 transition-all duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)` }}
      />

      {/* Circular Progress */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" width="96" height="96" viewBox="0 0 96 96">
          <circle
            cx="48" cy="48" r={radius}
            fill="none"
            stroke={darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}
            strokeWidth="6"
          />
          <motion.circle
            cx="48" cy="48" r={radius}
            fill="none"
            stroke={skill.color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: dashOffset } : {}}
            transition={{ duration: 1.4, delay: index * 0.06 + 0.3, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 6px ${skill.color})` }}
          />
        </svg>

        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.06 + 0.5, type: "spring", stiffness: 180 }}
          className="text-3xl z-10"
          style={{ color: skill.color }}
        >
          {skill.icon}
        </motion.div>
      </div>

      {/* Skill Name */}
      <p className={`text-base font-semibold text-center leading-tight mt-2 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
        {skill.name}
      </p>

      {/* Proficiency */}
      <span
        className="text-xs font-bold px-4 py-1 rounded-full border"
        style={{
          color: skill.color,
          backgroundColor: `${skill.color}15`,
          borderColor: `${skill.color}40`,
        }}
      >
        {skill.proficiency}%
      </span>
    </motion.div>
  );
};

export default function SkillsSection() {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-6">
        {/* Top Heading Section */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            My Skills<span className="text-purple-500">_</span>
          </h2>
          <p className={`text-sm font-medium mb-6 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}>
            Technologies & Tools I Work With
          </p>

          <div className="w-16 h-1 rounded-full bg-linear-to-r from-purple-500 via-indigo-500 to-emerald-400 mx-auto mb-8" />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6">
          {skills.map((skill, index) => (
            <SkillCard 
              key={index} 
              skill={skill} 
              index={index} 
              darkMode={isDarkMode} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}