"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { certifications } from "@/lib/data";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";
import GradientText from "@/components/animations/GradientText";
import {
  FaJava,
  FaProjectDiagram,
  FaPython,
  FaDatabase,
  FaLanguage,
  FaCheckCircle,
  FaCertificate,
} from "react-icons/fa";
import { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  FaJava,
  FaProjectDiagram,
  FaPython,
  FaDatabase,
  FaLanguage,
};

const accentColors = ["#00F5FF", "#7B61FF", "#00FF94", "#00D4FF", "#B47BFF"];

export default function Certifications() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="certifications"
      className="relative py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto"
      aria-label="Certifications"
    >
      {/* Background orbs */}
      <div className="absolute top-1/3 -right-40 w-80 h-80 rounded-full bg-[#00FF94]/6 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-40 w-72 h-72 rounded-full bg-[#7B61FF]/6 blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <ScrollReveal className="text-center mb-16 md:mb-20">
        <motion.p
          className="text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-4"
          style={{ color: "var(--color-primary, #00F5FF)" }}
        >
          Verified Credentials
        </motion.p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading">
          <GradientText>Certifications</GradientText>
        </h2>
      </ScrollReveal>

      {/* Certifications Grid */}
      <StaggerContainer
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        staggerDelay={0.1}
      >
        {certifications.map((cert, index) => {
          const Icon = iconMap[cert.icon] || FaCertificate;
          const accentColor = accentColors[index % accentColors.length];
          const isHovered = hoveredIndex === index;

          return (
            <StaggerItem key={index}>
              <motion.div
                className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 group cursor-default overflow-hidden h-full"
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={{
                  borderColor: `${accentColor}50`,
                  y: -6,
                  scale: 1.02,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                {/* Top gradient glow */}
                <div
                  className="absolute -top-px left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                  }}
                />

                {/* Background subtle glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at center, ${accentColor}06, transparent 70%)`,
                  }}
                />

                {/* Icon area */}
                <div className="relative z-10 flex items-start justify-between mb-5">
                  <motion.div
                    className="w-14 h-14 rounded-xl flex items-center justify-center border transition-colors duration-300"
                    style={{
                      borderColor: `${accentColor}30`,
                      backgroundColor: `${accentColor}10`,
                      color: accentColor,
                    }}
                    whileHover={{
                      rotate: [0, -8, 8, 0],
                      boxShadow: `0 0 25px ${accentColor}30`,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="text-2xl" />
                  </motion.div>

                  {/* Verification checkmark */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0, rotate: -90 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0, rotate: 90 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 15,
                        }}
                        className="flex items-center gap-1.5"
                      >
                        <FaCheckCircle
                          className="text-lg"
                          style={{ color: "#00FF94" }}
                        />
                        <span
                          className="text-xs font-semibold"
                          style={{ color: "#00FF94" }}
                        >
                          Verified
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Cert name */}
                <h3 className="relative z-10 text-base md:text-lg font-bold font-heading text-white mb-3 group-hover:text-white transition-colors duration-300">
                  {cert.name}
                </h3>

                {/* Issuer badge */}
                <div className="relative z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-white/5 border-white/10 group-hover:border-white/20 transition-colors duration-300">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                  <span className="text-xs text-white/60 group-hover:text-white/80 transition-colors duration-300">
                    {cert.issuer}
                  </span>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                  }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {/* Bottom summary badge */}
      <ScrollReveal delay={0.6} className="mt-12 text-center">
        <motion.div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10"
          whileHover={{ borderColor: "rgba(0, 245, 255, 0.3)", scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <FaCertificate
            className="text-sm"
            style={{ color: "var(--color-primary, #00F5FF)" }}
          />
          <span className="text-sm text-white/60">
            <span className="text-white font-semibold">
              {certifications.length}
            </span>{" "}
            Professional Certifications from Industry Leaders
          </span>
        </motion.div>
      </ScrollReveal>
    </section>
  );
}
