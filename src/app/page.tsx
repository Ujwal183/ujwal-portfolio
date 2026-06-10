"use client";

import { Suspense } from "react";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import Achievements from "@/components/sections/Achievements";
import Strengths from "@/components/sections/Strengths";
import Languages from "@/components/sections/Languages";
import Contact from "@/components/sections/Contact";

function SectionDivider() {
  return (
    <div className="section-divider" />
  );
}

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />

      <main>
        <Hero />

        <SectionDivider />
        <About />

        <SectionDivider />
        <Education />

        <SectionDivider />
        <Skills />

        <SectionDivider />
        <Experience />

        <SectionDivider />
        <Projects />

        <SectionDivider />
        <Certifications />

        <SectionDivider />
        <Achievements />

        <SectionDivider />
        <Strengths />

        <SectionDivider />
        <Languages />

        <SectionDivider />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
