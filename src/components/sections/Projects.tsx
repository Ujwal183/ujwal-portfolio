"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { projects } from "@/lib/data";
import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/ScrollReveal";
import GradientText from "@/components/animations/GradientText";
import MagneticButton from "@/components/animations/MagneticButton";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

/* ── Single project card with 3D tilt ─────────────────── */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setTilt({ rotateX, rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlare({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 1200, transformStyle: "preserve-3d" }}
      className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group hover:border-white/20 transition-colors duration-300"
    >
      {/* Glare overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
        }}
      />

      {/* Color accent bar */}
      <div
        className="h-1 w-full"
        style={{ background: project.color }}
      />

      <div className="p-6 md:p-8">
        {/* Number badge */}
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold font-heading mb-5"
          style={{
            background: `${project.color}20`,
            color: project.color,
            border: `1px solid ${project.color}40`,
          }}
        >
          0{index + 1}
        </div>

        {/* Title & subtitle */}
        <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-1">
          {project.title}
        </h3>
        <p className="text-sm text-white/50 mb-5">{project.subtitle}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{
                background: `${project.color}15`,
                color: project.color,
                border: `1px solid ${project.color}30`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Features */}
        <ul className="space-y-2 mb-7">
          {project.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-white/70">
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: project.color }}
              />
              {f}
            </li>
          ))}
        </ul>

        {/* Action buttons */}
        <div className="flex gap-3">
          <MagneticButton
            as="a"
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white border border-white/15 bg-white/5 hover:bg-white/10 transition-colors duration-300"
          >
            <FaGithub className="text-base" />
            GitHub
          </MagneticButton>

          <MagneticButton
            as="a"
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-colors duration-300"
            style={
              {
                background: `linear-gradient(135deg, ${project.color}, ${project.color}99)`,
              } as React.CSSProperties
            }
          >
            <FaExternalLinkAlt className="text-xs" />
            Demo
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Projects Section ──────────────────────────────────── */
export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto"
      aria-label="Projects"
    >
      {/* ── Header ─────────────────────────────────── */}
      <ScrollReveal className="text-center mb-16">
        <span className="text-sm uppercase tracking-[0.25em] text-white/50 font-medium block mb-3">
          My Work
        </span>
        <h2 className="text-3xl md:text-5xl font-heading font-bold">
          <GradientText>Featured Projects</GradientText>
        </h2>
      </ScrollReveal>

      {/* ── Card grid ──────────────────────────────── */}
      <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <StaggerItem key={project.title}>
            <ProjectCard project={project} index={idx} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
