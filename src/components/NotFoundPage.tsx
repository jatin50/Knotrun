import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Home, Play, Compass } from "lucide-react";
import { Breadcrumbs } from "./Breadcrumbs";
import { SEOHead } from "./SEOHead";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#070A0F] text-slate-100 font-['Space_Grotesk'] selection:bg-amber-500/30 selection:text-amber-200">
      <div className="fixed inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none z-0" />

      <SEOHead
        title="404 — Page Not Found | Knotrun"
        description="The requested routing endpoint or DAG execution node does not exist in the Knotrun orchestration topology."
        canonicalUrl="https://knotrun.io/404"
      />

      <Navbar />

      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 pt-36 pb-28 text-center space-y-8">
        <div className="flex justify-center">
          <Breadcrumbs items={[{ label: "404 Not Found" }]} />
        </div>

        {/* 404 Glitch Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>ROUTING ERROR // CODE: ERR_DAG_NODE_NOT_FOUND</span>
        </div>

        {/* Single H1 */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-7xl font-extrabold text-white tracking-tight">
            404 — Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto font-mono leading-relaxed">
            The target URL path does not resolve to an active execution node or documented pipeline conduit.
          </p>
        </div>

        {/* Terminal Diagnostic Box */}
        <div className="text-left max-w-lg mx-auto p-4 rounded-xl bg-[#090E18] border border-white/10 font-mono text-xs space-y-2 text-slate-400">
          <div className="text-slate-500">// Topological inspection report</div>
          <div className="text-red-400">STATUS: 404 UNRESOLVED_DEPENDENCY</div>
          <div className="text-slate-300">TARGET: {typeof window !== "undefined" ? window.location.pathname : "/unresolved-path"}</div>
          <div className="text-emerald-400">FALLBACK: In-memory conduit available at root origin /</div>
        </div>

        {/* CTAs & Quick Internal Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-bold uppercase transition transform hover:scale-105"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <a
            href="http://localhost:5173"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 text-slate-200 text-xs font-mono font-bold uppercase transition"
          >
            <Play className="w-4 h-4 text-emerald-400" />
            <span>Open Studio Demo</span>
          </a>
        </div>

        {/* Quick Directory Links */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-slate-500">
            <Compass className="w-3.5 h-3.5" />
            <span>Quick Links:</span>
          </span>
          <Link to="/#engine-chip" className="hover:text-amber-400 transition">V8 Engine</Link>
          <Link to="/#benchmarks" className="hover:text-amber-400 transition">Telemetry &amp; Benchmarks</Link>
          <Link to="/#templates" className="hover:text-amber-400 transition">Workflow Templates</Link>
          <Link to="/privacy" className="hover:text-amber-400 transition">Privacy Policy</Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};
