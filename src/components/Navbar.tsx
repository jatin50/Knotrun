import React from "react";
import { ArrowRight, Terminal } from "lucide-react";
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
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 sm:px-14 py-5 bg-[#070A0F]/50 backdrop-blur-md border-b border-white/5">
      {/* Brand & Left Navigation Links */}
      <div className="flex items-center gap-10">
        <a href="#pipeline-3d" className="flex items-center gap-2.5 group">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF3B20] group-hover:scale-125 transition-transform shadow-[0_0_10px_#ff3b20]" />
          <span className="font-extrabold text-sm tracking-wider text-white uppercase font-['Space_Grotesk']">
            AethelFlow
          </span>
          <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
            // v2.0
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8 text-[11px] font-mono tracking-widest text-slate-400 uppercase">
          <a href="#pipeline-3d" className="hover:text-white transition-colors">
            HOME
          </a>
          <a href="#engine-chip" className="hover:text-white transition-colors">
            V8 ENGINE
          </a>
          <a href="#telemetry-hud" className="hover:text-white transition-colors">
            TELEMETRY
          </a>
          <a href="#templates" className="hover:text-white transition-colors">
            BLUEPRINTS
          </a>
        </nav>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-5">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[11px] font-mono text-slate-400 hover:text-white transition-colors"
        >
          <GithubIcon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">GITHUB</span>
        </a>

        <a
          href={appUrl}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 hover:border-[#FF3B20] bg-white/5 hover:bg-[#FF3B20]/10 text-xs font-mono font-semibold text-white tracking-wider uppercase transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Terminal className="w-3.5 h-3.5 text-[#FF3B20]" />
          <span>LAUNCH STUDIO</span>
          <ArrowRight className="w-3 h-3 text-[#FF3B20]" />
        </a>
      </div>
    </header>
  );
};
