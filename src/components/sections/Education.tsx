"use client";

import { motion } from "motion/react";
import { education } from "@/lib/data";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";
import GradientText from "@/components/animations/GradientText";
import { FaGraduationCap, FaStar } from "react-icons/fa";

const gradeColors = ["#00F5FF", "#7B61FF", "#00FF94"];

export default function Education() {
  return (
    <section
      id="education"
      className="relative py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto"
      aria-label="Education"
    >
      {/* Decorative orbs */}
      <div className="absolute top-1/3 -right-40 w-80 h-80 rounded-full bg-[#00F5FF]/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-40 w-72 h-72 rounded-full bg-[#7B61FF]/8 blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <ScrollReveal className="text-center mb-16 md:mb-20">
        <motion.p
          className="text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-4"
          style={{ color: "var(--color-primary, #00F5FF)" }}
        >
          Academic Journey
        </motion.p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading">
          <GradientText>Education</GradientText>
        </h2>
      </ScrollReveal>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Glowing vertical line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px">
          <div className="absolute inset-0 bg-gradient-to-b from-[#00F5FF] via-[#7B61FF] to-[#00FF94] opacity-40" />
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#00F5FF] via-[#7B61FF] to-[#00FF94]"
            initial={{ height: "0%" }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          {/* Glow effect on the line */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-4 bg-gradient-to-b from-[#00F5FF] via-[#7B61FF] to-[#00FF94] blur-md opacity-30"
            initial={{ height: "0%" }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>

        <StaggerContainer className="space-y-12" staggerDelay={0.2}>
          {education.map((entry, index) => {
            const accentColor = gradeColors[index % gradeColors.length];

            return (
              <StaggerItem key={index}>
                <div className="relative flex gap-6 md:gap-10 pl-0">
                  {/* Timeline node */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2"
                      style={{
                        borderColor: accentColor,
                        backgroundColor: `${accentColor}15`,
                        boxShadow: `0 0 20px ${accentColor}30`,
                      }}
                      whileHover={{
                        scale: 1.15,
                        boxShadow: `0 0 35px ${accentColor}50`,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <FaGraduationCap
                        className="text-lg md:text-xl"
                        style={{ color: accentColor }}
                      />
                    </motion.div>
                  </div>

                  {/* Card */}
                  <motion.div
                    className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-7 group cursor-default"
                    whileHover={{
                      borderColor: `${accentColor}40`,
                      y: -4,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at top left, ${accentColor}08, transparent 70%)`,
                      }}
                    />

                    {/* Header row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold font-heading text-white">
                          {entry.degree}
                        </h3>
                        <p className="text-sm md:text-base text-white/50 mt-1">
                          {entry.institution}
                        </p>
                      </div>

                      {/* Grade badge */}
                      <motion.div
                        className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border"
                        style={{
                          color: accentColor,
                          borderColor: `${accentColor}40`,
                          backgroundColor: `${accentColor}10`,
                          boxShadow: `0 0 15px ${accentColor}20`,
                        }}
                        whileHover={{
                          boxShadow: `0 0 25px ${accentColor}40`,
                          scale: 1.05,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaStar className="text-xs" />
                        {entry.grade}
                      </motion.div>
                    </div>

                    {/* Period */}
                    <p className="text-xs md:text-sm text-white/40 mb-4">
                      {entry.period}
                    </p>

                    {/* Subject tags */}
                    {entry.subjects.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {entry.subjects.map((subject, sIndex) => (
                          <motion.span
                            key={sIndex}
                            className="px-3 py-1 text-xs rounded-full bg-white/5 text-white/60 border border-white/10"
                            whileHover={{
                              backgroundColor: `${accentColor}15`,
                              color: accentColor,
                              borderColor: `${accentColor}30`,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            {subject}
                          </motion.span>
                        ))}
                      </div>
                    )}

                    {/* Achievement badges for notable grades */}
                    {(entry.grade === "100%" || entry.grade.includes("9.5")) && (
                      <motion.div
                        className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={{
                          background: `linear-gradient(135deg, ${accentColor}15, transparent)`,
                          color: accentColor,
                          border: `1px solid ${accentColor}20`,
                        }}
                        animate={{
                          boxShadow: [
                            `0 0 8px ${accentColor}15`,
                            `0 0 16px ${accentColor}30`,
                            `0 0 8px ${accentColor}15`,
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        🏆{" "}
                        {entry.grade === "100%"
                          ? "Perfect Score"
                          : "Academic Excellence"}
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
