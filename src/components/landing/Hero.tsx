import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { ResumePreview } from "./ResumePreview";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      {/* Animated grid + glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute left-1/2 top-[-10%] h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[var(--violet)]/30 blur-[140px]" />
        <div className="absolute right-[-10%] top-[20%] h-[400px] w-[400px] rounded-full bg-[var(--cyan)]/20 blur-[120px]" />
        <div className="absolute left-[-10%] bottom-[-10%] h-[400px] w-[400px] rounded-full bg-[var(--pink)]/20 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs"
          >
            <span className="grid h-4 w-4 place-items-center rounded-full bg-[var(--gradient-violet-cyan)]">
              <Sparkles className="h-2.5 w-2.5 text-background" />
            </span>
            <span className="text-muted-foreground">
              Now with GPT-powered bullet rewriting
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl"
          >
            Your Career,
            <br />
            <span className="text-gradient-brand">Powered by AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg"
          >
            Build a recruiter-ready resume in minutes. Resumify writes,
            tailors, and beautifies — so you can focus on landing the offer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <button className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-[var(--gradient-violet-cyan)] px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.03] animate-pulse-glow">
              Build My Resume
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button className="glass inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-colors hover:bg-white/10">
              <Play className="h-3.5 w-3.5" />
              See Templates
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 flex items-center gap-4 text-xs text-muted-foreground"
          >
            <div className="flex -space-x-2">
              {[
                "from-[var(--violet)] to-[var(--cyan)]",
                "from-[var(--cyan)] to-[var(--pink)]",
                "from-[var(--pink)] to-[var(--violet)]",
                "from-[var(--violet)] to-[var(--pink)]",
              ].map((g, i) => (
                <div
                  key={i}
                  className={`h-7 w-7 rounded-full border-2 border-background bg-gradient-to-br ${g}`}
                />
              ))}
            </div>
            <span>
              <span className="font-mono text-foreground">12,481</span> resumes
              built this week
            </span>
          </motion.div>
        </div>

        <ResumePreview />
      </div>
    </section>
  );
}