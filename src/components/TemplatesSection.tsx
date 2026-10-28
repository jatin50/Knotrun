import React, { useState } from "react";
import { ArrowRight, Layers, Cpu, ShieldCheck, Database, Radio } from "lucide-react";

interface TemplateItem {
  id: string;
  title: string;
  category: "DevOps & SRE" | "AI & LLM Systems" | "High-Scale Data ETL" | "Security & Webhooks";
  badgeColor: string;
  categoryIcon: React.ReactNode;
  description: string;
  nodeTypes: string[];
  estimatedOps: string;
}

const TEMPLATES: TemplateItem[] = [
  {
    id: "keep-alive-pinger",
    title: "Website Uptime & Cloud Instance Keep-Alive",
    category: "DevOps & SRE",
    badgeColor: "border-orange-500/40 text-orange-400 bg-orange-950/30",
    categoryIcon: <Radio className="w-4 h-4 text-orange-400" />,
    description: "Periodically pings free-tier cloud deployments (Render, Supabase, Neon) to prevent cold sleep. Monitors response latency with SSRF protection.",
    nodeTypes: ["Schedule", "Website Pinger", "IF Branch", "Email", "Text Transform"],
    estimatedOps: "~150k ops/sec",
  },
  {
    id: "github-discord-cicd",
    title: "GitHub CI/CD Deployment & Discord Alert Relay",
    category: "DevOps & SRE",
    badgeColor: "border-orange-500/40 text-orange-400 bg-orange-950/30",
    categoryIcon: <Radio className="w-4 h-4 text-orange-400" />,
    description: "Receives GitHub webhook deployment and release payloads, parses commit hashes & repo metadata with custom code, and sends rich Discord notifications.",
    nodeTypes: ["Webhook", "Custom Code", "IF Branch", "Slack / Discord", "Webhook Respond"],
    estimatedOps: "~280k ops/sec",
  },
  {
    id: "daily-db-metrics",
    title: "PostgreSQL Database Health & Metrics Daily Digest",
    category: "DevOps & SRE",
    badgeColor: "border-orange-500/40 text-orange-400 bg-orange-950/30",
    categoryIcon: <Radio className="w-4 h-4 text-orange-400" />,
    description: "Runs on a daily 9:00 AM schedule. Queries PostgreSQL database tables, aggregates key platform metrics, and emails an executive briefing.",
    nodeTypes: ["Schedule", "PostgreSQL", "Set Variable", "Math Calculate", "Send Email"],
    estimatedOps: "~90k ops/sec",
  },
  {
    id: "ai-support-classifier",
    title: "AI Customer Support Auto-Responder & Context Memory",
    category: "AI & LLM Systems",
    badgeColor: "border-cyan-500/40 text-cyan-400 bg-cyan-950/30",
    categoryIcon: <Cpu className="w-4 h-4 text-cyan-400" />,
    description: "Captures customer support webhooks, classifies ticket priority with Gemini AI, retains persistent conversational context in Neon DB, and routes escalations.",
    nodeTypes: ["Webhook", "AI Prompt", "Switch Router", "Email", "Webhook Respond"],
    estimatedOps: "~3.5k ops/sec",
  },
  {
    id: "ai-lead-qualifier",
    title: "AI Inbound Lead Qualifier & Enterprise Deal Router",
    category: "AI & LLM Systems",
    badgeColor: "border-cyan-500/40 text-cyan-400 bg-cyan-950/30",
    categoryIcon: <Cpu className="w-4 h-4 text-cyan-400" />,
    description: "Captures website demo requests, uses Gemini AI Prompt to qualify company tier, alerts sales via Slack, and auto-sends product collateral.",
    nodeTypes: ["Webhook", "AI Prompt", "IF Branch", "Slack / Discord", "Send Email"],
    estimatedOps: "~4.2k ops/sec",
  },
  {
    id: "ai-content-generator",
    title: "AI Weekly Product Update & Multi-Channel Publisher",
    category: "AI & LLM Systems",
    badgeColor: "border-cyan-500/40 text-cyan-400 bg-cyan-950/30",
    categoryIcon: <Cpu className="w-4 h-4 text-cyan-400" />,
    description: "Scheduled weekly run that prompts AI to draft technical changelogs, cleans text with Text Operations, and broadcasts drafts to internal team channels.",
    nodeTypes: ["Schedule", "AI Prompt", "Text Transform", "Slack / Discord"],
    estimatedOps: "~85k ops/sec",
  },
  {
    id: "financial-csv-etl",
    title: "E-Commerce CSV Financial ETL & Revenue Aggregator",
    category: "High-Scale Data ETL",
    badgeColor: "border-emerald-500/40 text-emerald-400 bg-emerald-950/30",
    categoryIcon: <Database className="w-4 h-4 text-emerald-400" />,
    description: "Ingests raw multi-row transactional CSV data, deserializes to structured objects, filters active paid orders, rounds numbers, and computes aggregate revenue.",
    nodeTypes: ["Manual Trigger", "CSV Parser", "Data Filter", "Math Calculate", "Aggregate"],
    estimatedOps: "~450k records/sec",
  },
  {
    id: "crypto-price-sentinel",
    title: "Live Crypto / Exchange Rate Sentinel & Alert",
    category: "High-Scale Data ETL",
    badgeColor: "border-emerald-500/40 text-emerald-400 bg-emerald-950/30",
    categoryIcon: <Database className="w-4 h-4 text-emerald-400" />,
    description: "Polls public exchange rate APIs every 15 minutes, checks if prices cross user-defined thresholds using V8 sandbox logic, and fires email alerts on sudden drops.",
    nodeTypes: ["Schedule", "HTTP Request", "IF Branch", "Email", "Slack / Discord"],
    estimatedOps: "~210k ops/sec",
  },
  {
    id: "hmac-webhook-verifier",
    title: "Enterprise Webhook HMAC Signature Guard & Relay",
    category: "Security & Webhooks",
    badgeColor: "border-amber-500/40 text-amber-400 bg-amber-950/30",
    categoryIcon: <ShieldCheck className="w-4 h-4 text-amber-400" />,
    description: "Hardened security gateway that accepts incoming webhooks (e.g. Stripe, GitHub), computes cryptographic HMAC-SHA256 signatures, and routes authorized payloads.",
    nodeTypes: ["Webhook", "Crypto Hash", "IF Branch", "Webhook Respond 200", "Webhook Respond 401"],
    estimatedOps: "~320k ops/sec",
  },
  {
    id: "stripe-customer-onboarding",
    title: "Stripe Checkout & Automated Customer Welcome Flow",
    category: "Security & Webhooks",
    badgeColor: "border-amber-500/40 text-amber-400 bg-amber-950/30",
    categoryIcon: <ShieldCheck className="w-4 h-4 text-amber-400" />,
    description: "Captures Stripe checkout.session.completed webhooks, filters paid orders, sets customer workspace variables, triggers a welcome email, and responds 200 OK.",
    nodeTypes: ["Webhook", "Data Filter", "Set Variable", "Send Email", "Webhook Respond"],
    estimatedOps: "~380k ops/sec",
  },
];

export const TemplatesSection: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<string>("All");

  const categories = [
    "All",
    "DevOps & SRE",
    "AI & LLM Systems",
    "High-Scale Data ETL",
    "Security & Webhooks",
  ];

  const filtered = TEMPLATES.filter(
    (t) => selectedCat === "All" || t.category === selectedCat
  );

  return (
    <section id="templates" className="relative z-10 w-full max-w-6xl mx-auto px-6 py-28 space-y-12">
      {/* SECTION HEADER */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-bold text-amber-400">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>ENTERPRISE BLUEPRINTS // 10 VERIFIED WORKFLOWS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
          Production-Tested Architecture Blueprints
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
          Pre-engineered DAG workflow structures battle-tested against high concurrency, failover retries, and cryptographic security standards.
        </p>
      </div>

      {/* INDUSTRIAL CATEGORY FILTER TABS */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedCat === cat
                ? "bg-amber-400 text-black shadow-[0_0_20px_rgba(255,153,0,0.4)] border border-amber-300"
                : "bg-[#090D16] text-slate-400 hover:text-white border border-white/10 hover:border-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* TEMPLATE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-7 rounded-2xl bg-[#090E17] border border-white/10 hover:border-amber-500/40 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl space-y-5 transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Card Header Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    {item.categoryIcon}
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border uppercase ${item.badgeColor}`}
                  >
                    {item.category}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                  {item.estimatedOps}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors font-['Space_Grotesk']">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>

            {/* Bottom Section: Node Stack & Launch CTA */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono uppercase text-slate-500 mr-1">
                  NODES:
                </span>
                {item.nodeTypes.map((node, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-slate-300 border border-white/10"
                  >
                    {node}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  SLA Passed • In-Memory
                </span>
                <a
                  href="http://localhost:5173"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>Open in Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
