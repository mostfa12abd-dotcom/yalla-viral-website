// Conic Beams — slow rotating conic gradient beams, very subtle
export function PurpleCyan() {
  return (
    <div style={{ background: "#070C1A", minHeight: "100vh", fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinRev  { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes pulseFade { 0%,100% { opacity:.55; } 50% { opacity:.75; } }
        @keyframes gridPulse { 0%,100% { opacity:.08; } 50% { opacity:.04; } }
        .spin1 { animation: spinSlow 40s linear infinite; }
        .spin2 { animation: spinRev 55s linear infinite; }
        .pulse { animation: pulseFade 8s ease-in-out infinite; }
        .gpulse { animation: gridPulse 10s ease-in-out infinite; }
      `}</style>

      {/* Conic beam 1 — from top-left */}
      <div className="spin1" style={{ position:"absolute", width:900, height:900, top:"-25%", left:"-25%", background:"conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(59,130,246,.12) 20deg, transparent 40deg, transparent 180deg, rgba(37,99,235,.08) 200deg, transparent 220deg, transparent 360deg)", borderRadius:"50%", pointerEvents:"none" }} />

      {/* Conic beam 2 — from right */}
      <div className="spin2" style={{ position:"absolute", width:800, height:800, top:"-10%", right:"-20%", background:"conic-gradient(from 90deg at 50% 50%, transparent 0deg, rgba(96,165,250,.1) 25deg, transparent 50deg, transparent 200deg, rgba(59,130,246,.07) 225deg, transparent 250deg)", borderRadius:"50%", pointerEvents:"none" }} />

      {/* Soft orb glow center */}
      <div className="pulse" style={{ position:"absolute", width:600, height:400, top:"10%", left:"50%", transform:"translateX(-50%)", background:"radial-gradient(ellipse at 50% 50%, rgba(59,130,246,.18) 0%, rgba(37,99,235,.08) 40%, transparent 70%)", filter:"blur(60px)", pointerEvents:"none" }} />

      {/* Bottom orb */}
      <div style={{ position:"absolute", width:500, height:500, bottom:"-20%", left:"20%", background:"radial-gradient(circle, rgba(99,102,241,.25) 0%, transparent 65%)", filter:"blur(90px)", pointerEvents:"none", opacity:.5 }} />

      {/* Grid */}
      <div className="gpulse" style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(59,130,246,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.1) 1px, transparent 1px)", backgroundSize:"44px 44px", maskImage:"linear-gradient(to bottom, black 65%, transparent 100%)", WebkitMaskImage:"linear-gradient(to bottom, black 65%, transparent 100%)", pointerEvents:"none" }} />

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
