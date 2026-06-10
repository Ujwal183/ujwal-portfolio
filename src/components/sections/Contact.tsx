"use client";

import { useState, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { personalInfo } from "@/lib/data";
import ScrollReveal from "@/components/animations/ScrollReveal";
import GradientText from "@/components/animations/GradientText";
import MagneticButton from "@/components/animations/MagneticButton";
import {
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

/* ── Types ─────────────────────────────────────────────── */
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

/* ── Contact info items ────────────────────────────────── */
const contactItems = [
  {
    icon: FaEnvelope,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: FaPhone,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s/g, "")}`,
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "LinkedIn Profile",
    href: personalInfo.linkedin,
  },
  {
    icon: FaGithub,
    label: "GitHub",
    value: "GitHub Profile",
    href: personalInfo.github,
  },
  {
    icon: FaMapMarkerAlt,
    label: "Location",
    value: personalInfo.location,
    href: undefined,
  },
];

/* ── Validation ────────────────────────────────────────── */
function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email";
  }
  if (!data.subject.trim()) errors.subject = "Subject is required";
  if (!data.message.trim()) {
    errors.message = "Message is required";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }
  return errors;
}

/* ── Floating input component ──────────────────────────── */
function FormField({
  label,
  name,
  type = "text",
  value,
  error,
  onChange,
  textarea = false,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  textarea?: boolean;
}) {
  const baseClasses = `w-full bg-white/5 border rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/30 outline-none transition-all duration-300 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/30 ${
    error ? "border-red-500/70" : "border-white/10"
  }`;

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-white/70 mb-2">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={5}
          value={value}
          onChange={onChange}
          placeholder={`Enter your ${label.toLowerCase()}...`}
          className={`${baseClasses} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={`Enter your ${label.toLowerCase()}...`}
          className={baseClasses}
        />
      )}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-red-400 text-xs mt-1.5"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Success toast ─────────────────────────────────────── */
function SuccessToast({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          className="fixed bottom-8 left-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-2xl"
          style={{ transform: "translateX(-50%)" }}
        >
          <FaCheckCircle className="text-[var(--color-accent)] text-xl shrink-0" />
          <div>
            <p className="text-sm font-semibold text-white">Message Sent!</p>
            <p className="text-xs text-white/60">
              Thank you for reaching out. I&apos;ll respond soon.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Contact Section ───────────────────────────────────── */
export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ""
      );

      setFormData({ name: "", email: "", subject: "", message: "" });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    } catch {
      setErrors({
        message: "Failed to send message. Please try again or email directly.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto"
      aria-label="Contact"
    >
      {/* ── Header ─────────────────────────────────── */}
      <ScrollReveal className="text-center mb-16">
        <span className="text-sm uppercase tracking-[0.25em] text-white/50 font-medium block mb-3">
          Get In Touch
        </span>
        <h2 className="text-3xl md:text-5xl font-heading font-bold">
          <GradientText>Contact Me</GradientText>
        </h2>
      </ScrollReveal>

      {/* ── Main grid ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* ── Contact info sidebar ── */}
        <ScrollReveal direction="left" className="lg:col-span-2">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 h-full">
            <h3 className="text-xl font-heading font-bold text-white mb-2">
              Let&apos;s Connect
            </h3>
            <p className="text-sm text-white/50 mb-8 leading-relaxed">
              I&apos;m always open to new opportunities, collaborations, and
              interesting conversations. Feel free to reach out!
            </p>

            <div className="space-y-5">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-center gap-4 group/item">
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover/item:border-[var(--color-primary)]/40 transition-colors duration-300">
                      <Icon className="text-[var(--color-primary)] text-base" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-sm text-white/80 group-hover/item:text-white transition-colors duration-300">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target={
                      item.label === "Email" || item.label === "Phone"
                        ? undefined
                        : "_blank"
                    }
                    rel="noopener noreferrer"
                    aria-label={item.label}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>

            {/* Decorative gradient orb */}
            <div
              className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, var(--color-primary), transparent)",
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Form ── */}
        <ScrollReveal direction="right" className="lg:col-span-3">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField
                label="Name"
                name="name"
                value={formData.name}
                error={errors.name}
                onChange={handleChange}
              />
              <FormField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                error={errors.email}
                onChange={handleChange}
              />
            </div>

            <FormField
              label="Subject"
              name="subject"
              value={formData.subject}
              error={errors.subject}
              onChange={handleChange}
            />

            <FormField
              label="Message"
              name="message"
              value={formData.message}
              error={errors.message}
              onChange={handleChange}
              textarea
            />

            {/* Submit button */}
            <MagneticButton
              onClick={undefined}
              className="w-full relative overflow-hidden rounded-xl py-3.5 px-6 text-sm font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </span>
            </MagneticButton>
          </form>
        </ScrollReveal>
      </div>

      {/* Toast */}
      <SuccessToast visible={showToast} />
    </section>
  );
}
