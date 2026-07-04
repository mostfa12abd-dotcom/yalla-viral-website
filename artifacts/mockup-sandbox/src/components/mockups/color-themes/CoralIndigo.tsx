import React, { useEffect, useState } from 'react';
import { Sparkles, PhoneCall, TrendingUp, ArrowRight, Zap, Bot } from 'lucide-react';

export function CoralIndigo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div 
      className="relative min-h-[100dvh] w-full overflow-hidden text-slate-200 font-sans"
      style={{ backgroundColor: '#080B14' }}
    >
      {/* Animated CSS Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'gridMove 20s linear infinite',
        }}
      />
      
      {/* Ambient Glows */}
      <div 
        className="absolute top-0 right-1/4 w-[800px] h-[800px] z-0 opacity-30 pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(67, 56, 202, 0.4) 0%, transparent 60%)',
          filter: 'blur(100px)',
        }}
      />
      <div 
        className="absolute bottom-0 left-1/4 w-[600px] h-[600px] z-0 opacity-20 pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(234, 88, 12, 0.4) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      <style>{`
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(40px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.4)]">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Yalla Viral</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-300">
          <a href="#" className="hover:text-orange-400 transition-colors">Services</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Try Our AI</a>
          <a href="#" className="hover:text-rose-400 transition-colors">Web Demos</a>
        </div>
        <button className="px-6 py-2.5 text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all hidden sm:block">
          Client Login
        </button>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32 flex flex-col items-center text-center">
        
        {/* Badge */}
        <div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 mb-8 backdrop-blur-sm"
          style={{ animation: 'float 6s ease-in-out infinite' }}
        >
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-semibold text-orange-300 uppercase tracking-wider">AI-Powered Growth Engine</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white max-w-5xl leading-[1.1] mb-8 tracking-tight">
          Solutions That <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-500 to-orange-500">Generate Leads</span>, Answer Calls & Grow Revenue
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mb-12 leading-relaxed">
          Yalla Viral helps businesses automate customer interactions, strengthen their online presence, and accelerate growth through AI call centers, websites, marketing, and custom automation.
        </p>

        {/* CTA Area */}
        <div className="flex flex-col items-center gap-4 mb-24 w-full">
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-600 rounded-full text-white font-bold text-lg hover:from-orange-400 hover:to-rose-500 transition-all overflow-hidden shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:shadow-[0_0_60px_rgba(244,63,94,0.6)] w-full sm:w-auto justify-center">
            <span className="relative z-10">Get Your Free AI Growth Audit</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>
          <span className="text-sm text-slate-500 font-medium">No credit card required. 100% Free.</span>
        </div>

        {/* Stats / Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          
          {/* Card 1: Coral */}
          <div className="group relative p-8 rounded-3xl bg-[#0F1423] border border-orange-500/20 hover:border-orange-500/40 transition-all overflow-hidden">
            <div className="absolute -top-6 -right-6 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
              <TrendingUp className="w-48 h-48 text-orange-500 rotate-12" />
            </div>
            <div className="relative z-10 flex flex-col items-start text-left">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center mb-6 border border-orange-500/20 group-hover:scale-110 transition-transform duration-500">
                <TrendingUp className="w-7 h-7 text-orange-400" />
              </div>
              <h3 className="text-5xl font-black text-white mb-3 tracking-tight">200%</h3>
              <p className="text-orange-300 font-semibold text-lg mb-2">Average ROI</p>
              <p className="text-sm text-slate-500 leading-relaxed">Clients see massive returns within the first 90 days of implementation.</p>
            </div>
          </div>

          {/* Card 2: Indigo */}
          <div className="group relative p-8 rounded-3xl bg-[#0F1423] border border-indigo-500/20 hover:border-indigo-500/40 transition-all overflow-hidden transform md:-translate-y-6 shadow-[0_20px_40px_-15px_rgba(67,56,202,0.15)]">
            <div className="absolute -top-6 -right-6 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
              <PhoneCall className="w-48 h-48 text-indigo-500 -rotate-12" />
            </div>
            <div className="relative z-10 flex flex-col items-start text-left">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 flex items-center justify-center mb-6 border border-indigo-500/20 group-hover:scale-110 transition-transform duration-500">
                <PhoneCall className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="text-5xl font-black text-white mb-3 tracking-tight">24/7</h3>
              <p className="text-indigo-300 font-semibold text-lg mb-2">AI Coverage</p>
              <p className="text-sm text-slate-500 leading-relaxed">Never miss a lead. Our AI agents handle inquiries around the clock without breaks.</p>
            </div>
          </div>

          {/* Card 3: Rose */}
          <div className="group relative p-8 rounded-3xl bg-[#0F1423] border border-rose-500/20 hover:border-rose-500/40 transition-all overflow-hidden">
            <div className="absolute -top-6 -right-6 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
              <Zap className="w-48 h-48 text-rose-500 rotate-12" />
            </div>
            <div className="relative z-10 flex flex-col items-start text-left">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-500/5 flex items-center justify-center mb-6 border border-rose-500/20 group-hover:scale-110 transition-transform duration-500">
                <Zap className="w-7 h-7 text-rose-400" />
              </div>
              <h3 className="text-5xl font-black text-white mb-3 tracking-tight">3x</h3>
              <p className="text-rose-300 font-semibold text-lg mb-2">Faster Growth</p>
              <p className="text-sm text-slate-500 leading-relaxed">Accelerate your business timeline with automated smart marketing and outreach.</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
