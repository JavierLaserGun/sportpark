"use client";

import { useState, useMemo } from "react";
import type { CustomerRecord, DiscountRule, CustomerBooking } from "@/lib/adminTypes";

// Mock data
const MOCK_CUSTOMERS: CustomerRecord[] = [
  {
    customerId: "cust-001",
    firstName: "Aiman",
    lastName: "Hakimi",
    dateOfBirth: "2004-03-15",
    age: 20,
    gender: "MALE",
    race: "MALAY",
    email: "aiman.hakimi@laksamana.edu.bn",
    emailDomain: "@laksamana.edu.bn",
    phone: "+673-8123-4567",
    profilePhotoUrl: undefined,
    registrationDate: "2024-01-10T10:00:00Z",
    accountStatus: "ACTIVE",
    discountEligible: true,
    assignedDiscountId: "disc-001",
    totalBookings: 12,
    totalSpent: 216,
    lastBookingDate: "2024-08-20T19:00:00Z",
    mostFrequentFacility: "Pickleball",
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-08-20T19:00:00Z",
  },
  {
    customerId: "cust-002",
    firstName: "Mikael",
    lastName: "Lee",
    dateOfBirth: "2002-07-22",
    age: 22,
    gender: "MALE",
    race: "CHINESE",
    email: "mikael.lee@gmail.com",
    emailDomain: "@gmail.com",
    phone: "+673-8234-5678",
    registrationDate: "2024-02-15T14:30:00Z",
    accountStatus: "ACTIVE",
    discountEligible: false,
    totalBookings: 8,
    totalSpent: 160,
    lastBookingDate: "2024-08-18T18:00:00Z",
    mostFrequentFacility: "Futsal",
    createdAt: "2024-02-15T14:30:00Z",
    updatedAt: "2024-08-18T18:00:00Z",
  },
  {
    customerId: "cust-003",
    firstName: "Nurul",
    lastName: "Aziz",
    dateOfBirth: "2003-11-08",
    age: 20,
    gender: "FEMALE",
    race: "MALAY",
    email: "nurul.aziz@lcb.edu.bn",
    emailDomain: "@lcb.edu.bn",
    phone: "+673-8345-6789",
    registrationDate: "2024-01-20T09:15:00Z",
    accountStatus: "ACTIVE",
    discountEligible: true,
    assignedDiscountId: "disc-001",
    totalBookings: 18,
    totalSpent: 324,
    lastBookingDate: "2024-08-21T19:30:00Z",
    mostFrequentFacility: "Pickleball",
    createdAt: "2024-01-20T09:15:00Z",
    updatedAt: "2024-08-21T19:30:00Z",
  },
  {
    customerId: "cust-004",
    firstName: "David",
    lastName: "Wong",
    dateOfBirth: "1995-05-30",
    age: 29,
    gender: "MALE",
    race: "CHINESE",
    email: "david.wong@outlook.com",
    emailDomain: "@outlook.com",
    phone: "+673-8456-7890",
    registrationDate: "2023-06-10T11:00:00Z",
    accountStatus: "ACTIVE",
    discountEligible: false,
    totalBookings: 35,
    totalSpent: 700,
    lastBookingDate: "2024-08-22T20:00:00Z",
    mostFrequentFacility: "Futsal",
    createdAt: "2023-06-10T11:00:00Z",
    updatedAt: "2024-08-22T20:00:00Z",
  },
  {
    customerId: "cust-005",
    firstName: "Priya",
    lastName: "Sharma",
    dateOfBirth: "1998-02-14",
    age: 26,
    gender: "FEMALE",
    race: "INDIAN",
    email: "priya.sharma@gmail.com",
    emailDomain: "@gmail.com",
    phone: "+673-8567-8901",
    registrationDate: "2024-03-05T15:45:00Z",
    accountStatus: "ACTIVE",
    discountEligible: false,
    totalBookings: 22,
    totalSpent: 440,
    lastBookingDate: "2024-08-19T18:30:00Z",
    mostFrequentFacility: "Pickleball",
    createdAt: "2024-03-05T15:45:00Z",
    updatedAt: "2024-08-19T18:30:00Z",
  },
  {
    customerId: "cust-006",
    firstName: "Siti",
    lastName: "Aminah",
    dateOfBirth: "2000-09-25",
    age: 23,
    gender: "FEMALE",
    race: "MALAY",
    email: "siti.aminah@laksamana.edu.bn",
    emailDomain: "@laksamana.edu.bn",
    phone: "+673-8678-9012",
    registrationDate: "2024-04-12T13:20:00Z",
    accountStatus: "ACTIVE",
    discountEligible: true,
    assignedDiscountId: "disc-001",
    totalBookings: 15,
    totalSpent: 270,
    lastBookingDate: "2024-08-21T17:00:00Z",
    mostFrequentFacility: "Pickleball",
    createdAt: "2024-04-12T13:20:00Z",
    updatedAt: "2024-08-21T17:00:00Z",
  },
];

const MOCK_DISCOUNTS: DiscountRule[] = [
  {
    discountId: "disc-001",
    discountName: "Student Discount",
    discountType: "PERCENTAGE",
    discountValue: 10,
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    active: true,
    usageLimit: undefined,
    description: "10% off for students with valid college email",
    createdAt: "2023-12-15T10:00:00Z",
    updatedAt: "2023-12-15T10:00:00Z",
    createdBy: "admin-001",
  },
  {
    discountId: "disc-002",
    discountName: "Staff Rate",
    discountType: "PERCENTAGE",
    discountValue: 15,
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    active: true,
    usageLimit: undefined,
    description: "15% off for staff members",
    createdAt: "2023-12-15T10:00:00Z",
    updatedAt: "2023-12-15T10:00:00Z",
    createdBy: "admin-001",
  },
];

const MOCK_BOOKINGS: Record<string, CustomerBooking[]> = {
  "cust-001": [
    {
      bookingId: "book-101",
      customerId: "cust-001",
      date: "2024-08-20",
      facility: "Pickleball",
      court: "Court 1",
      startTime: "19:00",
      endTime: "20:00",
      priceBeforeDiscount: 18,
      discountPercentage: 10,
      discountAmount: 1.8,
      finalAmount: 16.2,
      bookingStatus: "COMPLETED",
      createdAt: "2024-08-20T19:00:00Z",
      updatedAt: "2024-08-20T19:00:00Z",
    },
  ],
  "cust-003": [
    {
      bookingId: "book-201",
      customerId: "cust-003",
      date: "2024-08-21",
      facility: "Pickleball",
      court: "Court 2",
      startTime: "19:30",
      endTime: "20:30",
      priceBeforeDiscount: 18,
      discountPercentage: 10,
      discountAmount: 1.8,
      finalAmount: 16.2,
      bookingStatus: "COMPLETED",
      createdAt: "2024-08-21T19:30:00Z",
      updatedAt: "2024-08-21T19:30:00Z",
    },
  ],
};

function CustomerProfileDrawer({
  customer,
  isOpen,
  onClose,
}: {
  customer: CustomerRecord | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectedDiscountId, setSelectedDiscountId] = useState<string | null>(customer?.assignedDiscountId ?? null);
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen || !customer) return null;

  const bookings = MOCK_BOOKINGS[customer.customerId] || [];
  const assignedDiscount = MOCK_DISCOUNTS.find((d) => d.discountId === customer.assignedDiscountId);
  const selectedDiscount = selectedDiscountId ? MOCK_DISCOUNTS.find((d) => d.discountId === selectedDiscountId) : null;

  const handleSaveDiscount = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    alert(`_DISCOUNT UPDATED: ${selectedDiscount?.discountName || 'None'}`);
    setIsSaving(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md overflow-y-auto border-l border-border bg-background">
        {/* Header */}
        <div className="sticky top-0 border-b border-border bg-background px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">_CUSTOMER PROFILE</h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-foreground"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Avatar & Name */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-brand/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-brand">
                {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-lg font-bold">{customer.firstName} {customer.lastName}</p>
              <p className="text-xs text-muted">// {customer.customerId}</p>
            </div>
          </div>

          {/* Basic Info */}
          <div className="border-t border-border pt-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted font-medium">Gender</p>
                <p className="text-sm font-medium text-foreground">{customer.gender}</p>
              </div>
              <div>
                <p className="text-xs text-muted font-medium">Race</p>
                <p className="text-sm font-medium text-foreground">{customer.race}</p>
              </div>
              <div>
                <p className="text-xs text-muted font-medium">Age</p>
                <p className="text-sm font-medium text-foreground">{customer.age}</p>
              </div>
              <div>
                <p className="text-xs text-muted font-medium">DOB</p>
                <p className="text-sm font-medium text-foreground">{customer.dateOfBirth}</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t border-border pt-4 space-y-3">
            <div>
              <p className="text-xs text-muted font-medium">Email</p>
              <p className="text-sm font-medium text-foreground break-all">{customer.email}</p>
            </div>
            <div>
              <p className="text-xs text-muted font-medium">Phone</p>
              <p className="text-sm font-medium text-foreground">{customer.phone}</p>
            </div>
          </div>

          {/* Membership Info */}
          <div className="border-t border-border pt-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted font-medium">Joined</p>
                <p className="text-sm font-medium text-foreground">{customer.registrationDate.split("T")[0]}</p>
              </div>
              <div>
                <p className="text-xs text-muted font-medium">Status</p>
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  customer.accountStatus === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {customer.accountStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Booking Stats */}
          <div className="border-t border-border pt-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted font-medium">Total Bookings</p>
                <p className="text-xl font-bold text-brand">{customer.totalBookings}</p>
              </div>
              <div>
                <p className="text-xs text-muted font-medium">Total Spent</p>
                <p className="text-xl font-bold text-brand">BND {customer.totalSpent}</p>
              </div>
            </div>
          </div>

          {/* Discount Management */}
          <div className="border-t border-border pt-4 space-y-4">
            <div>
              <p className="text-xs text-muted font-medium mb-3">DISCOUNT ELIGIBILITY</p>
              <div className="space-y-2">
                {MOCK_DISCOUNTS.map((discount) => (
                  <label key={discount.discountId} className="flex items-center gap-3 p-3 rounded-md border border-border cursor-pointer hover:bg-background-hover transition-colors">
                    <input
                      type="radio"
                      name="discount"
                      value={discount.discountId}
                      checked={selectedDiscountId === discount.discountId}
                      onChange={() => setSelectedDiscountId(discount.discountId)}
                      className="rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{discount.discountName}</p>
                      <p className="text-xs text-muted">{discount.discountValue}% off • {discount.description}</p>
                    </div>
                  </label>
                ))}
                <label className="flex items-center gap-3 p-3 rounded-md border border-border cursor-pointer hover:bg-background-hover transition-colors">
                  <input
                    type="radio"
                    name="discount"
                    value=""
                    checked={selectedDiscountId === null}
                    onChange={() => setSelectedDiscountId(null)}
                    className="rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">No Discount</p>
                    <p className="text-xs text-muted">Customer is not eligible</p>
                  </div>
                </label>
              </div>
            </div>

            {selectedDiscountId !== customer.assignedDiscountId && (
              <button
                onClick={handleSaveDiscount}
                disabled={isSaving}
                className="w-full rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-50"
              >
                {isSaving ? "_SAVING..." : "_SAVE DISCOUNT"}
              </button>
            )}
          </div>

          {/* Recent Bookings */}
          {bookings.length > 0 && (
            <div className="border-t border-border pt-4 space-y-3">
              <p className="text-xs text-muted font-medium">RECENT BOOKINGS</p>
              <div className="space-y-2">
                {bookings.map((booking) => (
                  <div key={booking.bookingId} className="rounded-md border border-border p-3">
                    <p className="text-sm font-medium text-foreground">{booking.facility}</p>
                    <p className="text-xs text-muted">{booking.date} • {booking.startTime}–{booking.endTime}</p>
                    <p className="text-xs text-brand mt-1">BND {booking.finalAmount}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function AdminCustomerManagement() {
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRecord | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) =>
      `${c.firstName} ${c.lastName} ${c.email}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customers, searchTerm]);

  const handleViewCustomer = (customer: CustomerRecord) => {
    setSelectedCustomer(customer);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedCustomer(null);
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-background-hover">
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted">NAME</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted">EMAIL</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted">BOOKINGS</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted">DISCOUNT</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.customerId} className="border-b border-border hover:bg-background-hover/50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-foreground">{customer.firstName} {customer.lastName}</td>
                <td className="px-4 py-3 text-sm text-muted">{customer.email}</td>
                <td className="px-4 py-3 text-sm font-medium text-foreground">{customer.totalBookings}</td>
                <td className="px-4 py-3 text-sm">
                  {customer.discountEligible ? (
                    <span className="inline-block px-2.5 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                      {customer.assignedDiscountId ? "✓ Eligible" : "○ None"}
                    </span>
                  ) : (
                    <span className="inline-block px-2.5 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                      ✗ Not Eligible
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm">
                  <button
                    onClick={() => handleViewCustomer(customer)}
                    className="text-brand hover:underline text-xs font-medium"
                  >
                    _VIEW
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Drawer */}
      <CustomerProfileDrawer
        customer={selectedCustomer}
        isOpen={drawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}
