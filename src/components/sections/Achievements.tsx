"use client";

import { motion } from "motion/react";
import { achievements } from "@/lib/data";
import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/ScrollReveal";
import GradientText from "@/components/animations/GradientText";

/* ── Single achievement card ───────────────────────────── */
function AchievementCard({
  achievement,
  index,
}: {
  achievement: (typeof achievements)[number];
  index: number;
}) {
  const glowColors = [
    "rgba(0, 245, 255, 0.25)",
    "rgba(123, 97, 255, 0.25)",
    "rgba(0, 255, 148, 0.25)",
    "rgba(0, 212, 255, 0.25)",
  ];

  const borderColors = [
    "rgba(0, 245, 255, 0.3)",
    "rgba(123, 97, 255, 0.3)",
    "rgba(0, 255, 148, 0.3)",
    "rgba(0, 212, 255, 0.3)",
  ];

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 text-center group hover:border-white/20 transition-colors duration-300"
    >
      {/* Glow backdrop on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 blur-2xl"
        style={{ background: glowColors[index % glowColors.length] }}
      />

      {/* Animated trophy */}
      <motion.div
        className="text-5xl md:text-6xl mb-5 inline-block"
        animate={{
          filter: [
            `drop-shadow(0 0 8px ${borderColors[index % borderColors.length]})`,
            `drop-shadow(0 0 20px ${borderColors[index % borderColors.length]})`,
            `drop-shadow(0 0 8px ${borderColors[index % borderColors.length]})`,
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        {achievement.icon}
      </motion.div>

      {/* Title */}
      <h3 className="text-lg md:text-xl font-heading font-bold text-white mb-2">
        {achievement.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-white/60 leading-relaxed">
        {achievement.description}
      </p>

      {/* Decorative corner accent */}
      <div
        className="absolute top-0 right-0 w-20 h-20 rounded-bl-[60px] opacity-10 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${borderColors[index % borderColors.length]}, transparent)`,
        }}
      />
    </motion.div>
  );
}

/* ── Achievements Section ──────────────────────────────── */
export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto"
      aria-label="Achievements"
    >
      {/* ── Header ─────────────────────────────────── */}
      <ScrollReveal className="text-center mb-16">
        <span className="text-sm uppercase tracking-[0.25em] text-white/50 font-medium block mb-3">
          Milestones
        </span>
        <h2 className="text-3xl md:text-5xl font-heading font-bold">
          <GradientText>Achievements</GradientText>
        </h2>
      </ScrollReveal>

      {/* ── Card grid ──────────────────────────────── */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((achievement, idx) => (
          <StaggerItem key={achievement.title}>
            <AchievementCard achievement={achievement} index={idx} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
