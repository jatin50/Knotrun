import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { KnotrunLogo } from "./KnotrunLogo";

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 w-full border-t border-white/10 bg-[#070A0F] py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link to="/" title="Knotrun Engine" className="shrink-0 hover:scale-105 transition">
            <KnotrunLogo variant="icon" size="sm" />
          </Link>
          <Link to="/" className="text-sm font-bold text-white tracking-tight font-['Space_Grotesk'] hover:text-amber-300 transition">
            Knotrun Engine
          </Link>
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
          <Link
            to="/privacy"
            className="hover:text-amber-400 transition-colors flex items-center gap-1 text-slate-400"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Privacy</span>
          </Link>
          <a
            href="https://github.com/jatin50/Knotrun_workflow"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors flex items-center gap-1"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <a
            href="https://knotrun-studio.onrender.com/dashboard"
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
