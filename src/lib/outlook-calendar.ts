export interface TimeSlot {
  label: string;
  value: string;
  booked: boolean;
}

export const BOOKED_SLOTS_WEBHOOK_URL = "https://n8nserver.yallaviral.com/webhook/booked-slots";
export const BOOK_APPOINTMENT_WEBHOOK_URL = "https://n8nserver.yallaviral.com/webhook/33540d7f-b049-4441-9ae0-e228858bae45";

const ALL_TIME_SLOTS: TimeSlot[] = [
  { label: "9:00 AM",  value: "09:00", booked: false },
  { label: "10:00 AM", value: "10:00", booked: false },
  { label: "11:00 AM", value: "11:00", booked: false },
  { label: "12:00 PM", value: "12:00", booked: false },
  { label: "1:00 PM",  value: "13:00", booked: false },
  { label: "2:00 PM",  value: "14:00", booked: false },
  { label: "3:00 PM",  value: "15:00", booked: false },
  { label: "4:00 PM",  value: "16:00", booked: false },
  { label: "5:00 PM",  value: "17:00", booked: false },
];

let cachedSlots: Record<string, string[]> | null = null;

function normalizeBooked(raw: unknown): Record<string, string[]> {
  if (!raw) return {};
  if (Array.isArray(raw)) {
    return raw.reduce<Record<string, string[]>>((acc, item) => {
      if (item && typeof item === "object") {
        Object.assign(acc, item as Record<string, string[]>);
      }
      return acc;
    }, {});
  }
  if (typeof raw === "object") {
    return raw as Record<string, string[]>;
  }
  return {};
}

export async function fetchAllBookedSlots(): Promise<void> {
  try {
    const res = await fetch(BOOKED_SLOTS_WEBHOOK_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const raw = await res.json();
    console.log("[outlook-calendar] Raw webhook response:", raw);
    cachedSlots = normalizeBooked(raw);
    console.log("[outlook-calendar] Normalized booked slots:", cachedSlots);
  } catch (err) {
    console.error("[outlook-calendar] Failed to fetch booked slots:", err);
    cachedSlots = {};
  }
}

export function getTimeSlotsForDate(date: Date): TimeSlot[] {
  if (!cachedSlots) return ALL_TIME_SLOTS.map((s) => ({ ...s, booked: false }));

  const dateKey =
    `${date.getFullYear()}-` +
    `${String(date.getMonth() + 1).padStart(2, "0")}-` +
    `${String(date.getDate()).padStart(2, "0")}`;
  const booked = cachedSlots[dateKey] ?? [];

  console.log(`[outlook-calendar] Slots for ${dateKey}: booked =`, booked);

  return ALL_TIME_SLOTS.map((slot) => ({
    ...slot,
    booked: booked.includes(slot.value),
  }));
}

export function clearCache() {
  cachedSlots = null;
}
