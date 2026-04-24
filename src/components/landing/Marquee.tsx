const COMPANIES = [
  "Google", "Meta", "Amazon", "Apple", "Netflix", "Stripe",
  "Airbnb", "Spotify", "Microsoft", "OpenAI", "Linear", "Figma",
];

export function Marquee() {
  return (
    <section className="relative border-y border-white/5 bg-black/20 py-10">
      <p className="mb-6 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
        Trusted by people applying to
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-marquee gap-14 px-4">
          {[...COMPANIES, ...COMPANIES].map((c, i) => (
            <span
              key={i}
              className="font-display text-2xl font-semibold tracking-tight text-white/40 transition-colors hover:text-white"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}