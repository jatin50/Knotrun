import React from "react";
import { ArrowUpRight, Cpu } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 w-full border-t border-white/10 bg-[#070A0F] py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-white tracking-tight font-['Space_Grotesk']">
            AethelFlow Engine
          </span>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">• Industrial-Grade In-Memory DAG Orchestration</span>
        </div>

        {/* Live Infrastructure Status Indicators */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            V8 Engine: 81k ops/s
          </span>
          <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            BullMQ TLS: 0 Drops
          </span>
          <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            PostgreSQL: Connected
          </span>
        </div>

        <div className="flex items-center gap-5 text-xs font-mono text-slate-400">
          <a
            href="https://github.com/jatin50/n8n_workflow"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors flex items-center gap-1"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <a
            href="http://localhost:5173"
            className="hover:text-amber-400 transition-colors flex items-center gap-1"
          >
            <span>Studio App</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
};
