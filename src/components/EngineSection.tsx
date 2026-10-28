import React, { useState } from "react";
import { Cpu, ShieldCheck, GitFork, Zap, Code2 } from "lucide-react";

export const EngineSection: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section id="engine-chip" className="relative z-10 w-full max-w-6xl mx-auto px-6 py-28 space-y-16">
      {/* Section Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400">
          <Cpu className="w-3.5 h-3.5" />
          <span>V8 DAG Execution Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Engineered for Pure In-Memory Velocity
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Workflow execution is completely decoupled from cloud database latency. Nodes execute in-memory in microseconds using Kahn's topological sort and sandboxed V8 contexts.
        </p>
      </div>

      {/* Main Grid: 3D Angled Silicon Chip (Left) + Architectural Pillars (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT COLUMN: THE TILTED 3D SILICON ENGINE CHIP */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-6 flex items-center justify-center p-4 relative"
          style={{ perspective: "1200px" }}
        >
          {/* Ambient glow behind chip */}
          <div className="absolute w-[360px] h-[360px] bg-cyan-500/15 rounded-full blur-[90px] pointer-events-none" />

          {/* THE 3D TILTED CHIP MODULE */}
          <div
            style={{
              transform: `rotateX(${26 - mousePos.y * 18}deg) rotateY(${-18 + mousePos.x * 24}deg) rotateZ(3deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.15s ease-out",
            }}
            className="relative w-80 sm:w-96 h-80 sm:h-96 rounded-3xl bg-[#090D16] border-2 border-cyan-500/40 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(6,182,212,0.25)] flex flex-col justify-between"
          >
            {/* Golden Edge Pins (Silicon Wafer Micro-Pins) */}
            <div className="absolute -top-2 left-6 right-6 flex justify-between pointer-events-none">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-2 h-2.5 bg-gradient-to-b from-amber-300 to-amber-500 rounded-t-sm shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
              ))}
            </div>
            <div className="absolute -bottom-2 left-6 right-6 flex justify-between pointer-events-none">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-2 h-2.5 bg-gradient-to-t from-amber-300 to-amber-500 rounded-b-sm shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
              ))}
            </div>

            {/* Chip Header */}
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-mono font-bold text-cyan-300 tracking-wider">AETHEL-CORE // V8</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                12nm FinFET
              </span>
            </div>

            {/* Raised Brushed Heat-Spreader Center Cap (3D Extrusion) */}
            <div
              style={{ transform: "translateZ(30px)" }}
              className="p-5 rounded-2xl bg-gradient-to-br from-[#131b2e] via-[#090e1a] to-[#04060a] border border-cyan-400/50 shadow-[0_15px_30px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.2)] text-center space-y-2"
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-sm font-bold tracking-wider text-white font-mono">
                DAG RUNTIME ENGINE
              </h3>
              <p className="text-[11px] font-mono text-cyan-400">
                81,151 OPS/SEC • SLA PASSED
              </p>
              <div className="flex justify-center gap-1.5 pt-1">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                  0.012ms LATENCY
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800">
                  0 LEAKS
                </span>
              </div>
            </div>

            {/* Glowing Etched Bus Lines & Diodes */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-cyan-500/20">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Kahn Topological Active
              </span>
              <span className="text-cyan-400 font-semibold">LRU CACHED</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 3 ARCHITECTURAL PILLARS */}
        <div className="lg:col-span-6 space-y-4">
          {/* Pillar 1: Topological DAG Sorter */}
          <div className="p-5 rounded-2xl bg-[#090D16]/75 border border-white/10 hover:border-cyan-500/50 transition-all backdrop-blur-xl space-y-2 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <GitFork className="w-4 h-4" />
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Kahn's Topological DAG Sorting
                </h4>
              </div>
              <span className="text-xs font-mono text-cyan-400 font-semibold">O(V + E)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Workflow node dependencies are resolved in-memory with memoized DAG linear ordering. Detects cycles before execution, allowing parallel branch forks to compute simultaneously with zero blocking.
            </p>
          </div>

          {/* Pillar 2: V8 Sandbox Context Isolation */}
          <div className="p-5 rounded-2xl bg-[#090D16]/75 border border-white/10 hover:border-emerald-500/50 transition-all backdrop-blur-xl space-y-2 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Code2 className="w-4 h-4" />
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  V8 Sandboxed Context Pooling
                </h4>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-semibold">5,018 ops/s</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Custom user JavaScript code runs inside isolated Node.js <code className="text-emerald-300 font-mono">vm</code> execution contexts with an LRU script compilation cache. Prevents event-loop starvation while ensuring memory safety.
            </p>
          </div>

          {/* Pillar 3: Zero-Trust SSRF Network Gate */}
          <div className="p-5 rounded-2xl bg-[#090D16]/75 border border-white/10 hover:border-indigo-500/50 transition-all backdrop-blur-xl space-y-2 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                  Zero-Trust SSRF Network Gate
                </h4>
              </div>
              <span className="text-xs font-mono text-indigo-400 font-semibold">916k ops/s</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every HTTP Request and Webhook undergoes pre-flight DNS and IP validation to block malicious requests against AWS metadata endpoints (<code className="text-indigo-300 font-mono">169.254.169.254</code>), loopback, and private LAN ranges.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
