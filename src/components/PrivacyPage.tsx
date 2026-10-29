import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Lock, Cpu, Server, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "./Breadcrumbs";
import { SEOHead } from "./SEOHead";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const PrivacyPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#070A0F] text-slate-100 font-['Space_Grotesk'] selection:bg-amber-500/30 selection:text-amber-200 w-full max-w-full overflow-x-hidden">
      {/* Background ambient noise grid */}
      <div className="fixed inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none z-0" />

      <SEOHead
        title="Privacy Policy | Knotrun Enterprise Workflow Engine"
        description="Learn how Knotrun protects your data with zero-persistence ephemeral in-memory DAG execution, strict V8 memory bounds, and zero-trust SSRF firewalling."
        canonicalUrl="https://knotrun.io/privacy"
      />

      <Navbar />

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 pt-32 pb-24 space-y-12">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

        {/* Header Block with Single H1 */}
        <header className="space-y-4 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ZERO-PERSISTENCE SECURITY PROTOCOL</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-mono">
            Effective Date: October 29, 2026 • Version 2.4 (Enterprise Production)
          </p>
        </header>

        {/* Executive Privacy Summary Card */}
        <div className="p-6 rounded-2xl bg-[#0B111E]/90 border border-white/10 space-y-4 shadow-xl">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-400" />
            Executive Privacy Architecture Summary
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Knotrun is engineered from first principles as an <strong>in-memory, zero-persistence orchestration engine</strong>. Unlike traditional legacy automation platforms that write raw HTTP payloads, JSON state, and credential tokens to disk or unencrypted relational databases, Knotrun processes DAG nodes in ephemeral memory and executes fanout within sub-millisecond cycles.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Zero Payload Persistence</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Isolated V8 Sandboxing</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>RFC-1918 SSRF Guards</span>
            </div>
          </div>
        </div>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Server className="w-5 h-5 text-amber-400" />
            1. Zero-Persistence Architectural Policy
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            When you run an in-memory DAG pipeline via Knotrun, input tokens, webhook payloads, and intermediate execution state are stored strictly in volatile RAM for the duration of the execution lifecycle ($O(V+E)$ Kahn's traversal).
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-400 list-disc list-inside">
            <li>No persistent database writes for intermediate node payloads or secret variables.</li>
            <li>Automatic garbage collection triggered upon completion of the downstream sinks.</li>
            <li>Zero analytics telemetry on sensitive JSON payload bodies or authorization headers.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-amber-400" />
            2. V8 Sandbox Memory Boundaries &amp; SSRF Isolation
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Custom user-provided JavaScript code is executed within isolated V8 runtimes. Each isolate is constrained to 128MB heap allocation and a strict 50ms synchronous timeout.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            Our network gateway enforces RFC-1918 private address blocking, DNS rebinding guards, and link-local address filtering (e.g., blocking 169.254.169.254 AWS metadata endpoints), preventing code execution from accessing private infrastructure.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-amber-400" />
            3. Information We Collect
          </h2>
          <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
            <h3 className="text-base font-semibold text-white">A. Account &amp; Authentication Data</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              When registering for Knotrun Studio or utilizing our recruiter guest mode, we store authentication tokens and encrypted credentials using AES-256-GCM. Guest mode sessions do not require email verification and can be purged immediately.
            </p>

            <h3 className="text-base font-semibold text-white pt-2">B. Operational &amp; Diagnostic Telemetry</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              We collect anonymized performance telemetry (operations per second, queue depth, CPU cycle duration) to benchmark engine throughput. No personally identifiable customer information (PII) is included in performance benchmarks.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            4. User Rights Under GDPR &amp; CCPA
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Under the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you maintain the right to:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-amber-400 font-bold block mb-1">RIGHT TO FORGET</span>
              <span className="text-slate-400">Immediate erasure of workspaces, workflows, and encrypted credentials.</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-amber-400 font-bold block mb-1">RIGHT TO PORTABILITY</span>
              <span className="text-slate-400">Export workflows and node graphs in standard portable JSON specifications.</span>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-4 border-t border-white/10 pt-8">
          <h2 className="text-xl font-bold text-white">5. Security Contact &amp; Responsible Disclosure</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            If you discover a security vulnerability or have privacy inquiries regarding our zero-persistence data processing policies, please contact our security team:
          </p>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
            <span>Email: </span>
            <a href="mailto:jainjatin2006@gmail.com" className="text-amber-400 hover:underline">
              jainjatin2006@gmail.com
            </a>
            <span className="block mt-1 text-slate-500">PGP Key ID: 0x81151KNOTRUN</span>
          </div>
        </section>

        {/* Navigation & Internal Links */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition"
          >
            &larr; Return to Knotrun Architecture
          </Link>

          <a
            href="https://knotrun-studio.onrender.com/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-bold uppercase transition"
          >
            <span>Launch Studio Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};
