import { motion } from "framer-motion";
import { CountUp } from "@/components/custom/CountUp";
import { stats } from "@/lib/data";

export function StatsStrip() {
  return (
    <section className="py-16 border-y border-white/5 bg-white/[0.015] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 240, damping: 22 }}
              className="flex flex-col items-center gap-2"
            >
              <stat.icon className="w-5 h-5 text-secondary mb-1" />
              <span className="text-4xl md:text-5xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70">
                <CountUp to={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              </span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}