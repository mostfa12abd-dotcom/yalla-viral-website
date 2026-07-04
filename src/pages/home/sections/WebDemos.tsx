import { useState, useCallback } from "react";
import { MotionDiv, AnimatedPresence } from "@/lib/MotionSafe";
import { CardStack, type CardStackItem } from "@/components/custom/CardStack";
import { webDemoItems } from "@/lib/data";
import { X, Maximize2 } from "lucide-react";

export function WebDemos() {
  const [fullscreen, setFullscreen] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<CardStackItem>(webDemoItems[0]!);

  const handleChangeIndex = useCallback((_index: number, item: CardStackItem) => {
    setActiveItem(item);
  }, []);

  return (
    <section id="web-demos" className="min-h-dvh section-py relative overflow-hidden">
      <div className="container-fluid">
        <MotionDiv
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12 space-y-3"
        >
          <h2 className="text-fluid-heading font-bold font-heading">Live Web Demos</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Click a demo to preview — swipe left/right to browse.
          </p>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4"
        >
          {activeItem && (
            <div className="text-center min-h-[3rem]">
              <div className="text-xs font-medium text-white/40">{activeItem.title}</div>
              {activeItem.description && (
                <div className="text-[11px] text-white/30 mt-0.5">{activeItem.description}</div>
              )}
            </div>
          )}
          <CardStack
            items={webDemoItems}
            cardWidth={480}
            cardHeight={300}
            overlap={0.55}
            activeScale={1.12}
            inactiveScale={0.85}
            loop={true}
            autoAdvance={false}
            onChangeIndex={handleChangeIndex}
            renderCard={(item, { active }) => (
              <DemoCard item={item} active={active} onFullscreen={setFullscreen} />
            )}
          />
        </MotionDiv>
      </div>

      <AnimatedPresence>
        {fullscreen && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setFullscreen(null)}
          >
            <button
              onClick={() => setFullscreen(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <MotionDiv
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-6xl aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={fullscreen}
                title="Fullscreen Demo"
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin"
              />
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatedPresence>
    </section>
  );
}

function DemoCard({
  item,
  active,
  onFullscreen,
}: {
  item: (typeof webDemoItems)[number];
  active: boolean;
  onFullscreen: (href: string | null) => void;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden group">
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="absolute inset-0 animate-[beam_8s_ease-in-out_infinite] bg-[linear-gradient(90deg,transparent_10%,rgba(80,80,80,0.25)_30%,rgba(100,100,100,0.15)_50%,rgba(80,80,80,0.10)_70%,transparent_90%)] will-change-transform" />
      </div>
      <div
        style={{
          width: 1280,
          height: 800,
          transform: "scale(0.375)",
          transformOrigin: "top left",
        }}
      >
        {item.href ? (
          <iframe
            src={item.href}
            title={item.title}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            style={{ width: 1280, height: 800, border: 0, pointerEvents: active ? "auto" : "none" }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-3">
                <Maximize2 className="w-5 h-5 text-white/50" />
              </div>
              <p className="text-white/40 text-xs">Preview unavailable</p>
            </div>
          </div>
        )}
      </div>

      {!active && (
        <div className="absolute inset-0 bg-black/50 backdrop-brightness-50" />
      )}

      {active && item.href && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFullscreen(item.href!);
          }}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-sm"
          aria-label="Open fullscreen"
        >
          <Maximize2 className="w-4 h-4 text-white" />
        </button>
      )}
    </div>
  );
}
