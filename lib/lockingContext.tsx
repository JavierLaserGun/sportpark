"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type LockReason = "PRIVATE_EVENT" | "LEAGUE" | "TOURNAMENT" | "MAINTENANCE" | "COLLEGE_EVENT" | "MANAGEMENT_HOLD" | "OTHER";
export type SportType = "pickleball" | "futsal";

export interface TimeSlot {
  date: string; // YYYY-MM-DD
  startTime: string; // HH:00
  endTime: string; // HH:00
}

export interface CourtLock {
  id: string;
  courts: string[]; // e.g., ["pb-01", "pb-02", "futsal-01"]
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  daysOfWeek: number[]; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:00
  endTime: string; // HH:00
  reason: LockReason;
  createdAt: Date;
  isPaused: boolean;
}

export interface IndividualSlotLock {
  id: string;
  court: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:00
  endTime: string; // HH:00
  reason: LockReason;
  createdAt: Date;
}

interface LockingContextType {
  // Recurring locks (rules)
  recurringLocks: CourtLock[];
  addRecurringLock: (lock: Omit<CourtLock, "id" | "createdAt">) => void;
  updateRecurringLock: (id: string, lock: Partial<CourtLock>) => void;
  deleteRecurringLock: (id: string) => void;
  pauseRecurringLock: (id: string) => void;

  // Individual slot locks
  individualLocks: IndividualSlotLock[];
  lockSlot: (court: string, date: string, startTime: string, endTime: string, reason: LockReason) => void;
  unlockSlot: (id: string) => void;

  // Check if a slot is locked
  isSlotLocked: (court: string, date: string, time: string) => boolean;
  getSlotLockReason: (court: string, date: string, time: string) => LockReason | null;

  // Bulk operations
  bulkLock: (courts: string[], startDate: string, endDate: string, daysOfWeek: number[], startTime: string, endTime: string, reason: LockReason) => void;
}

const LockingContext = createContext<LockingContextType | undefined>(undefined);

export function LockingProvider({ children }: { children: React.ReactNode }) {
  const [recurringLocks, setRecurringLocks] = useState<CourtLock[]>([]);
  const [individualLocks, setIndividualLocks] = useState<IndividualSlotLock[]>([]);

  const addRecurringLock = useCallback((lock: Omit<CourtLock, "id" | "createdAt">) => {
    const newLock: CourtLock = {
      ...lock,
      id: `recurring-${Date.now()}`,
      createdAt: new Date(),
    };
    setRecurringLocks((prev) => [...prev, newLock]);
  }, []);

  const updateRecurringLock = useCallback((id: string, updates: Partial<CourtLock>) => {
    setRecurringLocks((prev) =>
      prev.map((lock) => (lock.id === id ? { ...lock, ...updates } : lock))
    );
  }, []);

  const deleteRecurringLock = useCallback((id: string) => {
    setRecurringLocks((prev) => prev.filter((lock) => lock.id !== id));
  }, []);

  const pauseRecurringLock = useCallback((id: string) => {
    updateRecurringLock(id, { isPaused: true });
  }, [updateRecurringLock]);

  const lockSlot = useCallback(
    (court: string, date: string, startTime: string, endTime: string, reason: LockReason) => {
      const newLock: IndividualSlotLock = {
        id: `slot-${Date.now()}`,
        court,
        date,
        startTime,
        endTime,
        reason,
        createdAt: new Date(),
      };
      setIndividualLocks((prev) => [...prev, newLock]);
    },
    []
  );

  const unlockSlot = useCallback((id: string) => {
    setIndividualLocks((prev) => prev.filter((lock) => lock.id !== id));
  }, []);

  const isSlotLocked = useCallback(
    (court: string, date: string, time: string) => {
      // Check individual locks
      const hasIndividualLock = individualLocks.some(
        (lock) =>
          lock.court === court &&
          lock.date === date &&
          lock.startTime <= time &&
          time < lock.endTime
      );

      if (hasIndividualLock) return true;

      // Check recurring locks
      const slotDate = new Date(date);
      const dayOfWeek = slotDate.getDay();

      const hasRecurringLock = recurringLocks.some((lock) => {
        if (lock.isPaused) return false;
        if (!lock.courts.includes(court)) return false;
        if (date < lock.startDate || date > lock.endDate) return false;
        if (!lock.daysOfWeek.includes(dayOfWeek)) return false;
        if (lock.startTime <= time && time < lock.endTime) return true;
        return false;
      });

      return hasRecurringLock;
    },
    [individualLocks, recurringLocks]
  );

  const getSlotLockReason = useCallback(
    (court: string, date: string, time: string) => {
      // Check individual locks first
      const individualLock = individualLocks.find(
        (lock) =>
          lock.court === court &&
          lock.date === date &&
          lock.startTime <= time &&
          time < lock.endTime
      );
      if (individualLock) return individualLock.reason;

      // Check recurring locks
      const slotDate = new Date(date);
      const dayOfWeek = slotDate.getDay();

      const recurringLock = recurringLocks.find((lock) => {
        if (lock.isPaused) return false;
        if (!lock.courts.includes(court)) return false;
        if (date < lock.startDate || date > lock.endDate) return false;
        if (!lock.daysOfWeek.includes(dayOfWeek)) return false;
        if (lock.startTime <= time && time < lock.endTime) return true;
        return false;
      });

      return recurringLock?.reason || null;
    },
    [individualLocks, recurringLocks]
  );

  const bulkLock = useCallback(
    (
      courts: string[],
      startDate: string,
      endDate: string,
      daysOfWeek: number[],
      startTime: string,
      endTime: string,
      reason: LockReason
    ) => {
      addRecurringLock({
        courts,
        startDate,
        endDate,
        daysOfWeek,
        startTime,
        endTime,
        reason,
        isPaused: false,
      });
    },
    [addRecurringLock]
  );

  return (
    <LockingContext.Provider
      value={{
        recurringLocks,
        addRecurringLock,
        updateRecurringLock,
        deleteRecurringLock,
        pauseRecurringLock,
        individualLocks,
        lockSlot,
        unlockSlot,
        isSlotLocked,
        getSlotLockReason,
        bulkLock,
      }}
    >
      {children}
    </LockingContext.Provider>
  );
}

export function useLocking() {
  const context = useContext(LockingContext);
  if (context === undefined) {
    throw new Error("useLocking must be used within a LockingProvider");
  }
  return context;
}
