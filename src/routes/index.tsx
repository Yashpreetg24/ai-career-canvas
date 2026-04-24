import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Marquee } from "@/components/landing/Marquee";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Resumify — Your Career, Powered by AI" },
      {
        name: "description",
        content:
          "Build a recruiter-ready resume in minutes. AI writing, stunning templates, and cloud save — all in one futuristic workspace.",
      },
      { property: "og:title", content: "Resumify — Your Career, Powered by AI" },
      {
        property: "og:description",
        content: "AI-powered resume builder with stunning templates and cloud save.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
