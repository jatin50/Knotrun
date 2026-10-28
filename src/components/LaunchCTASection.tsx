import React, { useState } from "react";
import { ArrowRight, Copy, Check, Sparkles } from "lucide-react";

export const LaunchCTASection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const cloneCmd = "git clone https://github.com/jatin50/n8n_workflow.git && cd n8n_workflow && npm run setup && npm run dev";

  const handleCopy = () => {
    navigator.clipboard.writeText(cloneCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative z-10 w-full max-w-5xl mx-auto px-6 py-28 text-center space-y-10">
      {/* Glow aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-emerald-500/20 via-indigo-500/20 to-purple-500/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Production Ready • Open Source</span>
        </div>

        <h2 className="text-3xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Experience Sub-Millisecond <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">
            Workflow Automation Now
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          No sign-up friction. Click below to launch the live React Flow studio with instant guest access, or clone the repo to self-host on your own infrastructure.
        </p>
      </div>

      {/* Main Action Portal Box */}
      <div className="relative max-w-xl mx-auto p-8 rounded-3xl bg-[#090D16]/90 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(16,185,129,0.2)] backdrop-blur-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="http://localhost:5173"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold text-black bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Launch Live Studio (1-Click Demo)</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="https://github.com/jatin50/n8n_workflow"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
          >
            <span>GitHub Repository</span>
          </a>
        </div>

        {/* Quick-Start Terminal One-Liner */}
        <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 overflow-x-auto">
            <span className="text-emerald-400 select-none">$</span>
            <span className="truncate">{cloneCmd}</span>
          </div>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors shrink-0"
            title="Copy command"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </section>
  );
};
