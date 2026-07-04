import { useState, useEffect, useRef } from "react";
import { Calendar } from "lucide-react";

interface CallOrBookProps {
  onBook: () => void;
  children: React.ReactNode;
}

export function CallOrBookPopover({ onBook, children }: CallOrBookProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && popoverRef.current && !triggerRef.current.contains(event.target as Node) && !popoverRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={triggerRef} className="relative inline-block">
      <div onClick={() => setOpen(!open)}>{children}</div>

      {open && (
        <div
          ref={popoverRef}
          className="absolute left-1/2 -translate-x-1/2 z-[200] min-w-[280px] top-full mt-3"
        >
          <div
            className="rounded-2xl border border-white/10 p-3 shadow-2xl space-y-2"
            style={{
              background: "rgba(14,12,22,0.88)",
              backdropFilter: "blur(28px)",
              boxShadow: "0 0 60px -15px hsl(var(--primary) / 0.3), 0 0 0 1px rgba(255,255,255,0.06) inset",
            }}
          >
            <p className="text-xs text-white/40 text-center pb-1">Get started with your free audit</p>

            <button
              onClick={() => { setOpen(false); onBook(); }}
              className="flex items-center gap-3 w-full rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 px-4 py-3 transition-all group"
            >
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/30 transition-colors">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-white">Book Online</div>
                <div className="text-xs text-primary/70">Free AI Growth Audit</div>
              </div>
            </button>

            <p className="text-[10px] text-white/20 text-center pt-1">No credit card · 100% free</p>
          </div>
        </div>
      )}
    </div>
  );
}
