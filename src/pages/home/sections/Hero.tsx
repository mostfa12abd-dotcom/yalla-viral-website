import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/custom/MagneticButton";
import { CallOrBookPopover } from "@/components/custom/CallOrBookPopover";
import { MotionDiv } from "@/lib/MotionSafe";


interface HeroProps {
  onOpenAudit: () => void;
}

export function Hero({ onOpenAudit }: HeroProps) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => { setMobile(window.innerWidth < 768); }, []);

  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const w = window as unknown as { UnicornStudio?: { init: () => void; isInitialized?: boolean } };
    if (w.UnicornStudio?.init) {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => w.UnicornStudio?.init());
      } else {
        w.UnicornStudio.init();
      }
      return;
    }
    w.UnicornStudio = { isInitialized: false, init: () => {} };
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.1/dist/unicornStudio.umd.js";
    script.onload = () => {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => w.UnicornStudio?.init());
      } else {
        w.UnicornStudio?.init();
      }
    };
    document.head.appendChild(script);
  }, []);

  return (
    <>

      <section ref={heroRef} className="relative min-h-[calc(100dvh-64px)] flex items-center bg-black/20 border-b border-white/[0.03] overflow-hidden after:absolute after:bottom-0 after:inset-x-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent">

        <div className="absolute inset-0 z-0 bg-grid bg-grid-mask pointer-events-none" />

        <div className="absolute inset-0 z-[1] opacity-80 mix-blend-screen" data-us-project="aH0ZsntZ1TcKHIyweEA8" />

        <div className="container-fluid relative z-20">
          <div className="flex justify-center">
          {mobile ? (
            <div className="flex flex-col gap-6 max-w-4xl">
              <span className="font-brand text-2xl md:text-3xl text-white/90 tracking-wide">Yalla Viral</span>
              <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] md:text-[clamp(3rem,5vw,5rem)] font-bold font-heading leading-[1.1] tracking-tight text-white">
                Solutions That Generate Leads, Answer Calls & Grow Revenue
              </h1>
              <p className="text-[clamp(1rem,2vw,1.35rem)] md:text-xl text-muted-foreground leading-relaxed">
                Yalla Viral helps businesses automate customer interactions, strengthen their online presence, and accelerate growth through AI call centers, websites, marketing, and custom automation.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <div className="flex flex-col gap-1">
                  <CallOrBookPopover onBook={onOpenAudit}>
                    <MagneticButton>
                      <Button
                        data-testid="button-book-demo"
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-base"
                      >
                        Get Your Free AI Growth Audit
                      </Button>
                    </MagneticButton>
                  </CallOrBookPopover>
                  <p className="text-xs text-muted-foreground/60 text-center pl-1">No credit card required. 100% Free.</p>
                </div>
              </div>
            </div>
          ) : (
            <MotionDiv
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-6 max-w-4xl"
            >
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
                className="font-brand text-2xl md:text-3xl text-white/90 tracking-wide"
              >
                Yalla Viral
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2.5rem,6vw,4.5rem)] md:text-[clamp(3rem,5vw,5rem)] font-bold font-heading leading-[1.1] tracking-tight text-white"
              >
                Solutions That Generate Leads, Answer Calls & Grow Revenue
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="text-[clamp(1rem,2vw,1.35rem)] md:text-xl text-muted-foreground leading-relaxed"
              >
                Yalla Viral helps businesses automate customer interactions, strengthen their online presence, and accelerate growth through AI call centers, websites, marketing, and custom automation.
              </motion.p>

              <MotionDiv
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex flex-wrap items-center gap-4 pt-4"
              >
                <div className="flex flex-col gap-1">
                  <CallOrBookPopover onBook={onOpenAudit}>
                    <MagneticButton>
                      <Button
                        data-testid="button-book-demo"
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-base"
                      >
                        Get Your Free AI Growth Audit
                      </Button>
                    </MagneticButton>
                  </CallOrBookPopover>
                  <p className="text-xs text-muted-foreground/60 text-center pl-1">No credit card required. 100% Free.</p>
                </div>
              </MotionDiv>
            </MotionDiv>
          )}
          </div>
        </div>
      </section>
    </>
  );
}
