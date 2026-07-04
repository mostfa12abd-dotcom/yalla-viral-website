// Aurora Flow — smooth slow-moving aurora layers, CSS only
export function GoldEmerald() {
  return (
    <div style={{ background: "#070C1A", minHeight: "100vh", fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes aurora1 {
          0%,100% { transform: translate(0%,0%) scale(1); opacity:.55; }
          33%      { transform: translate(6%,-8%) scale(1.12); opacity:.7; }
          66%      { transform: translate(-5%,5%) scale(.95); opacity:.5; }
        }
        @keyframes aurora2 {
          0%,100% { transform: translate(0%,0%) scale(1); opacity:.4; }
          40%      { transform: translate(-8%,6%) scale(1.15); opacity:.6; }
          80%      { transform: translate(7%,-4%) scale(.9); opacity:.35; }
        }
        @keyframes aurora3 {
          0%,100% { transform: translate(0%,0%) scale(1); opacity:.3; }
          50%      { transform: translate(5%,8%) scale(1.1); opacity:.5; }
        }
        @keyframes aurora4 {
          0%,100% { transform: translate(0%,0%) scale(1); opacity:.2; }
          60%      { transform: translate(-6%,-6%) scale(1.2); opacity:.38; }
        }
        @keyframes gridFade {
          0%,100% { opacity:.07; } 50% { opacity:.04; }
        }
        .a1 { animation: aurora1 18s ease-in-out infinite; }
        .a2 { animation: aurora2 23s ease-in-out infinite; }
        .a3 { animation: aurora3 28s ease-in-out infinite; }
        .a4 { animation: aurora4 20s ease-in-out infinite; }
        .agrid { animation: gridFade 12s ease-in-out infinite; }
      `}</style>

      {/* Aurora blobs */}
      <div className="a1" style={{ position:"absolute", width:700, height:700, borderRadius:"50%", background:"radial-gradient(circle at 40% 40%, rgba(37,99,235,.65) 0%, rgba(59,130,246,.25) 45%, transparent 70%)", top:"-20%", left:"-12%", filter:"blur(90px)", pointerEvents:"none" }} />
      <div className="a2" style={{ position:"absolute", width:550, height:550, borderRadius:"50%", background:"radial-gradient(circle at 50% 50%, rgba(14,165,233,.55) 0%, rgba(56,189,248,.2) 45%, transparent 70%)", top:"5%", right:"-10%", filter:"blur(100px)", pointerEvents:"none" }} />
      <div className="a3" style={{ position:"absolute", width:480, height:480, borderRadius:"50%", background:"radial-gradient(circle at 50% 50%, rgba(99,102,241,.45) 0%, rgba(139,92,246,.15) 50%, transparent 70%)", bottom:"-10%", left:"30%", filter:"blur(110px)", pointerEvents:"none" }} />
      <div className="a4" style={{ position:"absolute", width:360, height:360, borderRadius:"50%", background:"radial-gradient(circle at 50% 50%, rgba(59,130,246,.4) 0%, rgba(96,165,250,.1) 50%, transparent 70%)", top:"40%", left:"55%", filter:"blur(80px)", pointerEvents:"none" }} />

      {/* Grid */}
      <div className="agrid" style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(59,130,246,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.12) 1px, transparent 1px)", backgroundSize:"44px 44px", maskImage:"linear-gradient(to bottom, black 60%, transparent 100%)", WebkitMaskImage:"linear-gradient(to bottom, black 60%, transparent 100%)", pointerEvents:"none" }} />

      {/* Bottom fade */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:1, background:"linear-gradient(to right, transparent, rgba(59,130,246,.3), transparent)", pointerEvents:"none" }} />

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
