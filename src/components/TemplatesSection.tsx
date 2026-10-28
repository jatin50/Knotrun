import React, { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

interface TemplateItem {
  id: string;
  title: string;
  category: "DevOps & Monitoring" | "AI & Automation" | "Data & Analytics" | "Security & Webhooks";
  badgeColor: string;
  icon: string;
  description: string;
  nodeTypes: string[];
  estimatedOps: string;
}

const TEMPLATES: TemplateItem[] = [
  {
    id: "keep-alive-pinger",
    title: "Website Uptime & Cloud Instance Keep-Alive",
    category: "DevOps & Monitoring",
    badgeColor: "border-lime-500/40 text-lime-400 bg-lime-950/30",
    icon: "🌐",
    description: "Periodically pings free-tier cloud deployments (Render, Supabase, Neon) to prevent cold sleep. Monitors response latency with SSRF protection.",
    nodeTypes: ["Schedule", "Website Pinger", "IF Branch", "Email", "Text Transform"],
    estimatedOps: "~150k ops/sec",
  },
  {
    id: "github-discord-cicd",
    title: "GitHub CI/CD Deployment & Discord Alert Relay",
    category: "DevOps & Monitoring",
    badgeColor: "border-sky-500/40 text-sky-400 bg-sky-950/30",
    icon: "🚀",
    description: "Receives GitHub webhook deployment and release payloads, parses commit hashes & repo metadata with custom code, and sends rich Discord notifications.",
    nodeTypes: ["Webhook", "Custom Code", "IF Branch", "Slack / Discord", "Webhook Respond"],
    estimatedOps: "~280k ops/sec",
  },
  {
    id: "daily-db-metrics",
    title: "PostgreSQL Database Health & Metrics Daily Digest",
    category: "DevOps & Monitoring",
    badgeColor: "border-blue-500/40 text-blue-400 bg-blue-950/30",
    icon: "🗄️",
    description: "Runs on a daily 9:00 AM schedule. Queries PostgreSQL database tables, aggregates key platform metrics, and emails an executive briefing.",
    nodeTypes: ["Schedule", "PostgreSQL", "Set Variable", "Math Calculate", "Send Email"],
    estimatedOps: "~90k ops/sec",
  },
  {
    id: "ai-support-classifier",
    title: "AI Customer Support Auto-Responder & Context Memory",
    category: "AI & Automation",
    badgeColor: "border-purple-500/40 text-purple-400 bg-purple-950/30",
    icon: "🤖",
    description: "Captures customer support webhooks, classifies ticket priority with Gemini AI, retains persistent conversational context in Neon DB, and routes escalations.",
    nodeTypes: ["Webhook", "AI Prompt", "Switch Router", "Email", "Webhook Respond"],
    estimatedOps: "~3.5k ops/sec",
  },
  {
    id: "ai-lead-qualifier",
    title: "AI Inbound Lead Qualifier & Enterprise Deal Router",
    category: "AI & Automation",
    badgeColor: "border-indigo-500/40 text-indigo-400 bg-indigo-950/30",
    icon: "🎯",
    description: "Captures website demo requests, uses Gemini AI Prompt to qualify company tier, alerts sales via Slack, and auto-sends product collateral.",
    nodeTypes: ["Webhook", "AI Prompt", "IF Branch", "Slack / Discord", "Send Email"],
    estimatedOps: "~4.2k ops/sec",
  },
  {
    id: "ai-content-generator",
    title: "AI Weekly Product Update & Multi-Channel Publisher",
    category: "AI & Automation",
    badgeColor: "border-pink-500/40 text-pink-400 bg-pink-950/30",
    icon: "✍️",
    description: "Scheduled weekly run that prompts AI to draft technical changelogs, cleans text with Text Operations, and broadcasts drafts to internal team channels.",
    nodeTypes: ["Schedule", "AI Prompt", "Text Transform", "Slack / Discord"],
    estimatedOps: "~85k ops/sec",
  },
  {
    id: "financial-csv-etl",
    title: "E-Commerce CSV Financial ETL & Revenue Aggregator",
    category: "Data & Analytics",
    badgeColor: "border-emerald-500/40 text-emerald-400 bg-emerald-950/30",
    icon: "📊",
    description: "Ingests raw multi-row transactional CSV data, deserializes to structured objects, filters active paid orders, rounds numbers, and computes aggregate revenue.",
    nodeTypes: ["Manual Trigger", "CSV Parser", "Data Filter", "Math Calculate", "Aggregate"],
    estimatedOps: "~450k records/sec",
  },
  {
    id: "crypto-price-sentinel",
    title: "Live Crypto / Exchange Rate Sentinel & Alert",
    category: "Data & Analytics",
    badgeColor: "border-teal-500/40 text-teal-400 bg-teal-950/30",
    icon: "📈",
    description: "Polls public exchange rate APIs every 15 minutes, checks if prices cross user-defined thresholds using V8 sandbox logic, and fires email alerts on sudden drops.",
    nodeTypes: ["Schedule", "HTTP Request", "IF Branch", "Email", "Slack / Discord"],
    estimatedOps: "~210k ops/sec",
  },
  {
    id: "hmac-webhook-verifier",
    title: "Enterprise Webhook HMAC Signature Guard & Relay",
    category: "Security & Webhooks",
    badgeColor: "border-amber-500/40 text-amber-400 bg-amber-950/30",
    icon: "🔐",
    description: "Hardened security gateway that accepts incoming webhooks (e.g. Stripe, GitHub), computes cryptographic HMAC-SHA256 signatures, and routes authorized payloads.",
    nodeTypes: ["Webhook", "Crypto Hash", "IF Branch", "Webhook Respond 200", "Webhook Respond 401"],
    estimatedOps: "~320k ops/sec",
  },
  {
    id: "stripe-customer-onboarding",
    title: "Stripe Checkout & Automated Customer Welcome Flow",
    category: "Security & Webhooks",
    badgeColor: "border-orange-500/40 text-orange-400 bg-orange-950/30",
    icon: "💳",
    description: "Captures Stripe checkout.session.completed webhooks, filters paid orders, sets customer workspace variables, triggers a welcome email, and responds 200 OK.",
    nodeTypes: ["Webhook", "Data Filter", "Set Variable", "Send Email", "Webhook Respond"],
    estimatedOps: "~380k ops/sec",
  },
];

export const TemplatesSection: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<string>("All");

  const categories = [
    "All",
    "DevOps & Monitoring",
    "AI & Automation",
    "Data & Analytics",
    "Security & Webhooks",
  ];

  const filtered = TEMPLATES.filter(
    (t) => selectedCat === "All" || t.category === selectedCat
  );

  return (
    <section id="templates" className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24 space-y-12">
      {/* Section Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>10 Pre-Architected Production Templates</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Ready-to-Deploy Enterprise Blueprints
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Launch complete enterprise workflows with a single click. Every template comes with pre-wired DAG nodes, cryptographic verification, and error-handling branches.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCat === cat
                  ? "bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  : "text-slate-400 hover:text-slate-200 bg-white/5 border border-white/5 hover:border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid with 3D Card Hover Depth */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((tpl) => (
          <div
            key={tpl.id}
            className="group relative p-6 rounded-2xl bg-[#090D16]/80 hover:bg-[#0D1322] border border-white/10 hover:border-indigo-500/50 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between space-y-4 hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2.5 rounded-xl bg-white/5 border border-white/10">
                    {tpl.icon}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {tpl.title}
                    </h3>
                    <span className={`inline-block px-2 py-0.5 mt-1 rounded text-[10px] font-mono border ${tpl.badgeColor}`}>
                      {tpl.category}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {tpl.description}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-white/5">
              <div className="flex flex-wrap items-center gap-1.5">
                {tpl.nodeTypes.map((node, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                  >
                    {node}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-mono text-emerald-400">
                  {tpl.estimatedOps}
                </span>
                <a
                  href="http://localhost:5173"
                  className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group-hover:translate-x-0.5"
                >
                  <span>1-Click Launch</span>
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
