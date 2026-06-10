"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { skillCategories } from "@/lib/data";
import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/ScrollReveal";
import GradientText from "@/components/animations/GradientText";
import {
  FaCode,
  FaGlobe,
  FaDatabase,
  FaChartBar,
  FaBrain,
  FaTools,
  FaShieldAlt,
  FaCogs,
} from "react-icons/fa";
import type { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  FaCode,
  FaGlobe,
  FaDatabase,
  FaChartBar,
  FaBrain,
  FaTools,
  FaShieldAlt,
  FaCogs,
};

/* ── Animated progress bar ─────────────────────────────── */
function ProgressBar({ level, name }: { level: number; name: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <div ref={ref} className="mb-4 last:mb-0">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-white/90">{name}</span>
        <span className="text-xs font-mono text-white/60">{level}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background:
              "linear-gradient(90deg, var(--color-primary), var(--color-secondary))",
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}

/* ── Category card with 3D tilt ────────────────────────── */
function CategoryCard({
  category,
}: {
  category: (typeof skillCategories)[number];
}) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const Icon = iconMap[category.icon] ?? FaCode;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => setTilt({ rotateX: 0, rotateY: 0 });

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors duration-300"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
          }}
        >
          <Icon className="text-white text-lg" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-white">
          {category.name}
        </h3>
      </div>

      {/* Skills */}
      <div>
        {category.skills.map((skill) => (
          <ProgressBar key={skill.name} name={skill.name} level={skill.level} />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Skills Section ────────────────────────────────────── */
export default function Skills() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredCategories =
    activeFilter === "All"
      ? skillCategories
      : skillCategories.filter((c) => c.name === activeFilter);

  return (
    <section
      id="skills"
      className="relative py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto"
      aria-label="Skills"
    >
      {/* ── Section header ─────────────────────────── */}
      <ScrollReveal className="text-center mb-16">
        <span className="text-sm uppercase tracking-[0.25em] text-white/50 font-medium block mb-3">
          What I Know
        </span>
        <h2 className="text-3xl md:text-5xl font-heading font-bold">
          <GradientText>Technical Skills</GradientText>
        </h2>
      </ScrollReveal>

      {/* ── Filter buttons ─────────────────────────── */}
      <ScrollReveal delay={0.15} className="mb-12">
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {["All", ...skillCategories.map((c) => c.name)].map((label) => {
            const isActive = activeFilter === label;
            return (
              <button
                key={label}
                onClick={() => setActiveFilter(label)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  isActive
                    ? "border-transparent text-white shadow-lg"
                    : "border-white/10 text-white/60 hover:text-white hover:border-white/25 bg-white/5"
                }`}
                style={
                  isActive
                    ? {
                        background:
                          "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                      }
                    : undefined
                }
                aria-pressed={isActive}
              >
                {label}
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* ── Category grid ──────────────────────────── */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCategories.map((category) => (
          <StaggerItem key={category.name}>
            <CategoryCard category={category} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
