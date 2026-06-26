import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface WelcomeScreenProps {
  onComplete: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DISPLAY_DURATION = 4200; // ms before auto-dismiss

// Floating leaf-shaped dots scattered across the screen
const FLOATERS = [
  { top: "18%", left: "12%", delay: 0.3, size: 3 },
  { top: "65%", left: "88%", delay: 0.7, size: 2 },
  { top: "38%", left: "7%",  delay: 1.1, size: 2 },
  { top: "78%", left: "92%", delay: 1.5, size: 4 },
  { top: "52%", left: "82%", delay: 0.9, size: 2 },
  { top: "22%", left: "91%", delay: 1.8, size: 3 },
  { top: "85%", left: "15%", delay: 0.5, size: 2 },
  { top: "42%", left: "95%", delay: 2.1, size: 3 },
  { top: "10%", left: "55%", delay: 1.3, size: 2 },
  { top: "90%", left: "60%", delay: 0.6, size: 3 },
];

// Word-by-word animation sequence for the headline
const LINE1 = [
  { word: "THẾ", delay: 0.5 },
  { word: "GIỚI",  delay: 0.72 },
];
const LINE2 = [
  { word: "XE",   delay: 1.0 },
  { word: "MÁY",  delay: 1.18 },
  { word: "ĐIỆN", delay: 1.36 },
];
const LINE3_ACCENT = [
  { word: "THẾ",   delay: 1.7 },
  { word: "QUỲNH", delay: 1.92 },
];

const TAGLINE_WORDS = [
  { word: "Phân", delay: 2.5 },
  { word: "phối", delay: 2.65 },
  { word: "chính", delay: 2.8 },
  { word: "hãng", delay: 2.95 },
  { word: "DiBao", delay: 3.1, accent: true },
  { word: "&", delay: 3.22 },
  { word: "LTP", delay: 3.35, accent: true },
  { word: "Bike", delay: 3.48, accent: true },
  { word: "—", delay: 3.58 },
  { word: "Nam", delay: 3.68 },
  { word: "Định", delay: 3.8 },
];

// ─── Keyframe CSS ─────────────────────────────────────────────────────────────

const STYLES = `
  @keyframes ws-word-rise {
    0%   { opacity: 0; transform: translateY(22px) scale(0.92); filter: blur(8px); }
    60%  { opacity: 0.85; transform: translateY(6px) scale(0.97); filter: blur(1px); }
    100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  }
  @keyframes ws-grid-draw {
    0%   { stroke-dashoffset: 900; opacity: 0; }
    40%  { opacity: 0.25; }
    100% { stroke-dashoffset: 0; opacity: 0.12; }
  }
  @keyframes ws-float {
    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
    25%  { transform: translateY(-12px) translateX(6px); opacity: 0.55; }
    50%  { transform: translateY(-6px) translateX(-4px); opacity: 0.35; }
    75%  { transform: translateY(-18px) translateX(8px); opacity: 0.7; }
  }
  @keyframes ws-pulse-dot {
    0%, 100% { opacity: 0.1; transform: scale(1); }
    50%  { opacity: 0.45; transform: scale(1.2); }
  }
  @keyframes ws-underline-grow {
    from { width: 0; }
    to   { width: 100%; }
  }
  @keyframes ws-progress {
    from { width: 0%; }
    to   { width: 100%; }
  }
  @keyframes ws-ripple {
    0%   { transform: translate(-50%, -50%) scale(0); opacity: 0.8; }
    100% { transform: translate(-50%, -50%) scale(20); opacity: 0; }
  }
  .ws-word {
    display: inline-block;
    opacity: 0;
    margin: 0 0.08em;
  }
  .ws-word-appear {
    animation: ws-word-rise 0.72s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  .ws-grid-line {
    stroke: #10b981;
    stroke-width: 0.4;
    opacity: 0;
    stroke-dasharray: 6 6;
    stroke-dashoffset: 900;
    animation: ws-grid-draw 2.4s ease-out forwards;
  }
  .ws-dot {
    fill: #34d399;
    opacity: 0;
    animation: ws-pulse-dot 3s ease-in-out infinite;
  }
  .ws-floater {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(135deg, #10b981, #0ea5e9);
    opacity: 0;
    animation: ws-float 5s ease-in-out infinite;
  }
  .ws-corner {
    position: absolute;
    width: 36px;
    height: 36px;
    border: 1px solid rgba(16, 185, 129, 0.22);
    opacity: 0;
    animation: ws-word-rise 0.9s ease-out forwards;
  }
  .ws-mouse-glow {
    position: fixed;
    pointer-events: none;
    border-radius: 9999px;
    background: radial-gradient(circle, rgba(16,185,129,0.07), rgba(14,165,233,0.05), transparent 70%);
    transform: translate(-50%, -50%);
    will-change: left, top, opacity;
    transition: left 60ms linear, top 60ms linear, opacity 300ms ease-out;
  }
  .ws-ripple {
    position: fixed;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(16, 185, 129, 0.4);
    pointer-events: none;
    animation: ws-ripple 0.9s ease-out forwards;
    z-index: 9999;
  }
`;

// ─── Sub-components ───────────────────────────────────────────────────────────

function AnimatedWord({
  word,
  delay,
  className = "",
}: {
  word: string;
  delay: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (ref.current) ref.current.classList.add("ws-word-appear");
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);
  return (
    <span ref={ref} className={`ws-word ${className}`}>
      {word}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [exiting, setExiting] = useState(false);
  const [mouseGlow, setMouseGlow] = useState({ x: 0, y: 0, opacity: 0 });
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  // Auto-dismiss timer
  useEffect(() => {
    const timer = setTimeout(handleDismiss, DISPLAY_DURATION);
    return () => clearTimeout(timer);
  }, []);

  // Mouse tracking glow
  useEffect(() => {
    const move = (e: MouseEvent) =>
      setMouseGlow({ x: e.clientX, y: e.clientY, opacity: 1 });
    const leave = () =>
      setMouseGlow((p) => ({ ...p, opacity: 0 }));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, []);

  // Click ripples
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const r = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((p) => [...p, r]);
      setTimeout(() => setRipples((p) => p.filter((x) => x.id !== r.id)), 1000);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  const handleDismiss = () => {
    setExiting(true);
    setTimeout(onComplete, 650);
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="welcome"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, #f0f9ff 0%, #f0fdf4 35%, #ffffff 65%, #ecfdf5 100%)",
          }}
        >
          <style>{STYLES}</style>

          {/* ── SVG Grid Background ── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <pattern id="ws-bg-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="rgba(16, 185, 129, 0.05)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ws-bg-grid)" />

            {/* Animated accent grid lines */}
            <line x1="0" y1="20%" x2="100%" y2="20%" className="ws-grid-line" style={{ animationDelay: "0.3s" }} />
            <line x1="0" y1="80%" x2="100%" y2="80%" className="ws-grid-line" style={{ animationDelay: "0.7s" }} />
            <line x1="20%" y1="0" x2="20%" y2="100%" className="ws-grid-line" style={{ animationDelay: "1.1s" }} />
            <line x1="80%" y1="0" x2="80%" y2="100%" className="ws-grid-line" style={{ animationDelay: "1.4s" }} />

            {/* Intersection dots */}
            <circle cx="20%" cy="20%" r="2.5" className="ws-dot" style={{ animationDelay: "1.8s" }} />
            <circle cx="80%" cy="20%" r="2.5" className="ws-dot" style={{ animationDelay: "2.0s" }} />
            <circle cx="20%" cy="80%" r="2.5" className="ws-dot" style={{ animationDelay: "2.2s" }} />
            <circle cx="80%" cy="80%" r="2.5" className="ws-dot" style={{ animationDelay: "2.4s" }} />
            <circle cx="50%" cy="50%" r="1.8" className="ws-dot" style={{ animationDelay: "2.8s" }} />
          </svg>

          {/* ── Radial Glow Center ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(16,185,129,0.06) 0%, transparent 70%)",
            }}
          />

          {/* ── Floating Eco Particles ── */}
          {FLOATERS.map((f, i) => (
            <div
              key={i}
              className="ws-floater"
              style={{
                top: f.top,
                left: f.left,
                width: `${f.size}px`,
                height: `${f.size}px`,
                animationDelay: `${f.delay}s`,
              }}
            />
          ))}

          {/* ── Corner Elements ── */}
          <div className="ws-corner top-6 left-6 sm:top-8 sm:left-8" style={{ animationDelay: "2.6s" }}>
            <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-primary opacity-40" />
          </div>
          <div className="ws-corner top-6 right-6 sm:top-8 sm:right-8" style={{ animationDelay: "2.8s" }}>
            <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-primary opacity-40" />
          </div>
          <div className="ws-corner bottom-6 left-6 sm:bottom-8 sm:left-8" style={{ animationDelay: "3.0s" }}>
            <div className="absolute bottom-0 left-0 w-2 h-2 rounded-full bg-sky-400 opacity-40" />
          </div>
          <div className="ws-corner bottom-6 right-6 sm:bottom-8 sm:right-8" style={{ animationDelay: "3.2s" }}>
            <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-sky-400 opacity-40" />
          </div>

          {/* ── Main Content ── */}
          <div className="relative z-10 flex flex-col items-center justify-between min-h-screen w-full px-6 py-10 sm:py-14">

            {/* Top eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-[10px] font-mono font-semibold text-emerald-600 uppercase tracking-[0.3em] opacity-80">
                Chào mừng bạn đến với
              </span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
            </motion.div>

            {/* Center: Brand identity */}
            <div className="text-center space-y-6 max-w-3xl mx-auto">

              {/* Logo icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 200, damping: 18 }}
                className="flex items-center justify-center mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-primary-dark to-primary shadow-2xl shadow-green-500/25 ring-4 ring-white/60"
              >
                <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </motion.div>

              {/* Main headline — word by word */}
              <div className="space-y-1 select-none">
                {/* Line 1: THẾ GIỚI */}
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-gray-800 leading-none">
                  {LINE1.map((w) => (
                    <AnimatedWord
                      key={w.word}
                      word={w.word}
                      delay={w.delay}
                    />
                  ))}
                </div>

                {/* Line 2: XE MÁY ĐIỆN */}
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-gray-800 leading-none">
                  {LINE2.map((w) => (
                    <AnimatedWord
                      key={w.word}
                      word={w.word}
                      delay={w.delay}
                    />
                  ))}
                </div>

                {/* Line 3: THẾ QUỲNH — accented */}
                <div
                  className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-none"
                  style={{
                    WebkitTextFillColor: "transparent",
                    backgroundImage: "linear-gradient(135deg, #047857, #10b981, #0ea5e9)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  {LINE3_ACCENT.map((w) => (
                    <AnimatedWord
                      key={w.word}
                      word={w.word}
                      delay={w.delay}
                    />
                  ))}
                  {/* Animated underline */}
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
                    style={{
                      width: 0,
                      animation: "ws-underline-grow 0.9s ease-out forwards",
                      animationDelay: "2.5s",
                    }}
                  />
                </div>
              </div>

              {/* Tagline — smaller words appearing */}
              <div className="text-xs sm:text-sm font-mono text-gray-500 tracking-[0.15em] h-6">
                {TAGLINE_WORDS.map((w, i) => (
                  <AnimatedWord
                    key={i}
                    word={w.word}
                    delay={w.delay}
                    className={
                      w.accent
                        ? "font-semibold text-primary-dark"
                        : "text-gray-500"
                    }
                  />
                ))}
              </div>

              {/* Decorative side lines */}
              <div className="flex items-center justify-center gap-4 mt-2">
                <span
                  className="block h-px bg-gradient-to-r from-transparent to-primary opacity-0"
                  style={{
                    width: 48,
                    animation: "ws-word-rise 0.8s ease-out forwards",
                    animationDelay: "2.9s",
                  }}
                />
                <div className="flex gap-1.5">
                  {[0, 0.15, 0.3].map((d, i) => (
                    <span
                      key={i}
                      className="w-1 h-1 rounded-full bg-primary opacity-0"
                      style={{
                        animation: "ws-word-rise 0.6s ease-out forwards",
                        animationDelay: `${3.0 + d}s`,
                      }}
                    />
                  ))}
                </div>
                <span
                  className="block h-px bg-gradient-to-l from-transparent to-primary opacity-0"
                  style={{
                    width: 48,
                    animation: "ws-word-rise 0.8s ease-out forwards",
                    animationDelay: "3.0s",
                  }}
                />
              </div>
            </div>

            {/* Bottom: skip + loading bar */}
            <div className="flex flex-col items-center gap-5 w-full max-w-xs">
              {/* Skip button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.5 }}
                onClick={handleDismiss}
                className="text-[10px] font-mono text-gray-400 hover:text-primary-dark uppercase tracking-[0.2em] transition-colors cursor-pointer group flex items-center gap-2"
              >
                <span>Bỏ qua</span>
                <span className="w-4 h-px bg-gray-300 group-hover:bg-primary transition-colors inline-block" />
              </motion.button>

              {/* Progress bar */}
              <div className="w-full h-[1px] bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-dark via-primary to-primary-light rounded-full"
                  style={{
                    animation: `ws-progress ${DISPLAY_DURATION}ms linear forwards`,
                  }}
                />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-[9px] text-gray-400 font-mono uppercase tracking-widest"
              >
                Yên Nghĩa · Ý Yên · Nam Định
              </motion.div>
            </div>
          </div>

          {/* ── Mouse Glow ── */}
          <div
            className="ws-mouse-glow w-72 h-72 blur-3xl sm:w-96 sm:h-96"
            style={{
              left: mouseGlow.x,
              top: mouseGlow.y,
              opacity: mouseGlow.opacity,
            }}
          />

          {/* ── Click Ripples ── */}
          {ripples.map((r) => (
            <div
              key={r.id}
              className="ws-ripple"
              style={{ left: r.x, top: r.y }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
