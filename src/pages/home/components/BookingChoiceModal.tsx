import { MotionDiv, AnimatedPresence } from "@/lib/MotionSafe";
import { X, Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingChoiceModalProps {
  open: boolean;
  onClose: () => void;
  onBookOnline: () => void;
  onCallUs: () => void;
}

export function BookingChoiceModal({ open, onClose, onBookOnline, onCallUs }: BookingChoiceModalProps) {
  return (
    <AnimatedPresence>
      {open && (
        <>
          <MotionDiv
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
              className="relative w-full max-w-md rounded-2xl border border-white/10 p-8 shadow-2xl"
              style={{
                background: "rgba(14,12,22,0.82)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 0 80px -20px hsl(var(--primary) / 0.35), 0 0 0 1px rgba(255,255,255,0.06) inset",
              }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-8 space-y-3">
                <h2 className="text-2xl font-bold font-heading text-white">How Would You Like to Book?</h2>
                <p className="text-muted-foreground text-sm">Choose the option that works best for you.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={onBookOnline}
                  className="group flex flex-col items-center gap-4 p-6 rounded-xl border border-primary/30 bg-primary/8 hover:border-primary/60 hover:bg-primary/14 transition-all duration-300"
                  style={{ background: "rgba(59,130,246,0.08)" }}
                >
                  <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-white">Book Online</p>
                    <p className="text-xs text-blue-300/70 mt-1">Fill out a quick form</p>
                  </div>
                </button>

                <button
                  onClick={onCallUs}
                  className="group flex flex-col items-center gap-4 p-6 rounded-xl border border-sky-400/30 hover:border-sky-400/60 transition-all duration-300"
                  style={{ background: "rgba(14,165,233,0.08)" }}
                >
                  <div className="w-14 h-14 rounded-full border border-sky-400/30 flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: "rgba(14,165,233,0.15)" }}>
                    <Phone className="w-6 h-6 text-sky-400" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-white">Call Us</p>
                    <p className="text-xs text-sky-300/70 mt-1">Speak with our team</p>
                  </div>
                </button>
              </div>
            </div>
          </MotionDiv>
        </>
      )}
    </AnimatedPresence>
  );
}
