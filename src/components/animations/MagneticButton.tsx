"use client";

import { useRef, useState, ReactNode, MouseEvent } from "react";
import { motion } from "motion/react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  download?: boolean | string;
  style?: React.CSSProperties;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 30,
  as = "button",
  href,
  onClick,
  target,
  rel,
  download,
  style,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * (strength / 100), y: middleY * (strength / 100) });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const MotionComponent = as === "a" ? motion.a : motion.button;

  return (
    <MotionComponent
      ref={ref as any}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
      className={className}
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      download={download as any}
      style={style}
    >
      {children}
    </MotionComponent>
  );
}
