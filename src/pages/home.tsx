import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Zap, Activity, Calendar, Layout, Camera, Share2, PhoneCall,
  HeadphonesIcon, Settings, Instagram, Linkedin, Twitter, TrendingUp, Users, Clock, X, CheckCircle
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { MagneticButton } from "@/components/MagneticButton";
import { CountUp } from "@/components/CountUp";

/* ─── Service card variants (tilted stagger) ────────────────────────────────── */
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

export default function Home() {
  /* ── Modal + Toast state ────────────────────────────────────────────────── */
  const [auditOpen, setAuditOpen] = useState(false);
  const [toast, setToast]         = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", website: "" });

  const openAudit  = () => setAuditOpen(true);
  const closeAudit = () => setAuditOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("https://your-n8n-webhook-url-here.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (_) { /* webhook placeholder — ignore errors */ }
    setSubmitting(false);
    setAuditOpen(false);
    setForm({ name: "", email: "", website: "" });
    setToast(true);
    setTimeout(() => setToast(false), 4500);
  };

  /* ── Parallax refs ──────────────────────────────────────────────────────── */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const rawOrb1Y  = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const rawOrb2Y  = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rawGridY  = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const rawMockY  = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const orb1Y  = useSpring(rawOrb1Y,  { stiffness: 80, damping: 20 });
  const orb2Y  = useSpring(rawOrb2Y,  { stiffness: 80, damping: 20 });
  const gridY  = useSpring(rawGridY,  { stiffness: 80, damping: 20 });
  const mockY  = useSpring(rawMockY,  { stiffness: 80, damping: 20 });

  /* ── Ambient mouse-follow glow (no circle, just light) ─────────────────── */
  const glowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    let tx = cx, ty = cy;
    let rafId: number;
    const el = glowRef.current;
    const tick = () => {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      if (el) {
        el.style.backgroundImage =
          `radial-gradient(ellipse 340px 260px at ${cx}px ${cy}px,` +
          `rgba(124,58,237,0.13) 0%,` +
          `rgba(80,140,255,0.06) 40%,` +
          `rgba(6,182,212,0.03) 65%,` +
          `transparent 100%)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    rafId = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafId); };
  }, []);

  /* ── Sand-particle field — reacts to cursor ──────────────────────────────── */
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mx = -2000, my = -2000;

    interface P { x: number; y: number; ox: number; oy: number; vx: number; vy: number; r: number; op: number; hue: number; }
    let pts: P[] = [];

    const build = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      pts = [];
      const n = Math.round((canvas.width * canvas.height) / 6500);
      for (let i = 0; i < n; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        pts.push({ x, y, ox: x, oy: y, vx: 0, vy: 0, r: Math.random() * 1.4 + 0.4, op: Math.random() * 0.35 + 0.08, hue: Math.random() > 0.55 ? 262 : 195 });
      }
    };
    build();
    window.addEventListener("resize", build);

    const PUSH_R   = 110;  /* push radius */
    const VISIBLE_R = 170; /* visibility radius — invisible beyond this */
    const SPRING   = 0.018; /* slower spring back */
    const DAMP     = 0.90;  /* higher damping = lazier */
    const PUSH_F   = 1.6;  /* gentler push force */
    let rafId: number;

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        /* push away from cursor */
        const dx = p.x - mx, dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < PUSH_R * PUSH_R) {
          const d = Math.sqrt(d2);
          const f = (1 - d / PUSH_R) * PUSH_F;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        /* lazy spring back to origin */
        p.vx += (p.ox - p.x) * SPRING;
        p.vy += (p.oy - p.y) * SPRING;
        p.vx *= DAMP; p.vy *= DAMP;
        p.x += p.vx; p.y += p.vy;

        /* always visible at low base opacity, brighter near cursor */
        const dist = Math.sqrt((p.x - mx) ** 2 + (p.y - my) ** 2);
        const near = Math.max(0, 1 - dist / VISIBLE_R);
        const alpha = p.op * 0.85 + near * near * 0.45; /* base + cursor boost */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + near * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},70%,65%,${alpha})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    rafId = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", build);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">

      {/* ── Particle sand field ──────────────────────────────────────────────── */}
      <canvas
        ref={particleCanvasRef}
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 2 }}
      />

      {/* ── Ambient gradient glow — follows mouse, no circle ─────────────────── */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 8,
          willChange: "background-image",
        }}
      />

      {/* ── NAVBAR ────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-background/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <span className="font-heading font-bold text-lg tracking-tight">Yalla Viral</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#services"     className="hover:text-white transition-colors">Services</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#portfolio"    className="hover:text-white transition-colors">Portfolio</a>
            <a href="#faq"          className="hover:text-white transition-colors">FAQ</a>
          </div>

          <MagneticButton>
            <a href="https://dashboard.yallaviral.com" target="_blank" rel="noopener noreferrer">
              <Button
                data-testid="button-nav-dashboard"
                className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_-5px_hsl(var(--primary))] transition-all rounded-full px-6"
              >
                Call Center Dashboard →
              </Button>
            </a>
          </MagneticButton>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">

        {/* Grain overlay */}
        <div className="grain-layer z-10" aria-hidden="true" />

        {/* Parallax grid */}
        <motion.div
          style={{ y: gridY }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"
        />

        {/* Parallax orbs */}
        <motion.div
          style={{ y: orb1Y }}
          className="absolute left-0 right-0 top-0 -z-10 m-auto h-[340px] w-[340px] rounded-full bg-primary opacity-[0.18] blur-[110px] will-change-transform"
        />
        <motion.div
          style={{ y: orb2Y }}
          className="absolute right-[-5%] top-16 -z-10 h-[260px] w-[260px] rounded-full bg-secondary opacity-[0.18] blur-[100px] will-change-transform"
        />
        <div className="absolute left-[10%] bottom-10 -z-10 h-[180px] w-[180px] rounded-full bg-primary/30 blur-[90px] animate-pulse" style={{ animationDelay: "1.5s" }} />

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit text-sm font-medium text-cyan-400"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              AI-Powered Agency
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl font-bold font-heading leading-[1.1] tracking-tight text-white"
            >
              Grow Your Business with the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Power of AI
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl"
            >
              We automate your sales, calls, and marketing — so you can focus on what matters.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <div className="flex flex-col gap-1">
                <MagneticButton>
                  <Button
                    data-testid="button-book-demo"
                    size="lg"
                    onClick={openAudit}
                    className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-base shadow-[0_0_30px_-5px_hsl(var(--primary))] transition-shadow hover:shadow-[0_0_50px_-5px_hsl(var(--primary))]"
                  >
                    Get Your Free AI Growth Audit
                  </Button>
                </MagneticButton>
                <p className="text-xs text-muted-foreground/60 text-center pl-1">No credit card required. 100% Free.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Parallax dashboard mockup */}
          <motion.div
            style={{ y: mockY }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative will-change-transform"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl rounded-full" />
            <Card className="relative bg-card/40 backdrop-blur-xl border-white/10 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="space-y-1">
                    <h3 className="font-medium text-white/90">Revenue Growth</h3>
                    <p className="text-sm text-muted-foreground">+148% this month</p>
                  </div>
                  <Activity className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex items-end gap-2 h-48 mt-4">
                  {[40, 25, 45, 30, 60, 50, 85].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 1, delay: 0.6 + i * 0.1 }}
                      className={`flex-1 rounded-t-sm ${i === 6 ? "bg-primary" : "bg-primary/20"}`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ── STATS STRIP (animated counters) ───────────────────────────────── */}
      <section className="py-16 border-y border-white/5 bg-white/[0.015] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users,     value: 500,  suffix: "+",  label: "Clients Served",       decimals: 0 },
              { icon: TrendingUp,value: 148,  suffix: "%",  label: "Avg Revenue Growth",   decimals: 0 },
              { icon: PhoneCall, value: 50,   suffix: "K+", label: "AI Calls Monthly",     decimals: 0 },
              { icon: Clock,     value: 99.9, suffix: "%",  label: "AI Uptime Guaranteed", decimals: 1 },
            ].map((stat, i) => (
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

      {/* ── SERVICES ──────────────────────────────────────────────────────── */}
      <section id="services" className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-4"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-heading">What We Do</h2>
            <p className="text-muted-foreground text-lg">Comprehensive growth solutions powered by cutting-edge artificial intelligence.</p>
          </motion.div>

          <motion.div
            variants={cardContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: HeadphonesIcon, title: "AI Call Centers",       desc: "Automate inbound and outbound calls with conversational AI agents.", color: "text-primary",   showLogin: true  },
              { icon: Share2,         title: "Marketing Automation",  desc: "Intelligent campaigns that nurture leads and convert 24/7.",         color: "text-secondary", showLogin: false },
              { icon: Layout,         title: "Website Design",        desc: "Stunning, conversion-focused websites that capture your brand.",     color: "text-primary",   showLogin: false },
              { icon: PhoneCall,      title: "Social Media",          desc: "Grow your audience with strategic content and engagement.",          color: "text-secondary", showLogin: false },
              { icon: Camera,         title: "Photography & Video",   desc: "Premium visual content that tells your brand's unique story.",      color: "text-primary",   showLogin: false },
              { icon: Settings,       title: "Business Automation",   desc: "Streamline operations with smart, connected workflows.",             color: "text-secondary", showLogin: false },
            ].map((service, i) => (
              <motion.div key={i} variants={cardItem} style={{ willChange: "transform, opacity" }}>
                <Card className="group h-full bg-card/30 border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_35px_-10px_hsl(var(--primary))] backdrop-blur-sm">
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                      <service.icon className={`w-6 h-6 ${service.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold font-heading text-white/90">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                    {service.showLogin && (
                      <a
                        href="https://dashboard.yallaviral.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="button-call-center-login"
                        className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary border border-primary/30 rounded-full px-4 py-2 hover:bg-primary/10 hover:border-primary/60 transition-all w-fit"
                      >
                        <HeadphonesIcon className="w-3.5 h-3.5" /> Client Login
                      </a>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DASHBOARD HIGHLIGHT ───────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden bg-white/[0.02] border-y border-white/5">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent blur-3xl -z-10" />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-2">
                  <HeadphonesIcon className="w-3.5 h-3.5" /> AI Call Center Clients Only
                </div>
                <h2 className="text-3xl md:text-5xl font-bold font-heading leading-tight">Your AI Call Center, Fully Visible</h2>
                <p className="text-xl text-muted-foreground">Our specialized Call Center Dashboard allows AI Voice clients to monitor logs and performance in real-time — giving you complete transparency over every call, recording, and AI interaction.</p>
                <p className="text-sm text-muted-foreground/70 italic">Note: This portal is exclusively for AI Call Center service clients and is not available for other Yalla Viral services.</p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: PhoneCall,  text: "Live Call Logs & Full Recordings" },
                  { icon: Activity,   text: "AI Voice Performance Analytics" },
                  { icon: Calendar,   text: "AI-Booked Appointment Tracking" },
                  { icon: Settings,   text: "Real-Time Call Volume & KPI Reporting" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="bg-secondary/10 p-2 rounded-lg text-secondary shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-lg font-medium text-white/80">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <MagneticButton>
                <a href="https://dashboard.yallaviral.com" target="_blank" rel="noopener noreferrer">
                  <Button
                    data-testid="button-access-dashboard"
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 rounded-full px-8 h-12 text-base font-semibold"
                  >
                    Access AI Call Center Dashboard →
                  </Button>
                </a>
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="relative"
            >
              <Card className="bg-[#0f0f13] border-white/10 shadow-2xl overflow-hidden rounded-2xl">
                <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="p-6 grid grid-cols-2 gap-4">
                  <div className="col-span-2 grid grid-cols-3 gap-4 mb-4">
                    {[
                      { label: "Active Calls", value: 24 },
                      { label: "Conversion",   value: 8.4, suffix: "%" },
                      { label: "Bookings",      value: 156 },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white/5 rounded-lg p-4">
                        <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                        <div className="text-2xl font-bold text-white">
                          <CountUp to={stat.value} suffix={stat.suffix ?? ""} decimals={stat.suffix === "%" ? 1 : 0} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="col-span-2 bg-white/5 rounded-lg p-6 h-48 flex items-end justify-between gap-2">
                    {[30, 45, 25, 60, 75, 45, 90, 85, 100].map((h, i) => (
                      <div key={i} className="w-full bg-primary/20 rounded-t-sm relative group">
                        <div
                          className="absolute bottom-0 w-full bg-gradient-to-t from-primary/80 to-secondary/80 rounded-t-sm transition-all duration-500 group-hover:brightness-125"
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-heading">How It Works</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0" />
            {[
              { num: "01", title: "We Analyze Your Needs",     desc: "We dive deep into your business model to identify growth bottlenecks." },
              { num: "02", title: "We Activate Your AI",       desc: "Our team deploys custom AI agents and automation workflows tailored to you." },
              { num: "03", title: "Track in Real-Time",        desc: "Watch the results roll in via your dedicated client dashboard." },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.18, type: "spring", stiffness: 220, damping: 22 }}
                className="relative flex flex-col items-center text-center gap-6 z-10"
              >
                <div className="w-20 h-20 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-[0_0_24px_-5px_hsl(var(--primary))]">
                  <span className="text-2xl font-bold font-heading text-primary">{step.num}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ─────────────────────────────────────────────────────── */}
      <section id="portfolio" className="py-24 relative z-10">
        <div className="container mx-auto px-4">
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
            {[
              {
                category: "AI Call Center",
                title: "Auto Dealership — 3× More Booked Test Drives",
                desc: "Deployed an outbound AI agent that followed up with 2,400 leads monthly, converting 18% into scheduled appointments.",
                stat: "+312% ROI",
                color: "from-primary/30 to-primary/5",
                border: "border-primary/30",
              },
              {
                category: "Marketing Automation",
                title: "E-Commerce Brand — $1.2M in Automated Revenue",
                desc: "Built a full email + SMS nurture sequence that recovered abandoned carts and upsold repeat customers on autopilot.",
                stat: "+148% Revenue",
                color: "from-secondary/30 to-secondary/5",
                border: "border-secondary/30",
              },
              {
                category: "Website Design",
                title: "Med-Spa Chain — Bookings Up 240%",
                desc: "Redesigned their web presence with conversion-first UX, integrated online booking, and a modern brand identity.",
                stat: "+240% Bookings",
                color: "from-primary/30 to-primary/5",
                border: "border-primary/30",
              },
              {
                category: "Social Media",
                title: "Real Estate Agency — 80K Organic Reach in 90 Days",
                desc: "Created a content strategy and managed posting, growing their Instagram from 900 to 22K followers in three months.",
                stat: "22K Followers",
                color: "from-secondary/30 to-secondary/5",
                border: "border-secondary/30",
              },
              {
                category: "Photography & Video",
                title: "Restaurant Group — Campaign That Went Viral",
                desc: "Produced a cinematic brand film and product shoot that earned 1.4M views organically across social platforms.",
                stat: "1.4M Views",
                color: "from-primary/30 to-primary/5",
                border: "border-primary/30",
              },
              {
                category: "Business Automation",
                title: "Logistics Firm — 60% Fewer Manual Tasks",
                desc: "Connected CRM, billing, and dispatch systems into a single automated workflow, eliminating repetitive human input.",
                stat: "60% Time Saved",
                color: "from-secondary/30 to-secondary/5",
                border: "border-secondary/30",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.09, type: "spring", stiffness: 220, damping: 22 }}
              >
                <Card className={`group h-full bg-card/30 border ${item.border} hover:shadow-[0_0_40px_-10px_hsl(var(--primary))] transition-all duration-300 overflow-hidden`}>
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
            <MagneticButton>
              <Button
                size="lg"
                onClick={openAudit}
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-12 text-base shadow-[0_0_30px_-5px_hsl(var(--primary))] transition-shadow hover:shadow-[0_0_50px_-5px_hsl(var(--primary))]"
              >
                Get Your Free AI Growth Audit
              </Button>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-24 relative bg-white/[0.02] border-t border-white/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">Common Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about working with us.</p>
          </motion.div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              { q: "What is Yalla Viral?",               a: "Yalla Viral is an AI-powered business growth agency that combines advanced automation, conversational AI, and premium creative services to scale your operations." },
              { q: "What services do you offer?",        a: "We provide AI Call Centers, Marketing Automation, Website Design, Social Media Management, and professional Photography & Videography." },
              { q: "How does the AI Call Center work?",  a: "Our AI agents are trained on your business data to handle inbound inquiries, schedule appointments, and perform outbound outreach with human-like conversation capabilities 24/7." },
              { q: "How are your prices determined?",    a: "Pricing is customized based on the scope of automation required, the volume of calls/interactions, and the specific creative services needed. Book a demo for a custom quote." },
              { q: "Do you work remotely?",              a: "Yes, we partner with clients globally. Our team operates entirely remotely while delivering seamless integration with your existing systems." },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="bg-card/40 border border-white/10 rounded-lg px-6 data-[state=open]:border-primary/50 transition-colors"
                >
                  <AccordionTrigger className="text-lg font-medium hover:no-underline py-6">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="py-12 border-t border-white/10 bg-background relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/20 blur-[120px] -z-10 rounded-full" />
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-12">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="font-heading font-bold text-xl">Yalla Viral</span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-xs">
                Powering businesses with AI. Transform your operations and scale effortlessly.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-semibold mb-2">Quick Links</h4>
              <a href="#services"     className="text-muted-foreground hover:text-white text-sm transition-colors">Services</a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-white text-sm transition-colors">How It Works</a>
              <a href="#portfolio"    className="text-muted-foreground hover:text-white text-sm transition-colors">Portfolio</a>
              <a href="https://dashboard.yallaviral.com" className="text-muted-foreground hover:text-white text-sm transition-colors">Client Login</a>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold mb-2">Connect</h4>
              <div className="flex items-center gap-4">
                {[
                  { icon: Instagram, label: "Instagram" },
                  { icon: Linkedin,  label: "LinkedIn"  },
                  { icon: Twitter,   label: "Twitter"   },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 Yalla Viral. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── AUDIT MODAL ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {auditOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAudit}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />

            {/* Modal panel */}
            <motion.div
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
                  boxShadow: "0 0 80px -20px hsl(262 83% 58% / 0.35), 0 0 0 1px rgba(255,255,255,0.06) inset",
                }}
              >
                {/* Close */}
                <button
                  onClick={closeAudit}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Header */}
                <div className="mb-6 space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-1">
                    <Zap className="w-3 h-3" /> 100% Free · No Credit Card
                  </div>
                  <h2 className="text-2xl font-bold font-heading text-white">Get Your Free AI Growth Audit</h2>
                  <p className="text-muted-foreground text-sm">We'll analyze your business and identify the top AI automation opportunities — delivered within 48 hours.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-white/80">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-white/80">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-2 bg-primary hover:bg-primary/90 text-white rounded-xl h-12 text-base font-semibold shadow-[0_0_30px_-5px_hsl(var(--primary))] transition-all disabled:opacity-60"
                  >
                    {submitting ? "Submitting…" : "Submit Audit Request →"}
                  </Button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── SUCCESS TOAST ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 32, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-6 right-6 z-[200] flex items-center gap-3 rounded-2xl border border-white/10 px-5 py-4 shadow-2xl"
            style={{
              background: "rgba(14,12,22,0.90)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 40px -10px hsl(262 83% 58% / 0.4)",
            }}
          >
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white">Thank you! We're analyzing your site.</p>
              <p className="text-xs text-muted-foreground">Expect your AI audit within 48 hours.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
