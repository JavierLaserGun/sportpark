"use client";

import Link from "next/link";
import Image from "next/image";
import { useBooking } from "@/lib/bookingContext";

export default function HomePage() {
  const { account, hydrated } = useBooking();
  const loggedIn = hydrated && !!account;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container-px mx-auto max-w-[1400px] py-14 lg:py-20">
        <div className="space-y-8">
          {/* Hero Content */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-wide text-brand mb-4">
                // PLAY. CONNECT. ELEVATE.
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                <span className="text-brand">{"</>"}</span>Sport_Park.play
              </h1>
              <p className="mt-4 text-lg text-foreground/80">
                by_Laksamana_College_of_Business
              </p>
            </div>

            <p className="text-lg text-foreground/70">
              Central Location. Built for <span className="font-semibold text-foreground">_players, _students & _community</span>
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-brand font-bold text-xl mt-1">›</span>
                <div>
                  <p className="font-semibold text-foreground">Pickleball</p>
                  <p className="text-sm text-foreground/60">Fast-paced racquet sport on smaller courts</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-brand font-bold text-xl mt-1">›</span>
                <div>
                  <p className="font-semibold text-foreground">Futsal</p>
                  <p className="text-sm text-foreground/60">Indoor soccer with 5 players per side</p>
                </div>
              </div>
            </div>

            <Link
              href={loggedIn ? "/booking" : "/login"}
              className="inline-block rounded-lg bg-brand px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-blue-700"
            >
              _BOOK NOW →
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Book Section */}
      <section className="container-px mx-auto max-w-[1400px] py-10 lg:py-16">
        <div className="rounded-2xl border border-border bg-background-hover p-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Quick Book Form */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">_QUICK BOOK</h2>
                <p className="mt-2 text-sm text-muted">// Check availability and book instantly</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">SELECT COURT</label>
                  <select className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand">
                    <option>Choose Court Type</option>
                    <option value="pickleball">Pickleball</option>
                    <option value="futsal">Futsal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">DATE</label>
                  <input
                    type="date"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">TIME</label>
                  <input
                    type="time"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                    placeholder="Select Time"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">DURATION</label>
                  <select className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand">
                    <option>1 Hour</option>
                    <option>2 Hours</option>
                    <option>3 Hours</option>
                  </select>
                </div>

                <Link
                  href={loggedIn ? "/booking" : "/login"}
                  className="w-full rounded-lg bg-brand px-4 py-3 text-center font-bold text-white transition-colors hover:bg-blue-700"
                >
                  _CHECK AVAILABILITY
                </Link>
              </div>
            </div>

            {/* Map Section */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold tracking-tight mb-2">_LOCATION</h3>
                <p className="text-sm text-muted mb-4">Jalan Laksamana, Gadong BE3919</p>
              </div>

              {/* Map Image - Clickable */}
              <a
                href="https://www.google.com/maps/search/Jalan+Laksamana+Gadong+BE3919+Bandar+Seri+Begawan+Brunei/@4.5533,114.9158,15z"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block rounded-xl border-2 border-brand/20 overflow-hidden hover:border-brand transition-colors hover:shadow-lg group"
              >
                <img
                  src="/images/sport-park-location.png"
                  alt="Sport Park Location Map"
                  className="w-full h-80 object-cover"
                />

                {/* Overlay with click prompt */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-center">
                    <p className="text-white font-bold text-lg">Click to open in Google Maps</p>
                    <p className="text-white/80 text-sm">Get directions & more info</p>
                  </div>
                </div>
              </a>

              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-xs font-semibold text-muted mb-2">ADDRESS</p>
                <p className="font-semibold text-foreground mb-3">
                  Jalan Laksamana, Gadong BE3919
                </p>
                <p className="text-sm text-muted">
                  Bandar Seri Begawan, Brunei Darussalam
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-px mx-auto max-w-[1400px] py-14 lg:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">_WHY SPORT_PARK</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Everything you need for an amazing sports experience
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: "📍", title: "Central Location", desc: "Easy access from anywhere in Gadong" },
            { icon: "💰", title: "Flexible Pricing", desc: "Affordable rates for all skill levels" },
            { icon: "📅", title: "Easy Booking", desc: "Book courts online in minutes" },
            { icon: "👥", title: "Community", desc: "Join events and meet fellow players" },
            { icon: "🏆", title: "Professional Courts", desc: "Well-maintained facilities" },
            { icon: "⚡", title: "Quick Support", desc: "Responsive customer service" },
          ].map((feature, idx) => (
            <div key={idx} className="rounded-xl border border-border bg-background p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-foreground/70">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-px mx-auto max-w-[1400px] py-14 lg:py-20">
        <div className="rounded-2xl bg-gradient-to-r from-brand to-blue-700 px-8 py-12 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Play?</h2>
          <p className="text-lg text-white/90 mb-6">
            Join the community and book your court today
          </p>
          <Link
            href={loggedIn ? "/booking" : "/login"}
            className="inline-block rounded-lg bg-white px-8 py-3 font-bold text-brand transition-colors hover:bg-gray-100"
          >
            _BOOK A COURT
          </Link>
        </div>
      </section>
    </div>
  );
}
