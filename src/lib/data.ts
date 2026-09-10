import { HeadphonesIcon, Share2, Layout, PhoneCall, Bot, Settings } from "lucide-react";
import type { CardStackItem } from "@/components/custom/CardStack";

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#try-ai", label: "Try Our AI" },
  { href: "#web-demos", label: "Web Demos" },
];

export const services = [
  { icon: HeadphonesIcon, title: "AI Call Centers",       desc: "Automate inbound and outbound calls with conversational AI agents.", color: "text-blue-400",   showLogin: true  },
  { icon: Share2,         title: "Marketing Automation",  desc: "Intelligent campaigns that nurture leads and convert 24/7.",         color: "text-sky-400",   showLogin: false },
  { icon: Layout,         title: "Website Design",        desc: "Stunning, conversion-focused websites that capture your brand.",     color: "text-indigo-400", showLogin: false },
  { icon: PhoneCall,      title: "Social Media",          desc: "Grow your audience with strategic content and engagement.",          color: "text-blue-300",  showLogin: false },
  { icon: Bot,            title: "AI Business Agents",     desc: "Custom AI agents that handle your sales, support, and operations — so you can focus on growth.",  color: "text-sky-300",   showLogin: false },
  { icon: Settings,       title: "Business Automation",   desc: "Streamline operations with smart, connected workflows.",             color: "text-blue-400",  showLogin: false },
];

export const socialLinks = [
  { icon: "Instagram", label: "Instagram", href: "https://www.instagram.com/yallaviral.qa/?utm_source=ig_web_button_share_sheet" },
  { icon: "Linkedin",  label: "LinkedIn",  href: "https://www.linkedin.com/company/yalla-viral/" },
];

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
  {
    id: 3,
    title: "Haddad & Karam LLP",
    description: "Bilingual law firm website — Haddad & Karam by Yalla Viral.",
    href: "/haddad-karam-law/",
    imageSrc: screenshotUrl("https://yalla-viral-website.vercel.app/haddad-karam-law/"),
  },
];