import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { GithubIcon } from "./GithubIcon";

interface NavbarProps {
  appUrl?: string;
  githubUrl?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  appUrl = "http://localhost:5173",
  githubUrl = "https://github.com/jatin50/n8n_workflow",
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between gap-6 px-6 py-3 w-full max-w-5xl rounded-full bg-[#090D16]/80 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-emerald-400 p-[1px] flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <div className="w-full h-full bg-[#04060A] rounded-[7px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5 font-['Plus_Jakarta_Sans']">
              AethelFlow <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">v2.0</span>
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
          <a href="#pipeline-3d" className="hover:text-indigo-400 transition-colors">3D Pipeline</a>
          <a href="#engine-chip" className="hover:text-cyan-400 transition-colors">V8 Engine</a>
          <a href="#telemetry-hud" className="hover:text-amber-400 transition-colors">Live Telemetry</a>
          <a href="#templates" className="hover:text-emerald-400 transition-colors">10 Templates</a>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full transition-all"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <a
            href={appUrl}
            className="flex items-center gap-1.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Launch Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>
    </header>
  );
};
