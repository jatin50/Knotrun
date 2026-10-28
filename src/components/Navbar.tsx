import React from "react";
import { ArrowRight, Cpu } from "lucide-react";
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
      <nav className="pointer-events-auto flex items-center justify-between gap-6 px-6 py-3 w-full max-w-5xl rounded-full bg-[#090D16]/90 backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 p-[1px] flex items-center justify-center shadow-[0_0_15px_rgba(255,153,0,0.4)]">
            <div className="w-full h-full bg-[#070A0F] rounded-[7px] flex items-center justify-center">
              <Cpu className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-white flex items-center gap-2 font-['Space_Grotesk']">
              AethelFlow <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">v2.0</span>
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-mono font-medium text-slate-300">
          <a href="#pipeline-3d" className="hover:text-amber-400 transition-colors">3D PIPELINE</a>
          <a href="#engine-chip" className="hover:text-cyan-400 transition-colors">V8 ENGINE</a>
          <a href="#telemetry-hud" className="hover:text-amber-400 transition-colors">TELEMETRY</a>
          <a href="#templates" className="hover:text-emerald-400 transition-colors">TEMPLATES</a>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-full transition-all"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <a
            href={appUrl}
            className="flex items-center gap-1.5 text-xs font-mono font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400 hover:from-amber-300 hover:to-orange-300 px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(255,153,0,0.4)] hover:shadow-[0_0_25px_rgba(255,153,0,0.6)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Launch Studio</span>
            <ArrowRight className="w-3.5 h-3.5 text-black" />
          </a>
        </div>
      </nav>
    </header>
  );
};
