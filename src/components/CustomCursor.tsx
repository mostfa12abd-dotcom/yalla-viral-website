import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mouse = { x: -200, y: -200 };
    const ring = { x: -200, y: -200 };
    let hovering = false;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      hovering = !!t.closest("button, a, [data-magnetic], input, textarea, select");
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);

    const tick = () => {
      if (dotRef.current) {
        const scale = hovering ? 2.5 : 1;
        dotRef.current.style.transform = `translate(${mouse.x - 5}px, ${mouse.y - 5}px) scale(${scale})`;
        dotRef.current.style.background = hovering
          ? "hsl(189 94% 43%)"
          : "hsl(262 83% 58%)";
      }

      ring.x += (mouse.x - ring.x) * 0.1;
      ring.y += (mouse.y - ring.y) * 0.1;

      if (ringRef.current) {
        const ringScale = hovering ? 2 : 1;
        ringRef.current.style.transform = `translate(${ring.x - 18}px, ${ring.y - 18}px) scale(${ringScale})`;
        ringRef.current.style.borderColor = hovering
          ? "hsl(189 94% 43% / 0.5)"
          : "hsl(262 83% 58% / 0.35)";
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "hsl(262 83% 58%)",
          zIndex: 99999,
          pointerEvents: "none",
          willChange: "transform",
          transition: "background 0.2s, transform 0.15s ease-out",
          mixBlendMode: "screen",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid hsl(262 83% 58% / 0.35)",
          zIndex: 99998,
          pointerEvents: "none",
          willChange: "transform",
          transition: "border-color 0.3s, transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      />
    </>
  );
}
