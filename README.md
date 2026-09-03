# Sport Park — By Laksamana College of Business

A production-quality Next.js booking website for Sport Park's two indoor
facilities (Pickleball, Futsal). Built with **Next.js 16 (App Router) +
TypeScript + Tailwind CSS v4**, using mock data structured to drop into a
real API/database later.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # ESLint
```

## What's included

- **Home page** — hero with Quick Book widget, feature columns, court
  cards, "How it works", CTA.
- **Booking flow** — `/booking` (choose sport) → `/booking/[sport]`
  (date + time-slot grid, exactly like the reference design) →
  `/booking/[sport]/details` (review + customer info) →
  `/booking/[sport]/payment` (mock checkout) → `/booking/confirmation`
  (booking reference + summary).
- **Account system** — `/login` (mock, name + email) and `/account`
  (Upcoming Bookings / Booking History / Profile, with a 24-hour
  cancellation policy).
- **Supporting pages** — `/courts`, `/pricing`, `/about`, `/contact`
  (with FAQ, Terms, Privacy, Refund sections).
- Fully responsive: the desktop time-slot table becomes a stacked,
  touch-friendly card list on mobile; the date selector scrolls
  horizontally.

## Project structure

```
app/                      Routes (App Router)
  booking/
    page.tsx              Choose sport
    [sport]/page.tsx       Date + time-slot grid (BookingSchedule)
    [sport]/details/       Review + customer info (BookingReview)
    [sport]/payment/       Mock checkout (BookingPayment)
    confirmation/          Booking confirmed (BookingConfirmation)
  account/, login/         Mock customer account
  courts/, pricing/, about/, contact/
components/                Reusable UI: Navbar, Footer, Hero, QuickBooking,
                            CourtCard, DateSelector, TimeSlotGrid,
                            BookingSummary, BookingForm, BookingConfirmation…
lib/
  types.ts                 Domain types (Sport, Court, Booking, Selection…)
  mockData.ts               Sports/courts/time-slots + deterministic mock
                            availability generator + Brunei-timezone helpers
  bookingContext.tsx        React context that holds the in-progress
                            selection, the logged-in mock account, and all
                            confirmed bookings (persisted to localStorage)
```

## Swapping mock data for a real backend

Everything data-related is isolated in `lib/mockData.ts` and
`lib/bookingContext.tsx`:

- `getAvailabilityForDate(sport, date, bookedKeys)` currently derives a
  deterministic "random" grid from a seeded hash. Replace its body with a
  query against your bookings table, e.g.
  `SELECT court_id, start_time FROM bookings WHERE sport = ? AND date = ?`.
- `BookingProvider.confirmBooking()` is where a real app would call your
  booking API instead of writing to `localStorage`. It already includes
  the application-level guard against double-booking; **for real
  correctness, also add a unique constraint on
  `(court_id, date, start_time)`** in your database and perform the
  insert inside a transaction, since two browser tabs racing each other
  can't be fully guarded against on the client alone.
- Dates are always treated as Brunei local dates (UTC+8, no DST) via the
  helpers at the top of `mockData.ts` — keep that conversion point
  centralized when you wire up a server clock.

## Currency & locale

All prices are in **BND (Brunei Dollar)**, shown as `BND $18.00`. Pickleball
is $18/hour across 4 courts; Futsal is $20/hour on its single court.

## Design system

White background, charcoal text, one royal-blue accent (`--brand` in
`app/globals.css`), JetBrains Mono throughout (self-hosted via
`@fontsource/jetbrains-mono`, no external font requests at runtime), thin
1px borders, minimal custom line-icon set (`components/Icons.tsx`), and
blueprint-style SVG court illustrations (`components/CourtIllustration.tsx`)
instead of stock photography.
