import React from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 w-full border-t border-white/10 bg-[#04060A] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-bold text-white tracking-tight">AethelFlow Platform</span>
          <span className="text-xs text-slate-500">• Open-source orchestration SaaS</span>
        </div>

        {/* Live Infrastructure Status Indicators */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            V8 Engine: 81k ops/s
          </span>
          <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            BullMQ TLS: Connected
          </span>
          <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            Neon PostgreSQL: Online
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400">
          <a
            href="https://github.com/jatin50/n8n_workflow"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <a
            href="http://localhost:5173"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Studio App</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
};
