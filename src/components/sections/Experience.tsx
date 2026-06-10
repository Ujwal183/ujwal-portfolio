"use client";

import { motion } from "motion/react";
import { experience } from "@/lib/data";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";
import GradientText from "@/components/animations/GradientText";
import { FaBriefcase, FaCircle, FaChevronRight } from "react-icons/fa";

const cardAccents = ["#00F5FF", "#7B61FF"];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto"
      aria-label="Work Experience"
    >
      {/* Background orbs */}
      <div className="absolute top-1/4 -left-32 w-72 h-72 rounded-full bg-[#00F5FF]/6 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-[#7B61FF]/6 blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <ScrollReveal className="text-center mb-16 md:mb-20">
        <motion.p
          className="text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-4"
          style={{ color: "var(--color-primary, #00F5FF)" }}
        >
          Career Path
        </motion.p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading">
          <GradientText>Experience</GradientText>
        </h2>
      </ScrollReveal>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Glowing vertical line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px">
          <div className="absolute inset-0 bg-gradient-to-b from-[#00F5FF] via-[#7B61FF] to-transparent opacity-30" />
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#00F5FF] to-[#7B61FF]"
            initial={{ height: "0%" }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>

        <StaggerContainer className="space-y-12" staggerDelay={0.25}>
          {experience.map((entry, index) => {
            const accentColor = cardAccents[index % cardAccents.length];

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
                      <FaBriefcase
                        className="text-lg md:text-xl"
                        style={{ color: accentColor }}
                      />
                    </motion.div>

                    {/* Pulse ring for current role */}
                    {entry.current && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2"
                        style={{ borderColor: accentColor }}
                        animate={{
                          scale: [1, 1.6, 1.6],
                          opacity: [0.6, 0, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    )}
                  </div>

                  {/* Card */}
                  <motion.div
                    className="relative flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-7 group cursor-default overflow-hidden"
                    whileHover={{
                      borderColor: `${accentColor}40`,
                      y: -4,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Subtle gradient overlay on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at top left, ${accentColor}08, transparent 70%)`,
                      }}
                    />

                    {/* Header */}
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold font-heading text-white">
                          {entry.title}
                        </h3>
                        <p
                          className="text-sm md:text-base font-medium mt-1"
                          style={{ color: accentColor }}
                        >
                          {entry.company}
                        </p>
                      </div>

                      {/* Current badge or period */}
                      {entry.current ? (
                        <motion.div
                          className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border"
                          style={{
                            color: "#00FF94",
                            borderColor: "rgba(0, 255, 148, 0.4)",
                            backgroundColor: "rgba(0, 255, 148, 0.1)",
                          }}
                          animate={{
                            boxShadow: [
                              "0 0 8px rgba(0, 255, 148, 0.15)",
                              "0 0 20px rgba(0, 255, 148, 0.35)",
                              "0 0 8px rgba(0, 255, 148, 0.15)",
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <FaCircle className="text-[6px]" />
                          Current
                        </motion.div>
                      ) : (
                        <span className="text-xs text-white/40 flex-shrink-0 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
                          Completed
                        </span>
                      )}
                    </div>

                    {/* Period text */}
                    <p className="relative z-10 text-xs md:text-sm text-white/40 mb-5">
                      {entry.period}
                    </p>

                    {/* Responsibilities */}
                    <ul className="relative z-10 space-y-3">
                      {entry.responsibilities.map((item, rIndex) => (
                        <motion.li
                          key={rIndex}
                          className="flex items-start gap-3 text-sm md:text-base text-white/65 group/item"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.3 + rIndex * 0.1,
                            duration: 0.4,
                          }}
                        >
                          <FaChevronRight
                            className="text-[10px] mt-1.5 flex-shrink-0 transition-colors duration-300 group-hover/item:translate-x-0.5"
                            style={{ color: accentColor }}
                          />
                          <span className="group-hover/item:text-white/90 transition-colors duration-300">
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
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
