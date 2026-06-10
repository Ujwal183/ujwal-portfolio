"use client";

import { motion } from "motion/react";
import { strengths } from "@/lib/data";
import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/ScrollReveal";
import GradientText from "@/components/animations/GradientText";
import {
  FaPuzzlePiece,
  FaRocket,
  FaUsers,
  FaComments,
  FaSyncAlt,
  FaCrown,
} from "react-icons/fa";
import { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  FaPuzzlePiece,
  FaRocket,
  FaUsers,
  FaComments,
  FaSyncAlt,
  FaCrown,
};

const cardColors = [
  "#00F5FF",
  "#7B61FF",
  "#00FF94",
  "#00D4FF",
  "#FF6B6B",
  "#FFD93D",
];

export default function Strengths() {
  return (
    <section id="strengths" className="relative py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-16">
          <p
            className="text-sm uppercase tracking-[0.3em] mb-4"
            style={{ color: "#00F5FF" }}
          >
            My Strengths
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <GradientText>Core Competencies</GradientText>
          </h2>
        </div>
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {strengths.map((strength, index) => {
          const Icon = iconMap[strength.icon] || FaPuzzlePiece;
          const color = cardColors[index % cardColors.length];

          return (
            <StaggerItem key={strength.title}>
              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                className="group relative p-6 rounded-2xl cursor-default overflow-hidden h-full"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${color}15 0%, transparent 60%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                    style={{
                      background: `${color}15`,
                      border: `1px solid ${color}30`,
                    }}
                  >
                    <Icon size={22} style={{ color }} />
                  </div>

                  <h3
                    className="text-lg font-semibold text-white mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {strength.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {strength.description}
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
