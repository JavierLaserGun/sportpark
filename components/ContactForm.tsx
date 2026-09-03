"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    // Demo form — no message is actually transmitted anywhere.
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border p-10 text-center">
        <p className="text-sm font-semibold tracking-wide text-brand">// MESSAGE SENT</p>
        <p className="mt-2 text-sm text-muted">
          Thanks, {name.split(" ")[0]}. This is a demo form so nothing was actually sent — but
          in production your message would reach the Sport Park team here.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border p-6">
      <p className="text-xs font-semibold tracking-wide text-brand">// SEND A MESSAGE</p>
      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-semibold tracking-wide text-muted">NAME</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand-tint"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-semibold tracking-wide text-muted">EMAIL</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand-tint"
            placeholder="you@email.com"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-semibold tracking-wide text-muted">MESSAGE</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand-tint"
            placeholder="How can we help?"
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-brand py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        _SEND MESSAGE
      </button>
    </form>
  );
}
