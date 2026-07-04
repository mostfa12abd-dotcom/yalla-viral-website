export function CoralIndigo() {
  return (
    <div style={{ background: "#0A0F1E", minHeight: "100vh", fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes gridMove3 { from { transform: translateY(0); } to { transform: translateY(60px); } }
        .grid-bg3 {
          position: absolute; inset: 0; pointer-events: none;
          background-image: linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridMove3 8s linear infinite;
        }
        .btn-blue3 { background: linear-gradient(135deg,#3B82F6,#2563EB); transition: opacity .2s; }
        .btn-blue3:hover { opacity:.85; }
      `}</style>
      <div className="grid-bg3" />

      {/* Navbar */}
      <nav style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 48px", borderBottom: "1px solid rgba(59,130,246,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#3B82F6,#2563EB)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 14 }}>Y</div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>Yalla <span style={{ color: "#3B82F6" }}>Viral</span></span>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {["Services", "Try Our AI", "Web Demos"].map(l => (
            <span key={l} style={{ color: "#94A3B8", fontSize: 14, cursor: "pointer" }}>{l}</span>
          ))}
        </div>
        <button style={{ border: "1px solid #3B82F6", color: "#3B82F6", background: "transparent", padding: "8px 20px", borderRadius: 8, fontSize: 14, cursor: "pointer" }}>Client Login</button>
      </nav>

      {/* Hero */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "72px 48px 48px" }}>
        {/* Badge — CORAL/ORANGE accent */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.35)", borderRadius: 999, padding: "6px 16px", marginBottom: 32 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#F97316", display: "inline-block" }} />
          <span style={{ color: "#F97316", fontSize: 13, fontWeight: 500 }}>New: Multilingual AI Voice Agents</span>
        </div>

        {/* Headline — blue on first word, coral on second */}
        <h1 style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, color: "#fff", margin: "0 0 24px", maxWidth: 800, marginLeft: "auto", marginRight: "auto" }}>
          Solutions That <span style={{ color: "#3B82F6" }}>Generate Leads</span>,<br />
          <span style={{ color: "#F97316" }}>Answer Calls</span> &amp; Grow Revenue
        </h1>

        <p style={{ color: "#94A3B8", fontSize: 18, maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.7 }}>
          Yalla Viral helps businesses automate customer interactions, strengthen their online presence, and accelerate growth through AI call centers, websites, marketing, and custom automation.
        </p>

        {/* CTA — BLUE (unchanged) */}
        <button className="btn-blue3" style={{ boxShadow: "0 0 40px rgba(59,130,246,0.25)", color: "#fff", border: "none", padding: "16px 36px", borderRadius: 999, fontSize: 16, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
          Get Your Free AI Growth Audit →
        </button>
        <p style={{ color: "#64748B", fontSize: 13, marginTop: 12 }}>No credit card required. 100% Free.</p>
      </div>

      {/* Stat cards — blue / coral / indigo */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", gap: 20, justifyContent: "center", padding: "0 48px 64px" }}>
        {[
          { num: "200%", label: "Average ROI", accent: "#3B82F6" },
          { num: "24/7", label: "AI Coverage", accent: "#F97316" },
          { num: "3×", label: "Faster Growth", accent: "#6366F1" },
        ].map(({ num, label, accent }) => (
          <div key={label} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${accent}33`, borderRadius: 16, padding: "28px 40px", textAlign: "center", flex: 1, maxWidth: 220 }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: accent, marginBottom: 6 }}>{num}</div>
            <div style={{ color: "#94A3B8", fontSize: 14 }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
