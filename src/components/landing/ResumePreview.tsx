import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";
import { Sparkles, Briefcase, GraduationCap, Code2 } from "lucide-react";

export function ResumePreview() {
  // Magnetic mouse tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 14 });
  const rY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 14 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateY: -20 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      style={{ perspective: 1400 }}
      className="relative mx-auto w-full max-w-md"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Glow halo + slow-spin aurora ring */}
      <div className="absolute -inset-10 -z-10 rounded-[40px] bg-[var(--gradient-violet-cyan)] opacity-30 blur-3xl" />
      <div
        className="absolute -inset-6 -z-10 rounded-[40px] opacity-40 animate-slow-spin"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, var(--violet), transparent 30%, var(--cyan), transparent 60%, var(--pink), transparent)",
          filter: "blur(28px)",
        }}
      />

      {/* Floating AI badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="glass absolute -left-6 top-12 z-20 flex items-center gap-2 rounded-full px-3 py-2 text-xs animate-pulse-glow"
        style={{ y: useTransform(my, [-0.5, 0.5], [-8, 8]) as unknown as number }}
      >
        <motion.span
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="inline-flex"
        >
          <Sparkles className="h-3.5 w-3.5 text-[var(--cyan)]" />
        </motion.span>
        <span className="font-mono">AI is writing…</span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="ml-0.5 inline-block h-3 w-[2px] bg-[var(--cyan)]"
        />
      </motion.div>

      {/* Floating chip */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="glass absolute -right-4 bottom-24 z-20 rounded-xl px-3 py-2 text-xs shadow-elevated animate-float-slow"
      >
        <span className="font-mono text-[var(--violet)]">+38%</span>
        <span className="ml-1 text-muted-foreground">interview rate</span>
      </motion.div>

      <motion.div
        style={{ transformStyle: "preserve-3d", rotateX: rX, rotateY: rY }}
        className="glass-strong relative rounded-2xl p-6 shadow-elevated"
      >
        {/* Sheen that follows cursor */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-60"
          style={{
            background: useTransform(
              [mx, my] as unknown as never,
              ([x, y]: number[]) =>
                `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, oklch(1 0 0 / 0.10), transparent 40%)`,
            ),
          }}
        />

        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="font-display text-xl font-semibold">Alex Chen</h3>
            <p className="text-xs text-muted-foreground">Senior Product Engineer</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-[var(--gradient-violet-cyan)]" />
        </div>

        {/* Section */}
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--cyan)]">
            <Briefcase className="h-3 w-3" /> Experience
          </div>
          <div className="space-y-1.5">
            <div className="h-2 w-3/4 rounded-full bg-white/15" />
            <div className="h-2 w-full rounded-full bg-white/10" />
            <div className="relative h-2 w-5/6 overflow-hidden rounded-full bg-white/10">
              <div className="absolute inset-0 animate-shimmer" />
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--violet)]">
            <GraduationCap className="h-3 w-3" /> Education
          </div>
          <div className="space-y-1.5">
            <div className="h-2 w-2/3 rounded-full bg-white/15" />
            <div className="h-2 w-1/2 rounded-full bg-white/10" />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--pink)]">
            <Code2 className="h-3 w-3" /> Skills
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["React", "TypeScript", "Node", "Figma", "AI/ML"].map((s) => (
              <span
                key={s}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}