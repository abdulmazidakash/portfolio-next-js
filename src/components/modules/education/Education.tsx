"use client";
import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaBook, FaAward, FaLaptopCode, FaRocket } from "react-icons/fa";
import { MdSchool } from "react-icons/md";

// 1. Import the static JSON data directly
import educationJsonData from "./education.json";

// 2. Define an Icon Map dictionary to resolve raw JSON strings into React components
const iconMap: Record<string, React.ReactNode> = {
  FaRocket: <FaRocket />,
  FaLaptopCode: <FaLaptopCode />,
  FaGraduationCap: <FaGraduationCap />,
  MdSchool: <MdSchool />,
  FaAward: <FaAward />,
};

interface EducationItem {
  id: number;
  type: "academic" | "course";
  degree: string;
  field: string;
  major: string;
  result: string;
  institution: string;
  shortName: string;
  duration: string;
  status: "ongoing" | "completed";
  coursework: string[];
  icon: string; // Changed from React.ReactNode to string for JSON support
  color: string;
  badgeColor: string;
}

interface EducationCardProps {
  edu: EducationItem;
  index: number;
  totalItems: number;
}

const EducationCard = ({ edu, index, totalItems }: EducationCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Resolve the string icon fallback safely
  const renderedIcon = iconMap[edu.icon] || <FaBook />;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      className="relative group"
    >
      {/* Timeline dot & line */}
      <div className="hidden md:flex flex-col items-center absolute left-1/2 -translate-x-1/2 top-0 bottom-0 z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.12 + 0.2 }}
          className="w-5 h-5 rounded-full border-4 mt-8 shrink-0 transition-all border-white dark:border-slate-950"
          style={{ backgroundColor: edu.color, boxShadow: `0 0 12px ${edu.color}88` }}
        />
        {index < totalItems - 1 && (
          <div
            className="w-0.5 flex-1 mt-2 opacity-70 dark:opacity-40"
            style={{ background: `linear-gradient(to bottom, ${edu.color}, transparent)` }}
          />
        )}
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-12 mb-16">
        {/* Left side content */}
        <div className={`${index % 2 === 0 ? "md:text-right md:pr-16" : "md:col-start-2 md:text-left md:pl-16"} mb-6 md:mb-0`}>
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.12 + 0.3 }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-4 ${edu.badgeColor}`}
          >
            <FaCalendarAlt className="text-[10px]" />
            {edu.duration}
            {edu.status === "ongoing" && (
              <span className="flex items-center gap-1 ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-600 dark:text-green-400">Ongoing</span>
              </span>
            )}
          </motion.div>

          <h3 className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
            {edu.degree} <span style={{ color: edu.color }}>@{edu.field}</span>
          </h3>
          <div
            className={`flex items-center gap-1.5 mt-3 text-sm text-gray-600 dark:text-gray-400 ${index % 2 === 0 ? "justify-start md:justify-end" : "justify-start md:justify-start"
              }`}
          >
            {index % 2 !== 0 && <FaMapMarkerAlt className="text-xs shrink-0" style={{ color: edu.color }} />}
            <span>{edu.institution} ({edu.shortName})</span>
            {index % 2 === 0 && <FaMapMarkerAlt className="text-xs shrink-0" style={{ color: edu.color }} />}
          </div>

          {/* Major + Result stats */}
          <div className={`flex flex-wrap gap-2 mt-4 ${index % 2 === 0 ? "justify-start md:justify-end" : "justify-start"}`}>
            <span
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{ color: edu.color, backgroundColor: `${edu.color}12` }}
            >
              {edu.type === "course" ? "Track:" : "Major:"} {edu.major}
            </span>
            <span
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{ color: edu.color, backgroundColor: `${edu.color}12` }}
            >
              Status: {edu.result}
            </span>
          </div>
        </div>

        {/* Right side — coursework card */}
        <div className={`${index % 2 === 0 ? "md:col-start-2 md:pl-16" : "md:col-start-1 md:row-start-1 md:pr-16"}`}>
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12 + 0.2 }}
            className="relative rounded-3xl overflow-hidden p-6 border transition-all duration-300 group-hover:border-opacity-30 bg-white border-gray-200 shadow-md dark:bg-gray-900 dark:border-white/10"
            style={{ boxShadow: `0 4px 25px ${edu.color}15` }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
              style={{ background: `linear-gradient(90deg, ${edu.color}, transparent)` }}
            />
            <div
              className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"
              style={{ backgroundColor: edu.color }}
            />

            <div className="flex items-center gap-3 mb-5">
              <div
                className="text-2xl p-3 rounded-2xl"
                style={{ color: edu.color, backgroundColor: `${edu.color}15` }}
              >
                {renderedIcon}
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                <FaBook className="inline mr-1.5" aria-hidden="true" /> {edu.type === "course" ? "Core Modules" : "Key coursework"}
              </span>
            </div>

            <ul className="space-y-2.5">
              {edu.coursework.map((course, i) => (
                <motion.li
                  key={course}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.12 + 0.3 + i * 0.05 }}
                  className="flex items-center gap-3 text-[15px] text-gray-700 dark:text-gray-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: edu.color }} />
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
  const [activeTab, setActiveTab] = useState<"all" | "academic" | "course">("all");
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  // 3. Cast the imported JSON data explicitly to the required item type structural blueprint
  const educationData = educationJsonData as EducationItem[];

  const filteredData = educationData.filter(
    (item) => activeTab === "all" || item.type === activeTab
  );

  return (
    <section id="education" className="py-20 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 relative z-50">

        {/* Section Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            Education & Certifications<span className="text-sky-500">_</span>
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            My academic journey & specialized training history
          </p>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-linear-to-r from-sky-500 to-teal-400" />
        </motion.div>

        {/* Interactive Filter Tabs */}
        {/* Interactive Filter Tabs */}
        <div className="flex justify-center mb-16">
          <div className="bg-gray-100 dark:bg-gray-900/60 p-1.5 rounded-2xl border border-gray-200/60 dark:border-white/5 inline-flex gap-2 isolate">
            {(["all", "academic", "course"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-sm font-medium rounded-xl capitalize transition-colors relative duration-200 ${activeTab === tab
                    ? "text-white dark:text-white mix-blend-normal drop-shadow-xs"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-linear-to-r from-sky-500 to-blue-600 rounded-xl z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {tab === "all" ? "Show All" : tab === "course" ? "Professional Courses" : "Academic"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Grid Rendering */}
        <div className="relative">
          <AnimatePresence mode="popLayout">
            {filteredData.map((edu, index) => (
              <EducationCard
                key={edu.id}
                edu={edu}
                index={index}
                totalItems={filteredData.length}
              />
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}