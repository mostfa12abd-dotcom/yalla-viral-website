/**
 * ARCHIVED — Call Us Now section (removed temporarily)
 *
 * لإرجاع هذا القسم:
 * 1. في DashboardHighlight.tsx أضف هذا الـ import في الأعلى:
 *      import { VapiCallButton } from "@/components/custom/VapiCallButton";
 *
 * 2. بعد الـ <p> الوصفي مباشرةً (قبل </MotionDiv> الأولى) أضف هذا الكود:
 *
 *      <MotionDiv
 *        initial={{ opacity: 0, y: 12 }}
 *        whileInView={{ opacity: 1, y: 0 }}
 *        viewport={{ once: true }}
 *        className="pt-4"
 *      >
 *        <VapiCallButton label="Call Us Now — It's Free" />
 *      </MotionDiv>
 *
 *      <div className="grid grid-cols-3 gap-4 pt-6">
 *        {[
 *          { num: "01", title: "Speak to AI",        desc: "Call our assistant. Book an appointment or ask any question.",              badge: "bg-blue-400/10 border-blue-400/25 text-blue-400"   },
 *          { num: "02", title: "Get a demo",          desc: "Experience our AI voice agent in real time — it's the best way to see it.", badge: "bg-sky-400/10  border-sky-400/25  text-sky-400"    },
 *          { num: "03", title: "Walk away booked",    desc: "You'll have a confirmed consultation and firsthand proof of what AI can do.", badge: "bg-indigo-400/10 border-indigo-400/25 text-indigo-400" },
 *        ].map((step, i) => (
 *          <div key={i} className="text-center">
 *            <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold mx-auto mb-2 ${step.badge}`}>
 *              {step.num}
 *            </div>
 *            <h3 className="text-xs font-semibold text-white/80">{step.title}</h3>
 *            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{step.desc}</p>
 *          </div>
 *        ))}
 *      </div>
 */

export {};
