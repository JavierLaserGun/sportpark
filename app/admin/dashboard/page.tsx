"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/lib/adminContext";
import Link from "next/link";
import AdminCustomerManagement from "@/components/AdminCustomerManagement";
import AdminBookingCalendar from "@/components/AdminBookingCalendar";
import AdminActivityLogComponent from "@/components/AdminActivityLog";
import AdminTransactionTracking from "@/components/AdminTransactionTracking";
import ScheduleLocking from "@/components/ScheduleLocking";

interface PricingConfig {
  pickleball: number;
  futsal: number;
}

interface CourtStatus {
  courtId: string;
  sport: string;
  locked: boolean;
  lockedUntil?: string;
}

interface ScheduleRelease {
  weekStarting: string;
  sports: ("pickleball" | "futsal")[];
}

interface DashboardMetrics {
  totalRevenue: number;
  totalBookings: number;
  courtUtilization: number;
  registeredCustomers: number;
  newCustomers: number;
  cancellationRate: number;
  noShowRate: number;
  averageBookingValue: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const { admin, hydrated, logout } = useAdmin();
  const [activeTab, setActiveTab] = useState<
    | "dashboard"
    | "customers"
    | "bookings"
    | "transactions"
    | "activity"
    | "pricing"
    | "schedule"
  >("dashboard");
  const [timeframe, setTimeframe] = useState<"TODAY" | "7_DAYS" | "30_DAYS" | "MONTH">("TODAY");

  // Pricing state
  const [pricing, setPricing] = useState<PricingConfig>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("admin_pricing");
      return saved ? JSON.parse(saved) : { pickleball: 18, futsal: 20 };
    }
    return { pickleball: 18, futsal: 20 };
  });
  const [pricingEdited, setPricingEdited] = useState(false);

  // Court status state
  const [courts, setCourts] = useState<CourtStatus[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("admin_courts");
      return saved
        ? JSON.parse(saved)
        : [
            { courtId: "pb-01", sport: "pickleball", locked: false },
            { courtId: "pb-02", sport: "pickleball", locked: false },
            { courtId: "pb-03", sport: "pickleball", locked: false },
            { courtId: "pb-04", sport: "pickleball", locked: false },
            { courtId: "fs-01", sport: "futsal", locked: false },
          ];
    }
    return [];
  });

  // Schedule release state
  const [weekStarting, setWeekStarting] = useState(new Date().toISOString().split("T")[0]);
  const [releasePickleball, setReleasePickleball] = useState(false);
  const [releaseFutsal, setReleaseFutsal] = useState(false);

  // Generate mock metrics based on timeframe
  const generateMetrics = (): DashboardMetrics => {
    const multipliers = {
      TODAY: 1,
      "7_DAYS": 5.5,
      "30_DAYS": 22,
      MONTH: 22,
    };
    const mult = multipliers[timeframe];

    return {
      totalRevenue: Math.round(2400 * mult),
      totalBookings: Math.round(32 * mult),
      courtUtilization: Math.round(65 + Math.random() * 15),
      registeredCustomers: Math.round(156),
      newCustomers: Math.round(12 * (timeframe === "TODAY" ? 1 : mult / 5)),
      cancellationRate: 8 + Math.random() * 4,
      noShowRate: 2 + Math.random() * 3,
      averageBookingValue: Math.round(75 + Math.random() * 30),
    };
  };

  const metrics = generateMetrics();

  // Check authentication on mount
  useEffect(() => {
    if (hydrated && !admin) {
      router.push("/admin/login");
    }
  }, [admin, hydrated, router]);

  if (!hydrated || !admin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted">// Loading...</p>
      </div>
    );
  }

  // Pricing handlers
  const handlePricingChange = (sport: "pickleball" | "futsal", value: number) => {
    setPricing((prev) => ({ ...prev, [sport]: value }));
    setPricingEdited(true);
  };

  const handleSavePricing = () => {
    localStorage.setItem("admin_pricing", JSON.stringify(pricing));
    setPricingEdited(false);
    alert("_PRICING UPDATED");
  };

  // Court handlers
  const handleToggleCourt = (courtId: string) => {
    setCourts((prev) =>
      prev.map((c) =>
        c.courtId === courtId
          ? { ...c, locked: !c.locked, lockedUntil: !c.locked ? new Date().toISOString() : undefined }
          : c
      )
    );
  };

  const handleSaveCourts = () => {
    localStorage.setItem("admin_courts", JSON.stringify(courts));
    alert("_COURT STATUS SAVED");
  };

  // Schedule handlers
  const handleReleaseSchedule = () => {
    const release: ScheduleRelease = {
      weekStarting,
      sports: [],
    };
    if (releasePickleball) release.sports.push("pickleball");
    if (releaseFutsal) release.sports.push("futsal");

    if (release.sports.length === 0) {
      alert("_SELECT AT LEAST ONE SPORT");
      return;
    }

    const releases = JSON.parse(localStorage.getItem("admin_releases") || "[]");
    releases.push(release);
    localStorage.setItem("admin_releases", JSON.stringify(releases));
    alert(`_SCHEDULE RELEASED FOR ${release.sports.join(", ").toUpperCase()}`);
    setReleasePickleball(false);
    setReleaseFutsal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="container-px mx-auto max-w-[1400px] py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold">
              <span className="text-brand">{"</>"}</span>
              <span>SPORT_PARK.play</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted">// {admin.email}</span>
              <button
                onClick={logout}
                className="rounded-md border border-brand px-3 py-1.5 text-sm text-brand transition-colors hover:bg-brand hover:text-white"
              >
                _LOGOUT
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container-px mx-auto max-w-[1400px] py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">_ADMIN DASHBOARD</h1>
            <p className="mt-1 text-sm text-muted">// Performance metrics and management controls</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 border-b border-border overflow-x-auto">
          <div className="flex gap-2">
            {(["dashboard", "customers", "bookings", "transactions", "activity", "pricing", "schedule"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "border-b-2 border-brand text-brand"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                __{tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="mt-8 space-y-8">
            {/* Time Filter */}
            <div className="flex gap-2 items-center">
              <span className="text-sm text-muted font-medium">// TIMEFRAME</span>
              <div className="flex gap-2">
                {(["TODAY", "7_DAYS", "30_DAYS", "MONTH"] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      timeframe === tf
                        ? "bg-brand text-white"
                        : "border border-border text-foreground hover:border-brand"
                    }`}
                  >
                    {tf === "TODAY" ? "TODAY" : tf === "7_DAYS" ? "7 DAYS" : tf === "30_DAYS" ? "30 DAYS" : "MONTH"}
                  </button>
                ))}
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <KPICard
                label="Total Revenue"
                value={`BND ${metrics.totalRevenue.toLocaleString()}`}
                subtext="// net of discounts"
                icon="💰"
              />
              <KPICard
                label="Total Bookings"
                value={metrics.totalBookings.toString()}
                subtext="// completed sessions"
                icon="📅"
              />
              <KPICard
                label="Court Utilization"
                value={`${metrics.courtUtilization}%`}
                subtext="// average capacity"
                icon="🏟️"
              />
              <KPICard
                label="Registered Customers"
                value={metrics.registeredCustomers.toString()}
                subtext={`// +${metrics.newCustomers} new`}
                icon="👥"
              />
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <KPICard
                label="Avg Booking Value"
                value={`BND ${metrics.averageBookingValue}`}
                subtext="// per session"
                icon="📊"
              />
              <KPICard
                label="Cancellation Rate"
                value={`${metrics.cancellationRate.toFixed(1)}%`}
                subtext="// of all bookings"
                icon="❌"
              />
            </div>

            {/* Charts Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold">_ANALYTICS</h2>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <ChartCard title="Revenue Trend" />
                <ChartCard title="Booking Volume" />
                <ChartCard title="Court Utilization" />
                <ChartCard title="Revenue by Sport" />
              </div>
            </div>

            {/* Customer Breakdown */}
            <div className="rounded-lg border border-border p-6">
              <h2 className="text-lg font-bold mb-4">_CUSTOMER INSIGHTS</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-lg bg-background p-4">
                  <p className="text-2xl font-bold text-brand">87</p>
                  <p className="text-xs text-muted mt-1">Returning Customers</p>
                </div>
                <div className="rounded-lg bg-background p-4">
                  <p className="text-2xl font-bold text-brand">69</p>
                  <p className="text-xs text-muted mt-1">New Customers</p>
                </div>
                <div className="rounded-lg bg-background p-4">
                  <p className="text-2xl font-bold text-brand">42</p>
                  <p className="text-xs text-muted mt-1">Student Members</p>
                </div>
                <div className="rounded-lg bg-background p-4">
                  <p className="text-2xl font-bold text-brand">8</p>
                  <p className="text-xs text-muted mt-1">High-Risk Users</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === "customers" && (
          <div className="mt-8">
            <AdminCustomerManagement />
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="mt-8">
            <AdminBookingCalendar />
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div className="mt-8">
            <AdminTransactionTracking />
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === "activity" && (
          <div className="mt-8">
            <AdminActivityLogComponent />
          </div>
        )}

        {/* Pricing Tab */}
        {activeTab === "pricing" && (
          <div className="mt-8 max-w-2xl rounded-lg border border-border p-6">
            <h2 className="text-xl font-bold">_PRICING RATES</h2>
            <p className="mt-1 text-sm text-muted">// Set hourly rates in BND</p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium">Pickleball (BND / hour)</label>
                <input
                  type="number"
                  value={pricing.pickleball}
                  onChange={(e) => handlePricingChange("pickleball", parseFloat(e.target.value) || 0)}
                  className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  step="0.50"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Futsal (BND / hour)</label>
                <input
                  type="number"
                  value={pricing.futsal}
                  onChange={(e) => handlePricingChange("futsal", parseFloat(e.target.value) || 0)}
                  className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  step="0.50"
                  min="0"
                />
              </div>

              <button
                onClick={handleSavePricing}
                disabled={!pricingEdited}
                className="mt-6 rounded-md bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
              >
                _SAVE PRICING
              </button>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === "schedule" && (
          <div className="mt-8">
            <ScheduleLocking />
          </div>
        )}
      </div>
    </div>
  );
}

// KPI Card Component
function KPICard({
  label,
  value,
  subtext,
  icon,
}: {
  label: string;
  value: string;
  subtext: string;
  icon?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold tracking-wide text-muted uppercase">{label}</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
          <p className="mt-1 text-xs text-muted">{subtext}</p>
        </div>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
    </div>
  );
}

// Chart Card Component (placeholder for chart library integration)
function ChartCard({ title }: { title: string }) {
  return (
    <div className="rounded-lg border border-border bg-background p-6">
      <h3 className="text-sm font-semibold mb-4">// {title}</h3>
      <div className="flex items-center justify-center h-48 bg-background/50 rounded border border-border/50">
        <div className="text-center">
          <p className="text-muted text-sm">// chart placeholder</p>
          <p className="text-muted text-xs mt-2">Chart library integration pending</p>
        </div>
      </div>
    </div>
  );
}
