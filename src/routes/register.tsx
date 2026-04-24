import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, AuthInput, ShimmerButton, OrDivider, SocialButton } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create your account — Resumify" },
      { name: "description", content: "Join Resumify and build a recruiter-ready resume in minutes." },
      { property: "og:title", content: "Create your account — Resumify" },
      { property: "og:description", content: "Join Resumify in seconds." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  return (
    <AuthShell
      title={
        <>
          Create your <span className="text-gradient-vc">Resumify</span> account
        </>
      }
      subtitle="Build, tailor, and ship your resume with AI."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-foreground underline-offset-4 hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => navigate({ to: "/dashboard" }), 1200);
        }}
      >
        <AuthInput label="Full name" />
        <AuthInput label="Email" type="email" />
        <AuthInput label="Password" type="password" />
        <p className="text-xs text-muted-foreground">
          By creating an account, you agree to our{" "}
          <a className="text-foreground underline-offset-4 hover:underline" href="#">Terms</a> &{" "}
          <a className="text-foreground underline-offset-4 hover:underline" href="#">Privacy</a>.
        </p>
        <ShimmerButton type="submit" loading={loading}>
          {loading ? "Creating account…" : "Create account"}
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