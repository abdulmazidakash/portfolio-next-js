"use client";

import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  return (
    <div className="relative flex items-center justify-center overflow-hidden rounded-lg p-12">
      {/* Gradient Background */}
      <div   
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-grid.png')] opacity-20" />

      {/* Content Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col-reverse lg:flex-row items-center gap-8 container mx-auto px-4 text-white"
      >
        {/* Left Side - Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`text-3xl md:text-4xl lg:text-5xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            Hi, This is
          </motion.h1>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mt-2 lg:mt-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            Abdul Mazid Akash
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className={`py-4 text-lg md:text-xl ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            Frontend Developer | Web Enthusiast
          </motion.p>

          {/* Social Media Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex justify-center lg:justify-start gap-6 my-4"
          >
            <a href="https://github.com/abdulmazidakash" className={`text-2xl hover:text-gray-300 transition ${isDarkMode ? "text-gray-300" : "text-gray-700"}`} target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/abdulmazidakash/" className={`text-2xl hover:text-gray-300 transition ${isDarkMode ? "text-gray-300" : "text-gray-700"}`} target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://x.com/abdulmazidakash" className={`text-2xl hover:text-gray-300 transition ${isDarkMode ? "text-gray-300" : "text-gray-700"}`} target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://www.facebook.com/akashabdulmazid/" className={`text-2xl hover:text-gray-300 transition ${isDarkMode ? "text-gray-300" : "text-gray-700"}`} target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
          </motion.div>

          {/* Resume Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center lg:justify-start mt-4"
          >
            <a 
              target="_blank" 
              href="https://drive.google.com/file/d/1wVq1FbMoFVevw7zMfkUZMsh9EEIopk3R/view?usp=sharing" 
              download
              className={`btn btn-primary border-b-2 px-6 py-3 text-lg rounded-md font-medium text-white ${isDarkMode ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              <Typewriter
                words={['Download Resume', 'Get My CV', 'Resume Here!']}
                loop={0} // Changed from Infinity to 0 to align correctly with react-simple-typewriter's latest types
                cursor
                cursorStyle="_"
                typeSpeed={90}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </a>
          </motion.div>
        </div>

        {/* Right Side - Image Wrapper */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex justify-center lg:justify-end bg-white/10 backdrop-blur-sm rounded-lg"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative h-75 md:h-112.5 w-64 md:w-full max-w-md rounded-2xl overflow-hidden"
          >
            <Image
              src="https://i.ibb.co/XkrcpbqY/abdul-mazid-akash-facebook-proflie-removebg-preview.png"
              alt="Abdul Mazid Akash"
              fill
              priority
              sizes="(max-width: 768px) 256px, 450px"
              className="object-cover rounded-2xl"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}