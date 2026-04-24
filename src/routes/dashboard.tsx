import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Sparkles,
  LayoutGrid,
  FileText,
  Star,
  Settings,
  LogOut,
  Search,
  Bell,
  Plus,
  Edit3,
  Download,
  Trash2,
  Layers,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Resumify" },
      {
        name: "description",
        content: "Manage your resumes, templates, and AI-generated drafts in one place.",
      },
      { property: "og:title", content: "Dashboard — Resumify" },
      { property: "og:description", content: "Your resumes, all in one place." },
    ],
  }),
  component: DashboardPage,
});

const NAV = [
  { id: "resumes", label: "Resumes", icon: FileText, active: true },
  { id: "templates", label: "Templates", icon: LayoutGrid },
  { id: "starred", label: "Starred", icon: Star },
  { id: "drafts", label: "AI Drafts", icon: Layers },
  { id: "settings", label: "Settings", icon: Settings },
];

const RESUMES = [
  { id: "1", name: "Senior Product Engineer", template: "Aurora", color: "var(--violet)", edited: "2 hours ago" },
  { id: "2", name: "Frontend Lead — Stripe", template: "Linear", color: "var(--cyan)", edited: "Yesterday" },
  { id: "3", name: "Design Engineer Portfolio", template: "Neon Pulse", color: "var(--pink)", edited: "3 days ago" },
  { id: "4", name: "Staff Engineer Pivot", template: "Monolith", color: "var(--cyan)", edited: "Last week" },
  { id: "5", name: "AI Researcher", template: "Prism", color: "var(--violet)", edited: "Last week" },
];

function DashboardPage() {
  const [active, setActive] = useState("resumes");

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-50" />

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-60 shrink-0 flex-col border-r border-white/5 bg-[var(--sidebar)]/60 p-4 backdrop-blur-xl md:flex">
          <Link to="/" className="mb-8 flex items-center gap-2 px-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--gradient-violet-cyan)]">
              <Sparkles className="h-4 w-4 text-background" />
            </span>
            <span className="font-display text-lg font-semibold">Resumify</span>
          </Link>

          <nav className="flex-1 space-y-1">
            {NAV.map((n) => {
              const isActive = active === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => setActive(n.id)}
                  className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-[var(--gradient-violet-cyan)] opacity-20"
                    />
                  )}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-[var(--violet)] shadow-[0_0_8px_var(--violet)]" />
                  )}
                  <n.icon className="h-4 w-4" />
                  {n.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-[var(--gradient-violet-cyan)]" />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">Alex Chen</div>
                <div className="truncate font-mono text-[10px] text-muted-foreground">Pro · 9 credits</div>
              </div>
              <button className="text-muted-foreground transition-colors hover:text-[var(--pink)]" aria-label="Sign out">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          {/* Topbar */}
          <div className="glass-strong sticky top-0 z-30 flex h-14 items-center justify-between border-b border-white/5 px-6">
            <div className="flex items-center gap-2">
              <Link to="/" className="md:hidden">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--gradient-violet-cyan)]">
                  <Sparkles className="h-4 w-4 text-background" />
                </span>
              </Link>
              <h1 className="font-display text-lg font-semibold">My Resumes</h1>
              <span className="ml-2 rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                {RESUMES.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative hidden sm:block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder="Search resumes…"
                  className="w-56 rounded-lg border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 text-sm outline-none transition-all focus:border-[var(--violet)] focus:shadow-[0_0_0_3px_oklch(0.62_0.27_295/0.2)]"
                />
              </div>
              <button className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground">
                <Bell className="h-4 w-4" />
              </button>
            </div>
          </div>

          <section className="px-6 py-8">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--cyan)]">// welcome back</p>
                <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
                  Hey Alex, ready to <span className="text-gradient-vc">land the offer?</span>
                </h2>
              </div>
              <Link
                to="/builder"
                className="hidden items-center gap-1.5 rounded-xl bg-[var(--gradient-violet-cyan)] px-4 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.04] animate-pulse-glow sm:inline-flex"
              >
                <Plus className="h-4 w-4" /> New resume
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* Create new card */}
              <Link to="/builder" className="group relative">
                <div className="absolute -inset-px rounded-2xl bg-[var(--gradient-violet-cyan)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50" />
                <div className="relative flex aspect-[3/3.6] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] transition-colors group-hover:border-[var(--violet)]/60">
                  <span className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,oklch(0.62_0.27_295/0.15),transparent_60%)] opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--gradient-violet-cyan)] transition-transform group-hover:scale-110 animate-pulse-glow">
                    <Sparkles className="h-6 w-6 text-background" />
                  </span>
                  <div className="text-center">
                    <div className="font-display text-sm font-semibold">Create new resume</div>
                    <div className="mt-1 font-mono text-[10px] text-muted-foreground">
                      Start from scratch · or with AI
                    </div>
                  </div>
                </div>
              </Link>

              {RESUMES.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="group relative"
                >
                  <div
                    className="absolute -inset-px rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70"
                    style={{ background: `linear-gradient(135deg, ${r.color}, transparent)` }}
                  />
                  <div className="glass relative flex aspect-[3/3.6] flex-col overflow-hidden rounded-2xl p-3 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-white/25">
                    {/* mini preview */}
                    <div className="relative flex-1 overflow-hidden rounded-xl bg-white p-3 text-[oklch(0.18_0_0)]">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-display text-[11px] font-bold">Alex Chen</div>
                          <div className="text-[7px] uppercase tracking-widest" style={{ color: r.color }}>
                            {r.name}
                          </div>
                        </div>
                        <div className="h-4 w-4 rounded-full" style={{ background: r.color }} />
                      </div>
                      <div className="mt-2 h-px w-full" style={{ background: r.color, opacity: 0.4 }} />
                      <div className="mt-3 space-y-1.5">
                        <div className="h-1 w-2/3 rounded-full bg-black/20" />
                        <div className="h-1 w-full rounded-full bg-black/10" />
                        <div className="h-1 w-5/6 rounded-full bg-black/10" />
                        <div className="h-1 w-3/4 rounded-full bg-black/10" />
                      </div>
                      <div className="mt-3 space-y-1.5">
                        <div className="h-1 w-1/2 rounded-full bg-black/20" />
                        <div className="h-1 w-3/4 rounded-full bg-black/10" />
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {["React", "TS", "AI"].map((s) => (
                          <span
                            key={s}
                            className="rounded px-1 py-0.5 text-[6px] font-medium text-white"
                            style={{ background: r.color }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* Hover action overlay */}
                      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/75 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                        <Link
                          to="/builder"
                          className="inline-flex items-center gap-1 rounded-lg bg-[var(--gradient-violet-cyan)] px-2.5 py-1.5 text-[10px] font-medium text-background"
                        >
                          <Edit3 className="h-3 w-3" /> Edit
                        </Link>
                        <button className="inline-flex items-center gap-1 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1.5 text-[10px] font-medium text-foreground">
                          <Download className="h-3 w-3" /> PDF
                        </button>
                        <button className="grid h-7 w-7 place-items-center rounded-lg border border-white/20 bg-white/10 text-muted-foreground transition-colors hover:text-[var(--pink)]">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between px-1 pb-1 pt-3">
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-display text-sm font-semibold">{r.name}</div>
                        <div className="font-mono text-[10px] text-muted-foreground">
                          {r.template} · {r.edited}
                        </div>
                      </div>
                      <span className="ml-2 h-2 w-2 rounded-full" style={{ background: r.color, boxShadow: `0 0 8px ${r.color}` }} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}