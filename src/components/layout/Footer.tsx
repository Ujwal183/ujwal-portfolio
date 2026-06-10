"use client";

import { personalInfo } from "@/lib/data";
import { FaLinkedin, FaGithub, FaEnvelope, FaHeart } from "react-icons/fa";
import { motion } from "motion/react";

const socialLinks = [
  { icon: FaLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
  { icon: FaGithub, href: personalInfo.github, label: "GitHub" },
  { icon: FaEnvelope, href: `mailto:${personalInfo.email}`, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      {/* Gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent, #00F5FF, #7B61FF, #00FF94, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Name & tagline */}
          <div className="text-center md:text-left">
            <h3
              className="text-xl font-bold mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-white">N. Sai </span>
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #00F5FF, #7B61FF)",
                }}
              >
                Ujwal Reddy
              </span>
            </h3>
            <p className="text-white/50 text-sm">
              Building the Future with Software and AI.
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 text-white/60 hover:text-[#00F5FF]"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-sm">
          <p>
            © {new Date().getFullYear()} N. Sai Ujwal Reddy. All rights
            reserved.
          </p>
          <p className="flex items-center gap-1">
            Crafted with <FaHeart className="text-red-500 text-xs" /> and code
          </p>
        </div>
      </div>
    </footer>
  );
}
