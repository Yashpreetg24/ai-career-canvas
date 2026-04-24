import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: ReactNode;
  subtitle: ReactNode;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-16">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute left-1/2 top-[-15%] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[var(--violet)]/30 blur-[140px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[400px] w-[400px] rounded-full bg-[var(--cyan)]/20 blur-[120px]" />
        <div className="absolute left-[-10%] bottom-[-10%] h-[400px] w-[400px] rounded-full bg-[var(--pink)]/20 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="absolute -inset-3 -z-10 rounded-3xl bg-[var(--gradient-violet-cyan)] opacity-25 blur-2xl" />
        <div className="glass-strong rounded-3xl p-8 shadow-elevated">
          <Link to="/" className="mb-7 flex items-center justify-center">
            <motion.span
              animate={{ rotate: [0, 6, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative grid h-12 w-12 place-items-center rounded-2xl bg-[var(--gradient-violet-cyan)] animate-pulse-glow"
            >
              <Sparkles className="h-5 w-5 text-background" />
            </motion.span>
          </Link>
          <div className="mb-6 text-center">
            <h1 className="font-display text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          </div>
          {children}
          <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
        </div>
      </motion.div>
    </div>
  );
}

export function AuthInput({
  label,
  type = "text",
  defaultValue,
}: {
  label: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <div className="group relative">
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder=" "
        className="peer w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 pb-2 pt-5 text-sm outline-none transition-all duration-200 focus:border-[var(--violet)] focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_oklch(0.62_0.27_295/0.25),0_0_24px_oklch(0.62_0.27_295/0.35)]"
      />
      <label className="pointer-events-none absolute left-3.5 top-3.5 text-sm text-muted-foreground transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted-foreground peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-[var(--violet)] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:text-[var(--violet)]">
        {label}
      </label>
    </div>
  );
}

export function ShimmerButton({
  children,
  loading,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="relative w-full overflow-hidden rounded-xl bg-[var(--gradient-violet-cyan)] px-5 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02] disabled:opacity-90 animate-pulse-glow"
    >
      <span className={`relative z-10 inline-flex items-center justify-center gap-2 ${loading ? "opacity-80" : ""}`}>
        {loading && <Sparkles className="h-4 w-4 animate-spin" />}
        {children}
      </span>
      {loading && <span className="absolute inset-0 animate-shimmer" />}
    </button>
  );
}

export function OrDivider() {
  return (
    <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground">
      <span className="h-px flex-1 bg-white/10" />
      or
      <span className="h-px flex-1 bg-white/10" />
    </div>
  );
}

export function SocialButton({ children }: { children: ReactNode }) {
  return (
    <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm transition-colors hover:bg-white/[0.06]">
      {children}
    </button>
  );
}