"use client";

import { motion } from "motion/react";
import { languages } from "@/lib/data";
import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/ScrollReveal";
import GradientText from "@/components/animations/GradientText";

const langEmoji: Record<string, string> = {
  English: "🇬🇧",
  Hindi: "🇮🇳",
  Telugu: "🗣️",
};

const langColors: Record<string, string> = {
  English: "#00F5FF",
  Hindi: "#FF9933",
  Telugu: "#7B61FF",
};

export default function Languages() {
  return (
    <section
      id="languages"
      className="relative py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <ScrollReveal>
        <div className="text-center mb-16">
          <p
            className="text-sm uppercase tracking-[0.3em] mb-4"
            style={{ color: "#00F5FF" }}
          >
            Communication
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <GradientText>Languages</GradientText>
          </h2>
        </div>
      </ScrollReveal>

      <StaggerContainer className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
        {languages.map((lang) => {
          const color = langColors[lang.name] || "#00F5FF";

          return (
            <StaggerItem key={lang.name}>
              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                className="group relative px-8 py-6 rounded-2xl text-center cursor-default min-w-[180px]"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${color}10 0%, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  <span className="text-4xl mb-3 block">
                    {langEmoji[lang.name] || "🌐"}
                  </span>
                  <h3
                    className="text-lg font-semibold text-white mb-1"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {lang.name}
                  </h3>
                  <p className="text-sm" style={{ color }}>
                    {lang.level}
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
}
