"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface AdminUser {
  email: string;
  loggedInAt: number;
}

interface AdminContextType {
  admin: AdminUser | null;
  hydrated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Hardcoded credentials (in production, use proper authentication)
const ADMIN_EMAIL = "javier.pengda@gmail.com";
const ADMIN_PASSWORD = 'Sportpark!"';

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("admin_session");
      if (stored) {
        const parsed = JSON.parse(stored);
        // Check if session is still valid (within 24 hours)
        if (Date.now() - parsed.loggedInAt < 24 * 60 * 60 * 1000) {
          setAdmin(parsed);
        } else {
          localStorage.removeItem("admin_session");
        }
      }
    } catch (e) {
      // Ignore parse errors
    }
    setHydrated(true);
  }, []);

  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser: AdminUser = {
        email,
        loggedInAt: Date.now(),
      };
      setAdmin(adminUser);
      localStorage.setItem("admin_session", JSON.stringify(adminUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("admin_session");
  };

  return (
    <AdminContext.Provider value={{ admin, hydrated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}
