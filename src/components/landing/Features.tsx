import { motion } from "framer-motion";
import { Zap, Palette, Cloud } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
  glow: string;
};

const FEATURES: Feature[] = [
  {
    icon: Zap,
    title: "AI Writing",
    desc: "Turn vague notes into crisp, recruiter-loved bullet points in one click.",
    color: "var(--violet)",
    glow: "var(--shadow-neon-violet)",
  },
  {
    icon: Palette,
    title: "Stunning Templates",
    desc: "Designer-crafted layouts that stay ATS-friendly. Switch styles instantly.",
    color: "var(--cyan)",
    glow: "var(--shadow-neon-cyan)",
  },
  {
    icon: Cloud,
    title: "Cloud Save",
    desc: "Every edit synced and versioned. Pick up exactly where you left off.",
    color: "var(--pink)",
    glow: "var(--shadow-neon-pink)",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-[var(--cyan)]">
            // The toolkit
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Built for the way you{" "}
            <span className="text-gradient-vc">actually</span> apply.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Not a template gallery with a save button. A real workspace with AI
            embedded into every field.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative"
            >
              <div
                className="absolute -inset-px rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60"
                style={{ background: `linear-gradient(135deg, ${f.color}, transparent)` }}
              />
              <div className="glass relative h-full rounded-2xl p-7 transition-colors group-hover:border-white/20">
                <div
                  className="mb-5 inline-grid h-12 w-12 place-items-center rounded-xl border border-white/10 transition-all group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${f.color}, transparent)`,
                    boxShadow: f.glow,
                  }}
                >
                  <f.icon className="h-5 w-5 text-background" />
                </div>
                <h3 className="font-display text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>

                <div className="mt-6 flex items-center gap-2 font-mono text-xs text-muted-foreground/70">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: f.color, boxShadow: `0 0 10px ${f.color}` }} />
                  active
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}