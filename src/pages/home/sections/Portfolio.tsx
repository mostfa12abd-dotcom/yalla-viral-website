import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MagneticButton } from "@/components/custom/MagneticButton";
import { CallOrBookPopover } from "@/components/custom/CallOrBookPopover";
import { portfolioItems } from "@/lib/data";

interface PortfolioProps {
  onOpenAudit: () => void;
}

export function Portfolio({ onOpenAudit }: PortfolioProps) {
  return (
    <section id="portfolio" className="min-h-dvh section-py relative z-10">
      <div className="container-fluid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-heading">Our Work</h2>
          <p className="text-muted-foreground text-lg">Real results for real businesses — across industries and continents.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.09, type: "spring", stiffness: 220, damping: 22 }}
            >
              <Card className={`group h-full bg-card/30 border ${item.border} transition-all duration-300 overflow-hidden`}>
                <CardContent className="p-0 flex flex-col h-full">
                  <div className={`h-2 w-full bg-gradient-to-r ${item.color}`} />
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <span className="text-xs font-semibold uppercase tracking-widest text-secondary">{item.category}</span>
                    <h3 className="text-lg font-semibold font-heading text-white/90 leading-snug">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">{item.desc}</p>
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <span className="text-2xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{item.stat}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <CallOrBookPopover onBook={onOpenAudit}>
            <MagneticButton>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-12 text-base"
              >
                Get Your Free AI Growth Audit
              </Button>
            </MagneticButton>
          </CallOrBookPopover>
        </motion.div>
      </div>
    </section>
  );
}
