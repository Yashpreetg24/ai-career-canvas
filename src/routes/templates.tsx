import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, Filter, ArrowRight, Star } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Templates — Resumify" },
      {
        name: "description",
        content:
          "Browse designer-crafted, ATS-friendly resume templates. Minimal, creative, and bold layouts powered by AI.",
      },
      { property: "og:title", content: "Templates — Resumify" },
      {
        property: "og:description",
        content: "Designer-crafted, ATS-friendly resume templates.",
      },
    ],
  }),
  component: TemplatesPage,
});

const FILTERS = ["All", "Minimal", "Creative", "ATS-Friendly", "Bold"] as const;
type Filter = (typeof FILTERS)[number];

type Template = {
  id: string;
  name: string;
  category: Exclude<Filter, "All">;
  accent: string;
  span: "tall" | "normal" | "wide";
  popular?: boolean;
};

const TEMPLATES: Template[] = [
  { id: "aurora", name: "Aurora", category: "Creative", accent: "var(--violet)", span: "tall", popular: true },
  { id: "atlas", name: "Atlas", category: "Minimal", accent: "var(--cyan)", span: "normal" },
  { id: "neon", name: "Neon Pulse", category: "Bold", accent: "var(--pink)", span: "normal", popular: true },
  { id: "monolith", name: "Monolith", category: "ATS-Friendly", accent: "var(--cyan)", span: "tall" },
  { id: "prism", name: "Prism", category: "Creative", accent: "var(--violet)", span: "normal" },
  { id: "echo", name: "Echo", category: "Minimal", accent: "var(--cyan)", span: "tall" },
  { id: "vertex", name: "Vertex", category: "Bold", accent: "var(--pink)", span: "normal" },
  { id: "linear", name: "Linear", category: "ATS-Friendly", accent: "var(--violet)", span: "normal", popular: true },
  { id: "kyoto", name: "Kyoto", category: "Minimal", accent: "var(--cyan)", span: "tall" },
];

function TemplatePreview({ t }: { t: Template }) {
  const isTall = t.span === "tall";
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-white p-5 text-[oklch(0.2_0_0)] shadow-elevated">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-display text-base font-bold">Jordan Rivers</div>
          <div className="text-[10px] uppercase tracking-widest" style={{ color: t.accent }}>
            Product Designer
          </div>
        </div>
        <div className="h-7 w-7 rounded-full" style={{ background: t.accent }} />
      </div>
      <div className="mt-3 h-px w-full" style={{ background: t.accent, opacity: 0.4 }} />
      <div className="mt-4 space-y-3">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-widest text-black/60">Experience</div>
          <div className="mt-1.5 space-y-1">
            <div className="h-1.5 w-3/4 rounded-full bg-black/15" />
            <div className="h-1.5 w-full rounded-full bg-black/10" />
            <div className="h-1.5 w-5/6 rounded-full bg-black/10" />
          </div>
        </div>
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-widest text-black/60">Education</div>
          <div className="mt-1.5 space-y-1">
            <div className="h-1.5 w-2/3 rounded-full bg-black/15" />
            <div className="h-1.5 w-1/2 rounded-full bg-black/10" />
          </div>
        </div>
        {isTall && (
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-widest text-black/60">Projects</div>
            <div className="mt-1.5 space-y-1">
              <div className="h-1.5 w-4/5 rounded-full bg-black/15" />
              <div className="h-1.5 w-3/5 rounded-full bg-black/10" />
            </div>
          </div>
        )}
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-widest text-black/60">Skills</div>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {["Figma", "React", "Brand", "AI"].map((s) => (
              <span
                key={s}
                className="rounded px-1.5 py-0.5 text-[8px] font-medium"
                style={{ background: `${t.accent}`, color: "white", opacity: 0.9 }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplatesPage() {
  const [active, setActive] = useState<Filter>("All");
  const filtered = active === "All" ? TEMPLATES : TEMPLATES.filter((t) => t.category === active);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      <section className="relative pt-36 pb-12">
        <div className="pointer-events-none absolute inset-0 -z-10 grid-bg" />
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[var(--violet)]/20 blur-[140px]" />

        <div className="mx-auto max-w-6xl px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-[var(--cyan)]"
          >
            // Template gallery
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display text-5xl font-semibold tracking-tight md:text-6xl"
          >
            Pick a starting point.{" "}
            <span className="text-gradient-vc">Make it yours.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-xl text-muted-foreground"
          >
            Every template is fully editable, ATS-tested, and ready for the AI
            assistant. Hover to preview.
          </motion.p>

          <div className="mt-10 flex flex-wrap items-center gap-2">
            <span className="mr-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Filter className="h-3.5 w-3.5" /> Filter
            </span>
            {FILTERS.map((f) => {
              const isActive = active === f;
              return (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`relative rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                    isActive ? "text-background" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-[var(--gradient-violet-cyan)]"
                      transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                    />
                  )}
                  {!isActive && (
                    <span className="absolute inset-0 -z-10 rounded-full border border-white/10" />
                  )}
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {filtered.map((t, i) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
                className="group relative mb-5 break-inside-avoid"
              >
                <div
                  className="absolute -inset-px rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70"
                  style={{ background: `linear-gradient(135deg, ${t.accent}, transparent)` }}
                />
                <div className="glass relative overflow-hidden rounded-2xl p-3 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-white/25">
                  <div className={t.span === "tall" ? "aspect-[3/4.2]" : "aspect-[3/3.6]"}>
                    <TemplatePreview t={t} />
                  </div>

                  {/* Overlay */}
                  <div className="pointer-events-none absolute inset-3 flex flex-col items-center justify-center gap-3 rounded-xl bg-background/70 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-xl"
                      style={{ background: `linear-gradient(135deg, ${t.accent}, transparent)`, boxShadow: `0 0 30px ${t.accent}` }}
                    >
                      <Sparkles className="h-5 w-5 text-background" />
                    </span>
                    <Link
                      to="/builder"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--gradient-violet-cyan)] px-4 py-2 text-xs font-medium text-background transition-transform hover:scale-105"
                    >
                      Use This Template <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  <div className="flex items-center justify-between px-2 pb-1 pt-3">
                    <div>
                      <div className="font-display text-sm font-semibold">{t.name}</div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {t.category}
                      </div>
                    </div>
                    {t.popular && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-[var(--pink)]/40 bg-[var(--pink)]/10 px-2 py-0.5 text-[10px] text-[var(--pink)]">
                        <Star className="h-2.5 w-2.5 fill-current" /> Popular
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}