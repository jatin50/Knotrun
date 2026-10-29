import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Terminal, Menu, X, ExternalLink, ShieldCheck } from "lucide-react";
import { GithubIcon } from "./GithubIcon";

interface NavbarProps {
  appUrl?: string;
  githubUrl?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  appUrl = "http://localhost:5173",
  githubUrl = "https://github.com/jatin50/n8n_workflow",
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070A0F]/80 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center justify-between px-4 sm:px-8 lg:px-14 py-3 sm:py-4">
        {/* Brand & Left Navigation Links */}
        <div className="flex items-center gap-6 sm:gap-10">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF3B20] group-hover:scale-125 transition-transform shadow-[0_0_10px_#ff3b20]" />
            <span className="font-extrabold text-sm tracking-wider text-white uppercase font-['Space_Grotesk']">
              Knotrun
            </span>
            <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
              // v2.0
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-mono tracking-widest text-slate-400 uppercase">
            <a href="/#pipeline-3d" className="hover:text-white transition-colors">
              HOME
            </a>
            <a href="/#engine-chip" className="hover:text-white transition-colors">
              V8 ENGINE
            </a>
            <a href="/#telemetry-hud" className="hover:text-white transition-colors">
              TELEMETRY
            </a>
            <a href="/#templates" className="hover:text-white transition-colors">
              BLUEPRINTS
            </a>
            <Link to="/privacy" className="hover:text-white transition-colors">
              PRIVACY
            </Link>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-5">
          <a
            href="http://localhost:5173/login"
            className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-mono text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span>RECRUITER DEMO</span>
          </a>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xs:flex items-center gap-2 text-[11px] font-mono text-slate-400 hover:text-white transition-colors"
            title="GitHub Repository"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GITHUB</span>
          </a>

          <a
            href={appUrl}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full border border-white/20 hover:border-amber-400 bg-white/5 hover:bg-amber-400/10 text-[11px] sm:text-xs font-mono font-semibold text-white tracking-wider uppercase transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">LAUNCH STUDIO</span>
            <span className="sm:hidden">STUDIO</span>
            <ArrowRight className="w-3 h-3 text-amber-400" />
          </a>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#070A0F]/95 backdrop-blur-2xl px-5 py-4 space-y-3 animate-in slide-in-from-top-4 duration-150">
          <nav className="flex flex-col space-y-2 text-xs font-mono tracking-widest text-slate-300 uppercase">
            <a
              href="/#pipeline-3d"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
            >
              HOME // 3D RUNWAY
            </a>
            <a
              href="/#engine-chip"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
            >
              V8 ENGINE ARCHITECTURE
            </a>
            <a
              href="/#telemetry-hud"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
            >
              HARDWARE TELEMETRY
            </a>
            <a
              href="/#templates"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
            >
              WORKFLOW BLUEPRINTS
            </a>
            <Link
              to="/privacy"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2 text-emerald-400"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>PRIVACY POLICY</span>
            </Link>
            <a
              href="http://localhost:5173/login"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg text-amber-400 hover:bg-amber-500/10 transition-colors flex items-center justify-between"
            >
              <span>RECRUITER DEMO LOGIN</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded-lg hover:bg-white/5 hover:text-white transition-colors flex items-center justify-between"
            >
              <span>GITHUB REPOSITORY</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
