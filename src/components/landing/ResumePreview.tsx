import { motion } from "framer-motion";
import { Sparkles, Briefcase, GraduationCap, Code2 } from "lucide-react";

export function ResumePreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateY: -20 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      style={{ perspective: 1400 }}
      className="relative mx-auto w-full max-w-md"
    >
      {/* Glow halo */}
      <div className="absolute -inset-10 -z-10 rounded-[40px] bg-[var(--gradient-violet-cyan)] opacity-30 blur-3xl" />

      {/* Floating AI badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="glass absolute -left-6 top-12 z-20 flex items-center gap-2 rounded-full px-3 py-2 text-xs animate-pulse-glow"
      >
        <Sparkles className="h-3.5 w-3.5 text-[var(--cyan)]" />
        <span className="font-mono">AI is writing…</span>
      </motion.div>

      {/* Floating chip */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="glass absolute -right-4 bottom-24 z-20 rounded-xl px-3 py-2 text-xs shadow-elevated"
      >
        <span className="font-mono text-[var(--violet)]">+38%</span>
        <span className="ml-1 text-muted-foreground">interview rate</span>
      </motion.div>

      <motion.div
        animate={{ rotateX: [0, 1.5, 0], rotateY: [-6, -4, -6] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="glass-strong relative rounded-2xl p-6 shadow-elevated"
      >
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