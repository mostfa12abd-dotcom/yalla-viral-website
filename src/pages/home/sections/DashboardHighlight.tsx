import { MotionDiv } from "@/lib/MotionSafe";
import { HeadphonesIcon } from "lucide-react";
import { Card } from "@/components/ui/card";


export function DashboardHighlight() {
  return (
    <section id="try-ai" className="min-h-dvh section-py relative overflow-hidden bg-white/[0.02] border-y border-white/5">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent blur-3xl -z-10" />
      <div className="container-fluid">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium w-fit">
              <HeadphonesIcon className="w-3.5 h-3.5" /> AI Call Center
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-heading leading-tight">
              AI Call Center —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Powered by Your Data
              </span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Deploy a custom AI voice agent trained on your business data. It handles calls 24/7, books appointments, follows up with leads, and never calls in sick — all from a dashboard you control.
            </p>

          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="relative"
          >
            <div className="text-center mb-3">
              <span className="text-xs text-muted-foreground">Dashboard Preview</span>
            </div>
            <Card className="bg-card border-white/10 shadow-2xl overflow-hidden rounded-2xl">
              <img
                src="/dashboard-screenshot.png"
                alt="Yalla Viral Dashboard — Call Center"
                className="w-full h-auto"
              />
            </Card>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
