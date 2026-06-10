"use client";

import { motion } from "motion/react";
import { aboutText } from "@/lib/data";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";
import GradientText from "@/components/animations/GradientText";
import { FaCode, FaRobot, FaChartLine, FaLightbulb } from "react-icons/fa";

const highlightIcons = [FaCode, FaRobot, FaChartLine, FaLightbulb];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto"
      aria-label="About Me"
    >
      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-[#7B61FF]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[#00F5FF]/8 blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <ScrollReveal className="text-center mb-16 md:mb-20">
        <motion.p
          className="text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-4"
          style={{ color: "var(--color-primary, #00F5FF)" }}
        >
          Get to Know Me
        </motion.p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading">
          <GradientText>About Me</GradientText>
        </h2>
      </ScrollReveal>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
        {/* Story — spans 3 columns */}
        <div className="lg:col-span-3 space-y-6">
          {aboutText.paragraphs.map((paragraph, index) => (
            <ScrollReveal key={index} delay={index * 0.15} direction="left">
              <motion.p
                className="text-base md:text-lg leading-relaxed text-white/70"
                whileHover={{ color: "rgba(255,255,255,0.95)" }}
                transition={{ duration: 0.3 }}
              >
                {paragraph}
              </motion.p>
            </ScrollReveal>
          ))}

          {/* Decorative line */}
          <ScrollReveal delay={0.5}>
            <div className="flex items-center gap-4 pt-4">
              <div
                className="h-px flex-1"
                style={{
                  background:
                    "linear-gradient(to right, #00F5FF, #7B61FF, transparent)",
                }}
              />
              <span className="text-xs tracking-[0.4em] uppercase text-white/30">
                Driven by Curiosity
              </span>
              <div
                className="h-px flex-1"
                style={{
                  background:
                    "linear-gradient(to left, #00FF94, #7B61FF, transparent)",
                }}
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Highlight Cards — spans 2 columns */}
        <div className="lg:col-span-2">
          <StaggerContainer
            className="grid grid-cols-2 gap-4"
            staggerDelay={0.12}
          >
            {aboutText.highlights.map((highlight, index) => {
              const Icon = highlightIcons[index % highlightIcons.length];
              return (
                <StaggerItem key={index}>
                  <motion.div
                    className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-6 text-center cursor-default overflow-hidden"
                    whileHover={{
                      scale: 1.05,
                      borderColor: "rgba(0, 245, 255, 0.4)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-[#00F5FF]/5 via-transparent to-[#7B61FF]/5" />

                    {/* Icon */}
                    <div className="relative z-10 mb-3 flex justify-center">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors duration-300"
                        style={{ color: "var(--color-primary, #00F5FF)" }}
                      >
                        <Icon className="text-xl" />
                      </div>
                    </div>

                    {/* Label */}
                    <p className="relative z-10 text-sm md:text-base font-medium text-white/80 group-hover:text-white transition-colors duration-300">
                      {highlight}
                    </p>

                    {/* Bottom accent bar */}
                    <motion.div
                      className="absolute bottom-0 left-1/2 h-[2px] bg-gradient-to-r from-[#00F5FF] to-[#7B61FF] rounded-full"
                      initial={{ width: 0, x: "-50%" }}
                      whileHover={{ width: "60%" }}
                      transition={{ duration: 0.3 }}
                      style={{ translateX: "-50%" }}
                    />
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Quote card */}
          <ScrollReveal delay={0.6} direction="right">
            <motion.div
              className="mt-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              whileHover={{ borderColor: "rgba(123, 97, 255, 0.3)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="text-3xl leading-none font-heading"
                  style={{ color: "var(--color-secondary, #7B61FF)" }}
                >
                  &ldquo;
                </span>
                <p className="text-sm md:text-base text-white/60 italic leading-relaxed">
                  Strong believer in continuous learning, innovation, and
                  building technology that creates meaningful impact.
                </p>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
