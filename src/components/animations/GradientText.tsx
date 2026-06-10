"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
  animate?: boolean;
}

export default function GradientText({
  children,
  className = "",
  from = "#00F5FF",
  via = "#7B61FF",
  to = "#00FF94",
  animate = true,
}: GradientTextProps) {
  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(135deg, ${from}, ${via}, ${to})`,
        backgroundSize: animate ? "200% 200%" : "100% 100%",
      }}
      {...(animate
        ? {
            animate: {
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            },
            transition: {
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            },
          }
        : {})}
    >
      {children}
    </motion.span>
  );
}
