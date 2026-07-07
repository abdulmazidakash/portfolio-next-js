"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useTheme } from "next-themes";
import Swal from "sweetalert2";

interface ContactItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

export default function ContactInformation() {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "All fields are required!",
      });
      return;
    }

    try {
      // Replaced import.meta.env with Next.js native process.env
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${apiUrl}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Thank you! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: data.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Network error. Please try again later.",
      });
      console.error("Email Send Error:", error);
    }
  };

  const contactInfo: ContactItem[] = [
    {
      icon: <FaPhone />,
      label: "Phone",
      value: "+88-018882-185628",
      color: "#22c55e",
    },
    {
      icon: <FaEnvelope />,
      label: "Email",
      value: "akashabdulmazid@gmail.com",
      color: "#6366f1",
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "Location",
      value: "Feni, Bangladesh",
      color: "#f59e0b",
    },
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-6" ref={sectionRef}>
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-black"}`}>
            Get In Touch<span className="text-purple-500">_</span>
          </h2>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Have a project in mind? Let&apos;s discuss how we can work together.
          </p>
          <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left: Contact Information */}
          <div className="lg:col-span-2 space-y-8">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -4 }}
                className={`group relative rounded-2xl p-6 border transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-900/70 border-white/10 hover:border-white/20"
                    : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
                }`}
              >
                <div className="flex items-start gap-5">
                  <div
                    className="p-4 rounded-xl flex-shrink-0 text-2xl"
                    style={{
                      color: item.color,
                      backgroundColor: `${item.color}15`,
                    }}
                  >
                    {item.icon}
                  </div>

                  <div className="pt-1">
                    <p className="uppercase tracking-widest text-xs font-medium mb-1 text-gray-500">
                      {item.label}
                    </p>
                    <p className={`text-[17px] font-medium break-all ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {item.value}
                    </p>
                  </div>
                </div>

                {/* Subtle accent line */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
                />
              </motion.div>
            ))}
          </div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`lg:col-span-3 rounded-3xl p-8 lg:p-10 border transition-all ${
              isDarkMode
                ? "bg-gray-900/80 border-white/5 backdrop-blur-md"
                : "bg-white border-gray-100 shadow-lg"
            }`}
            style={{
              boxShadow: isDarkMode ? "0 10px 40px rgba(0, 0, 0, 0.4)" : "0 10px 30px rgba(0, 0, 0, 0.08)",
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={`w-full h-12 px-5 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full h-12 px-5 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Write your message here..."
                  className={`w-full px-5 py-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y min-h-[160px] transition-all ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      : "bg-gray-50 border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`w-full border-b-2 px-6 py-3 text-lg rounded-xl font-medium text-white transition-all ${
                  isDarkMode ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}