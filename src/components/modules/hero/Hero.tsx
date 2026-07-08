"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Inline Custom SVGs to guarantee zero import errors
const GithubIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.241-1.304.409-1.603-2.665-.303-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
  </svg>
);

const socialLinks = [
  { href: "https://github.com/abdulmazidakash", label: "GitHub", icon: GithubIcon },
  { href: "https://www.linkedin.com/in/abdulmazidakash/", label: "LinkedIn", icon: LinkedinIcon },
  { href: "https://x.com/abdulmazidakash", label: "Twitter", icon: TwitterIcon },
  { href: "https://www.facebook.com/akashabdulmazid/", label: "Facebook", icon: FacebookIcon },
];

// Custom, hydration-safe typewriter hook to stop layout jumps
function useTypewriter(words: string[], speed = 90, deleteSpeed = 50, delaySpeed = 1500) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let timer: NodeJS.Timeout;
    const currentWord = words[wordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentWord.substring(0, text.length - 1));
      }, deleteSpeed);
    } else {
      timer = setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1));
      }, speed);
    }

    if (!isDeleting && text === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), delaySpeed);
    } else if (isDeleting && text === "") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, speed, deleteSpeed, delaySpeed, mounted]);

  if (!mounted) return words[0];
  return text;
}

export default function Hero() {
  const typewriterText = useTypewriter(
    ["Download Resume", "Get My Resume", "Resume Here!"],
    90,
    50,
    1500
  );

  return (
    <div className="relative flex min-h-[85vh] items-center justify-center overflow-hidden rounded-3xl p-6 md:p-12 lg:p-16 my-4 transition-colors duration-500">
      {/* Background Decorative Radial Gradient - blue/sky */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08] transition-opacity duration-500 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, #378ADD 0%, transparent 60%)",
        }}
      />

      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Content Layout */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8 container mx-auto px-4"
      >
        {/* Left Side - Biography / Copywriting */}
        <div className="w-full lg:w-3/5 text-center lg:text-left space-y-6">
          <div className="space-y-3">
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-center lg:justify-start gap-2 text-xs md:text-sm font-bold tracking-widest text-sky-600 dark:text-sky-400 uppercase"
            >
              <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" aria-hidden="true" />
              Available for innovative roles
            </motion.p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-slate-50">
              Hi, This is <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-500 via-blue-600 to-teal-500">
                Abdul Mazid Akash
              </span>
            </h1>
          </div>

          <p className="text-lg md:text-xl font-medium tracking-wide text-slate-700 dark:text-slate-300">
            Full Stack Developer
            <span className="text-sky-500 mx-2">|</span>
            Backend Specialist
          </p>

          <p className="max-w-2xl text-justify text-[15px] leading-relaxed mx-auto lg:mx-0 text-slate-500 dark:text-slate-400">
            Building secure, scalable web applications with Node.js, Express.js, PostgreSQL, Prisma ORM, MongoDB, React, and Next.js.
          </p>

          {/* Social Media Links */}
          <div className="flex justify-center lg:justify-start gap-4 pt-2">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none border-slate-200 bg-white text-slate-700 hover:text-slate-950 hover:border-sky-500/40 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:text-white dark:hover:border-sky-400/40"
              >
                <Icon />
              </Link>
            ))}
          </div>

          {/* CV CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center lg:justify-start pt-4"
          >
            <Link
              href="https://drive.google.com/file/d/1wVq1FbMoFVevw7zMfkUZMsh9EEIopk3R/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center min-w-55 px-8 py-4 text-md font-bold text-white transition-all duration-300 bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 rounded-2xl shadow-lg hover:shadow-sky-500/20 active:scale-[0.98]"
            >
              <span>{typewriterText}</span>
              <span className="ml-1 animate-pulse">_</span>
            </Link>
          </motion.div>
        </div>

        {/* Right Side - Glassmorphic Studio Framed Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="w-full lg:w-2/5 flex justify-center lg:justify-end"
        >
          <div className="relative p-3 rounded-[32px] border transition-colors duration-500 shadow-2xl bg-black/5 border-black/10 dark:bg-white/5 dark:border-white/10">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative h-85 w-72 md:h-115 md:w-95 rounded-[24px] overflow-hidden shadow-2xl bg-slate-900"
            >
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/30 via-transparent to-transparent z-10 pointer-events-none" />

              <Image
                src={`https://i.ibb.co.com/JF5ZpTPC/portfolio-hero-section-latest.png`}
                alt="Abdul Mazid Akash"
                fill
                priority
                className="object-cover h-auto w-auto"
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div >
    </div >
  );
}