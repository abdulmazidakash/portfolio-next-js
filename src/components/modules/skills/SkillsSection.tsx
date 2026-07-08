"use client";

import React, { useRef, useState } from "react";
import { useTheme } from "next-themes";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaReact } from "react-icons/fa";
import { SiMongodb, SiPostgresql, SiPrisma, SiTypescript, SiShadcnui, SiExpress } from "react-icons/si";
import { RiJavascriptLine } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import { FaNodeJs } from "react-icons/fa6";

const PRIMARY = "#2563eb"; // blue-600
const ACCENT = "#0d9488"; // teal-600
const HIGHLIGHT = "#d97706"; // amber-600

type Category = "Frontend" | "Backend" | "Database & ORM";

interface SkillItem {
  name: string;
  icon: React.ReactNode;
  proficiency: number;
  category: Category;
}

const CATEGORY_COLOR: Record<Category, string> = {
  Frontend: PRIMARY,
  Backend: ACCENT,
  "Database & ORM": ACCENT,
};

const skills: SkillItem[] = [
  { name: "JavaScript", icon: <RiJavascriptLine />, proficiency: 85, category: "Frontend" },
  { name: "TypeScript", icon: <SiTypescript />, proficiency: 75, category: "Frontend" },
  { name: "React", icon: <FaReact />, proficiency: 90, category: "Frontend" },
  { name: "Next.js", icon: <TbBrandNextjs />, proficiency: 80, category: "Frontend" },
  { name: "shadcn/ui", icon: <SiShadcnui />, proficiency: 85, category: "Frontend" },
  { name: "Node.js", icon: <FaNodeJs />, proficiency: 78, category: "Backend" },
  { name: "Express.js", icon: <SiExpress />, proficiency: 82, category: "Backend" },
  { name: "MongoDB", icon: <SiMongodb />, proficiency: 80, category: "Database & ORM" },
  { name: "PostgreSQL", icon: <SiPostgresql />, proficiency: 70, category: "Database & ORM" },
  { name: "Prisma", icon: <SiPrisma />, proficiency: 75, category: "Database & ORM" },
];

const categories: Category[] = ["Frontend", "Backend", "Database & ORM"];

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
  const color = CATEGORY_COLOR[skill.category];

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`relative group rounded-2xl p-5 flex flex-col items-center gap-3 border transition-colors duration-300
        ${darkMode
          ? "bg-gray-900 border-gray-800 hover:border-gray-700"
          : "bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
        }`}
    >
      <div
        className="absolute top-0 left-6 right-6 h-0.5 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />

      <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 96 96">
          <circle
            cx="48" cy="48" r={radius}
            fill="none"
            stroke={darkMode ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)"}
            strokeWidth="6"
          />
          <motion.circle
            cx="48" cy="48" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: dashOffset } : {}}
            transition={{ duration: 1.2, delay: index * 0.05 + 0.2, ease: "easeOut" }}
          />
        </svg>

        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.35, delay: index * 0.05 + 0.35, type: "spring", stiffness: 180 }}
          className="text-2xl sm:text-3xl z-10"
          style={{ color: darkMode ? "#f3f4f6" : "#111827" }}
        >
          {skill.icon}
        </motion.div>
      </div>

      <p className={`text-sm sm:text-base font-semibold text-center leading-tight ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
        {skill.name}
      </p>

      <span
        className="text-xs font-bold px-3 py-0.5 rounded-full border"
        style={{
          color,
          backgroundColor: `${color}15`,
          borderColor: `${color}40`,
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
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");

  const visibleSkills =
    activeCategory === "All" ? skills : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-16 md:py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            My Skills<span style={{ color: HIGHLIGHT }}>_</span>
          </h2>
          <p className={`text-sm font-medium mb-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
            Technologies & Tools I Work With
          </p>
          <div
            className="w-16 h-1 rounded-full mx-auto mb-8"
            style={{ background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})` }}
          />

          {/* Clean Interactive Filter Tabs Wrapper */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 dark:bg-gray-900/60 p-1.5 rounded-2xl border border-gray-200/60 dark:border-white/5 inline-flex flex-wrap gap-2 justify-center isolate">
              {(["All", ...categories] as const).map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 text-xs sm:text-sm font-medium rounded-xl capitalize transition-colors relative duration-200 ${
                      active
                        ? "text-white dark:text-white mix-blend-normal drop-shadow-xs"
                        : isDarkMode
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="activeSkillTabBg"
                        className="absolute inset-0 bg-linear-to-r from-sky-500 to-blue-600 rounded-xl z-0"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6"
          >
            {visibleSkills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} darkMode={isDarkMode} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}