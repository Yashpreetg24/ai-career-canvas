import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-[var(--gradient-violet-cyan)]">
            <Sparkles className="h-3.5 w-3.5 text-background" />
          </span>
          <span className="font-display font-semibold">Resumify</span>
          <span className="ml-2 font-mono text-xs text-muted-foreground">v2.0</span>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Resumify Labs · Crafted for the next decade of work
        </p>
      </div>
    </footer>
  );
}