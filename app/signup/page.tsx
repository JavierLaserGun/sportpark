"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LockIcon } from "@/components/Icons";
import { useBooking } from "@/lib/bookingContext";

export default function SignupPage() {
  const router = useRouter();
  const { login: customerLogin } = useBooking();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in your name, email and password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    customerLogin({ fullName: fullName.trim(), email: email.trim() });
    router.push("/account");
  }

  return (
    <div className="container-px mx-auto flex max-w-[520px] flex-col items-center py-16 lg:py-24">
      <div className="w-full rounded-xl border border-border p-8">
        <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-brand">
          <LockIcon className="h-4 w-4" />
          // CREATE ACCOUNT
        </p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight">JOIN SPORT_PARK</h1>
        <p className="mt-4 text-sm text-muted">
          Create an account to book courts faster and keep track of your bookings.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-semibold tracking-wide text-muted">
              FULL NAME
            </span>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Javier Tan"
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand-tint"
            />
          </label>
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
              placeholder="Create a password"
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand-tint"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-semibold tracking-wide text-muted">
              CONFIRM PASSWORD
            </span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand-tint"
            />
          </label>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-md bg-brand py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            _CREATE ACCOUNT
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted">
          Already have an account?{" "}
          <Link href="/login" className="text-brand">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

