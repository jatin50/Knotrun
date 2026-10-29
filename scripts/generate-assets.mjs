import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const landingPublic = path.resolve(__dirname, "../public");
const n8nPublic = path.resolve(__dirname, "../../n8n_workflow/frontend/public");

if (!fs.existsSync(landingPublic)) fs.mkdirSync(landingPublic, { recursive: true });
if (!fs.existsSync(n8nPublic)) fs.mkdirSync(n8nPublic, { recursive: true });

// 1200x630 OpenGraph Banner SVG
const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#070A0F"/>
      <stop offset="50%" stop-color="#0D1424"/>
      <stop offset="100%" stop-color="#070A0F"/>
    </linearGradient>
    <linearGradient id="amberGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#FFB300"/>
      <stop offset="50%" stop-color="#FF7A00"/>
      <stop offset="100%" stop-color="#00FF88"/>
    </linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FF9900" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#FF9900" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Subtle Grid lines -->
  <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
    <line x1="0" y1="105" x2="1200" y2="105"/>
    <line x1="0" y1="210" x2="1200" y2="210"/>
    <line x1="0" y1="315" x2="1200" y2="315"/>
    <line x1="0" y1="420" x2="1200" y2="420"/>
    <line x1="0" y1="525" x2="1200" y2="525"/>
    <line x1="200" y1="0" x2="200" y2="630"/>
    <line x1="400" y1="0" x2="400" y2="630"/>
    <line x1="600" y1="0" x2="600" y2="630"/>
    <line x1="800" y1="0" x2="800" y2="630"/>
    <line x1="1000" y1="0" x2="1000" y2="630"/>
  </g>

  <!-- Decorative Corner Accents -->
  <path d="M 40 70 L 40 40 L 70 40" stroke="#FF9900" stroke-width="3" fill="none" opacity="0.8"/>
  <path d="M 1160 70 L 1160 40 L 1130 40" stroke="#FF9900" stroke-width="3" fill="none" opacity="0.8"/>
  <path d="M 40 560 L 40 590 L 70 590" stroke="#FF9900" stroke-width="3" fill="none" opacity="0.8"/>
  <path d="M 1160 560 L 1160 590 L 1130 590" stroke="#FF9900" stroke-width="3" fill="none" opacity="0.8"/>

  <!-- Top Badge -->
  <rect x="80" y="80" width="350" height="38" rx="8" fill="#121B2C" stroke="#25354F" stroke-width="1"/>
  <circle cx="102" cy="99" r="5" fill="#00FF88"/>
  <text x="118" y="104" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#00FF88" letter-spacing="1.5">
    AETHELFLOW ENGINE // V2.0
  </text>
  <text x="325" y="104" font-family="'JetBrains Mono', monospace" font-size="12" fill="#94A3B8">
    81,151 OPS/SEC
  </text>

  <!-- Brand Title -->
  <text x="80" y="210" font-family="'Space Grotesk', 'Helvetica', sans-serif" font-size="64" font-weight="900" fill="#FFFFFF" letter-spacing="-1">
    KNOTRUN
  </text>

  <!-- Gradient Sub-title -->
  <text x="80" y="275" font-family="'Space Grotesk', 'Helvetica', sans-serif" font-size="42" font-weight="800" fill="url(#amberGrad)" letter-spacing="-0.5">
    High-Performance Workflow Automation
  </text>

  <!-- Description paragraph -->
  <text x="80" y="340" font-family="'Space Grotesk', 'Helvetica', sans-serif" font-size="20" fill="#94A3B8">
    Sub-millisecond in-memory orchestration. Kahn's topological DAG sorting,
  </text>
  <text x="80" y="372" font-family="'Space Grotesk', 'Helvetica', sans-serif" font-size="20" fill="#94A3B8">
    isolated V8 execution runtimes, and zero-trust SSRF firewall protection.
  </text>

  <!-- Feature Pill Tags -->
  <g transform="translate(80, 430)">
    <!-- Pill 1 -->
    <rect x="0" y="0" width="220" height="44" rx="10" fill="#0E1626" stroke="#1E2E48" stroke-width="1.5"/>
    <text x="20" y="27" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" fill="#E2E8F0">⚡ 0.001ms Latency</text>

    <!-- Pill 2 -->
    <rect x="236" y="0" width="230" height="44" rx="10" fill="#0E1626" stroke="#1E2E48" stroke-width="1.5"/>
    <text x="256" y="27" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" fill="#E2E8F0">🛡️ SSRF Zero-Trust</text>

    <!-- Pill 3 -->
    <rect x="482" y="0" width="250" height="44" rx="10" fill="#0E1626" stroke="#1E2E48" stroke-width="1.5"/>
    <text x="502" y="27" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" fill="#E2E8F0">🚀 BullMQ 2PC Fanout</text>
  </g>

  <!-- Bottom Terminal Status Bar -->
  <rect x="80" y="520" width="1040" height="44" rx="8" fill="#0B101D" stroke="#1E2E48" stroke-width="1"/>
  <text x="100" y="547" font-family="'JetBrains Mono', monospace" font-size="13" fill="#64748B">
    STATUS: <tspan fill="#00FF88">ONLINE</tspan> | PROTOCOL: <tspan fill="#E2E8F0">HTTP/2 + gRPC</tspan> | MEMORY: <tspan fill="#E2E8F0">ZERO-PERSISTENCE EPHEMERAL</tspan> | CANONICAL: <tspan fill="#38BDF8">https://knotrun.io</tspan>
  </text>
</svg>
`;

// Architecture Diagram SVG (800x480) for lazy-loading picture element
const archSvg = `
<svg width="800" height="480" viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cardBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0E1626"/>
      <stop offset="100%" stop-color="#070A0F"/>
    </linearGradient>
  </defs>
  <rect width="800" height="480" rx="16" fill="url(#cardBg)" stroke="#23354E" stroke-width="2"/>
  
  <!-- Title -->
  <text x="40" y="50" font-family="'Space Grotesk', sans-serif" font-size="20" font-weight="700" fill="#FFFFFF">KNOTRUN ARCHITECTURE // IN-MEMORY TOPOLOGY</text>
  <text x="40" y="75" font-family="'JetBrains Mono', monospace" font-size="12" fill="#94A3B8">Sub-millisecond data conduit flow &amp; distributed queue processing</text>

  <!-- Node 1: Webhook / Trigger -->
  <rect x="40" y="120" width="150" height="180" rx="12" fill="#131D2D" stroke="#FF9900" stroke-width="1.5"/>
  <circle cx="65" cy="150" r="12" fill="#FF9900" fill-opacity="0.2"/>
  <text x="60" y="155" font-family="sans-serif" font-size="14" fill="#FF9900">⚡</text>
  <text x="40" y="195" font-family="'Space Grotesk', sans-serif" font-size="15" font-weight="700" fill="#FFFFFF" dx="16">INGRESS</text>
  <text x="40" y="215" font-family="'JetBrains Mono', monospace" font-size="11" fill="#94A3B8" dx="16">SSRF Guard</text>
  <text x="40" y="235" font-family="'JetBrains Mono', monospace" font-size="11" fill="#94A3B8" dx="16">HMAC Verify</text>
  <text x="40" y="270" font-family="'JetBrains Mono', monospace" font-size="10" fill="#00FF88" dx="16">0.001ms Latency</text>

  <!-- Arrow 1 -->
  <line x1="195" y1="210" x2="230" y2="210" stroke="#FF9900" stroke-width="2" stroke-dasharray="4"/>
  <polygon points="230,206 238,210 230,214" fill="#FF9900"/>

  <!-- Node 2: Kahn's DAG -->
  <rect x="240" y="120" width="150" height="180" rx="12" fill="#131D2D" stroke="#38BDF8" stroke-width="1.5"/>
  <circle cx="265" cy="150" r="12" fill="#38BDF8" fill-opacity="0.2"/>
  <text x="260" y="155" font-family="sans-serif" font-size="14" fill="#38BDF8">⌘</text>
  <text x="240" y="195" font-family="'Space Grotesk', sans-serif" font-size="15" font-weight="700" fill="#FFFFFF" dx="16">DAG ENGINE</text>
  <text x="240" y="215" font-family="'JetBrains Mono', monospace" font-size="11" fill="#94A3B8" dx="16">Kahn's Sort</text>
  <text x="240" y="235" font-family="'JetBrains Mono', monospace" font-size="11" fill="#94A3B8" dx="16">Cycle Detect</text>
  <text x="240" y="270" font-family="'JetBrains Mono', monospace" font-size="10" fill="#38BDF8" dx="16">Zero Recursion</text>

  <!-- Arrow 2 -->
  <line x1="395" y1="210" x2="430" y2="210" stroke="#38BDF8" stroke-width="2" stroke-dasharray="4"/>
  <polygon points="430,206 438,210 430,214" fill="#38BDF8"/>

  <!-- Node 3: V8 Sandbox -->
  <rect x="440" y="120" width="150" height="180" rx="12" fill="#131D2D" stroke="#A855F7" stroke-width="1.5"/>
  <circle cx="465" cy="150" r="12" fill="#A855F7" fill-opacity="0.2"/>
  <text x="460" y="155" font-family="sans-serif" font-size="14" fill="#A855F7">⚙️</text>
  <text x="440" y="195" font-family="'Space Grotesk', sans-serif" font-size="15" font-weight="700" fill="#FFFFFF" dx="16">V8 ISOLATE</text>
  <text x="440" y="215" font-family="'JetBrains Mono', monospace" font-size="11" fill="#94A3B8" dx="16">128MB Memory</text>
  <text x="440" y="235" font-family="'JetBrains Mono', monospace" font-size="11" fill="#94A3B8" dx="16">50ms Timeout</text>
  <text x="440" y="270" font-family="'JetBrains Mono', monospace" font-size="10" fill="#A855F7" dx="16">Sandboxed Run</text>

  <!-- Arrow 3 -->
  <line x1="595" y1="210" x2="630" y2="210" stroke="#A855F7" stroke-width="2" stroke-dasharray="4"/>
  <polygon points="630,206 638,210 630,214" fill="#A855F7"/>

  <!-- Node 4: Sinks & 2PC -->
  <rect x="640" y="120" width="130" height="180" rx="12" fill="#131D2D" stroke="#00FF88" stroke-width="1.5"/>
  <circle cx="665" cy="150" r="12" fill="#00FF88" fill-opacity="0.2"/>
  <text x="660" y="155" font-family="sans-serif" font-size="14" fill="#00FF88">🚀</text>
  <text x="640" y="195" font-family="'Space Grotesk', sans-serif" font-size="15" font-weight="700" fill="#FFFFFF" dx="12">FANOUT</text>
  <text x="640" y="215" font-family="'JetBrains Mono', monospace" font-size="11" fill="#94A3B8" dx="12">BullMQ Redis</text>
  <text x="640" y="235" font-family="'JetBrains Mono', monospace" font-size="11" fill="#94A3B8" dx="12">2PC Atomic</text>
  <text x="640" y="270" font-family="'JetBrains Mono', monospace" font-size="10" fill="#00FF88" dx="12">Distributed</text>

  <!-- Metrics footer in diagram -->
  <rect x="40" y="340" width="730" height="100" rx="10" fill="#090E17" stroke="#1A283B" stroke-width="1"/>
  <text x="65" y="375" font-family="'JetBrains Mono', monospace" font-size="12" fill="#94A3B8">BENCHMARK TELEMETRY</text>
  <text x="65" y="410" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="800" fill="#FFFFFF">81,151 ops/s</text>
  <text x="280" y="375" font-family="'JetBrains Mono', monospace" font-size="12" fill="#94A3B8">V8 MEMORY FOOTPRINT</text>
  <text x="280" y="410" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="800" fill="#38BDF8">3.8 MB avg</text>
  <text x="520" y="375" font-family="'JetBrains Mono', monospace" font-size="12" fill="#94A3B8">SSRF BYPASS RATE</text>
  <text x="520" y="410" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="800" fill="#00FF88">0.000%</text>
</svg>
`;

async function buildAssets() {
  console.log("Generating WebP & PNG assets via Sharp...");

  const ogBuffer = Buffer.from(ogSvg);
  const archBuffer = Buffer.from(archSvg);

  // Targets
  const targets = [landingPublic, n8nPublic];

  for (const dir of targets) {
    // 1. OG Image WebP
    await sharp(ogBuffer)
      .webp({ quality: 90 })
      .toFile(path.join(dir, "og-image.webp"));
    console.log(`Generated: ${path.join(dir, "og-image.webp")}`);

    // 2. OG Image PNG fallback
    await sharp(ogBuffer)
      .png()
      .toFile(path.join(dir, "og-image.png"));
    console.log(`Generated: ${path.join(dir, "og-image.png")}`);

    // 3. Architecture diagram WebP
    await sharp(archBuffer)
      .webp({ quality: 90 })
      .toFile(path.join(dir, "architecture-diagram.webp"));
    console.log(`Generated: ${path.join(dir, "architecture-diagram.webp")}`);

    // 4. Architecture diagram PNG fallback
    await sharp(archBuffer)
      .png()
      .toFile(path.join(dir, "architecture-diagram.png"));
    console.log(`Generated: ${path.join(dir, "architecture-diagram.png")}`);
  }

  console.log("✅ All WebP and PNG assets successfully generated.");
}

buildAssets().catch(console.error);
