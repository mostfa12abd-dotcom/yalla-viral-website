// Particle Drift — tiny glowing dots drifting upward, pure CSS
export function CoralIndigo() {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 11) % 100}%`,
    size: 1.5 + (i % 3) * 1,
    delay: `${(i * 0.6) % 9}s`,
    duration: `${10 + (i % 7) * 2}s`,
    opacity: 0.3 + (i % 4) * 0.12,
  }));

  return (
    <div style={{ background: "#070C1A", minHeight: "100vh", fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes drift {
          0%   { transform: translateY(100vh) translateX(0px); opacity: 0; }
          10%  { opacity: var(--op, .4); }
          90%  { opacity: var(--op, .4); }
          100% { transform: translateY(-80px) translateX(var(--dx, 20px)); opacity: 0; }
        }
        @keyframes wobble {
          0%,100% { transform: translateX(0); }
          50%      { transform: translateX(var(--dx, 15px)); }
        }
        @keyframes orbPulse {
          0%,100% { opacity:.5; transform:scale(1); }
          50%      { opacity:.7; transform:scale(1.06); }
        }
        @keyframes orbPulse2 {
          0%,100% { opacity:.35; transform:scale(1); }
          50%      { opacity:.5; transform:scale(.94); }
        }
        .orb1p { animation: orbPulse 12s ease-in-out infinite; }
        .orb2p { animation: orbPulse2 16s ease-in-out infinite; }
        .gridp { animation: orbPulse 14s ease-in-out infinite; }
      `}</style>

      {/* Orbs */}
      <div className="orb1p" style={{ position:"absolute", width:620, height:620, borderRadius:"50%", background:"radial-gradient(circle at 40% 40%, rgba(37,99,235,.6) 0%, rgba(59,130,246,.22) 45%, transparent 70%)", top:"-18%", left:"-12%", filter:"blur(85px)", pointerEvents:"none" }} />
      <div className="orb2p" style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle at 50% 50%, rgba(14,165,233,.45) 0%, rgba(56,189,248,.18) 50%, transparent 70%)", top:"8%", right:"-10%", filter:"blur(100px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:420, height:420, borderRadius:"50%", background:"radial-gradient(circle, rgba(99,102,241,.35) 0%, transparent 65%)", bottom:"-8%", left:"32%", filter:"blur(110px)", opacity:.6, pointerEvents:"none" }} />

      {/* Particles */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: "absolute",
          bottom: -10,
          left: p.left,
          width: p.size,
          height: p.size,
          borderRadius: "50%",
          background: `rgba(96,165,250,${p.opacity})`,
          boxShadow: `0 0 ${p.size * 3}px rgba(59,130,246,${p.opacity * .8})`,
          animation: `drift ${p.duration} ${p.delay} ease-in-out infinite`,
          ["--dx" as string]: `${((p.id * 13) % 40) - 20}px`,
          ["--op" as string]: p.opacity,
          pointerEvents: "none",
        }} />
      ))}

      {/* Grid */}
      <div className="gridp" style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(59,130,246,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.1) 1px, transparent 1px)", backgroundSize:"44px 44px", maskImage:"linear-gradient(to bottom, black 65%, transparent 100%)", WebkitMaskImage:"linear-gradient(to bottom, black 65%, transparent 100%)", pointerEvents:"none" }} />

      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:1, background:"linear-gradient(to right, transparent, rgba(59,130,246,.3), transparent)" }} />

      {/* Content */}
      <nav style={{ position:"relative", zIndex:10, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px 48px", borderBottom:"1px solid rgba(59,130,246,.12)" }}>
        <span style={{ color:"#fff", fontWeight:700, fontSize:18 }}>Yalla <span style={{ color:"#3B82F6" }}>Viral</span></span>
        <div style={{ display:"flex", gap:32 }}>
          {["Services","Try Our AI","Web Demos"].map(l => <span key={l} style={{ color:"#94A3B8", fontSize:14 }}>{l}</span>)}
        </div>
        <button style={{ border:"1px solid rgba(59,130,246,.4)", color:"#3B82F6", background:"transparent", padding:"8px 20px", borderRadius:8, fontSize:14 }}>Client Login</button>
      </nav>

      <div style={{ position:"relative", zIndex:10, textAlign:"center", padding:"80px 48px 60px" }}>
        <span style={{ color:"#3B82F6", fontWeight:600, fontSize:13, letterSpacing:"0.1em", textTransform:"uppercase" }}>Yalla Viral</span>
        <h1 style={{ fontSize:60, fontWeight:800, lineHeight:1.1, color:"#fff", margin:"16px auto 24px", maxWidth:820 }}>
          Solutions That Generate Leads,<br />Answer Calls &amp; Grow Revenue
        </h1>
        <p style={{ color:"#94A3B8", fontSize:18, maxWidth:580, margin:"0 auto 44px", lineHeight:1.7 }}>
          Yalla Viral helps businesses automate customer interactions and accelerate growth through AI call centers, websites, marketing, and custom automation.
        </p>
        <button style={{ background:"linear-gradient(135deg,#3B82F6,#2563EB)", color:"#fff", border:"none", padding:"15px 36px", borderRadius:999, fontSize:16, fontWeight:600, cursor:"pointer", boxShadow:"0 0 48px rgba(59,130,246,.3)" }}>
          Get Your Free AI Growth Audit →
        </button>
        <p style={{ color:"#4B5563", fontSize:13, marginTop:12 }}>No credit card required. 100% Free.</p>
      </div>
    </div>
  );
}
