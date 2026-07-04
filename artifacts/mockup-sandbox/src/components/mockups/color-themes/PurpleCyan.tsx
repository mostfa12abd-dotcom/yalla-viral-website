import React from 'react';
import { ArrowRight, Bot, PhoneCall, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';

export function PurpleCyan() {
  return (
    <div className="relative min-h-screen bg-[#0D0A1E] text-slate-200 overflow-hidden font-sans flex flex-col items-center">
      {/* Animated Background Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(124, 58, 237, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse at top center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at top center, black, transparent 80%)',
          animation: 'grid-scroll 20s linear infinite',
        }}
      />
      <style>{`
        @keyframes grid-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(4rem); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* Decorative Glows */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full z-0 blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(6, 182, 212, 0.05) 50%, transparent 100%)',
          animation: 'pulse-glow 8s ease-in-out infinite'
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col flex-grow">
        {/* Navbar */}
        <nav className="flex items-center justify-between py-6 border-b border-white/5">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all duration-300">
              Y
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">Yalla Viral</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#" className="hover:text-cyan-400 transition-colors">Services</a>
            <a href="#" className="hover:text-violet-400 transition-colors">Try Our AI</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Web Demos</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden md:block text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Log in
            </button>
            <button className="px-4 py-2 text-sm font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-sm transition-all duration-300 hover:border-violet-500">
              Book a Call
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex-grow flex flex-col items-center justify-center text-center py-20 lg:py-32">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-8 animate-[float_6s_ease-in-out_infinite]">
            <Sparkles className="w-4 h-4" />
            <span>Next-Gen AI Business Automation</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl mb-6">
            Solutions That <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 drop-shadow-[0_0_20px_rgba(124,58,237,0.3)]">Generate Leads</span>,<br />
            Answer Calls & Grow Revenue
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mb-10 leading-relaxed">
            Yalla Viral helps businesses automate customer interactions, strengthen their online presence, and accelerate growth through AI call centers, websites, marketing, and custom automation.
          </p>

          {/* CTA Area */}
          <div className="flex flex-col items-center gap-4">
            <button className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 hover:from-violet-500 to-indigo-600 hover:to-indigo-500 text-white font-bold rounded-full text-lg overflow-hidden transition-all duration-300 shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_40px_rgba(124,58,237,0.6)] hover:scale-105 active:scale-95">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full blur-xl" />
              <span className="relative">Get Your Free AI Growth Audit</span>
              <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-sm text-slate-500 flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
              No credit card required. 100% Free.
            </p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full max-w-5xl">
            {/* Card 1: Violet */}
            <div className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] transition-colors duration-300 overflow-hidden flex flex-col items-start text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-violet-500/20 transition-colors" />
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-4 shadow-[0_0_15px_rgba(124,58,237,0.15)] group-hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-shadow">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">200%</h3>
              <p className="text-sm font-medium text-violet-300 mb-2">Average ROI</p>
              <p className="text-sm text-slate-400">Our clients see measurable returns within the first 60 days of implementing our AI solutions.</p>
            </div>

            {/* Card 2: Cyan */}
            <div className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] transition-colors duration-300 overflow-hidden flex flex-col items-start text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-500/20 transition-colors" />
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-shadow">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">24/7</h3>
              <p className="text-sm font-medium text-cyan-300 mb-2">AI Coverage</p>
              <p className="text-sm text-slate-400">Never miss a lead. Our intelligent voice agents answer calls, book appointments, and qualify prospects round-the-clock.</p>
            </div>

            {/* Card 3: Indigo */}
            <div className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] transition-colors duration-300 overflow-hidden flex flex-col items-start text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-colors" />
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 shadow-[0_0_15px_rgba(79,70,229,0.15)] group-hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-shadow">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">3x</h3>
              <p className="text-sm font-medium text-indigo-300 mb-2">Faster Growth</p>
              <p className="text-sm text-slate-400">Automate repetitive tasks and focus on scaling your business with custom-built workflows.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
