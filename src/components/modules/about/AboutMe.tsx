"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Lottie from "lottie-react";
import lottieAbout from "@/assets/lottie/about.json";
import Link from "next/link";

export default function AboutMe() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-6" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
            About Me<span className="text-sky-500">_</span>
          </h2>
          <p className="text-sm font-medium mb-6 text-sky-600 dark:text-sky-400">
            Know more about who I am
          </p>
          <div className="w-16 h-1 rounded-full bg-linear-to-r from-sky-500 via-blue-500 to-teal-400 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Lottie Animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative rounded-3xl overflow-hidden p-4 w-full max-w-md lg:max-w-lg bg-white shadow-xl dark:bg-gray-900">
              <Lottie
                animationData={lottieAbout}
                loop
                className="w-full h-auto"
                aria-hidden="true"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl p-8 lg:p-10 border transition-all bg-white border-gray-100 shadow-lg dark:bg-gray-900 dark:border-white/10">
              <div className="space-y-6 text-[15.5px] leading-relaxed">
                <p className="text-gray-700 dark:text-gray-300 text-justify">
                  This is{" "}
                  <span className="font-semibold text-sky-600 dark:text-sky-400">
                    Abdul Mazid Akash
                  </span>
                  . I&apos;m a{" "}
                  <span className="font-medium">
                    Textile Engineer and Full Stack Developer
                  </span>{" "}
                  who completed my B.Sc. in Textile Engineering from{" "}
                  <span className="font-medium">
                    Narsingdi Textile Engineering College
                  </span>{" "}
                  in June 2026. Although my academic background is in textile engineering,
                  my passion for technology has driven me to build scalable and modern web
                  applications.
                </p>

                <p className="text-gray-700 dark:text-gray-300 text-justify">
                  I completed a comprehensive web development program from{" "}
                  <Link
                    href="https://www.programming-hero.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 transition-colors"
                  >
                    Programming Hero
                  </Link>
                  , where I gained hands-on experience with modern web technologies.
                  Currently, I specialize in building full-stack applications using{" "}
                  <span className="font-medium">
                    JavaScript, React.js, Next.js, Node.js, Express.js, PostgreSQL,
                    Prisma ORM, and MongoDB
                  </span>
                  , focusing on clean architecture, secure APIs, and user-friendly interfaces.
                </p>

                <p className="text-gray-700 dark:text-gray-300 text-justify">
                  I have developed several real-world projects, including{" "}
                  <Link
                    href="https://scholarship-hub-akash.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 transition-colors"
                  >
                    ScholarshipHub
                  </Link>
                  , a scholarship management platform, and{" "}
                  <Link
                    href="https://tickto-booking.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 transition-colors"
                  >
                    TickTo
                  </Link>
                  , a bus ticket booking system where I contributed to features like real-time
                  seat selection and secure booking workflows. I enjoy solving problems,
                  learning new technologies, and creating impactful digital solutions.
                </p>
              </div>
            </div>
          </motion.div>
        </div >
      </div >
    </section >
  );
}