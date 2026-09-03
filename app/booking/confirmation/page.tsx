import { Suspense } from "react";
import BookingConfirmation from "@/components/BookingConfirmation";

export default function BookingConfirmationPage() {
  return (
    <Suspense
      fallback={<div className="container-px mx-auto max-w-[1400px] py-16 text-sm text-muted">Loading…</div>}
    >
      <BookingConfirmation />
    </Suspense>
  );
}
