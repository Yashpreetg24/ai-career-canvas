import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-1/2 z-50 w-[min(1100px,94%)] -translate-x-1/2"
    >
      <div className="glass-strong flex items-center justify-between rounded-2xl px-5 py-3 shadow-elevated">
        <Link to="/" className="group flex items-center gap-2">
          <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-[var(--gradient-violet-cyan)]">
            <Sparkles className="h-4 w-4 text-background" />
            <span className="absolute inset-0 rounded-lg blur-md opacity-60 bg-[var(--gradient-violet-cyan)]" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Resumify
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <Link to="/templates" className="transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>Templates</Link>
          <Link to="/builder" className="transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>Builder</Link>
          <Link to="/dashboard" className="transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>Dashboard</Link>
          <a className="transition-colors hover:text-foreground" href="#features">Features</a>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/login" className="hidden rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:block">
            Sign in
          </Link>
          <Link to="/register" className="relative overflow-hidden rounded-lg bg-[var(--gradient-violet-cyan)] px-4 py-1.5 text-sm font-medium text-background transition-transform hover:scale-[1.03]">
            Get started
          </Link>
        </div>
      </div>
    </motion.header>
  );
}