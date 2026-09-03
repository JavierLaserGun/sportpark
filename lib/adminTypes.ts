// Comprehensive admin/back-office types for Sport Park
// Separated from customer-facing types for clarity

import type { SportSlug } from "./types";

// ============================================================================
// CUSTOMER MANAGEMENT
// ============================================================================

export type CustomerType = "NORMAL" | "STUDENT" | "STAFF" | "VIP" | "CORPORATE" | "TOURNAMENT_PLAYER";
export type AccountStatus = "ACTIVE" | "SUSPENDED" | "BLOCKED" | "DELETED";
export type VerificationMethod = "COLLEGE_EMAIL" | "MANUAL" | "PENDING";

export interface CustomerProfile {
  id: string; // Unique customer ID
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth?: string; // YYYY-MM-DD
  gender?: "M" | "F" | "OTHER";

  // Profile image
  profileImageUrl?: string; // Stored securely, not public

  // Account info
  accountStatus: AccountStatus;
  customerType: CustomerType;
  registrationDate: string; // ISO timestamp
  lastLoginDate?: string; // ISO timestamp

  // Discount eligibility
  discountEligible: boolean;
  discountPrograms: string[]; // Program IDs
  discountStatus: "ACTIVE" | "SUSPENDED" | "EXPIRED";
  verificationMethod: VerificationMethod;
  verificationDate?: string;

  // Booking behaviour
  totalBookings: number;
  totalCompletedVisits: number;
  totalAmountSpent: number; // BND
  lastBookingDate?: string;
  lastVisitDate?: string;
  visits30Days: number;
  visits90Days: number;
  favouriteSport?: SportSlug;
  favouriteBookingTime?: string; // "18:00"
  mostFrequentCourt?: string;
  cancellationCount: number;
  noShowCount: number;

  // Risk scoring
  riskScore: number; // 0-100
  riskFlags: RiskFlag[];
  suspiciousBookingCount: number;
}

export type RiskFlagType =
  | "FREQUENT_PRIME_TIME"
  | "MULTIPLE_COURTS_SAME_TIME"
  | "HIGH_NO_SHOW_RATE"
  | "FREQUENT_CANCELLATIONS"
  | "EXTREMELY_HIGH_FREQUENCY"
  | "MULTIPLE_SUSPICIOUS"
  | "BOOKING_RESALE_SUSPECTED";

export interface RiskFlag {
  type: RiskFlagType;
  severity: "LOW" | "MEDIUM" | "HIGH";
  firstDetected: string; // ISO timestamp
  occurrences: number;
  lastOccurrence?: string;
}

// ============================================================================
// BOOKING MANAGEMENT
// ============================================================================

export type InternalSlotStatus =
  | "NOT_RELEASED"
  | "AVAILABLE"
  | "HELD" // During payment checkout
  | "BOOKED"
  | "ADMIN_BLOCK"
  | "MAINTENANCE"
  | "COLLEGE_RESERVED"
  | "EVENT_RESERVED"
  | "CLOSED";

// Customer only sees AVAILABLE or UNAVAILABLE
export type CustomerVisibleStatus = "AVAILABLE" | "UNAVAILABLE";

export interface BookingSlot {
  id: string; // court-date-time composite key
  courtId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // "08:00"
  endTime: string; // "09:00"
  sport: SportSlug;

  // Internal status (what admin sees)
  internalStatus: InternalSlotStatus;

  // Customer visible status
  customerStatus: CustomerVisibleStatus;

  // If blocked, why?
  blockReason?: "MAINTENANCE" | "COLLEGE_RESERVED" | "EVENT_RESERVED" | "TOURNAMENT" | "OTHER";

  // If booked
  bookingId?: string;
  customerId?: string;

  // If held for payment
  heldUntil?: string; // ISO timestamp
  holdToken?: string;

  // Pricing
  standardPrice: number; // BND
  specialPrice?: number; // If event or special pricing

  // Meta
  createdAt: string;
  updatedAt: string;
}

export interface BookingHold {
  id: string;
  customerId: string;
  slotIds: string[]; // Multiple slots if multi-hour
  heldAt: string; // ISO timestamp
  expiresAt: string; // ISO timestamp
  token: string;
  status: "ACTIVE" | "CONVERTED_TO_BOOKING" | "EXPIRED" | "CANCELLED";
}

// ============================================================================
// RELEASE MANAGEMENT
// ============================================================================

export interface BookingReleaseSettings {
  autoReleaseEnabled: boolean;
  releaseDay: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  releaseTime: string; // "18:00"
  bookingPeriodDays: number; // How many days ahead to release
  bookingStartDay: "NEXT_MONDAY" | "SAME_DAY" | "NEXT_DAY";
}

export interface UpcomingRelease {
  id: string;
  scheduledFor: string; // ISO timestamp
  releaseDate: string; // First day of released period (YYYY-MM-DD)
  releaseUntilDate: string; // Last day of released period (YYYY-MM-DD)
  courtsIncluded: CourtReleaseConfig[];
  status: "SCHEDULED" | "RELEASED" | "DELAYED" | "PAUSED";
  preview?: ReleasePreview;
}

export interface CourtReleaseConfig {
  courtId: string;
  releaseAllDayparts: boolean;
  timePartitions?: DayPartition[];
}

export interface DayPartition {
  startTime: string; // "08:00"
  endTime: string; // "18:00"
  releaseType: "PUBLIC_BOOKING" | "COLLEGE_RESERVED" | "DO_NOT_RELEASE";
}

export interface ReleasePreview {
  totalSlotsToRelease: number;
  slotsPerCourt: Record<string, number>;
  specialPricingCount: number;
  blockedSlotCount: number;
  timestamp: string;
}

// ============================================================================
// COURT MANAGEMENT
// ============================================================================

export interface RecurringCourtSchedule {
  id: string;
  courtId: string;

  recurringRules: WeeklyScheduleRule[];
  exceptions: ScheduleException[];

  // Priority: 1 (highest) to 6 (lowest)
  // 1. Specific admin override
  // 2. Existing booking
  // 3. Special event/reservation
  // 4. Recurring schedule
  // 5. Weekly release rule
  // 6. Default availability
}

export interface WeeklyScheduleRule {
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday
  startTime: string; // "08:00"
  endTime: string; // "22:00"
  slotType: "PUBLIC_BOOKING" | "COLLEGE_RESERVED" | "STAFF_ONLY" | "MAINTENANCE" | "CLOSED";
}

export interface ScheduleException {
  id: string;
  date: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  slotType: "PUBLIC_BOOKING" | "COLLEGE_RESERVED" | "BLOCKED" | "MAINTENANCE";
  reason?: string;
  createdBy: string; // Admin ID
  createdAt: string;
}

// ============================================================================
// DISCOUNT MANAGEMENT
// ============================================================================

export type DiscountType = "PERCENTAGE" | "FIXED_BND";
export type DiscountFrequency = "PER_WEEK" | "PER_MONTH" | "UNLIMITED";

export interface DiscountProgram {
  id: string;
  name: string;
  description?: string;
  status: "ACTIVE" | "INACTIVE" | "ARCHIVED";

  // Discount calculation
  discountType: DiscountType;
  discountValue: number; // Either % or BND amount

  // Applicability
  applicableSports: SportSlug[];
  applicableCourts: string[]; // Empty = all courts
  applicableDays: (0 | 1 | 2 | 3 | 4 | 5 | 6)[]; // 0=Sun, 1=Mon, etc
  validTimeStart?: string; // "08:00"
  validTimeEnd?: string; // "18:00"

  // Limits
  maxDiscountedBookingsFrequency: DiscountFrequency;
  maxDiscountedBookingsCount: number; // Max bookings in period
  minimumBookingDurationHours?: number;

  // Date range
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD

  // Meta
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface StudentEmailDomainConfig {
  domain: string; // "@college-domain.com"
  autoVerify: boolean;
  customerType: CustomerType;
  discountProgram: string; // Discount program ID to apply
  status: "ACTIVE" | "INACTIVE";
}

// ============================================================================
// TRANSACTIONS
// ============================================================================

export type PaymentStatus = "PENDING" | "SUCCESSFUL" | "FAILED";
export type RefundStatus = "NONE" | "PENDING" | "SUCCESSFUL" | "FAILED";

export interface Transaction {
  id: string;
  bookingId: string;
  customerId: string;

  // Booking details
  date: string; // Booking date (YYYY-MM-DD)
  courtId: string;
  startTime: string;

  // Pricing
  standardPrice: number; // BND - before discount
  discountAmount: number; // BND
  discountProgram?: string; // Program ID
  finalAmount: number; // BND - after discount

  // Payment
  paymentStatus: PaymentStatus;
  paymentMethod?: string; // "CARD", "CASH", "BANK_TRANSFER"
  paymentGateway?: string;
  transactionReference?: string;
  paidAt?: string; // ISO timestamp

  // Refund
  refundStatus: RefundStatus;
  refundAmount?: number; // BND
  refundReason?: string;
  refundedAt?: string; // ISO timestamp

  // Meta
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// ADMIN ACTIVITY LOG
// ============================================================================

export type AdminAction =
  | "COURT_BLOCKED"
  | "COURT_RELEASED"
  | "RELEASE_SCHEDULE_CHANGED"
  | "BOOKING_CREATED"
  | "BOOKING_CANCELLED"
  | "REFUND_PROCESSED"
  | "CUSTOMER_SUSPENDED"
  | "CUSTOMER_UNSUSPENDED"
  | "DISCOUNT_GIVEN"
  | "DISCOUNT_REMOVED"
  | "PRICE_CHANGED"
  | "PAYMENT_VERIFIED"
  | "RELEASE_DELAYED"
  | "RELEASE_PAUSED"
  | "RELEASE_RESUMED"
  | "CUSTOMER_VERIFIED"
  | "CUSTOMER_DELETED";

export interface AdminActivityLog {
  id: string;
  timestamp: string; // ISO timestamp
  adminId: string; // Admin user ID
  adminEmail: string;

  action: AdminAction;
  target: string; // What was affected (booking ID, customer ID, etc)
  targetType: "BOOKING" | "CUSTOMER" | "COURT" | "RELEASE" | "DISCOUNT" | "TRANSACTION";

  oldValue?: unknown; // JSON serialized
  newValue?: unknown; // JSON serialized

  details?: string; // Human readable description
  ipAddress?: string;
}

// ============================================================================
// DASHBOARD METRICS
// ============================================================================

export interface DashboardMetrics {
  timeframe: "TODAY" | "7_DAYS" | "30_DAYS" | "MONTH" | "CUSTOM";
  dateRange: { startDate: string; endDate: string };

  // Revenue metrics (BND)
  totalRevenue: number;
  totalRevenueBeforeDiscount: number;
  totalDiscountAmount: number;
  averageBookingValue: number;

  // Booking metrics
  totalBookings: number;
  totalCompletedBookings: number;
  totalCancelledBookings: number;
  totalNoShowBookings: number;
  cancellationRate: number; // %
  noShowRate: number; // %

  // Court metrics
  courtUtilisationPercentage: number;
  courtUtilisationByEach: Record<string, number>; // courtId -> %

  // Customer metrics
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  studentCustomers: number;
  activeCustomersThisPeriod: number;

  // Peak times
  peakBookingHours: { hour: string; bookingCount: number }[];
  peakBookingDays: { day: string; bookingCount: number }[];

  // Sport metrics
  bookingsByBySport: Record<SportSlug, number>;
  revenueByBySport: Record<SportSlug, number>;
}

export interface DailyMetrics extends DashboardMetrics {
  date: string; // YYYY-MM-DD
}

// ============================================================================
// ROLE-BASED ACCESS CONTROL
// ============================================================================

export type AdminRole = "ADMIN" | "MANAGER" | "RECEPTION" | "CUSTOMER";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  status: "ACTIVE" | "INACTIVE" | "DELETED";
  lastLoginAt?: string;
  createdAt: string;
}

// ============================================================================
// DETAILED CUSTOMER MANAGEMENT RECORDS
// ============================================================================

export type Gender = "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY";
export type Race = "MALAY" | "CHINESE" | "INDIAN" | "OTHER";

export interface CustomerRecord {
  customerId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // YYYY-MM-DD
  age?: number; // Calculated from DOB
  gender?: Gender;
  race?: Race;
  email: string;
  emailDomain?: string; // Extracted from email (e.g., @gmail.com, @laksamana.edu.bn)
  phone: string;
  profilePhotoUrl?: string;
  registrationDate: string; // ISO timestamp
  accountStatus: "ACTIVE" | "BLOCKED" | "SUSPENDED";
  discountEligible: boolean;
  assignedDiscountId?: string;
  totalBookings: number;
  totalSpent: number; // BND
  lastBookingDate?: string; // ISO timestamp
  mostFrequentFacility?: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export interface DiscountRule {
  discountId: string;
  discountName: string;
  discountType: "PERCENTAGE" | "FIXED_BND";
  discountValue: number; // 10 for 10%, or 5 for BND 5
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  active: boolean;
  usageLimit?: number; // Max customers who can use this discount
  description?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string; // Admin ID
}

export interface CustomerBooking {
  bookingId: string;
  customerId: string;
  date: string; // YYYY-MM-DD
  facility: string; // "Pickleball" or "Futsal"
  court: string; // "Court 1", "Court 2", etc
  startTime: string; // "19:00"
  endTime: string; // "21:00"
  priceBeforeDiscount: number; // BND
  discountPercentage?: number; // 10 for 10%
  discountAmount?: number; // BND amount deducted
  finalAmount: number; // BND
  bookingStatus: "COMPLETED" | "CANCELLED" | "NO_SHOW" | "PENDING";
  createdAt: string;
  updatedAt: string;
}

export interface BulkDiscountAction {
  selectedCustomerIds: string[];
  actionType: "ASSIGN_DISCOUNT" | "REMOVE_DISCOUNT";
  discountId?: string;
  appliedAt?: string;
  appliedBy?: string; // Admin ID
  totalCustomersAffected: number;
}

export const RolePermissions: Record<AdminRole, Set<string>> = {
  ADMIN: new Set([
    // Full access
    "view_dashboard",
    "manage_customers",
    "manage_bookings",
    "manage_courts",
    "manage_releases",
    "manage_discounts",
    "manage_transactions",
    "view_activity_log",
    "manage_users",
    "manage_settings",
    "export_data",
  ]),
  MANAGER: new Set([
    "view_dashboard",
    "manage_customers",
    "manage_bookings",
    "manage_courts",
    "view_releases",
    "manage_discounts",
    "view_transactions",
    "view_activity_log",
  ]),
  RECEPTION: new Set([
    "view_dashboard",
    "view_customers",
    "check_in_booking",
    "view_bookings",
    "view_transactions",
  ]),
  CUSTOMER: new Set([
    "view_own_bookings",
    "view_own_profile",
  ]),
};
