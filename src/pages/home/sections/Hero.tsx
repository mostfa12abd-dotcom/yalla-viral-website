import { useState, useEffect } from "react";
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

  const content = (
    <div className="flex flex-col gap-6 max-w-4xl">
      <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] md:text-[clamp(3rem,5vw,5rem)] font-bold font-heading leading-[1.1] tracking-tight text-foreground">
        Solutions That Generate Leads, Answer Calls &amp; Grow Revenue
      </h1>
      <p className="text-[clamp(1rem,2vw,1.35rem)] md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
        Yalla Viral helps businesses automate customer interactions, strengthen their online presence,
        and accelerate growth through AI call centers, websites, marketing, and custom automation.
      </p>
      <div className="flex flex-wrap items-center gap-4 pt-4">
        <div className="flex flex-col gap-1">
          <CallOrBookPopover onBook={onOpenAudit}>
            <MagneticButton>
              <Button
                data-testid="button-book-demo"
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-12 text-base shadow-lg shadow-primary/25"
              >
                Get Your Free AI Growth Audit
              </Button>
            </MagneticButton>
          </CallOrBookPopover>
          <p className="text-xs text-muted-foreground/60 text-center pl-1">No credit card required. 100% Free.</p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative min-h-[calc(100dvh-64px)] flex items-center border-b border-border/50">

      {/* Conic beam background */}
      <div className="hero-beam hero-beam-1" />
      <div className="hero-beam hero-beam-2" />
      <div className="hero-beam-glow" />
      <div className="hero-beam-bottom" />

      {/* Subtle blue grid */}
      <div className="absolute inset-0 z-0 bg-grid bg-grid-mask pointer-events-none" />

      {/* Bottom fade line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container-fluid relative z-10">
        <div className="flex justify-center">
          {mobile ? (
            content
          ) : (
            <MotionDiv
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-6 max-w-4xl"
            >
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2.5rem,6vw,4.5rem)] md:text-[clamp(3rem,5vw,5rem)] font-bold font-heading leading-[1.1] tracking-tight text-foreground"
              >
                Solutions That Generate Leads, Answer Calls &amp; Grow Revenue
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="text-[clamp(1rem,2vw,1.35rem)] md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
              >
                Yalla Viral helps businesses automate customer interactions, strengthen their online presence,
                and accelerate growth through AI call centers, websites, marketing, and custom automation.
              </motion.p>

              <MotionDiv
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap items-center gap-4 pt-4"
              >
                <div className="flex flex-col gap-1">
                  <CallOrBookPopover onBook={onOpenAudit}>
                    <MagneticButton>
                      <Button
                        data-testid="button-book-demo"
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-12 text-base shadow-lg shadow-primary/25"
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
  );
}
