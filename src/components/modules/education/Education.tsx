"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaBook, FaAward } from "react-icons/fa";
import { MdSchool } from "react-icons/md";

interface EducationItem {
  id: number;
  degree: string;
  field: string;
  major: string;
  result: string;
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
    major: "Apparel Engineering",
    result: "CGPA 3.09 / 4.00",
    institution: "Narsingdi Textile Engineering College",
    shortName: "NTEC",
    duration: "2021 - June 2026",
    status: "ongoing",
    coursework: [
      "Textile Fibers",
      "Yarn Manufacturing",
      "Fabric Structure & Design",
      "Textile Testing and Quality Control",
      "Textile Production Management",
    ],
    icon: <FaGraduationCap />,
    color: "#0284c7",
    badgeColor:
      "bg-sky-100 text-sky-700 border border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/20",
  },
  {
    id: 2,
    degree: "Diploma In",
    field: "Textile Engineering",
    major: "Textile Engineering",
    result: "CGPA 3.82 / 4.00", // TODO: নিজের আসল result বসাও
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
    color: "#0d9488",
    badgeColor:
      "bg-teal-100 text-teal-700 border border-teal-200 dark:bg-teal-500/10 dark:text-teal-300 dark:border-teal-500/20",
  },
  {
    id: 3,
    degree: "Secondary School Certificate",
    field: "SSC",
    major: "Science",
    result: "GPA 4.67 / 5.00",
    institution: "Baktermunshi Moazzem Hossen High School",
    shortName: "School",
    duration: "2016",
    status: "completed",
    coursework: ["Physics", "Chemistry", "Mathematics", "Biology", "Bangla & English"],
    icon: <FaAward />,
    color: "#d97706",
    badgeColor:
      "bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20",
  },
];

interface EducationCardProps {
  edu: EducationItem;
  index: number;
}

const EducationCard = ({ edu, index }: EducationCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

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
          className="w-5 h-5 rounded-full border-4 mt-8 shrink-0 transition-all border-white dark:border-slate-950"
          style={{ backgroundColor: edu.color, boxShadow: `0 0 12px ${edu.color}88` }}
        />
        {index < educationData.length - 1 && (
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
            transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-4 ${edu.badgeColor}`}
          >
            <FaCalendarAlt className="text-[10px]" />
            {edu.duration}
            {/* {edu.status === "ongoing" && (
              <span className="flex items-center gap-1 ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-600 dark:text-green-400">Ongoing</span>
              </span>
            )} */}
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
          <div
            className={`flex flex-wrap gap-2 mt-4 ${index % 2 === 0 ? "justify-start md:justify-end" : "justify-start"
              }`}
          >
            <span
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{ color: edu.color, backgroundColor: `${edu.color}12` }}
            >
              Major: {edu.major}
            </span>
            <span
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{ color: edu.color, backgroundColor: `${edu.color}12` }}
            >
              Result: {edu.result}
            </span>
          </div>
        </div>

        {/* Right side — coursework card */}
        <div className={`${index % 2 === 0 ? "md:col-start-2 md:pl-16" : "md:col-start-1 md:row-start-1 md:pr-16"}`}>
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.25 }}
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
                {edu.icon}
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                <FaBook className="inline mr-1.5" aria-hidden="true" /> Key coursework
              </span>
            </div>

            <ul className="space-y-2.5">
              {edu.coursework.map((course, i) => (
                <motion.li
                  key={course}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.2 + 0.5 + i * 0.07 }}
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


  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });



  return (
    <section id="education" className="py-20 relative overflow-hidden bg-transparent">

      <div className="container mx-auto px-6 relative z-50">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            Education<span className="text-sky-500">_</span>
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            My academic journey & qualifications
          </p>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-linear-to-r from-sky-500 to-teal-400" />
        </motion.div>

        <div className="relative">
          {educationData.map((edu, index) => (
            <EducationCard key={edu.id} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}