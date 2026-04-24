import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Sparkles,
  User,
  Briefcase,
  GraduationCap,
  Code2,
  FolderGit2,
  Download,
  Palette,
  Type,
  Layout,
  ChevronLeft,
  Plus,
  Wand2,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/builder")({
  head: () => ({
    meta: [
      { title: "Resume Builder — Resumify" },
      {
        name: "description",
        content:
          "Edit your resume side-by-side with a live preview. Generate bullet points with AI in one click.",
      },
      { property: "og:title", content: "Resume Builder — Resumify" },
      { property: "og:description", content: "AI-powered live resume editor." },
    ],
  }),
  component: BuilderPage,
});

const SECTIONS = [
  { id: "personal", label: "Personal", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "projects", label: "Projects", icon: FolderGit2 },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

function FloatingInput({
  label,
  defaultValue,
  type = "text",
}: {
  label: string;
  defaultValue?: string;
  type?: string;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`peer w-full rounded-xl border bg-white/[0.03] px-3.5 pb-2 pt-5 text-sm text-foreground outline-none transition-all duration-200 ${
          focused
            ? "border-[var(--violet)] shadow-[0_0_0_3px_oklch(0.62_0.27_295/0.25)]"
            : "border-white/10 hover:border-white/20"
        }`}
      />
      <label
        className={`pointer-events-none absolute left-3.5 transition-all duration-200 ${
          active
            ? "top-1.5 text-[10px] uppercase tracking-wider text-[var(--violet)]"
            : "top-3.5 text-sm text-muted-foreground"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

function AITextarea({ initial }: { initial: string }) {
  const [value, setValue] = useState(initial);
  const [generating, setGenerating] = useState(false);
  const [chips, setChips] = useState<string[]>([]);

  const SUGGESTIONS = [
    "Led cross-functional team of 6 engineers shipping a real-time analytics dashboard used by 40k+ daily users.",
    "Reduced p95 latency by 62% by introducing edge caching and database read replicas.",
    "Designed and shipped an AI-assisted onboarding flow that lifted activation by 28%.",
  ];

  function generate() {
    setGenerating(true);
    setValue("");
    const target = SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)];
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setValue(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(id);
        setGenerating(false);
        setChips(SUGGESTIONS.filter((s) => s !== target).slice(0, 2));
        toast.success("✨ AI suggestion applied");
      }
    }, 18);
  }

  return (
    <div>
      <div className="relative rounded-xl">
        {generating && (
          <span className="pointer-events-none absolute -inset-px rounded-xl bg-[var(--gradient-violet-cyan)] opacity-70 blur-md animate-pulse-glow" />
        )}
        <div className={`relative rounded-xl border ${generating ? "border-transparent" : "border-white/10"} bg-white/[0.03]`}>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={4}
            placeholder="Describe what you did…"
            className="w-full resize-none rounded-xl bg-transparent px-3.5 py-3 pr-28 text-sm outline-none placeholder:text-muted-foreground/60 focus:shadow-[0_0_0_3px_oklch(0.62_0.27_295/0.25)]"
          />
          <button
            onClick={generate}
            disabled={generating}
            className="absolute right-2 top-2 inline-flex items-center gap-1.5 rounded-lg bg-[var(--gradient-violet-cyan)] px-2.5 py-1.5 text-[11px] font-medium text-background transition-transform hover:scale-[1.04] disabled:opacity-70"
          >
            <Sparkles className={`h-3 w-3 ${generating ? "animate-spin" : ""}`} />
            {generating ? "Writing…" : "Generate"}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {chips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 flex flex-wrap gap-2"
          >
            {chips.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setValue(c);
                  setChips([]);
                  toast.success("✨ AI suggestion applied");
                }}
                className="rounded-full border border-[var(--violet)]/40 bg-[var(--violet)]/10 px-3 py-1.5 text-left text-xs text-foreground/90 shadow-[0_0_20px_oklch(0.62_0.27_295/0.25)] transition-colors hover:bg-[var(--violet)]/20"
              >
                <Sparkles className="mr-1 inline h-3 w-3 text-[var(--cyan)]" />
                {c.length > 80 ? c.slice(0, 80) + "…" : c}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BuilderPage() {
  const [section, setSection] = useState<SectionId>("experience");
  const [color, setColor] = useState("var(--violet)");

  // Simulate autosave toast on first mount
  useEffect(() => {
    const t = setTimeout(() => toast.success("✅ Saved to cloud"), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Toaster />

      {/* Top toolbar */}
      <header className="glass-strong sticky top-0 z-40 border-b border-white/5">
        <div className="mx-auto flex h-14 max-w-[1500px] items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              Dashboard
            </Link>
            <span className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-semibold">Untitled Resume</span>
              <span className="font-mono text-[10px] text-muted-foreground">· edited just now</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ToolbarButton icon={Layout} label="Template" />
            <ToolbarButton icon={Type} label="Font" />
            <ColorPicker value={color} onChange={setColor} />
            <button
              onClick={() => toast.success("✅ Saved to cloud")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              <Save className="h-3.5 w-3.5" /> Save
            </button>
            <button
              onClick={() => toast("📄 Exporting PDF…", { description: "Your file will download in a moment." })}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--gradient-violet-cyan)] px-3.5 py-1.5 text-xs font-medium text-background transition-transform hover:scale-[1.04] animate-pulse-glow"
            >
              <Download className="h-3.5 w-3.5" /> Export PDF
            </button>
          </div>
        </div>

        {/* Section tabs */}
        <div className="mx-auto flex max-w-[1500px] items-center gap-1 px-5">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            const isActive = section === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className={`relative inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {s.label}
                {isActive && (
                  <motion.span
                    layoutId="section-underline"
                    className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-[var(--gradient-violet-cyan)]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Dual panel */}
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-6 px-5 py-6 lg:grid-cols-[1fr_1.1fr]">
        {/* Editor */}
        <div className="glass rounded-2xl p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {section === "personal" && <PersonalForm />}
              {section === "experience" && <ExperienceForm />}
              {section === "education" && <EducationForm />}
              {section === "skills" && <SkillsForm />}
              {section === "projects" && <ProjectsForm />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Live preview */}
        <div className="lg:sticky lg:top-[120px] lg:self-start">
          <div className="mb-3 flex items-center justify-between px-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Live preview · A4
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[var(--cyan)]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--cyan)] shadow-[0_0_8px_var(--cyan)]" />
              syncing
            </span>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-3xl bg-[var(--gradient-violet-cyan)] opacity-20 blur-3xl" />
            <ResumePaper accent={color} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolbarButton({ icon: Icon, label }: { icon: typeof Layout; label: string }) {
  return (
    <button className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground">
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function ColorPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const colors = ["var(--violet)", "var(--cyan)", "var(--pink)", "oklch(0.7 0.18 145)", "oklch(0.75 0.16 60)"];
  return (
    <div className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2 py-1.5">
      <Palette className="h-3.5 w-3.5 text-muted-foreground" />
      <div className="flex items-center gap-1">
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            className={`h-4 w-4 rounded-full transition-transform ${value === c ? "scale-110 ring-2 ring-white/60" : "hover:scale-110"}`}
            style={{ background: c }}
            aria-label="Color"
          />
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-2xl font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function PersonalForm() {
  return (
    <div>
      <SectionHeader title="Personal Info" subtitle="The basics recruiters see first." />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FloatingInput label="Full name" defaultValue="Alex Chen" />
        <FloatingInput label="Headline" defaultValue="Senior Product Engineer" />
        <FloatingInput label="Email" defaultValue="alex@resumify.app" type="email" />
        <FloatingInput label="Phone" defaultValue="+1 (415) 555 0134" />
        <FloatingInput label="Location" defaultValue="San Francisco, CA" />
        <FloatingInput label="Website" defaultValue="alex.dev" />
      </div>
      <div className="mt-6">
        <label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">Summary</label>
        <AITextarea initial="Product engineer focused on AI tooling and developer experience. Shipped real-time analytics, design systems, and onboarding flows used by hundreds of thousands." />
      </div>
    </div>
  );
}

function ExperienceForm() {
  return (
    <div>
      <SectionHeader title="Experience" subtitle="Use AI to turn rough notes into recruiter-ready bullets." />
      <div className="space-y-5">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FloatingInput label="Company" defaultValue="Lumina Labs" />
            <FloatingInput label="Role" defaultValue="Senior Product Engineer" />
            <FloatingInput label="Start" defaultValue="Mar 2022" />
            <FloatingInput label="End" defaultValue="Present" />
          </div>
          <div className="mt-5">
            <label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
              Bullet point
            </label>
            <AITextarea initial="Built realtime collaboration features for the editor used by 40k weekly users." />
          </div>
        </div>

        <button className="group flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.02] py-4 text-sm text-muted-foreground transition-colors hover:border-[var(--violet)]/60 hover:bg-[var(--violet)]/5 hover:text-foreground">
          <Plus className="h-4 w-4" /> Add another role
        </button>
      </div>
    </div>
  );
}

function EducationForm() {
  return (
    <div>
      <SectionHeader title="Education" subtitle="Schools, programs, and notable coursework." />
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FloatingInput label="School" defaultValue="UC Berkeley" />
          <FloatingInput label="Degree" defaultValue="B.S. Computer Science" />
          <FloatingInput label="Start" defaultValue="2017" />
          <FloatingInput label="End" defaultValue="2021" />
        </div>
      </div>
    </div>
  );
}

function SkillsForm() {
  const [skills, setSkills] = useState([
    "React", "TypeScript", "Node.js", "Postgres", "Tailwind CSS", "Figma", "AI / LLMs",
  ]);
  const [val, setVal] = useState("");
  return (
    <div>
      <SectionHeader title="Skills" subtitle="Add the tools and tech you actually ship with." />
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <span
            key={s}
            className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs"
          >
            {s}
            <button
              onClick={() => setSkills(skills.filter((x) => x !== s))}
              className="text-muted-foreground transition-colors group-hover:text-[var(--pink)]"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!val.trim()) return;
          setSkills([...skills, val.trim()]);
          setVal("");
        }}
        className="mt-5 flex items-center gap-2"
      >
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Type a skill and press enter"
          className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm outline-none transition-all focus:border-[var(--violet)] focus:shadow-[0_0_0_3px_oklch(0.62_0.27_295/0.25)]"
        />
        <button
          type="button"
          onClick={() => {
            setSkills([...skills, "Rust", "Edge functions"]);
            toast.success("✨ AI added 2 missing skills");
          }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--gradient-violet-cyan)] px-3 py-2.5 text-xs font-medium text-background transition-transform hover:scale-[1.04]"
        >
          <Wand2 className="h-3.5 w-3.5" />
          Suggest with AI
        </button>
      </form>
    </div>
  );
}

function ProjectsForm() {
  return (
    <div>
      <SectionHeader title="Projects" subtitle="Highlight the work you're most proud of." />
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FloatingInput label="Project" defaultValue="Resumify" />
          <FloatingInput label="Link" defaultValue="resumify.app" />
        </div>
        <div className="mt-5">
          <label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
            Description
          </label>
          <AITextarea initial="Open-source AI resume builder with templates, live preview, and one-click PDF export." />
        </div>
      </div>
    </div>
  );
}

function ResumePaper({ accent }: { accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto aspect-[1/1.32] w-full max-w-[640px] overflow-hidden rounded-2xl bg-white p-10 text-[oklch(0.18_0_0)] shadow-elevated"
    >
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Alex Chen</h1>
          <p className="text-xs uppercase tracking-[0.2em]" style={{ color: accent }}>
            Senior Product Engineer
          </p>
        </div>
        <div className="text-right text-[11px] text-black/60">
          <div>alex@resumify.app</div>
          <div>+1 (415) 555 0134</div>
          <div>San Francisco, CA</div>
        </div>
      </div>
      <div className="mt-4 h-px w-full" style={{ background: accent }} />
      <p className="mt-4 text-[12px] leading-relaxed text-black/70">
        Product engineer focused on AI tooling and developer experience. Shipped
        real-time analytics, design systems, and onboarding flows used by
        hundreds of thousands.
      </p>

      <Block title="Experience" accent={accent}>
        <Item title="Senior Product Engineer · Lumina Labs" right="Mar 2022 — Present" accent={accent}>
          <li>Built realtime collaboration features for the editor used by 40k weekly users.</li>
          <li>Led the migration to edge functions, cutting p95 latency by 62%.</li>
          <li>Designed an AI-assisted onboarding that lifted activation by 28%.</li>
        </Item>
        <Item title="Product Engineer · Northwind" right="2021 — 2022" accent={accent}>
          <li>Shipped a design system adopted by 14 internal product teams.</li>
          <li>Owned the analytics pipeline ingesting 2M events / day.</li>
        </Item>
      </Block>

      <Block title="Education" accent={accent}>
        <Item title="UC Berkeley — B.S. Computer Science" right="2017 — 2021" accent={accent}>
          <li>Focus on distributed systems & human–computer interaction.</li>
        </Item>
      </Block>

      <Block title="Skills" accent={accent}>
        <div className="flex flex-wrap gap-1.5">
          {["React", "TypeScript", "Node.js", "Postgres", "Tailwind CSS", "Figma", "AI / LLMs"].map((s) => (
            <span
              key={s}
              className="rounded px-2 py-0.5 text-[10px] font-medium text-white"
              style={{ background: accent }}
            >
              {s}
            </span>
          ))}
        </div>
      </Block>
    </motion.div>
  );
}

function Block({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em]" style={{ color: accent }}>
        {title}
      </h3>
      <div className="mt-2 space-y-3">{children}</div>
    </div>
  );
}

function Item({
  title,
  right,
  accent,
  children,
}: {
  title: string;
  right: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <div className="text-[12px] font-semibold">{title}</div>
        <div className="font-mono text-[10px] text-black/60">{right}</div>
      </div>
      <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] leading-relaxed text-black/75 marker:text-current" style={{ color: undefined }}>
        {children}
        <style>{`ul li::marker { color: ${accent}; }`}</style>
      </ul>
    </div>
  );
}