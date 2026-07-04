import { motion, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticButton({ children, strength = 0.38, className = "" }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 180, damping: 18, mass: 0.6 });
  const y = useSpring(0, { stiffness: 180, damping: 18, mass: 0.6 });
  const [mobile, setMobile] = useState(false);
  useEffect(() => { setMobile(window.innerWidth < 768); }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mobile) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const handleMouseLeave = () => {
    if (mobile) return;
    x.set(0);
    y.set(0);
  };

  if (mobile) {
    return <div className={className} style={{ display: "inline-block" }}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      data-magnetic
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
