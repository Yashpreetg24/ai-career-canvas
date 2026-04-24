import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, AuthInput, ShimmerButton, OrDivider, SocialButton } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Resumify" },
      { name: "description", content: "Sign in to your Resumify account." },
      { property: "og:title", content: "Sign in — Resumify" },
      { property: "og:description", content: "Sign in to your Resumify account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  return (
    <AuthShell
      title={<>Welcome back</>}
      subtitle="Sign in to keep building your career story."
      footer={
        <>
          New here?{" "}
          <Link to="/register" className="text-foreground underline-offset-4 hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => navigate({ to: "/dashboard" }), 1100);
        }}
      >
        <AuthInput label="Email" type="email" />
        <AuthInput label="Password" type="password" />
        <div className="flex items-center justify-between text-xs">
          <label className="inline-flex items-center gap-2 text-muted-foreground">
            <input type="checkbox" className="h-3.5 w-3.5 accent-[var(--violet)]" /> Remember me
          </label>
          <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
            Forgot password?
          </a>
        </div>
        <ShimmerButton type="submit" loading={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </ShimmerButton>
      </form>

      <OrDivider />
      <div className="grid grid-cols-2 gap-2">
        <SocialButton>Google</SocialButton>
        <SocialButton>GitHub</SocialButton>
      </div>
    </AuthShell>
  );
}