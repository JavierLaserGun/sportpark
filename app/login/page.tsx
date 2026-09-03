"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LockIcon } from "@/components/Icons";
import { useBooking } from "@/lib/bookingContext";
import { useAdmin } from "@/lib/adminContext";

export default function LoginPage() {
  const router = useRouter();
  const { login: customerLogin } = useBooking();
  const { login: adminLogin } = useAdmin();

  const [loginType, setLoginType] = useState<"customer" | "admin">("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleCustomerSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    customerLogin({ fullName: email.trim(), email: email.trim() });
    router.push("/account");
  }

  function handleAdminSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    const success = adminLogin(email.trim(), password);
    if (success) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid email or password.");
      setPassword("");
    }
  }

  return (
    <div className="container-px mx-auto flex max-w-[520px] flex-col items-center py-16 lg:py-24">
      <div className="w-full rounded-xl border border-border p-8">
        <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-brand">
          <LockIcon className="h-4 w-4" />
          // LOGIN
        </p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight">WELCOME BACK</h1>

        {/* Tab buttons */}
        <div className="mt-6 flex gap-2 border-b border-border">
          <button
            onClick={() => {
              setLoginType("customer");
              setError(null);
            }}
            className={`pb-3 text-sm font-semibold transition-colors ${
              loginType === "customer"
                ? "border-b-2 border-brand text-brand"
                : "text-muted hover:text-foreground"
            }`}
          >
            CUSTOMER
          </button>
          <button
            onClick={() => {
              setLoginType("admin");
              setError(null);
            }}
            className={`pb-3 text-sm font-semibold transition-colors ${
              loginType === "admin"
                ? "border-b-2 border-brand text-brand"
                : "text-muted hover:text-foreground"
            }`}
          >
            ADMIN
          </button>
        </div>

        {/* Customer Login */}
        {loginType === "customer" && (
          <>
            <p className="mt-4 text-sm text-muted">
              Sign in with your email and password to access your bookings.
            </p>
            <form onSubmit={handleCustomerSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold tracking-wide text-muted">
                  EMAIL
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@email.com"
                  className="w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand-tint"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold tracking-wide text-muted">
                  PASSWORD
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand-tint"
                />
              </label>

              {error && <p className="text-xs text-red-500">{error}</p>}

              <button
                type="submit"
                className="w-full rounded-md bg-brand py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                _LOGIN
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-muted">
              Looking to book a court instead?{" "}
              <Link href="/booking" className="text-brand">
                Go to booking
              </Link>
            </p>
          </>
        )}

        {/* Admin Login */}
        {loginType === "admin" && (
          <>
            <p className="mt-4 text-sm text-muted">
              Enter your admin credentials to access the dashboard.
            </p>
            <form onSubmit={handleAdminSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold tracking-wide text-muted">
                  EMAIL
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. admin@email.com"
                  className="w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand-tint"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold tracking-wide text-muted">
                  PASSWORD
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand-tint"
                />
              </label>

              {error && <p className="text-xs text-red-500">{error}</p>}

              <button
                type="submit"
                className="w-full rounded-md bg-brand py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                _LOGIN TO ADMIN
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
