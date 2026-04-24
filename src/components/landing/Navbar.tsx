import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-1/2 z-50 w-[min(1100px,94%)] -translate-x-1/2"
    >
      <div className="glass-strong flex items-center justify-between rounded-2xl px-5 py-3 shadow-elevated">
        <a href="/" className="group flex items-center gap-2">
          <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-[var(--gradient-violet-cyan)]">
            <Sparkles className="h-4 w-4 text-background" />
            <span className="absolute inset-0 rounded-lg blur-md opacity-60 bg-[var(--gradient-violet-cyan)]" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Resumify
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a className="transition-colors hover:text-foreground" href="#features">Features</a>
          <a className="transition-colors hover:text-foreground" href="#templates">Templates</a>
          <a className="transition-colors hover:text-foreground" href="#pricing">Pricing</a>
          <a className="transition-colors hover:text-foreground" href="#changelog">Changelog</a>
        </nav>

        <div className="flex items-center gap-2">
          <button className="hidden rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:block">
            Sign in
          </button>
          <button className="relative overflow-hidden rounded-lg bg-[var(--gradient-violet-cyan)] px-4 py-1.5 text-sm font-medium text-background transition-transform hover:scale-[1.03]">
            Get started
          </button>
        </div>
      </div>
    </motion.header>
  );
}