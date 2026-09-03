"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Booking, CustomerInfo, Selection } from "./types";
import { bookingKey, generateReference, type BookedKeySet } from "./mockData";

interface CustomerAccount {
  fullName: string;
  email: string;
}

interface BookingContextValue {
  selection: Selection | null;
  setSelection: (s: Selection | null) => void;
  cart: Selection[];
  addToCart: (s: Selection) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  pendingCustomer: CustomerInfo | null;
  setPendingCustomer: (c: CustomerInfo | null) => void;
  bookings: Booking[];
  confirmBooking: (customer: CustomerInfo) => Booking | null;
  confirmMultipleBookings: (customer: CustomerInfo) => Booking[];
  cancelBooking: (reference: string) => void;
  bookedKeys: BookedKeySet;
  account: CustomerAccount | null;
  login: (account: CustomerAccount) => void;
  logout: () => void;
  hydrated: boolean;
}

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

const LS_SELECTION = "sportpark.selection";
const LS_CART = "sportpark.cart";
const LS_CUSTOMER = "sportpark.pendingCustomer";
const LS_BOOKINGS = "sportpark.bookings";
const LS_ACCOUNT = "sportpark.account";

function readLS<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeLS<T>(key: string, value: T | null) {
  if (typeof window === "undefined") return;
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage unavailable
  }
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [selection, setSelectionState] = useState<Selection | null>(null);
  const [cart, setCartState] = useState<Selection[]>([]);
  const [pendingCustomer, setPendingCustomerState] = useState<CustomerInfo | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [account, setAccount] = useState<CustomerAccount | null>(null);

  useEffect(() => {
    setSelectionState(readLS<Selection>(LS_SELECTION));
    setCartState(readLS<Selection[]>(LS_CART) ?? []);
    setPendingCustomerState(readLS<CustomerInfo>(LS_CUSTOMER));
    setBookings(readLS<Booking[]>(LS_BOOKINGS) ?? []);
    setAccount(readLS<CustomerAccount>(LS_ACCOUNT));
    setHydrated(true);
  }, []);

  const setSelection = useCallback((s: Selection | null) => {
    setSelectionState(s);
    writeLS(LS_SELECTION, s);
  }, []);

  const addToCart = useCallback((s: Selection) => {
    setCartState((prev) => {
      const next = [...prev, s];
      writeLS(LS_CART, next);
      return next;
    });
  }, []);

  const removeFromCart = useCallback((index: number) => {
    setCartState((prev) => {
      const next = prev.filter((_, i) => i !== index);
      writeLS(LS_CART, next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartState([]);
    writeLS(LS_CART, null);
  }, []);

  const setPendingCustomer = useCallback((c: CustomerInfo | null) => {
    setPendingCustomerState(c);
    writeLS(LS_CUSTOMER, c);
  }, []);

  const bookedKeys = useMemo<BookedKeySet>(() => {
    const set = new Set<string>();
    for (const b of bookings) {
      if (b.status !== "cancelled") {
        set.add(bookingKey(b.courtId, b.date, b.time.start));
      }
    }
    return set;
  }, [bookings]);

  const confirmBooking = useCallback(
    (customer: CustomerInfo): Booking | null => {
      if (!selection) return null;
      const key = bookingKey(selection.courtId, selection.date, selection.time.start);
      const alreadyTaken = bookings.some(
        (b) => b.status !== "cancelled" && bookingKey(b.courtId, b.date, b.time.start) === key
      );
      if (alreadyTaken) return null;

      const booking: Booking = {
        reference: generateReference(),
        sport: selection.sport,
        courtId: selection.courtId,
        courtNumber: selection.courtNumber,
        date: selection.date,
        time: selection.time,
        durationHours: selection.durationHours,
        pricePerHour: selection.pricePerHour,
        total: selection.pricePerHour * selection.durationHours,
        currency: "BND",
        customer,
        createdAt: new Date().toISOString(),
        status: "confirmed",
      };
      const next = [booking, ...bookings];
      setBookings(next);
      writeLS(LS_BOOKINGS, next);
      setPendingCustomer(customer);
      return booking;
    },
    [selection, bookings, setPendingCustomer]
  );

  const confirmMultipleBookings = useCallback(
    (customer: CustomerInfo): Booking[] => {
      const confirmed: Booking[] = [];

      for (const sel of cart) {
        const key = bookingKey(sel.courtId, sel.date, sel.time.start);
        const alreadyTaken = bookings.some(
          (b) => b.status !== "cancelled" && bookingKey(b.courtId, b.date, b.time.start) === key
        );
        if (alreadyTaken) continue;

        const booking: Booking = {
          reference: generateReference(),
          sport: sel.sport,
          courtId: sel.courtId,
          courtNumber: sel.courtNumber,
          date: sel.date,
          time: sel.time,
          durationHours: sel.durationHours,
          pricePerHour: sel.pricePerHour,
          total: sel.pricePerHour * sel.durationHours,
          currency: "BND",
          customer,
          createdAt: new Date().toISOString(),
          status: "confirmed",
        };
        confirmed.push(booking);
      }

      if (confirmed.length > 0) {
        const next = [...confirmed, ...bookings];
        setBookings(next);
        writeLS(LS_BOOKINGS, next);
        setPendingCustomer(customer);
        clearCart();
      }

      return confirmed;
    },
    [cart, bookings, setPendingCustomer, clearCart]
  );

  const cancelBooking = useCallback(
    (reference: string) => {
      const next = bookings.map((b) =>
        b.reference === reference ? { ...b, status: "cancelled" as const } : b
      );
      setBookings(next);
      writeLS(LS_BOOKINGS, next);
    },
    [bookings]
  );

  const login = useCallback((acc: CustomerAccount) => {
    setAccount(acc);
    writeLS(LS_ACCOUNT, acc);
  }, []);

  const logout = useCallback(() => {
    setAccount(null);
    writeLS(LS_ACCOUNT, null);
  }, []);

  const value: BookingContextValue = {
    selection,
    setSelection,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    pendingCustomer,
    setPendingCustomer,
    bookings,
    confirmBooking,
    confirmMultipleBookings,
    cancelBooking,
    bookedKeys,
    account,
    login,
    logout,
    hydrated,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}