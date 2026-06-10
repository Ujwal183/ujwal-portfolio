"use client";

import { useState, useEffect } from "react";

interface TypewriterEffectProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
  className?: string;
  cursorClassName?: string;
}

export default function TypewriterEffect({
  words,
  typingSpeed = 80,
  deletingSpeed = 50,
  delayBetween = 2000,
  className = "",
  cursorClassName = "",
}: TypewriterEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(word.substring(0, currentText.length + 1));
          if (currentText.length + 1 === word.length) {
            setTimeout(() => setIsDeleting(true), delayBetween);
          }
        } else {
          setCurrentText(word.substring(0, currentText.length - 1));
          if (currentText.length === 0) {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetween]);

  return (
    <span className={className}>
      {currentText}
      <span
        className={`inline-block w-[3px] h-[1em] ml-1 align-middle animate-blink ${cursorClassName}`}
        style={{ backgroundColor: "var(--color-primary)" }}
      />
    </span>
  );
}
