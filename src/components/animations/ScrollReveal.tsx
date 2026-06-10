"use client";

import { useRef, useEffect, useState, ReactNode } from "react";
import { motion, useInView, Variants } from "motion/react";

type Direction = "up" | "down" | "left" | "right";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  scale?: boolean;
}

const getInitial = (direction: Direction, distance: number, scale: boolean) => {
  const base: Record<string, number> = { opacity: 0 };
  if (scale) base.scale = 0.95;
  switch (direction) {
    case "up":
      base.y = distance;
      break;
    case "down":
      base.y = -distance;
      break;
    case "left":
      base.x = distance;
      break;
    case "right":
      base.x = -distance;
      break;
  }
  return base;
};

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 60,
  className = "",
  once = true,
  scale = false,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={getInitial(direction, distance, scale)}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger container for children
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  once = true,
}: StaggerContainerProps) {
  const customContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={customContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
