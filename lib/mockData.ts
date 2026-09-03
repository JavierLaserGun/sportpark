import type { Sport, Court, SlotAvailability, TimeSlot } from "./types";

export const SPORT_LIST: Sport[] = [
  {
    name: "Pickleball",
    slug: "pickleball",
    shortDescription: "Fast-paced racquet sport played on a smaller court",
    pricePerHour: 25,
    image: "pickleball",
  },
  {
    name: "Futsal",
    slug: "futsal",
    shortDescription: "Indoor soccer played on a smaller field with 5 players per side",
    pricePerHour: 60,
    image: "futsal",
  },
];

export const COURTS_DB: Record<string, Court[]> = {
  pickleball: [
    { id: "pb-01", number: 1, name: "Court 1", label: "Court 1", sport: "pickleball" },
    { id: "pb-02", number: 2, name: "Court 2", label: "Court 2", sport: "pickleball" },
    { id: "pb-03", number: 3, name: "Court 3", label: "Court 3", sport: "pickleball" },
    { id: "pb-04", number: 4, name: "Court 4", label: "Court 4", sport: "pickleball" },
  ],
  futsal: [{ id: "futsal-01", number: 1, name: "Court 1", label: "Court 1", sport: "futsal" }],
};

export function getCourtsForSport(sportSlug: string): Court[] {
  return COURTS_DB[sportSlug] || [];
}

export function todayISOInBrunei(): string {
  // Brunei is UTC+8
  const now = new Date();
  const bruneiTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  return bruneiTime.toISOString().split("T")[0];
}

export function formatDateLong(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateShort(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
  });
}

export function addDays(iso: string, days: number): string {
  const date = new Date(`${iso}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().split("T")[0];
}

export function getAvailabilityForDate(
  sportSlug: string,
  date: string,
  bookedKeys: BookedKeySet
): SlotAvailability[] {
  const courts = getCourtsForSport(sportSlug);
  const slots: SlotAvailability[] = [];

  const today = todayISOInBrunei();
  const isToday = date === today;

  // Generate time slots from 08:00 to 21:00
  for (let hour = 8; hour < 22; hour++) {
    const timeStart = `${hour.toString().padStart(2, "0")}:00`;
    const timeEnd = `${(hour + 1).toString().padStart(2, "0")}:00`;

    const courtStatuses = courts.map((court) => {
      const key = bookingKey(court.id, date, timeStart);
      let status: "available" | "booked" | "past" = "available";

      if (bookedKeys.has(key)) {
        status = "booked";
      } else if (isToday) {
        const currentHour = new Date().getHours();
        if (hour <= currentHour) {
          status = "past";
        }
      }

      return { courtId: court.id, status };
    });

    slots.push({
      time: {
        start: timeStart,
        end: timeEnd,
        label: `${formatTime12h(timeStart)} - ${formatTime12h(timeEnd)}`,
      },
      courts: courtStatuses,
    });
  }

  return slots;
}

function formatTime12h(time24: string): string {
  const [h, m] = time24.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
}

export type BookedKeySet = Set<string>;

export function bookingKey(courtId: string, date: string, timeStart: string): string {
  return `${courtId}__${date}__${timeStart}`;
}

export function generateReference(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `BK-${timestamp}-${random}`;
}
