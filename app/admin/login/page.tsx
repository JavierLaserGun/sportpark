"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/lib/adminContext";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, admin } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to dashboard
  if (admin) {
    router.push("/admin/dashboard");
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate auth delay
    await new Promise((r) => setTimeout(r, 500));

    if (login(email, password)) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid email or password");
      setPassword("");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <span className="text-brand">{"</>"}</span>
            <span>SPORT_PARK.play</span>
          </Link>
          <p className="mt-1 text-sm text-muted">// Admin Portal</p>
        </div>

        <div className="rounded-lg border border-border bg-background p-8">
          <h1 className="text-xl font-bold tracking-tight">_ADMIN LOGIN</h1>
          <p className="mt-1 text-sm text-muted">// Manage pricing, availability, and schedules</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                required
              />
            </div>

            {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-md bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "_AUTHENTICATING..." : "_LOGIN"}
            </button>
          </form>

          <div className="mt-6 border-t border-border pt-6">
            <Link href="/" className="text-sm text-brand transition-colors hover:underline">
              ← Back to Sport Park
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
