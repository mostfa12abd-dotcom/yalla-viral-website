import { Instagram, Linkedin } from "lucide-react";
import { navLinks, socialLinks } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Instagram,
  Linkedin,
};

export function Footer() {
  return (
    <footer className="py-12 border-t border-white/10 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-12">
          <div className="space-y-4">
            <a href="/" className="inline-block font-brand text-xl text-white tracking-wide">
              Yalla Viral
            </a>
            <p className="text-muted-foreground text-sm max-w-xs">
              Powering businesses with AI. Transform your operations and scale effortlessly.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold mb-2">Quick Links</h4>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-muted-foreground hover:text-white text-sm transition-colors">
                {link.label}
              </a>
            ))}
            <a href="https://dashboard.yallaviral.com" className="text-muted-foreground hover:text-white text-sm transition-colors">
              Client Login
            </a>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold mb-2">Connect</h4>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon, label, href }) => {
                const Icon = iconMap[icon];
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; 2025 Yalla Viral. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
