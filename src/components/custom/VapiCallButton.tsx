import { useState, useRef, useCallback } from "react";
import Vapi from "@vapi-ai/web";
import { Phone, Loader2, X } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { Button } from "@/components/ui/button";

const ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_CS;

interface VapiCallButtonProps {
  label?: string;
  variant?: "default" | "compact";
}

export function VapiCallButton({ label = "Try Call Us Now", variant = "default" }: VapiCallButtonProps) {
  const [status, setStatus] = useState<"idle" | "connecting" | "connected" | "ended" | "error">("idle");
  const vapiRef = useRef<Vapi | null>(null);

  const startCall = useCallback(() => {
    if (!ASSISTANT_ID) return;

    setStatus("connecting");
    const vapi = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);
    vapiRef.current = vapi;

    vapi.on("call-start", () => setStatus("connected"));
    vapi.on("call-end", () => setStatus("ended"));
    vapi.on("error", (e) => {
      console.error("Vapi error:", e);
      setStatus("error");
    });

    vapi.start(ASSISTANT_ID);
  }, []);

  const stopCall = useCallback(() => {
    vapiRef.current?.stop();
    vapiRef.current = null;
    setStatus("ended");
  }, []);

  if (variant === "compact") {
    return (
      <div className="flex flex-col items-center gap-2">
        {status === "idle" ? (
          <MagneticButton>
            <Button
              onClick={startCall}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-12 text-base"
            >
              <Phone className="w-4 h-4 mr-2" />
              {label}
            </Button>
          </MagneticButton>
        ) : status === "connecting" ? (
          <div className="flex items-center gap-2 text-sm text-primary">
            <Loader2 className="w-4 h-4 animate-spin" />
            Connecting to AI assistant...
          </div>
        ) : status === "connected" ? (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-500" />
              </span>
              AI assistant is live — talk now
            </div>
            <Button
              onClick={stopCall}
              variant="outline"
              size="sm"
              className="rounded-full border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              <X className="w-3.5 h-3.5 mr-1.5" />
              End Call
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-muted-foreground">
              {status === "ended" ? "Call ended. Try again?" : "Connection failed. Please try again."}
            </p>
            <MagneticButton>
              <Button
                onClick={startCall}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-12 text-base"
              >
                <Phone className="w-4 h-4 mr-2" />
                {label}
              </Button>
            </MagneticButton>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {status === "idle" && (
        <MagneticButton>
          <Button
            onClick={startCall}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 h-14 text-lg"
          >
            <Phone className="w-5 h-5 mr-2" />
            {label}
          </Button>
        </MagneticButton>
      )}
      {status === "connecting" && (
        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span className="text-sm text-primary">Connecting to AI assistant...</span>
        </div>
      )}
      {status === "connected" && (
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gray-500/10 border border-gray-500/20">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-500" />
            </span>
            <span className="text-sm text-gray-400">AI assistant is live — you can speak now</span>
          </div>
          <Button
            onClick={stopCall}
            variant="outline"
            size="sm"
            className="rounded-full border-red-500/30 text-red-400 hover:bg-red-500/10"
          >
            <X className="w-4 h-4 mr-1.5" />
            End Call
          </Button>
        </div>
      )}
      {(status === "ended" || status === "error") && (
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-muted-foreground">
            {status === "ended" ? "Call ended. Ready for another?" : "Connection failed. Please try again."}
          </p>
          <Button
            onClick={startCall}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-12"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Again
          </Button>
        </div>
      )}
    </div>
  );
}