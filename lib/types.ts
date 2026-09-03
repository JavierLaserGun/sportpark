export interface Sport {
  name: string;
  slug: string;
  shortDescription: string;
  pricePerHour: number;
  image: "pickleball" | "futsal";
}

export interface Court {
  id: string;
  number: number;
  name: string;
  label: string;
  sport: string;
}

export interface TimeSlot {
  start: string;
  end: string;
  label: string;
}

export interface SlotAvailability {
  time: TimeSlot;
  courts: Array<{
    courtId: string;
    status: "available" | "booked" | "selected" | "past";
  }>;
}

export interface Selection {
  sport: string;
  courtId: string;
  courtNumber: number;
  date: string;
  time: TimeSlot;
  durationHours: number;
  pricePerHour: number;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface Booking {
  reference: string;
  sport: string;
  courtId: string;
  courtNumber: number;
  date: string;
  time: TimeSlot;
  durationHours: number;
  pricePerHour: number;
  total: number;
  currency: string;
  customer: CustomerInfo;
  createdAt: string;
  status: "confirmed" | "completed" | "cancelled";
}
