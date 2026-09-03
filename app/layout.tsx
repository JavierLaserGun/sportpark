import type { Metadata } from "next";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/jetbrains-mono/800.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookingProvider } from "@/lib/bookingContext";
import { AdminProvider } from "@/lib/adminContext";
import { LockingProvider } from "@/lib/lockingContext";

export const metadata: Metadata = {
  title: "SPORT_PARK.play | Laksamana College of Business",
  description:
    "Book indoor Pickleball and Futsal courts at SPORT_PARK.play, Laksamana College of Business. Easy online booking, secure payment, flexible hourly scheduling.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <AdminProvider>
          <BookingProvider>
            <LockingProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </LockingProvider>
          </BookingProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
