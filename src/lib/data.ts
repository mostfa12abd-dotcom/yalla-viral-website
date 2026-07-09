import { HeadphonesIcon, Share2, Layout, PhoneCall, Bot, Settings, Users, TrendingUp, Clock } from "lucide-react";
import type { CardStackItem } from "@/components/custom/CardStack";

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#try-ai", label: "Try Our AI" },
  { href: "#web-demos", label: "Web Demos" },
];

export const stats = [
  { icon: Users,     value: 500,  suffix: "+",  label: "Clients Served",       decimals: 0 },
  { icon: TrendingUp,value: 148,  suffix: "%",  label: "Avg Revenue Growth",   decimals: 0 },
  { icon: PhoneCall, value: 50,   suffix: "K+", label: "AI Calls Monthly",     decimals: 0 },
  { icon: Clock,     value: 99.9, suffix: "%",  label: "AI Uptime Guaranteed", decimals: 1 },
];
export const services = [
  { icon: HeadphonesIcon, title: "AI Call Centers",       desc: "Automate inbound and outbound calls with conversational AI agents.", color: "text-blue-400",   showLogin: true  },
  { icon: Share2,         title: "Marketing Automation",  desc: "Intelligent campaigns that nurture leads and convert 24/7.",         color: "text-sky-400",   showLogin: false },
  { icon: Layout,         title: "Website Design",        desc: "Stunning, conversion-focused websites that capture your brand.",     color: "text-indigo-400", showLogin: false },
  { icon: PhoneCall,      title: "Social Media",          desc: "Grow your audience with strategic content and engagement.",          color: "text-blue-300",  showLogin: false },
  { icon: Bot,            title: "AI Business Agents",     desc: "Custom AI agents that handle your sales, support, and operations — so you can focus on growth.",  color: "text-sky-300",   showLogin: false },
  { icon: Settings,       title: "Business Automation",   desc: "Streamline operations with smart, connected workflows.",             color: "text-blue-400",  showLogin: false },
];

export const portfolioItems = [
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
    category: "AI Business Agents",
    title: "Restaurant Group — Bookings on Autopilot",
    desc: "Deployed an AI agent that handled reservations, follow-ups, and customer queries around the clock — no staff required.",
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
];



export const howItWorksSteps = [
  { num: "01", title: "We Analyze Your Needs",     desc: "We dive deep into your business model to identify growth bottlenecks." },
  { num: "02", title: "We Activate Your AI",       desc: "Our team deploys custom AI agents and automation workflows tailored to you." },
  { num: "03", title: "Track in Real-Time",        desc: "Watch the results roll in via your dedicated client dashboard." },
];

export const socialLinks = [
  { icon: "Instagram", label: "Instagram", href: "https://www.instagram.com/yallaviral.qa" },
  { icon: "Linkedin",  label: "LinkedIn",  href: "#" },
  { icon: "Twitter",   label: "Twitter",   href: "#" },
];

export const revenueChartData = [40, 25, 45, 30, 60, 50, 85];

function screenshotUrl(url: string): string {
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot&device=desktop&width=1280&height=800`;
}

export const webDemoItems: CardStackItem[] = [
  {
    id: 1,
    title: "Pickl",
    description: "Live website demo — Pickl by Yalla Viral.",
    href: "https://pickl.yallaviral.com/",
    imageSrc: screenshotUrl("https://pickl.yallaviral.com/"),
  },
  {
    id: 2,
    title: "Hotel",
    description: "Live website demo — Hotel by Yalla Viral.",
    href: "https://hotel.yallaviral.com/",
    imageSrc: screenshotUrl("https://hotel.yallaviral.com/"),
  },
];