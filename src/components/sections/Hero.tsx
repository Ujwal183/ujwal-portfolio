"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { personalInfo, stats } from "@/lib/data";
import TypewriterEffect from "@/components/animations/TypewriterEffect";
import CounterAnimation from "@/components/animations/CounterAnimation";
import GradientText from "@/components/animations/GradientText";
import MagneticButton from "@/components/animations/MagneticButton";
import { FaArrowDown, FaEye, FaEnvelope } from "react-icons/fa";

const ParticleBackground = dynamic(
  () => import("@/components/three/ParticleBackground"),
  { ssr: false }
);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };

    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);
    return () => container?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#050816" }}
    >
      {/* Particle Background */}
      <ParticleBackground />

      {/* Mouse-follow glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none opacity-20 blur-[100px] transition-all duration-700 ease-out"
        style={{
          background:
            "radial-gradient(circle, #00F5FF 0%, transparent 70%)",
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Gradient orbs */}
      <div
        className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-10 blur-[100px]"
        style={{ backgroundColor: "#7B61FF" }}
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10 blur-[120px]"
        style={{ backgroundColor: "#00F5FF" }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-lg md:text-xl mb-4 font-light tracking-wide"
          >
            Hello, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-white">N. Sai </span>
            <GradientText className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold">
              Ujwal Reddy
            </GradientText>
          </motion.h1>

          {/* Typewriter roles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl md:text-2xl lg:text-3xl font-medium mb-8 h-10"
          >
            <TypewriterEffect
              words={personalInfo.roles}
              className="text-white/80"
              typingSpeed={80}
              deletingSpeed={40}
              delayBetween={2000}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-white/50 text-base md:text-lg max-w-2xl mb-12 leading-relaxed"
          >
            {personalInfo.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          >
            <MagneticButton
              as="a"
              href={personalInfo.resumeUrl}
              download
              className="group relative px-8 py-4 rounded-xl text-black font-semibold text-base overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,245,255,0.3)]"
              strength={20}
            >
              <span
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #00F5FF, #00FF94)",
                }}
              />
              <span className="relative flex items-center gap-2">
                <FaArrowDown className="group-hover:animate-bounce" />
                Download Resume
              </span>
            </MagneticButton>

            <MagneticButton
              as="a"
              href="#projects"
              className="px-8 py-4 rounded-xl font-semibold text-base text-white transition-all duration-300"
              strength={20}
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span
                className="absolute inset-0 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              />
              <span className="relative flex items-center gap-2">
                <FaEye />
                View Projects
              </span>
            </MagneticButton>

            <MagneticButton
              as="a"
              href="#contact"
              className="px-8 py-4 rounded-xl font-semibold text-base text-white transition-all duration-300"
              strength={20}
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span
                className="absolute inset-0 rounded-xl"
                style={{
                  background: "rgba(123,97,255,0.1)",
                  border: "1px solid rgba(123,97,255,0.3)",
                }}
              />
              <span className="relative flex items-center gap-2">
                <FaEnvelope />
                Contact Me
              </span>
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-3xl md:text-4xl font-bold mb-1"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "#00F5FF",
                  }}
                >
                  <CounterAnimation
                    target={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    duration={2}
                  />
                </div>
                <p className="text-white/50 text-sm uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs uppercase tracking-widest">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full flex justify-center pt-2"
          style={{ border: "2px solid rgba(255,255,255,0.2)" }}
        >
          <motion.div
            animate={{ opacity: [1, 0], y: [0, 12] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 rounded-full"
            style={{ backgroundColor: "#00F5FF" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
