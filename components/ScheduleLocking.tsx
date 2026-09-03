"use client";

import { useState, useMemo } from "react";
import { useLocking, type LockReason } from "@/lib/lockingContext";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

const COURTS = [
  { id: "pb-01", name: "Pickleball 01", sport: "pickleball", icon: "🎾" },
  { id: "pb-02", name: "Pickleball 02", sport: "pickleball", icon: "🎾" },
  { id: "pb-03", name: "Pickleball 03", sport: "pickleball", icon: "🎾" },
  { id: "pb-04", name: "Pickleball 04", sport: "pickleball", icon: "🎾" },
  { id: "futsal-01", name: "Futsal 01", sport: "futsal", icon: "⚽" },
];

const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);
const LOCK_REASONS: LockReason[] = ["PRIVATE_EVENT", "LEAGUE", "TOURNAMENT", "MAINTENANCE", "COLLEGE_EVENT", "MANAGEMENT_HOLD", "OTHER"];

interface ReleaseSchedule {
  id: string;
  courts: string[];
  startDate: string;
  endDate: string;
  selectedDays: number[];
  startTime: string;
  endTime: string;
  createdAt: string;
}

export default function ScheduleLocking() {
  const { isSlotLocked, lockSlot, unlockSlot, individualLocks, recurringLocks, bulkLock } = useLocking();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "day" | "month">("week");
  const [selectedSlot, setSelectedSlot] = useState<{ court: string; date: string; time: string } | null>(null);
  const [lockReason, setLockReason] = useState<LockReason>("MANAGEMENT_HOLD");
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showReleaseModal, setShowReleaseModal] = useState(false);
  const [releaseSchedules, setReleaseSchedules] = useState<ReleaseSchedule[]>([]);

  // Week view: get Monday of current week
  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const weekStart = getWeekStart(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const formatDateDisplay = (date: Date) => date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const getDayName = (date: Date) => date.toLocaleDateString("en-US", { weekday: "short" });

  const handleSlotClick = (court: string, date: string, time: string) => {
    setSelectedSlot({ court, date, time });
  };

  const confirmLock = () => {
    if (!selectedSlot) return;
    const isCurrentlyLocked = isSlotLocked(selectedSlot.court, selectedSlot.date, selectedSlot.time);

    if (isCurrentlyLocked) {
      const lock = individualLocks.find(
        (l) =>
          l.court === selectedSlot.court &&
          l.date === selectedSlot.date &&
          l.startTime === selectedSlot.time
      );
      if (lock) unlockSlot(lock.id);
    } else {
      const endTime = `${(parseInt(selectedSlot.time) + 1).toString().padStart(2, "0")}:00`;
      lockSlot(selectedSlot.court, selectedSlot.date, selectedSlot.time, endTime, lockReason);
    }
    setSelectedSlot(null);
  };

  const courtName = (courtId: string) => COURTS.find((c) => c.id === courtId)?.name || courtId;

  const pickelballCount = COURTS.filter((c) => c.sport === "pickleball").length;
  const futsalCount = COURTS.filter((c) => c.sport === "futsal").length;

  const getStatusColor = (court: string, date: string, time: string): { bg: string; text: string; status: string } => {
    const isLocked = isSlotLocked(court, date, time);
    if (isLocked) {
      return { bg: "bg-red-50", text: "text-red-700", status: "Locked" };
    }
    return { bg: "bg-green-50", text: "text-green-700", status: "Available" };
  };

  const currentDateStr = formatDate(currentDate);
  const dayOfWeek = currentDate.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-brand">
          📅 // COURT TIMETABLE
        </p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight">View and lock/unlock court availability</h1>
      </div>

      {/* Date & Legend Bar */}
      <div className="flex items-center justify-between rounded-lg border border-border bg-background p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Select Date</span>
            <input
              type="date"
              value={currentDateStr}
              onChange={(e) => setCurrentDate(new Date(e.target.value))}
              className="rounded border border-border px-3 py-1.5 text-sm"
            />
            <span className="text-xs text-muted">({dayOfWeek})</span>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)))}
              className="rounded border border-border p-1.5 hover:bg-background-hover"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="rounded border border-border px-3 py-1.5 text-xs font-semibold hover:bg-background-hover"
            >
              Today
            </button>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)))}
              className="rounded border border-border p-1.5 hover:bg-background-hover"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Legend */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500"></span>
              <span className="text-xs font-semibold text-foreground">Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500"></span>
              <span className="text-xs font-semibold text-foreground">Locked</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-500"></span>
              <span className="text-xs font-semibold text-foreground">Booked</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-gray-400"></span>
              <span className="text-xs font-semibold text-foreground">Closed / N/A</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 border-l border-border pl-4">
            <button
              onClick={() => setShowBulkModal(true)}
              className="rounded-md bg-brand px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              🔒 Lock Multiple Hours
            </button>
            <button
              onClick={() => setShowReleaseModal(true)}
              className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-green-700"
            >
              📅 Release Schedule
            </button>
            <button className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold hover:bg-background-hover">
              ⋯ Bulk Actions
            </button>
          </div>
        </div>
      </div>

      {/* Court Schedule Table */}
      <div className="rounded-lg border border-border bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-background-hover">
                <th className="border-r border-border px-4 py-3 text-left font-semibold text-muted w-16">Time</th>

                {/* Pickleball Courts */}
                {COURTS.filter((c) => c.sport === "pickleball").map((court) => (
                  <th key={court.id} className="border-r border-border px-3 py-3 text-center">
                    <div className="text-lg">{court.icon}</div>
                    <div className="text-xs font-bold text-foreground">{court.name.split(" ")[1]}</div>
                    <div className="text-xs text-muted">Pickleball</div>
                  </th>
                ))}

                {/* Futsal Court */}
                {COURTS.filter((c) => c.sport === "futsal").map((court) => (
                  <th key={court.id} className="border-r border-border px-3 py-3 text-center">
                    <div className="text-lg">{court.icon}</div>
                    <div className="text-xs font-bold text-foreground">{court.name.split(" ")[1]}</div>
                    <div className="text-xs text-muted">Futsal</div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {TIME_SLOTS.map((time) => (
                <tr key={time} className="border-b border-border hover:bg-background-hover/50">
                  <td className="border-r border-border bg-background-hover px-4 py-3 font-semibold text-muted w-16">
                    {time}
                  </td>
                  {COURTS.map((court) => {
                    const colors = getStatusColor(court.id, currentDateStr, time);
                    return (
                      <td key={`${court.id}-${time}`} className={`border-r border-border px-3 py-2 ${colors.bg}`}>
                        <div className="flex items-center justify-between gap-1">
                          <div className="flex items-center gap-1.5 flex-1">
                            <span className={`inline-block h-2 w-2 rounded-full ${
                              colors.status === "Available" ? "bg-green-500" :
                              colors.status === "Locked" ? "bg-red-500" : "bg-gray-400"
                            }`}></span>
                            <span className={`text-xs font-semibold ${colors.text}`}>
                              {colors.status}
                            </span>
                          </div>
                          <button
                            onClick={() => handleSlotClick(court.id, currentDateStr, time)}
                            className="text-gray-400 hover:text-foreground"
                            title="More options"
                          >
                            ▼
                          </button>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between rounded-lg border border-border bg-background-hover p-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted">ℹ️ Click on any cell to change status</span>
          <span className="text-xs text-muted">·</span>
          <span className="text-xs text-muted">Changes are saved automatically</span>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold text-foreground">📊 Total Courts: {COURTS.length}</p>
          <p className="text-xs text-muted">Pickleball: {pickelballCount} | Futsal: {futsalCount}</p>
        </div>
      </div>

      {/* Slot Selection Modal */}
      {selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="rounded-lg border border-border bg-background p-6 shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold">
              {isSlotLocked(selectedSlot.court, selectedSlot.date, selectedSlot.time)
                ? "UNLOCK SLOT"
                : "LOCK SLOT"}
            </h3>
            <p className="mt-2 text-sm text-muted">
              {courtName(selectedSlot.court)}
              <br />
              {new Date(selectedSlot.date).toLocaleDateString()} {selectedSlot.time}–
              {`${(parseInt(selectedSlot.time) + 1).toString().padStart(2, "0")}:00`}
            </p>

            {!isSlotLocked(selectedSlot.court, selectedSlot.date, selectedSlot.time) && (
              <label className="mt-4 block">
                <span className="mb-2 block text-xs font-semibold text-muted">REASON</span>
                <select
                  value={lockReason}
                  onChange={(e) => setLockReason(e.target.value as LockReason)}
                  className="w-full rounded border border-border px-3 py-2 text-sm"
                >
                  {LOCK_REASONS.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setSelectedSlot(null)}
                className="flex-1 rounded border border-border px-4 py-2 text-sm font-semibold hover:bg-background-hover"
              >
                CANCEL
              </button>
              <button
                onClick={confirmLock}
                className="flex-1 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
              >
                {isSlotLocked(selectedSlot.court, selectedSlot.date, selectedSlot.time)
                  ? "CONFIRM UNLOCK"
                  : "CONFIRM LOCK"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Lock Modal */}
      {showBulkModal && (
        <BulkLockModal onClose={() => setShowBulkModal(false)} onSubmit={bulkLock} />
      )}

      {/* Release Schedule Modal */}
      {showReleaseModal && (
        <ReleaseScheduleModal
          onClose={() => setShowReleaseModal(false)}
          onSubmit={(schedule: ReleaseSchedule) => {
            setReleaseSchedules([...releaseSchedules, schedule]);
            setShowReleaseModal(false);
          }}
        />
      )}

      {/* Released Schedules */}
      {releaseSchedules.length > 0 && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-6">
          <h3 className="font-bold text-lg mb-4 text-green-900">RELEASED SCHEDULES</h3>
          <div className="space-y-3">
            {releaseSchedules.map((release) => {
              const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
              const dayLabels = release.selectedDays.map((d) => dayNames[d]).join(", ");
              return (
                <div key={release.id} className="flex items-center justify-between rounded border border-green-200 bg-white p-3">
                  <div className="text-sm">
                    <p className="font-semibold text-green-900">
                      {release.courts.map((c) => courtName(c)).join(", ")}
                    </p>
                    <p className="text-xs text-green-700">
                      {release.startDate} → {release.endDate}
                    </p>
                    <p className="text-xs text-green-700">
                      {dayLabels} | {release.startTime} → {release.endTime}
                    </p>
                  </div>
                  <button
                    onClick={() => setReleaseSchedules(releaseSchedules.filter((r) => r.id !== release.id))}
                    className="text-xs text-red-600 hover:text-red-700"
                  >
                    DELETE
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Locks */}
      {recurringLocks.length > 0 && (
        <div className="rounded-lg border border-border bg-background p-6">
          <h3 className="font-bold text-lg mb-4">ACTIVE LOCKS</h3>
          <div className="space-y-3">
            {recurringLocks.map((lock) => (
              <div key={lock.id} className="flex items-center justify-between rounded border border-border p-3">
                <div className="text-sm">
                  <p className="font-semibold">
                    {lock.courts.map((c) => courtName(c)).join(", ")}
                  </p>
                  <p className="text-xs text-muted">
                    {lock.startDate} → {lock.endDate}
                  </p>
                  <p className="text-xs text-muted">
                    {lock.startTime} → {lock.endTime} | Reason: {lock.reason}
                  </p>
                </div>
                <button className="text-xs text-red-600 hover:text-red-700">DELETE</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function BulkLockModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: any }) {
  const [selectedCourts, setSelectedCourts] = useState<string[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("22:00");
  const [reason, setReason] = useState<LockReason>("MANAGEMENT_HOLD");

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const handleSubmit = () => {
    if (!selectedCourts.length || !startDate || !endDate || !selectedDays.length) {
      alert("Please fill all fields");
      return;
    }
    onSubmit(selectedCourts, startDate, endDate, selectedDays, startTime, endTime, reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="rounded-lg border border-border bg-background p-6 shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">BULK LOCK</h3>

        <div className="space-y-4">
          {/* Courts */}
          <div>
            <label className="block text-xs font-semibold text-muted mb-2">COURTS</label>
            <div className="space-y-2">
              <button
                onClick={() =>
                  setSelectedCourts(selectedCourts.length === COURTS.length ? [] : COURTS.map((c) => c.id))
                }
                className="w-full rounded border border-border px-3 py-2 text-sm font-semibold hover:bg-background-hover"
              >
                {selectedCourts.length === COURTS.length ? "DESELECT ALL" : "SELECT ALL COURTS"}
              </button>
              <div className="grid grid-cols-2 gap-2">
                {COURTS.map((court) => (
                  <label key={court.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedCourts.includes(court.id)}
                      onChange={(e) =>
                        setSelectedCourts(
                          e.target.checked
                            ? [...selectedCourts, court.id]
                            : selectedCourts.filter((c) => c !== court.id)
                        )
                      }
                      className="rounded"
                    />
                    <span className="text-sm">{court.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted mb-2">START DATE</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded border border-border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted mb-2">END DATE</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded border border-border px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Days of Week */}
          <div>
            <label className="block text-xs font-semibold text-muted mb-2">DAYS</label>
            <div className="grid grid-cols-4 gap-2">
              {dayNames.map((day, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedDays.includes(index)}
                    onChange={(e) =>
                      setSelectedDays(
                        e.target.checked
                          ? [...selectedDays, index]
                          : selectedDays.filter((d) => d !== index)
                      )
                    }
                    className="rounded"
                  />
                  <span className="text-sm">{day.slice(0, 3)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Times */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted mb-2">START TIME</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full rounded border border-border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted mb-2">END TIME</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full rounded border border-border px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-xs font-semibold text-muted mb-2">REASON</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value as LockReason)}
              className="w-full rounded border border-border px-3 py-2 text-sm"
            >
              <option value="PRIVATE_EVENT">PRIVATE EVENT</option>
              <option value="LEAGUE">LEAGUE</option>
              <option value="TOURNAMENT">TOURNAMENT</option>
              <option value="MAINTENANCE">MAINTENANCE</option>
              <option value="COLLEGE_EVENT">COLLEGE EVENT</option>
              <option value="MANAGEMENT_HOLD">MANAGEMENT HOLD</option>
              <option value="OTHER">OTHER</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded border border-border px-4 py-2 text-sm font-semibold hover:bg-background-hover"
          >
            CANCEL
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            CONFIRM BULK LOCK
          </button>
        </div>
      </div>
    </div>
  );
}

function ReleaseScheduleModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (schedule: ReleaseSchedule) => void;
}) {
  const [selectedCourts, setSelectedCourts] = useState<string[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("22:00");

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const handleSubmit = () => {
    if (!selectedCourts.length || !startDate || !endDate || !selectedDays.length) {
      alert("Please fill all fields");
      return;
    }
    const schedule: ReleaseSchedule = {
      id: `release-${Date.now()}`,
      courts: selectedCourts,
      startDate,
      endDate,
      selectedDays,
      startTime,
      endTime,
      createdAt: new Date().toISOString(),
    };
    onSubmit(schedule);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="rounded-lg border border-border bg-background p-6 shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">RELEASE SCHEDULE</h3>
        <p className="text-sm text-muted mb-4">
          Select which courts and time slots to make available for customer booking.
        </p>

        <div className="space-y-4">
          {/* Courts */}
          <div>
            <label className="block text-xs font-semibold text-muted mb-2">COURTS TO RELEASE</label>
            <div className="space-y-2">
              <button
                onClick={() =>
                  setSelectedCourts(selectedCourts.length === COURTS.length ? [] : COURTS.map((c) => c.id))
                }
                className="w-full rounded border border-border px-3 py-2 text-sm font-semibold hover:bg-background-hover"
              >
                {selectedCourts.length === COURTS.length ? "DESELECT ALL" : "SELECT ALL COURTS"}
              </button>
              <div className="grid grid-cols-2 gap-2">
                {COURTS.map((court) => (
                  <label key={court.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedCourts.includes(court.id)}
                      onChange={(e) =>
                        setSelectedCourts(
                          e.target.checked
                            ? [...selectedCourts, court.id]
                            : selectedCourts.filter((c) => c !== court.id)
                        )
                      }
                      className="rounded"
                    />
                    <span className="text-sm">{court.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted mb-2">START DATE</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded border border-border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted mb-2">END DATE</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded border border-border px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Days of Week */}
          <div>
            <label className="block text-xs font-semibold text-muted mb-2">DAYS TO RELEASE</label>
            <div className="grid grid-cols-4 gap-2">
              {dayNames.map((day, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedDays.includes(index)}
                    onChange={(e) =>
                      setSelectedDays(
                        e.target.checked
                          ? [...selectedDays, index]
                          : selectedDays.filter((d) => d !== index)
                      )
                    }
                    className="rounded"
                  />
                  <span className="text-sm">{day.slice(0, 3)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Times */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted mb-2">RELEASE FROM TIME</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full rounded border border-border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted mb-2">RELEASE TO TIME</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full rounded border border-border px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded border border-border px-4 py-2 text-sm font-semibold hover:bg-background-hover"
          >
            CANCEL
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
          >
            CONFIRM RELEASE
          </button>
        </div>
      </div>
    </div>
  );
}
