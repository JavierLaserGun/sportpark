"use client";

import { useState } from "react";
import type { CustomerInfo } from "@/lib/types";

export default function BookingForm({
  initial,
  onSubmit,
  submitLabel,
}: {
  initial?: Partial<CustomerInfo>;
  onSubmit: (info: CustomerInfo) => void;
  submitLabel: string;
}) {
  const [fullName, setFullName] = useState(initial?.fullName ?? "");
  const [mobile, setMobile] = useState(initial?.mobile ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [remarks, setRemarks] = useState(initial?.remarks ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!fullName.trim()) next.fullName = "Full name is required.";
    if (!mobile.trim()) next.mobile = "Mobile number is required.";
    else if (!/^[0-9+()\s-]{6,}$/.test(mobile.trim())) next.mobile = "Enter a valid mobile number.";
    if (!email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid email address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ fullName: fullName.trim(), mobile: mobile.trim(), email: email.trim(), remarks: remarks.trim() || undefined });
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border p-6">
      <p className="text-xs font-semibold tracking-wide text-brand">// CUSTOMER INFORMATION</p>

      <div className="mt-5 space-y-4">
        <TextField
          label="FULL NAME"
          value={fullName}
          onChange={setFullName}
          placeholder="e.g. Ahmad Rahman"
          error={errors.fullName}
          required
        />
        <TextField
          label="MOBILE NUMBER"
          value={mobile}
          onChange={setMobile}
          placeholder="e.g. +673 8123 456"
          error={errors.mobile}
          required
          type="tel"
        />
        <TextField
          label="EMAIL"
          value={email}
          onChange={setEmail}
          placeholder="e.g. name@email.com"
          error={errors.email}
          required
          type="email"
        />
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-muted">
            REMARKS <span className="font-normal normal-case text-muted/70">(optional)</span>
          </span>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows={3}
            placeholder="Any special requests?"
            className="w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand-tint"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-brand py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        {submitLabel}
        <span aria-hidden>↗</span>
      </button>
    </form>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  error,
  required,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold tracking-wide text-muted">
        {label} {required && <span className="text-brand">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-md border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-tint ${
          error ? "border-red-400" : "border-border focus:border-brand"
        }`}
      />
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}
