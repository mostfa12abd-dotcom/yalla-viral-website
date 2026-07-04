import { MotionDiv } from "@/lib/MotionSafe";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/lib/data";

const cardContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.11 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 40, rotate: -4, scale: 0.94 },
  show: {
    opacity: 1, y: 0, rotate: 0, scale: 1,
    transition: { type: "spring", stiffness: 240, damping: 22 },
  },
};

export function Services() {
  return (
    <section id="services" className="min-h-dvh section-py relative z-10">
      <div className="container-fluid">
        <MotionDiv
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14 space-y-3"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-heading">What We Do</h2>
          <p className="text-muted-foreground text-base md:text-lg">Growth solutions powered by AI.</p>
        </MotionDiv>

        <MotionDiv
          variants={cardContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {services.map((service, i) => (
            <MotionDiv key={i} variants={cardItem} style={{ willChange: "transform, opacity" }}>
              <Card className="group bg-card/30 border-white/5 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300 mt-0.5">
                    <service.icon className={`w-5 h-5 ${service.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold font-heading text-white/90">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">{service.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </section>
  );
}
