import { useState, useEffect, useCallback } from "react";
import { MotionDiv, AnimatedPresence } from "@/lib/MotionSafe";
import { X, Zap, CalendarDays, Clock, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { getTimeSlotsForDate, fetchAllBookedSlots, clearCache, type TimeSlot, BOOK_APPOINTMENT_WEBHOOK_URL } from "@/lib/outlook-calendar";
import { format, isBefore, startOfToday } from "date-fns";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

export function BookingModal({ open, onClose }: BookingModalProps) {
  const [step, setStep] = useState<"details" | "calendar" | "confirm">("details");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [contactType, setContactType] = useState<"email">("email");

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [blockedMsg, setBlockedMsg] = useState("");
  const [slotsLoaded, setSlotsLoaded] = useState(false);

  const today = startOfToday();

  const fetchSlots = useCallback(async (date: Date) => {
    setLoadingSlots(true);
    setSelectedTime(null);
    setBlockedMsg("");
    setTimeSlots([]);
    const slots = await getTimeSlotsForDate(date);
    setTimeSlots(slots);
    setLoadingSlots(false);
  }, []);

  useEffect(() => {
    if (open) {
      setSlotsLoaded(false);
      fetchAllBookedSlots().then(() => setSlotsLoaded(true));
    }
  }, [open]);

  useEffect(() => {
    if (slotsLoaded && selectedDate) {
      fetchSlots(selectedDate);
    }
  }, [slotsLoaded, selectedDate, fetchSlots]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleTimeClick = (slot: TimeSlot) => {
    if (slot.booked) {
      setBlockedMsg(`This time slot (${slot.label}) is already booked. Please select another time.`);
      setSelectedTime(null);
      return;
    }
    setBlockedMsg("");
    setSelectedTime(slot);
  };

  const reset = () => {
    setStep("details");
    setName("");
    setContact("");
    setContactType("email");
    setSelectedDate(undefined);
    setSelectedTime(null);
    setTimeSlots([]);
    setBlockedMsg("");
    setError("");
    setSubmitted(false);
    setSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setSubmitting(true);
    setError("");

    try {
      const [h, m] = selectedTime.value.split(":").map(Number);
      const startDateTime = new Date(selectedDate);
      startDateTime.setHours(h, m, 0, 0);
      const endDateTime = new Date(startDateTime);
      endDateTime.setHours(h + 1, m, 0, 0);

      const payload = {
        name,
        contact,
        contactType,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
      };

      console.log("[BookingModal] Sending payload to webhook:", payload);

      const res = await fetch(BOOK_APPOINTMENT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("[BookingModal] Webhook response:", res.status, res.statusText);

      if (!res.ok) {
        throw new Error(`Webhook returned ${res.status}`);
      }

      clearCache();
      setSubmitted(true);
      setSubmitting(false);
    } catch (err) {
      console.error("[BookingModal] Webhook error:", err);
      setSubmitting(false);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <AnimatedPresence>
      {open && (
        <>
          <MotionDiv
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { onClose(); reset(); }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <MotionDiv
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl p-4"
              style={{
                background: "rgba(14,12,22,0.88)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 0 80px -20px hsl(var(--primary) / 0.35), 0 0 0 1px rgba(255,255,255,0.06) inset",
              }}
            >
              <button
                onClick={() => { onClose(); reset(); }}
                className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="p-6">
              {submitted ? (
                <div className="text-center py-6 space-y-3">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-500/20 border border-gray-500/30 mx-auto">
                    <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold font-heading text-white">Booking Confirmed!</h3>
                  <p className="text-muted-foreground text-sm">
                    Your AI Growth Audit call is scheduled for{" "}
                    <span className="text-white font-medium">
                      {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}
                    </span>{" "}
                    at{" "}
                    <span className="text-white font-medium">{selectedTime?.label}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">A calendar invite has been sent to {contact}.</p>
                  <Button
                    onClick={() => { onClose(); reset(); }}
                    className="mt-2 bg-primary hover:bg-primary/90 text-white rounded-xl h-10 px-5"
                  >
                    Done
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-4 space-y-1.5">
                    <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                      <Zap className="w-3 h-3" /> 100% Free · No Credit Card
                    </div>
                    <h2 className="text-xl font-bold font-heading text-white">Get Your Free AI Growth Audit</h2>
                    <p className="text-muted-foreground text-xs">Book a time that works for you. We'll analyze your business and identify AI automation opportunities.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className={`flex items-center gap-1 ${step === "details" ? "text-primary font-semibold" : ""}`}>1. Your Info</span>
                      <span className="text-white/20">→</span>
                      <span className={`flex items-center gap-1 ${step === "calendar" ? "text-primary font-semibold" : ""}`}>2. Pick Date & Time</span>
                      <span className="text-white/20">→</span>
                      <span className={`flex items-center gap-1 ${step === "confirm" ? "text-primary font-semibold" : ""}`}>3. Confirm</span>
                    </div>

                    {step === "details" && (
                      <>
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-white/80">Full Name</label>
                          <input required type="text" placeholder="Your name" value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-white/80">Email Address</label>
                          <input required type="email" placeholder="you@company.com" value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
                          />
                        </div>
                        <Button type="button" disabled={!name || !contact} onClick={() => setStep("calendar")}
                          className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-11 text-base font-semibold transition-all disabled:opacity-60">
                          Continue → Pick a Date
                        </Button>
                      </>
                    )}

                    {step === "calendar" && (
                      <>
                        {!slotsLoaded ? (
                          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm py-12">
                            <Loader2 className="w-4 h-4 animate-spin" /> Loading availability…
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                              <CalendarDays className="w-4 h-4 text-primary" /> Select Date
                            </label>
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={handleDateSelect}
                              disabled={(date) => isBefore(date, today)}
                              className="bg-white/5 rounded-xl border border-white/10 p-2 w-full"
                            />
                          </div>
                        )}

                        {selectedDate && (
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-white/70 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-primary" /> Select Time
                            </label>
                            {loadingSlots && (
                              <div className="flex items-center gap-2 text-muted-foreground text-xs py-1">
                                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading times…
                              </div>
                            )}
                            {blockedMsg && (
                              <div className="flex items-start gap-1.5 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                                <span>{blockedMsg}</span>
                              </div>
                            )}
                            {!loadingSlots && (
                              <>
                                <div className="grid grid-cols-5 gap-1">
                                  {timeSlots.map((slot) => (
                                    <button key={slot.value} type="button" disabled={slot.booked}
                                      onClick={() => handleTimeClick(slot)}
                                      className={`relative rounded-lg border px-1 py-1.5 text-xs font-medium transition-all text-center ${
                                        slot.booked
                                          ? "bg-red-500/10 border-red-500/20 text-red-400/60 cursor-not-allowed line-through"
                                          : selectedTime?.value === slot.value
                                          ? "bg-primary/20 border-primary/60 text-primary"
                                          : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20"
                                      }`}
                                    >
                                      {slot.booked && <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-red-500" />}
                                      {slot.label}
                                    </button>
                                  ))}
                                </div>
                                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary/40" /> Available</span>
                                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500/40" /> Booked</span>
                                </div>
                              </>
                            )}
                          </div>
                        )}

                        <div className="flex gap-3 pt-1">
                          <Button type="button" variant="ghost" onClick={() => setStep("details")} className="flex-1 rounded-xl h-11 text-base">Back</Button>
                          <Button type="button" disabled={!selectedDate || !selectedTime} onClick={() => setStep("confirm")}
                            className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl h-11 text-base font-semibold transition-all disabled:opacity-60">
                            Review Booking
                          </Button>
                        </div>
                      </>
                    )}

                    {step === "confirm" && (
                      <div className="space-y-3">
                        <div className="rounded-xl bg-white/5 border border-white/10 p-3 space-y-2">
                          <h4 className="text-sm font-semibold text-white">Appointment Summary</h4>
                          <div className="space-y-1.5 text-sm">
                            <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="text-white">{name}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Contact</span><span className="text-white">{contact} (Email)</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="text-white">{selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="text-white">{selectedTime?.label}</span></div>
                          </div>
                        </div>
                        {error && (
                          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /><span>{error}</span>
                          </div>
                        )}
                        <div className="flex gap-3">
                          <Button type="button" variant="ghost" onClick={() => setStep("calendar")} className="flex-1 rounded-xl h-11 text-base">Back</Button>
                          <Button type="submit" disabled={submitting} className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl h-11 text-base font-semibold transition-all disabled:opacity-60">
                            {submitting ? <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Confirming…</span> : "Confirm Booking"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </form>
                </>
              )}
              </div>
            </div>
          </MotionDiv>
        </>
      )}
    </AnimatedPresence>
  );
}
