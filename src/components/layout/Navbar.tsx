"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { navLinks, personalInfo } from "@/lib/data";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navLinks.map((link) => link.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setIsMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#050816]/80 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#home");
            }}
            className="text-lg md:text-xl font-bold tracking-tight"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-white">&lt;</span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #00F5FF, #7B61FF)",
              }}
            >
              Ujwal
            </span>
            <span className="text-white"> /&gt;</span>
          </motion.a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    activeSection === link.href.replace("#", "")
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {activeSection === link.href.replace("#", "") && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(0,245,255,0.1), rgba(123,97,255,0.1))",
                        border: "1px solid rgba(0,245,255,0.2)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* CTA Button (Desktop) */}
          <a
            href={personalInfo.resumeUrl}
            download
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,245,255,0.3)]"
            style={{
              backgroundImage: "linear-gradient(135deg, #00F5FF, #00FF94)",
            }}
          >
            Resume
          </a>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden relative z-50 p-2 text-white"
            aria-label="Toggle navigation menu"
          >
            {isMobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ backgroundColor: "#050816" }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.href)}
                  className={`text-2xl font-medium transition-colors ${
                    activeSection === link.href.replace("#", "")
                      ? "text-[#00F5FF]"
                      : "text-white/70"
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                href={personalInfo.resumeUrl}
                download
                className="mt-4 px-8 py-3 rounded-xl text-black font-semibold"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #00F5FF, #00FF94)",
                }}
              >
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
