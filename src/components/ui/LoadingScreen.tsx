"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const loadingSteps = [
  "Initializing Portfolio...",
  "Loading Skills...",
  "Loading Projects...",
  "Loading Experience...",
  "Portfolio Ready...",
];

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepDuration = 500;
    const totalDuration = loadingSteps.length * stepDuration;

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, totalDuration / 50);

    const hideTimeout = setTimeout(() => {
      setIsLoading(false);
    }, totalDuration + 400);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#050816" }}
        >
          {/* Ambient glow */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, #00F5FF 0%, #7B61FF 50%, transparent 70%)",
            }}
          />

          {/* Logo / Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mb-12"
          >
            <h1
              className="text-4xl md:text-5xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-white">N. Sai </span>
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #00F5FF, #7B61FF, #00FF94)",
                }}
              >
                Ujwal Reddy
              </span>
            </h1>
          </motion.div>

          {/* Loading steps */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative z-10 flex flex-col items-center gap-4 mb-8"
          >
            {loadingSteps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: index <= currentStep ? 1 : 0.2,
                  x: index <= currentStep ? 0 : -20,
                }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-3 text-sm font-mono"
              >
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor:
                      index <= currentStep ? "#00F5FF" : "rgba(255,255,255,0.2)",
                  }}
                  animate={
                    index === currentStep
                      ? { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }
                      : {}
                  }
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
                <span
                  style={{
                    color:
                      index <= currentStep
                        ? "#FFFFFF"
                        : "rgba(255,255,255,0.3)",
                  }}
                >
                  {step}
                </span>
                {index < currentStep && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ color: "#00FF94" }}
                  >
                    ✓
                  </motion.span>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative z-10 w-64 md:w-80"
          >
            <div
              className="h-1 rounded-full overflow-hidden"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #00F5FF, #7B61FF, #00FF94)",
                  width: `${progress}%`,
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p
              className="text-xs font-mono text-center mt-2"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {progress}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
