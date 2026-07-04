import React from 'react';
import { ArrowRight, BarChart3, Clock, TrendingUp, ShieldCheck } from 'lucide-react';

export function GoldEmerald() {
  return (
    <div className="relative min-h-[100dvh] bg-[#0A0F1E] text-white font-sans overflow-hidden flex flex-col">
      {/* Background Grid & Glows */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        .bg-grid-pattern {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(20, 184, 166, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(20, 184, 166, 0.05) 1px, transparent 1px);
          animation: gridMove 20s linear infinite;
        }
      `}} />
      
      <div className="absolute inset-0 bg-grid-pattern z-0" />
      
      {/* Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#F59E0B] opacity-[0.08] blur-[120px] z-0 pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#10B981] opacity-[0.06] blur-[150px] z-0 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-[#14B8A6] opacity-[0.05] blur-[100px] z-0 pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-10 w-full border-b border-[#F59E0B]/10 bg-[#0A0F1E]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(245,158,11,0.4)]">
              Y
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Yalla <span className="text-[#F59E0B]">Viral</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#" className="text-gray-300 hover:text-[#F59E0B] transition-colors">Services</a>
            <a href="#" className="text-gray-300 hover:text-[#10B981] transition-colors">Try Our AI</a>
            <a href="#" className="text-gray-300 hover:text-[#14B8A6] transition-colors">Web Demos</a>
          </div>
          
          <button className="hidden md:flex px-5 py-2.5 rounded-full text-sm font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 hover:bg-[#10B981]/20 transition-all shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            Client Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-24 text-center max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 mb-8 backdrop-blur-sm shadow-[0_0_20px_rgba(245,158,11,0.1)]">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
          <span className="text-sm font-semibold text-[#F59E0B]">New: Multilingual AI Voice Agents</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
          Solutions That <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#D97706] drop-shadow-sm">
            Generate Leads
          </span>, Answer Calls <br className="hidden md:block"/>
          & Grow Revenue
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Yalla Viral helps businesses automate customer interactions, strengthen their online presence, and accelerate growth through AI call centers, websites, marketing, and custom automation.
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 mb-20">
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#F59E0B] to-[#D97706] rounded-full text-white text-lg font-bold shadow-[0_0_40px_rgba(245,158,11,0.3)] hover:shadow-[0_0_60px_rgba(245,158,11,0.5)] hover:scale-105 transition-all duration-300">
            Get Your Free AI Growth Audit
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 rounded-full ring-2 ring-white/20" />
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <span>No credit card required. 100% Free.</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Card 1: Gold */}
          <div className="relative group bg-[#0A0F1E]/50 backdrop-blur-xl border border-[#F59E0B]/20 rounded-2xl p-6 hover:border-[#F59E0B]/50 transition-colors overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B]/10 rounded-full blur-[40px] -mr-16 -mt-16 transition-opacity group-hover:opacity-100 opacity-0" />
            <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center mb-4 border border-[#F59E0B]/20">
              <TrendingUp className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <div className="text-3xl font-bold text-white mb-2 tracking-tight">200%</div>
            <div className="text-gray-400 font-medium">Average ROI</div>
          </div>

          {/* Card 2: Emerald */}
          <div className="relative group bg-[#0A0F1E]/50 backdrop-blur-xl border border-[#10B981]/20 rounded-2xl p-6 hover:border-[#10B981]/50 transition-colors overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/10 rounded-full blur-[40px] -mr-16 -mt-16 transition-opacity group-hover:opacity-100 opacity-0" />
            <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center mb-4 border border-[#10B981]/20">
              <Clock className="w-6 h-6 text-[#10B981]" />
            </div>
            <div className="text-3xl font-bold text-white mb-2 tracking-tight">24/7</div>
            <div className="text-gray-400 font-medium">AI Coverage</div>
          </div>

          {/* Card 3: Teal */}
          <div className="relative group bg-[#0A0F1E]/50 backdrop-blur-xl border border-[#14B8A6]/20 rounded-2xl p-6 hover:border-[#14B8A6]/50 transition-colors overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#14B8A6]/10 rounded-full blur-[40px] -mr-16 -mt-16 transition-opacity group-hover:opacity-100 opacity-0" />
            <div className="w-12 h-12 rounded-xl bg-[#14B8A6]/10 flex items-center justify-center mb-4 border border-[#14B8A6]/20">
              <BarChart3 className="w-6 h-6 text-[#14B8A6]" />
            </div>
            <div className="text-3xl font-bold text-white mb-2 tracking-tight">3x</div>
            <div className="text-gray-400 font-medium">Faster Growth</div>
          </div>
        </div>
      </main>
    </div>
  );
}
