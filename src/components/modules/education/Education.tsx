"use client";
import React, { useRef } from "react"; // Fix: React and hooks come from "react"
import { useTheme } from "next-themes";   // Fix: useTheme comes from "next-themes"
import { motion, useInView } from "framer-motion";
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaBook } from "react-icons/fa";
import { MdSchool } from "react-icons/md";

// Defined explicit interface for your data structure
interface EducationItem {
  id: number;
  degree: string;
  field: string;
  institution: string;
  shortName: string;
  duration: string;
  status: "ongoing" | "completed";
  coursework: string[];
  icon: React.ReactNode;
  color: string;
  badgeColor: string;
}

const educationData: EducationItem[] = [
  {
    id: 1,
    degree: "Bachelor Of Science",
    field: "Textile Engineering",
    institution: "Narsingdi Textile Engineering College",
    shortName: "NTEC",
    duration: "2021 - Present",
    status: "ongoing",
    coursework: [
      "Textile Fibers",
      "Yarn Manufacturing",
      "Fabric Structure & Design",
      "Textile Testing and Quality Control",
      "Textile Production Management",
    ],
    icon: <FaGraduationCap />,
    color: "#6C63FF",
    badgeColor: "bg-purple-100 text-purple-700 border border-purple-200",
  },
  {
    id: 2,
    degree: "Diploma In",
    field: "Textile Engineering",
    institution: "Chattogram Textile Institute",
    shortName: "CTI",
    duration: "2016 - 2020",
    status: "completed",
    coursework: [
      "Textile Raw Materials",
      "Spinning Technology",
      "Weaving Technology",
      "Dyeing & Finishing",
      "Industrial Training in Textile Mills",
    ],
    icon: <MdSchool />,
    color: "#00C9A7",
    badgeColor: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  },
];

interface EducationCardProps {
  edu: EducationItem;
  index: number;
}

const EducationCard = ({ edu, index }: EducationCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
      className="relative group"
    >
      {/* Timeline dot & line */}
      <div className="hidden md:flex flex-col items-center absolute left-1/2 -translate-x-1/2 top-0 bottom-0 z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
          className={`w-5 h-5 rounded-full border-4 mt-8 shrink-0 transition-all
            ${isDarkMode ? "border-[#0f172a]" : "border-white"}`}
          style={{ 
            backgroundColor: edu.color, 
            boxShadow: `0 0 12px ${edu.color}88` 
          }}
        />
        {index < educationData.length - 1 && (
          <div 
            className="w-0.5 flex-1 mt-2" 
            style={{ 
              background: isDarkMode 
                ? `linear-gradient(to bottom, ${edu.color}55, transparent)` 
                : `linear-gradient(to bottom, ${edu.color}88, transparent)` 
            }} 
          />
        )}
      </div>

      {/* Card layout — alternating left/right on md+ */}
      <div className="md:grid md:grid-cols-2 md:gap-12 mb-16">
        {/* Left side content */}
        <div className={`${index % 2 === 0 ? "md:text-right md:pr-16" : "md:col-start-2 md:text-left md:pl-16"} mb-6 md:mb-0`}>
          {/* Duration badge */}
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-4 ${edu.badgeColor}`}
          >
            <FaCalendarAlt className="text-[10px]" />
            {edu.duration}
            {edu.status === "ongoing" && (
              <span className="flex items-center gap-1 ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-600">Ongoing</span>
              </span>
            )}
          </motion.div>

          <h3 className={`text-xl font-bold leading-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            {edu.degree}{" "}
            <span style={{ color: edu.color }}>@{edu.field}</span>
          </h3>

          <div className={`flex items-center gap-1.5 mt-3 text-sm justify-start md:justify-end
            ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            {index % 2 !== 0 && <FaMapMarkerAlt className="text-xs shrink-0" style={{ color: edu.color }} />}
            <span>{edu.institution} ({edu.shortName})</span>
            {index % 2 === 0 && <FaMapMarkerAlt className="text-xs shrink-0" style={{ color: edu.color }} />}
          </div>
        </div>

        {/* Right side — coursework card */}
        <div className={`${index % 2 === 0 ? "md:col-start-2 md:pl-16" : "md:col-start-1 md:row-start-1 md:pr-16"}`}>
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.25 }}
            className={`relative rounded-3xl overflow-hidden p-6 border transition-all duration-300 group-hover:border-opacity-30
              ${isDarkMode 
                ? "bg-gray-900/80 border-white/10" 
                : "bg-white border-gray-200 shadow-md"
              }`}
            style={{
              boxShadow: isDarkMode ? `0 4px 32px ${edu.color}15` : `0 4px 25px ${edu.color}12`,
            }}
          >
            {/* Colored top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
              style={{ background: `linear-gradient(90deg, ${edu.color}, transparent)` }}
            />

            {/* Glow background */}
            <div
              className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"
              style={{ backgroundColor: edu.color }}
            />

            <div className="flex items-center gap-3 mb-5">
              <div 
                className="text-2xl p-3 rounded-2xl"
                style={{ 
                  color: edu.color, 
                  backgroundColor: isDarkMode ? `${edu.color}15` : `${edu.color}12` 
                }}
              >
                {edu.icon}
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                <FaBook className="inline mr-1.5" /> Key Coursework
              </span>
            </div>

            <ul className="space-y-2.5">
              {edu.coursework.map((course, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.2 + 0.5 + i * 0.07 }}
                  className={`flex items-center gap-3 text-[15px] ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: edu.color }}
                  />
                  {course}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Education() {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section id="education" className="py-20 relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(100,100,100,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(100,100,100,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Education<span className="text-purple-500">_</span>
          </h2>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            My academic journey & qualifications
          </p>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-linear-to-r from-purple-500 to-emerald-400" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {educationData.map((edu, index) => (
            <EducationCard key={edu.id} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}