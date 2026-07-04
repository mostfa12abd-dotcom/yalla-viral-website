import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/lib/data";


export function Navbar() {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const curY = window.scrollY;
      if (curY > lastY.current && curY > 60) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastY.current = curY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-background/50 backdrop-blur-xl transition-transform duration-150 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center">
        <div className="flex-1 flex justify-start">
          <a href="/" className="font-brand text-xl text-white tracking-wide">
            Yalla Viral
          </a>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex-1" />
      </div>
    </nav>
  );
}
