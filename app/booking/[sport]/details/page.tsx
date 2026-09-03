"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircleIcon, CloseIcon } from "@/components/Icons";
import { formatDateLong, SPORT_LIST } from "@/lib/mockData";
import { useBooking } from "@/lib/bookingContext";

type PaymentMethod = "visa" | "credit";

export function generateStaticParams() {
  return SPORT_LIST.map((sport) => ({ sport: sport.slug }));
}

export default function CheckoutDetailsPage() {
  const router = useRouter();
  const { account, cart, clearCart, hydrated, confirmMultipleBookings } = useBooking();
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("visa");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (hydrated && !account) {
      router.push("/login");
    }
  }, [hydrated, account, router]);

  // Redirect if no items in cart
  useEffect(() => {
    if (hydrated && cart.length === 0) {
      router.push("/booking");
    }
  }, [hydrated, cart, router]);

  const totalPrice = cart.reduce((sum, item) => sum + item.pricePerHour * item.durationHours, 0);

  const handlePayment = async () => {
    if (!agreeToTerms) {
      alert("Please agree to the Terms and Conditions to proceed");
      return;
    }

    if (!account) return;

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Confirm the bookings with customer info
      confirmMultipleBookings({
        fullName: account.fullName,
        email: account.email,
        phone: "",
      });

      setIsProcessing(false);
      setPaymentSuccess(true);

      // Clear cart and redirect after 2 seconds
      setTimeout(() => {
        router.push("/account");
      }, 2000);
    }, 2000);
  };

  if (!hydrated || !account || cart.length === 0) {
    return (
      <div className="container-px mx-auto max-w-[1400px] py-14 lg:py-20">
        <p className="text-center text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container-px mx-auto max-w-2xl py-10 lg:py-12">
      {/* Success State */}
      {paymentSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="rounded-xl border border-green-200 bg-white p-8 shadow-lg text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-green-900">Payment Successful!</h2>
            <p className="mt-2 text-sm text-green-700">Your booking has been confirmed. Redirecting...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div>
        <p className="text-xs font-semibold tracking-wide text-brand">
          _BOOKING {">"} CHECKOUT
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          ORDER CONFIRMATION
        </h1>
        <p className="mt-2 text-sm text-muted">Review your booking details and complete the payment</p>
      </div>

      {/* Main Content */}
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border p-6">
            <h2 className="text-lg font-bold mb-6">BOOKING DETAILS</h2>

            {/* Booked Items */}
            <div className="space-y-4">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 rounded-lg border border-border p-4 bg-background-hover">
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">
                      Court {item.courtNumber} - {item.sport.toUpperCase()}
                    </p>
                    <p className="text-sm text-muted mt-1">{formatDateLong(item.date)}</p>
                    <p className="text-sm text-muted">
                      {formatTimeRange(item)} ({item.durationHours} Hour{item.durationHours > 1 ? "s" : ""})
                    </p>
                    <p className="mt-2 font-bold text-brand">
                      BND ${(item.pricePerHour * item.durationHours).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="mt-6 border-t border-border pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-medium">BND ${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Taxes & Fees</span>
                  <span className="font-medium">BND $0.00</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border text-lg font-bold">
                  <span>Total</span>
                  <span className="text-brand">BND ${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Sidebar */}
        <div className="space-y-4">
          {/* Payment Method */}
          <div className="rounded-xl border border-border p-6">
            <h3 className="text-sm font-bold mb-4 tracking-wide">PAYMENT METHOD</h3>

            <div className="space-y-3">
              <label className="flex items-center p-3 rounded-lg border border-border cursor-pointer hover:bg-background-hover transition-colors" style={{borderColor: paymentMethod === "visa" ? "rgb(var(--color-brand))" : undefined}}>
                <input
                  type="radio"
                  name="payment"
                  value="visa"
                  checked={paymentMethod === "visa"}
                  onChange={() => setPaymentMethod("visa")}
                  className="rounded"
                />
                <div className="ml-3 flex-1">
                  <p className="text-sm font-semibold text-foreground">Visa Card</p>
                  <p className="text-xs text-muted">**** **** **** 4242</p>
                </div>
              </label>

              <label className="flex items-center p-3 rounded-lg border border-border cursor-pointer hover:bg-background-hover transition-colors" style={{borderColor: paymentMethod === "credit" ? "rgb(var(--color-brand))" : undefined}}>
                <input
                  type="radio"
                  name="payment"
                  value="credit"
                  checked={paymentMethod === "credit"}
                  onChange={() => setPaymentMethod("credit")}
                  className="rounded"
                />
                <div className="ml-3 flex-1">
                  <p className="text-sm font-semibold text-foreground">Credit Card</p>
                  <p className="text-xs text-muted">**** **** **** 5555</p>
                </div>
              </label>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="rounded-xl border border-border p-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mt-1 rounded"
              />
              <div className="flex-1">
                <p className="text-xs text-muted">
                  I agree to the{" "}
                  <Link href="/terms" target="_blank" className="text-brand font-semibold hover:underline">
                    Terms & Conditions
                  </Link>
                  {" "}and understand the{" "}
                  <Link href="/terms" target="_blank" className="text-brand font-semibold hover:underline">
                    cancellation policy
                  </Link>
                </p>
              </div>
            </label>
          </div>

          {/* Pay Now Button */}
          <button
            onClick={handlePayment}
            disabled={!agreeToTerms || isProcessing}
            className="w-full rounded-lg bg-brand py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isProcessing ? "PROCESSING..." : "PAY NOW"}
          </button>

          {/* Back Link */}
          <Link
            href="/booking"
            className="w-full rounded-lg border border-border py-3 text-sm font-bold text-foreground text-center transition-colors hover:bg-background-hover"
          >
            BACK TO BOOKING
          </Link>
        </div>
      </div>
    </div>
  );
}

function formatTimeRange(item: any) {
  return `${to12h(item.time.start)} – ${to12h(addHours(item.time.start, item.durationHours))}`;
}

function to12h(time24: string) {
  const [h, m] = time24.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
}

function addHours(time24: string, hours: number) {
  const [h, m] = time24.split(":").map(Number);
  const total = h + hours;
  return `${total.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}
