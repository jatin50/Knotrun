import React, { useState } from "react";
import {
  ShieldCheck,
  Zap,
  Radio,
  Send,
  Terminal,
  Copy,
  Check,
  Crosshair,
  RefreshCw,
  Activity,
  Cpu,
  Flame,
  X,
} from "lucide-react";

export interface StationData {
  index: string;
  name: string;
  subtitle: string;
  metric: string;
  desc: string;
  color: string;
  specs: { label: string; value: string; status?: string }[];
  payload: Record<string, any>;
  probeAckMs: number;
}

export const STATION_DETAILS: Record<number, StationData> = {
  1: {
    index: "01",
    name: "INGESTION & SSRF GATEWAY",
    subtitle: "Incoming Webhook & Schedule Intake",
    metric: "0.001ms • Zero-Trust Filter",
    desc: "Pre-flight cryptographic HMAC-SHA256 signature verification and automated DNS/IP firewall to block private LAN and AWS metadata spoofing.",
    color: "#FF9900",
    specs: [
      { label: "SIGNATURE", value: "HMAC-SHA256", status: "VERIFIED" },
      { label: "SSRF GUARD", value: "RFC-1918 Block", status: "ACTIVE" },
      { label: "DNS PIN", value: "Anti-Rebind", status: "ARMED" },
      { label: "HEADROOM", value: "100k req/s", status: "NOMINAL" },
    ],
    payload: {
      event: "webhook.ingress",
      origin_ip: "198.51.100.24",
      signature: "sha256:7e8d89a4fc126b9a88...",
      security_eval: {
        is_private_ip: false,
        aws_metadata_169_254: "BLOCKED_GUARD",
        hmac_digest_valid: true,
      },
      routing_target: "REACTOR_STAGE_02",
    },
    probeAckMs: 0.0012,
  },
  2: {
    index: "02",
    name: "V8 IN-MEMORY DAG REACTOR",
    subtitle: "Kahn's Topological Dependency Sorter",
    metric: "81,151 ops/s • 0.012ms Latency",
    desc: "Resolves execution sequence in-memory in O(V+E) time without cloud database roundtrips. Sandboxes custom JavaScript in isolated V8 contexts.",
    color: "#00E5FF",
    specs: [
      { label: "ALGORITHM", value: "Kahn O(V+E)", status: "OPTIMAL" },
      { label: "ISOLATION", value: "V8 Sandbox", status: "SECURE" },
      { label: "CYCLE DETECT", value: "Zero-Loop", status: "VERIFIED" },
      { label: "RSS HEAP", value: "14.2 MB", status: "CLEARED" },
    ],
    payload: {
      workflow_run_id: "wf_enterprise_sync_994",
      topological_order: ["webhook_ingest", "hmac_gate", "ai_categorizer", "neon_db_sink"],
      metrics: {
        nodes_resolved: 4,
        edges_evaluated: 5,
        resolution_latency_micros: 5.4,
        v8_heap_alloc_bytes: 14210400,
      },
      status: "TOPOLOGICALLY_SORTED",
    },
    probeAckMs: 0.0054,
  },
  3: {
    index: "03",
    name: "BULLMQ DISTRIBUTED QUEUE",
    subtitle: "Upstash Redis TLS Message Buffer",
    metric: "2,551 req/s • Zero Frame Drops",
    desc: "Asynchronous task distributor buffering high-concurrency traffic bursts with resilient in-process async worker failover guarantees.",
    color: "#FF5500",
    specs: [
      { label: "TRANSPORT", value: "Upstash Redis TLS", status: "ONLINE" },
      { label: "WORKER POOL", value: "16 Dedicated", status: "BUSY" },
      { label: "DROPOUT RATE", value: "0.000%", status: "ZERO_LOSS" },
      { label: "LOCK RENEWAL", value: "30,000 ms", status: "HELD" },
    ],
    payload: {
      queue_cluster: "aethel-burst-buffer",
      job_id: "bull:job_99812_p1",
      concurrency_slots: 16,
      backoff_strategy: "exponential_jitter",
      buffer_health: {
        active_jobs: 142,
        waiting_jobs: 0,
        failed_retries: 0,
      },
    },
    probeAckMs: 0.0081,
  },
  4: {
    index: "04",
    name: "MULTI-CHANNEL DISPATCH BAY",
    subtitle: "Webhook Relay & DB Persistence",
    metric: "200 OK • Neon DB Synchronized",
    desc: "Simultaneous multi-target payload delivery to Discord webhooks, transactional email APIs, and serverless PostgreSQL storage.",
    color: "#00FF88",
    specs: [
      { label: "RELAY CHANNELS", value: "Discord + Email", status: "DELIVERED" },
      { label: "DB PERSIST", value: "Neon Serverless", status: "COMMITTED" },
      { label: "TRANSACTION", value: "2-Phase ACID", status: "SYNCED" },
      { label: "TOTAL RTT", value: "34.8 ms", status: "200_OK" },
    ],
    payload: {
      fanout_targets: [
        { target: "Discord_Webhook", http_status: 200, rtt_ms: 14.2 },
        { target: "Neon_PostgreSQL_Sink", http_status: 200, rtt_ms: 2.1 },
        { target: "Resend_Email_API", http_status: 200, rtt_ms: 18.5 },
      ],
      two_phase_commit: "COMMITTED_2PC",
      total_flight_time_ms: 34.8,
    },
    probeAckMs: 0.0028,
  },
};

interface HoloStationHUDProps {
  stationIndex: number;
  onSelectStation?: (index: number) => void;
  onClose?: () => void;
  isExiting?: boolean;
}

export const HoloStationHUD: React.FC<HoloStationHUDProps> = ({
  stationIndex,
  onSelectStation,
  onClose,
  isExiting = false,
}) => {
  const station = STATION_DETAILS[stationIndex] || STATION_DETAILS[1];

  // 3D Tilt & Mouse Parallax Physics
  const [rotateX, setRotateX] = useState<number>(6);
  const [rotateY, setRotateY] = useState<number>(-10);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Interactive Card State
  const [activeTab, setActiveTab] = useState<"telemetry" | "payload" | "probe">("telemetry");
  const [isOverclocked, setIsOverclocked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isProbing, setIsProbing] = useState(false);
  const [probeResult, setProbeResult] = useState<{
    latency: string;
    status: string;
    code: number;
  } | null>(null);
  const [probeCount, setProbeCount] = useState(1);

  // Mouse move handler for authentic 3D card tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Responsive tilt angles clamped to -16° / +16°
    const rotX = -((y - centerY) / centerY) * 15;
    const rotY = ((x - centerX) / centerX) * 15;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.3,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smooth return to resting aerospace isometric posture
    setRotateX(5);
    setRotateY(-8);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotX = -((y - centerY) / centerY) * 10;
      const rotY = ((x - centerX) / centerX) * 10;
      setRotateX(rotX);
      setRotateY(rotY);
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.25,
      });
    }
  };

  const handleTouchEnd = () => {
    setRotateX(4);
    setRotateY(-6);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(JSON.stringify(station.payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecuteProbe = () => {
    setIsProbing(true);
    setProbeResult(null);

    // Measure live client delta
    const t0 = performance.now();
    for (let i = 0; i < 20000; i++) {
      Math.sin(i * 0.1) * Math.cos(i * 0.2);
    }
    const t1 = performance.now();
    const measuredMicros = Number((station.probeAckMs + (t1 - t0) * 0.001).toFixed(4));

    setTimeout(() => {
      setIsProbing(false);
      setProbeResult({
        latency: `${measuredMicros}ms`,
        status: "ACK // HARDWARE SENSORS NOMINAL",
        code: 200,
      });
      setProbeCount((prev) => prev + 1);
    }, 240);
  };

  const getStationIcon = (idx: string) => {
    switch (idx) {
      case "01":
        return <ShieldCheck className="w-4 h-4 text-amber-400" />;
      case "02":
        return <Zap className="w-4 h-4 text-cyan-400" />;
      case "03":
        return <Radio className="w-4 h-4 text-orange-400" />;
      case "04":
        return <Send className="w-4 h-4 text-emerald-400" />;
      default:
        return <Activity className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div
      className={`relative select-none pointer-events-auto ${
        isExiting ? "holo-exit-anim" : "holo-enter-anim"
      }`}
      style={{
        perspective: 1200,
      }}
    >
      {/* 3D TILTED MECHANICAL CARD SHELL */}
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${
            isHovered ? 1.02 : 1
          }, ${isHovered ? 1.02 : 1}, 1)`,
          transformStyle: "preserve-3d",
          transition: isHovered
            ? "transform 0.08s ease-out"
            : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
          willChange: "transform",
        }}
        className="relative w-full max-w-[450px] rounded-2xl p-4 sm:p-6 bg-[#080C14]/94 border border-white/25 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(0,0,0,0.6)] backdrop-blur-2xl overflow-hidden group"
      >
        {/* HOLOGRAPHIC SCANLINE LASER SWEEP (Sweeps across card on node touch) */}
        <div
          key={`scanline-${stationIndex}`}
          className="pointer-events-none absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-white to-transparent holo-scanline-sweep z-40"
          style={{
            boxShadow: `0 0 16px ${station.color}, 0 0 25px #ffffff`,
          }}
        />

        {/* ELECTROMAGNETIC NODE CONTACT SHOCKWAVE BLOOM */}
        <div
          key={`shockwave-${stationIndex}`}
          className="pointer-events-none absolute inset-0 rounded-2xl border-2 holo-shockwave-bloom z-30"
          style={{
            borderColor: station.color,
            boxShadow: `0 0 35px ${station.color}80`,
          }}
        />

        {/* NODE CONTACT CONFIRMED BADGE */}
        <div className="pointer-events-none absolute top-2.5 left-1/2 -translate-x-1/2 z-30">
          <span
            className="text-[8px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-widest border shadow-sm flex items-center gap-1.5"
            style={{
              backgroundColor: `${station.color}18`,
              color: station.color,
              borderColor: `${station.color}50`,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: station.color }} />
            NODE CONTACT // IN-BUFFER
          </span>
        </div>
        {/* DYNAMIC SPECULAR LIGHT SHEEN FOLLOWER */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, ${glarePos.opacity}) 0%, transparent 75%)`,
          }}
        />

        {/* CARBON CIRCUIT GRID SUBSTRATE (Not flat black AI look) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)`,
            backgroundSize: "12px 12px",
          }}
        />

        {/* 4 PRECISION MACHINED CORNER HEX RIVETS */}
        <div className="pointer-events-none absolute top-3 left-3 flex items-center gap-1 opacity-60">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 border border-slate-600 shadow-sm" />
          <span className="text-[9px] font-mono tracking-widest text-slate-500">
            CH-{station.index}
          </span>
        </div>
        <div className="pointer-events-none absolute top-3 right-3 flex items-center gap-1 opacity-60">
          <span className="text-[9px] font-mono tracking-widest text-slate-500">
            BUS.0x{station.index}A
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 border border-slate-600 shadow-sm" />
        </div>
        <div className="pointer-events-none absolute bottom-3 left-3 opacity-60">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 border border-slate-600 shadow-sm" />
        </div>
        <div className="pointer-events-none absolute bottom-3 right-3 opacity-60">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 border border-slate-600 shadow-sm" />
        </div>

        {/* ============================================================ */}
        {/* LAYER 1: 3D FLOATING HEADER & BADGES (Z: 25px) */}
        {/* ============================================================ */}
        <div
          style={{ transform: "translateZ(25px)" }}
          className="space-y-3 sm:space-y-4 border-b border-white/10 pb-3 sm:pb-4 relative z-20"
        >
          <div className="flex items-start justify-between gap-2.5 pt-1 sm:pt-2">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div
                className="p-2 sm:p-2.5 rounded-xl border shrink-0 transition-transform duration-200 group-hover:scale-105"
                style={{
                  backgroundColor: `${station.color}15`,
                  borderColor: `${station.color}50`,
                  boxShadow: `0 0 16px ${station.color}30`,
                }}
              >
                {getStationIcon(station.index)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-400 truncate">
                    STAGE {station.index} // CONDUIT
                  </span>
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-ping shrink-0"
                    style={{ backgroundColor: station.color }}
                  />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-wide font-['Space_Grotesk'] truncate">
                  {station.name}
                </h3>
              </div>
            </div>

            {/* LIVE METRIC PILL WITH 3D POP & OPTIONAL CLOSE */}
            <div className="text-right flex flex-col items-end gap-1 shrink-0">
              <div className="flex items-center gap-1.5">
                <span
                  className="text-[9px] sm:text-[10px] font-mono px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md font-bold tracking-wider inline-flex items-center gap-1 shadow-sm"
                  style={{
                    backgroundColor: `${station.color}20`,
                    color: station.color,
                    border: `1px solid ${station.color}60`,
                    boxShadow: `0 0 14px ${station.color}30`,
                  }}
                >
                  <Activity className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                  <span>
                    {isOverclocked
                      ? `${(parseFloat(station.metric) * 1.8).toFixed(0)} ops/s [TURBO]`
                      : station.metric}
                  </span>
                </span>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    title="Minimize HUD"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-normal">
            {station.desc}
          </p>
        </div>

        {/* ============================================================ */}
        {/* LAYER 2: INTERACTIVE TAB NAVIGATOR (Z: 35px) */}
        {/* ============================================================ */}
        <div
          style={{ transform: "translateZ(35px)" }}
          className="flex items-center justify-between gap-1.5 sm:gap-2 py-2.5 sm:py-3 border-b border-white/10 relative z-20 text-[10px] sm:text-[11px] font-mono"
        >
          <div className="flex items-center gap-1 sm:gap-1.5 p-0.5 sm:p-1 rounded-lg bg-black/40 border border-white/10 overflow-x-auto">
            <button
              onClick={() => setActiveTab("telemetry")}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
                activeTab === "telemetry"
                  ? "bg-white/15 text-white font-bold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Cpu className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              <span>TELEMETRY</span>
            </button>

            <button
              onClick={() => setActiveTab("payload")}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
                activeTab === "payload"
                  ? "bg-white/15 text-white font-bold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Terminal className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              <span>HEX/JSON</span>
            </button>

            <button
              onClick={() => setActiveTab("probe")}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
                activeTab === "probe"
                  ? "bg-white/15 text-white font-bold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Crosshair className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              <span>PROBE</span>
            </button>
          </div>

          {/* OVERCLOCK TURBO TOGGLE */}
          <button
            onClick={() => setIsOverclocked(!isOverclocked)}
            title="Toggle Turbo Frequency Overclock"
            className={`px-2 py-1 sm:p-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 text-[9px] sm:text-[10px] font-mono shrink-0 ${
              isOverclocked
                ? "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_12px_rgba(255,153,0,0.3)]"
                : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20"
            }`}
          >
            <Flame className={`w-3 sm:w-3.5 h-3 sm:h-3.5 ${isOverclocked ? "text-amber-400 animate-pulse" : ""}`} />
            <span>{isOverclocked ? "TURBO" : "NORM"}</span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* LAYER 3: INTERACTIVE BODY PANELS (Z: 45px) */}
        {/* ============================================================ */}
        <div style={{ transform: "translateZ(45px)" }} className="pt-3 pb-2 relative z-20">
          {/* TAB 1: TELEMETRY & SPECS */}
          {activeTab === "telemetry" && (
            <div className="space-y-3 animate-in fade-in duration-150">
              {/* SPEC GRID */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                {station.specs.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between"
                  >
                    <span className="text-[9px] uppercase tracking-wider text-slate-400">
                      {item.label}
                    </span>
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-bold text-white">{item.value}</span>
                      <span
                        className="text-[9px] px-1.5 py-0.5 rounded font-mono font-medium"
                        style={{
                          backgroundColor: `${station.color}15`,
                          color: station.color,
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* SEGMENTED LED POWER BAR */}
              <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: station.color }}
                    />
                    BUS OCCUPANCY / ISOLATE PIPELINE
                  </span>
                  <span style={{ color: station.color }} className="font-bold">
                    {isOverclocked ? "OVERCLOCKED 180%" : "NOMINAL 99.4%"}
                  </span>
                </div>
                <div className="grid grid-cols-12 gap-1 h-2 bg-black/60 p-0.5 rounded border border-white/10">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-full rounded-xs transition-all duration-200"
                      style={{
                        backgroundColor:
                          i < (isOverclocked ? 11 : 9) ? station.color : "rgba(255,255,255,0.08)",
                        boxShadow:
                          i < (isOverclocked ? 11 : 9)
                            ? `0 0 6px ${station.color}`
                            : "none",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PACKET HEX & JSON INSPECTOR */}
          {activeTab === "payload" && (
            <div className="space-y-2 animate-in fade-in duration-150">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pb-1">
                <span>PACKET BUFFER INSPECTION</span>
                <button
                  onClick={handleCopyPayload}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>COPY JSON</span>
                    </>
                  )}
                </button>
              </div>

              <div className="max-h-36 overflow-y-auto p-3 rounded-xl bg-black/70 border border-white/10 font-mono text-[10px] text-slate-300 leading-relaxed shadow-inner">
                <pre className="whitespace-pre-wrap font-mono text-emerald-400/90">
                  {JSON.stringify(station.payload, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: REAL-TIME PROBE SENSOR */}
          {activeTab === "probe" && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="p-3 rounded-xl bg-black/50 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">HARDWARE PING PULSE:</span>
                  <span className="text-white font-bold">CYCLE #{probeCount}</span>
                </div>

                <button
                  onClick={handleExecuteProbe}
                  disabled={isProbing}
                  className="w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold text-black flex items-center justify-center gap-2 transition-all transform active:scale-98 shadow-md cursor-pointer disabled:opacity-50"
                  style={{
                    backgroundColor: station.color,
                    boxShadow: `0 0 20px ${station.color}50`,
                  }}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isProbing ? "animate-spin" : ""}`} />
                  <span>{isProbing ? "ANALYZING SENSOR PACKET..." : "TRANSMIT TEST PROBE"}</span>
                </button>
              </div>

              {probeResult && (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-[11px] font-mono animate-in zoom-in-95 duration-150">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Check className="w-3.5 h-3.5" />
                    <span>{probeResult.status}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300 font-bold">
                    {probeResult.latency}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* LAYER 4: BOTTOM STATION JUMP SWITCHER BAR (Z: 30px) */}
        {/* ============================================================ */}
        <div
          style={{ transform: "translateZ(30px)" }}
          className="pt-2.5 sm:pt-3 border-t border-white/10 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-slate-400 relative z-20"
        >
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-slate-500 hidden sm:inline">STATIONS:</span>
            {[1, 2, 3, 4].map((idx) => (
              <button
                key={idx}
                onClick={() => onSelectStation && onSelectStation(idx)}
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded font-mono text-[9px] sm:text-[10px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                  stationIndex === idx
                    ? "bg-white text-black shadow-md scale-105"
                    : "bg-white/5 text-slate-400 hover:bg-white/15 hover:text-white"
                }`}
              >
                0{idx}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 text-amber-400/90 text-[9px] sm:text-[10px]">
            <span>Scroll runway &rarr;</span>
          </div>
        </div>
      </div>
    </div>
  );
};
