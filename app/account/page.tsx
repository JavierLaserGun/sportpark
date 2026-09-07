"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useBooking } from "@/lib/bookingContext";
import { formatDateLong } from "@/lib/mockData";
import { CheckCircleIcon } from "@/components/Icons";

export default function AccountPage() {
  const router = useRouter();
  const { account, hydrated, bookings, logout } = useBooking();
  const [activeTab, setActiveTab] = useState<"upcoming" | "history" | "receipts">("upcoming");

  useEffect(() => {
    if (hydrated && !account) {
      router.push("/login");
    }
  }, [hydrated, account, router]);

  if (!hydrated || !account) {
    return (
      <div className="container-px mx-auto max-w-[1400px] py-14 lg:py-20">
        <p className="text-center text-muted">Loading account...</p>
      </div>
    );
  }

  // Separate bookings into upcoming and past
  const today = new Date().toISOString().split("T")[0];
  const upcomingBookings = bookings.filter(
    (b) => b.status === "confirmed" && b.date >= today
  );
  const pastBookings = bookings.filter(
    (b) => b.status !== "cancelled" && b.date < today
  );
  const totalSpent = bookings.reduce((sum, b) => (b.status !== "cancelled" ? sum + b.total : sum), 0);

  return (
    <div className="container-px mx-auto max-w-[1200px] py-10 lg:py-12">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-wide text-brand">_ACCOUNT</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          MY ACCOUNT
        </h1>
        <p className="mt-2 text-sm text-muted">Manage your bookings and payments</p>
      </div>

      {/* Profile Card */}
      <div className="mb-8 rounded-xl border border-border bg-background-hover p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-muted mb-2">PROFILE</p>
            <p className="text-xl font-bold">{account.fullName}</p>
            <p className="text-sm text-muted mt-1">{account.email}</p>
          </div>
          <button
            onClick={logout}
            className="rounded-md border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-background-hover"
          >
            LOGOUT
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border p-6">
          <p className="text-xs font-semibold text-muted mb-2">UPCOMING BOOKINGS</p>
          <p className="text-3xl font-bold text-brand">{upcomingBookings.length}</p>
        </div>
        <div className="rounded-xl border border-border p-6">
          <p className="text-xs font-semibold text-muted mb-2">PAST BOOKINGS</p>
          <p className="text-3xl font-bold text-foreground">{pastBookings.length}</p>
        </div>
        <div className="rounded-xl border border-border p-6">
          <p className="text-xs font-semibold text-muted mb-2">TOTAL SPENT</p>
          <p className="text-3xl font-bold text-brand">BND ${totalSpent.toFixed(2)}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-border">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`pb-4 text-sm font-semibold tracking-wide transition-colors ${
              activeTab === "upcoming"
                ? "border-b-2 border-brand text-brand"
                : "text-muted hover:text-foreground"
            }`}
          >
            _UPCOMING BOOKINGS ({upcomingBookings.length})
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`pb-4 text-sm font-semibold tracking-wide transition-colors ${
              activeTab === "history"
                ? "border-b-2 border-brand text-brand"
                : "text-muted hover:text-foreground"
            }`}
          >
            _BOOKING HISTORY ({pastBookings.length})
          </button>
          <button
            onClick={() => setActiveTab("receipts")}
            className={`pb-4 text-sm font-semibold tracking-wide transition-colors ${
              activeTab === "receipts"
                ? "border-b-2 border-brand text-brand"
                : "text-muted hover:text-foreground"
            }`}
          >
            _PAYMENT RECEIPTS
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "upcoming" && (
        <div className="space-y-4">
          {upcomingBookings.length === 0 ? (
            <div className="rounded-xl border border-border border-dashed p-8 text-center">
              <p className="text-muted mb-4">No upcoming bookings</p>
              <Link href="/booking" className="inline-block rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark">
                BOOK A COURT
              </Link>
            </div>
          ) : (
            upcomingBookings.map((booking) => (
              <div key={booking.reference} className="rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                      <p className="text-xs font-semibold text-green-700 uppercase">Confirmed</p>
                    </div>
                    <p className="font-bold text-lg text-foreground">
                      {booking.sport.toUpperCase()} - Court {booking.courtNumber}
                    </p>
                    <div className="mt-3 space-y-1 text-sm text-muted">
                      <p>📅 {formatDateLong(booking.date)}</p>
                      <p>🕐 {booking.time.start} - {booking.time.end}</p>
                      <p>⏱️ {booking.durationHours} Hour{booking.durationHours > 1 ? "s" : ""}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-muted mb-2">TOTAL</p>
                    <p className="text-2xl font-bold text-brand mb-3">
                      BND ${booking.total.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted">Ref: {booking.reference}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "history" && (
        <div className="space-y-4">
          {pastBookings.length === 0 ? (
            <div className="rounded-xl border border-border border-dashed p-8 text-center">
              <p className="text-muted">No booking history</p>
            </div>
          ) : (
            pastBookings.map((booking) => (
              <div key={booking.reference} className="rounded-xl border border-border p-6 bg-background-hover/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-bold text-lg text-foreground">
                      {booking.sport.toUpperCase()} - Court {booking.courtNumber}
                    </p>
                    <div className="mt-2 space-y-1 text-sm text-muted">
                      <p>📅 {formatDateLong(booking.date)}</p>
                      <p>🕐 {booking.time.start} - {booking.time.end}</p>
                      <p>⏱️ {booking.durationHours} Hour{booking.durationHours > 1 ? "s" : ""}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-muted mb-2">PAID</p>
                    <p className="text-2xl font-bold text-foreground mb-3">
                      BND ${booking.total.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted">Ref: {booking.reference}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "receipts" && (
        <div className="space-y-4">
          {bookings.filter((b) => b.status !== "cancelled").length === 0 ? (
            <div className="rounded-xl border border-border border-dashed p-8 text-center">
              <p className="text-muted">No payment receipts</p>
            </div>
          ) : (
            bookings
              .filter((b) => b.status !== "cancelled")
              .map((booking) => (
                <div key={booking.reference} className="rounded-xl border border-border p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-muted mb-1">RECEIPT</p>
                      <p className="font-bold text-lg">{booking.reference}</p>
                    </div>
                    <CheckCircleIcon className="h-6 w-6 text-green-600" />
                  </div>

                  <div className="space-y-3 border-t border-b border-border py-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Sport</span>
                      <span className="font-medium">{booking.sport.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Court</span>
                      <span className="font-medium">Court {booking.courtNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Date</span>
                      <span className="font-medium">{formatDateLong(booking.date)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Time</span>
                      <span className="font-medium">{booking.time.start} - {booking.time.end}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Duration</span>
                      <span className="font-medium">{booking.durationHours} Hour{booking.durationHours > 1 ? "s" : ""}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Rate</span>
                      <span className="font-medium">BND ${booking.pricePerHour.toFixed(2)}/hr</span>
                    </div>
                  </div>

                  <div className="flex justify-between py-4 text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-brand">BND ${booking.total.toFixed(2)}</span>
                  </div>

                  <div className="space-y-2 text-xs text-muted">
                    <p>Payment Status: <span className="font-semibold text-green-600">PAID</span></p>
                    <p>Booking Date: {new Date(booking.createdAt).toLocaleDateString()}</p>
                    <p>Currency: {booking.currency}</p>
                  </div>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
}
