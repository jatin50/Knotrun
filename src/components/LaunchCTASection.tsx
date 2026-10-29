import React, { useState } from "react";
import { ArrowRight, Copy, Check, Terminal, ExternalLink } from "lucide-react";

export const LaunchCTASection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const cloneCmd = "git clone https://github.com/jatin50/n8n_workflow.git && cd n8n_workflow && npm run setup && npm run dev";

  const handleCopy = () => {
    navigator.clipboard.writeText(cloneCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-28 text-center space-y-8 sm:space-y-10">
      {/* Glow aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-cyan-500/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>PRODUCTION-READY • FULL ENGINE LAUNCH PORTAL</span>
        </div>

        <h2 className="text-3xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight font-['Space_Grotesk']">
          Experience Sub-Millisecond <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400">
            Workflow Automation Now
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
          Zero authentication barrier. Launch the live React Flow studio with pre-loaded demo pipelines, or clone the repository to run on your local infrastructure.
        </p>
      </div>

      {/* Main Action Portal Box */}
      <div className="relative max-w-xl mx-auto p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#090D16]/95 border-2 border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(255,153,0,0.2)] backdrop-blur-2xl space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="http://localhost:5173"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-mono font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400 hover:from-amber-300 hover:to-orange-300 shadow-[0_0_30px_rgba(255,153,0,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Launch Live Studio (Port 5173)</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </a>

          <a
            href="https://github.com/jatin50/n8n_workflow"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-mono font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
          >
            <span>GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Quick-Start Terminal One-Liner */}
        <div className="p-3.5 rounded-xl bg-black/80 border border-white/10 flex items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 overflow-x-auto">
            <span className="text-amber-400 select-none">$</span>
            <span className="truncate">{cloneCmd}</span>
          </div>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors shrink-0 cursor-pointer"
            title="Copy command"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </section>
  );
};
