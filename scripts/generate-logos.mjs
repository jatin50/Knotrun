import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const landingPublic = path.resolve(__dirname, "../public");
const n8nPublic = path.resolve(__dirname, "../../n8n_workflow/frontend/public");

// ============================================================================
// 1. FLAGSHIP LOGO: THE TOPOLOGICAL K-KNOT (Icon Only - 128x128 viewBox)
// ============================================================================
const knotIconSvg = `
<svg width="256" height="256" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Dark Titanium Backing Glow -->
    <radialGradient id="knotAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FF9900" stop-opacity="0.25"/>
      <stop offset="70%" stop-color="#00E5FF" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#070A0F" stop-opacity="0"/>
    </radialGradient>

    <!-- Amber Conduit Gradient (Ingress & DAG Topo) -->
    <linearGradient id="amberConduit" x1="20" y1="20" x2="110" y2="70" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFE072"/>
      <stop offset="35%" stop-color="#FF9900"/>
      <stop offset="100%" stop-color="#FF4500"/>
    </linearGradient>

    <!-- Cyan Velocity Ribbon (Sandboxed V8 & Fanout) -->
    <linearGradient id="cyanVelocity" x1="110" y1="50" x2="30" y2="115" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00E5FF"/>
      <stop offset="55%" stop-color="#00B0FF"/>
      <stop offset="100%" stop-color="#00FF88"/>
    </linearGradient>

    <!-- Metallic Specular Highlight on Ribbon Edge -->
    <linearGradient id="specularEdge" x1="20" y1="20" x2="108" y2="108" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#00E5FF" stop-opacity="0.7"/>
    </linearGradient>

    <!-- Central Node Glow Filter -->
    <filter id="coreGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Ambient Aura -->
  <circle cx="64" cy="64" r="58" fill="url(#knotAura)"/>

  <!-- Background Hexagonal Shield Chassis -->
  <path d="M 64 6 L 114 34 L 114 94 L 64 122 L 14 94 L 14 34 Z" 
        fill="#080D18" 
        stroke="#1A273D" 
        stroke-width="1.5"/>

  <!-- Subtle Inner Chassis Ring -->
  <circle cx="64" cy="64" r="48" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1" stroke-dasharray="3 3"/>

  <!-- ======================================================================== -->
  <!-- THE K-KNOT: A CONTINUOUS INTERLOCKING TOPOLOGICAL RIBBON FORMING A "K"   -->
  <!-- ======================================================================== -->

  <!-- Segment A: The Lower Arc / Cyan Trajectory (Runs underneath back up) -->
  <path d="M 62 64 C 74 76, 92 88, 102 96 C 96 102, 84 104, 72 98 C 54 88, 38 72, 32 58 C 28 48, 30 36, 38 28 C 44 22, 54 22, 62 28 C 72 36, 78 48, 64 64 Z"
        fill="url(#cyanVelocity)"
        opacity="0.92"/>

  <!-- Segment B: The Main Continuous Topological Loop forming the forward K -->
  <!-- Left Vertical Spine + Upper Right Flare -->
  <path d="M 32 26 C 32 26, 44 22, 50 26 C 58 32, 60 44, 52 54 L 38 68 C 30 76, 26 86, 32 96 C 36 102, 44 102, 50 98 C 60 90, 72 76, 84 62 L 102 36 C 106 30, 100 24, 92 26 C 80 28, 68 40, 58 52 Z"
        fill="url(#amberConduit)"/>

  <!-- Interlocking Intersection Shadow (Simulates 3D Over-Under Knot Weave) -->
  <path d="M 50 50 C 54 46, 60 48, 64 54 C 62 60, 56 64, 50 60 Z" fill="#03060B" opacity="0.6"/>

  <!-- Front Acceleration Dart / Arrowhead Apex (Symbolizing Hyper-Speed Execution) -->
  <path d="M 96 64 L 108 52 L 104 76 Z" fill="#FFE072" filter="url(#coreGlow)"/>

  <!-- Specular Rim Light Ribbon Contour -->
  <path d="M 34 27 C 44 23, 56 30, 62 40 C 72 56, 88 44, 98 32 C 104 26, 98 38, 90 48 C 78 62, 66 76, 52 94"
        stroke="url(#specularEdge)"
        stroke-width="1.8"
        stroke-linecap="round"
        fill="none"/>

  <!-- DAG Quantum Vertex Nodes (3 Key Pipeline Stages) -->
  <!-- Node 1: Ingress Vertex -->
  <circle cx="34" cy="28" r="3.5" fill="#FFE072" stroke="#FF9900" stroke-width="1.5" filter="url(#coreGlow)"/>
  <circle cx="34" cy="28" r="1.2" fill="#FFFFFF"/>

  <!-- Node 2: Central Kahn Resolver Core -->
  <circle cx="64" cy="64" r="4.5" fill="#00E5FF" stroke="#FFFFFF" stroke-width="1.5" filter="url(#coreGlow)"/>
  <circle cx="64" cy="64" r="1.8" fill="#FFFFFF"/>

  <!-- Node 3: Supersonic Fanout Node -->
  <circle cx="98" cy="94" r="3.5" fill="#00FF88" stroke="#00E5FF" stroke-width="1.5" filter="url(#coreGlow)"/>
  <circle cx="98" cy="94" r="1.2" fill="#FFFFFF"/>
</svg>
`;

// ============================================================================
// 2. FULL HORIZONTAL LOGO WITH BESPOKE WORDMARK (800x200 viewBox)
// ============================================================================
const knotFullSvg = `
<svg width="800" height="200" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="fullAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FF9900" stop-opacity="0.3"/>
      <stop offset="60%" stop-color="#00E5FF" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#070A0F" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fullAmber" x1="30" y1="30" x2="170" y2="100" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFE072"/>
      <stop offset="40%" stop-color="#FF9900"/>
      <stop offset="100%" stop-color="#FF4500"/>
    </linearGradient>
    <linearGradient id="fullCyan" x1="170" y1="80" x2="50" y2="180" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00E5FF"/>
      <stop offset="50%" stop-color="#00B0FF"/>
      <stop offset="100%" stop-color="#00FF88"/>
    </linearGradient>
    <linearGradient id="textGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="#F1F5F9"/>
      <stop offset="100%" stop-color="#94A3B8"/>
    </linearGradient>
    <linearGradient id="runGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#FFB300"/>
      <stop offset="50%" stop-color="#FF7A00"/>
      <stop offset="100%" stop-color="#00FF88"/>
    </linearGradient>
    <filter id="fullGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3.5" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Left Icon Mark (Scaled & Positioned at x: 30, y: 20) -->
  <g transform="translate(30, 20)">
    <!-- Hex Chassis -->
    <path d="M 80 8 L 144 44 L 144 116 L 80 152 L 16 116 L 16 44 Z" fill="#080D18" stroke="#1E2E48" stroke-width="2"/>
    <circle cx="80" cy="80" r="62" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1.2" stroke-dasharray="4 4"/>
    
    <!-- Lower Arc -->
    <path d="M 78 80 C 92 95, 115 110, 128 120 C 120 128, 105 130, 90 122 C 68 110, 48 90, 40 72 C 35 60, 38 45, 48 35 C 55 28, 68 28, 78 35 C 90 45, 98 60, 80 80 Z"
          fill="url(#fullCyan)" opacity="0.92"/>

    <!-- Upper Ribbon Loop -->
    <path d="M 40 33 C 40 33, 55 28, 63 33 C 73 40, 75 55, 65 68 L 48 85 C 38 95, 33 108, 40 120 C 45 128, 55 128, 63 122 C 75 112, 90 95, 105 78 L 128 45 C 133 38, 125 30, 115 33 C 100 35, 85 50, 73 65 Z"
          fill="url(#fullAmber)"/>

    <!-- Intersect Shadow -->
    <path d="M 63 63 C 68 58, 75 60, 80 68 C 78 75, 70 80, 63 75 Z" fill="#03060B" opacity="0.6"/>

    <!-- Specular Highlight -->
    <path d="M 43 34 C 55 29, 70 38, 78 50 C 90 70, 110 55, 123 40"
          stroke="#ffffff" stroke-width="2.2" stroke-opacity="0.85" stroke-linecap="round" fill="none"/>

    <!-- Vertices -->
    <circle cx="43" cy="35" r="4.5" fill="#FFE072" stroke="#FF9900" stroke-width="2" filter="url(#fullGlow)"/>
    <circle cx="80" cy="80" r="5.5" fill="#00E5FF" stroke="#FFFFFF" stroke-width="2" filter="url(#fullGlow)"/>
    <circle cx="123" cy="118" r="4.5" fill="#00FF88" stroke="#00E5FF" stroke-width="2" filter="url(#fullGlow)"/>
  </g>

  <!-- Divider Line -->
  <line x1="220" y1="45" x2="220" y2="155" stroke="#1E2E48" stroke-width="2"/>

  <!-- Brand Typography -->
  <!-- "KNOT" in Pure White Titanium Grotesk -->
  <text x="250" y="112" font-family="'Space Grotesk', 'Helvetica', sans-serif" font-size="76" font-weight="900" fill="url(#textGrad)" letter-spacing="1">
    KNOT
  </text>

  <!-- "RUN" in Electric Cyber Gradient -->
  <text x="495" y="112" font-family="'Space Grotesk', 'Helvetica', sans-serif" font-size="76" font-weight="900" fill="url(#runGrad)" letter-spacing="1">
    RUN
  </text>

  <!-- Sub-Badge Tagline -->
  <g transform="translate(252, 132)">
    <rect x="0" y="0" width="460" height="28" rx="6" fill="#0D1524" stroke="#1E2E48" stroke-width="1"/>
    <circle cx="14" cy="14" r="4" fill="#00FF88"/>
    <text x="28" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#94A3B8" letter-spacing="2">
      IN-MEMORY DAG ORCHESTRATION ENGINE // 81K OPS/S
    </text>
  </g>
</svg>
`;

async function generateLogoAssets() {
  console.log("🎨 Generating Knotrun Brand Identity Assets...");

  const iconBuffer = Buffer.from(knotIconSvg);
  const fullBuffer = Buffer.from(knotFullSvg);

  const targets = [landingPublic, n8nPublic];

  for (const dir of targets) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // 1. SVGs
    fs.writeFileSync(path.join(dir, "logo-icon.svg"), knotIconSvg, "utf-8");
    fs.writeFileSync(path.join(dir, "logo.svg"), knotFullSvg, "utf-8");
    fs.writeFileSync(path.join(dir, "favicon.svg"), knotIconSvg, "utf-8");
    console.log(`✓ Saved SVGs -> ${dir}`);

    // 2. High-Res PNGs (512x512, 192x192, 32x32)
    await sharp(iconBuffer)
      .resize(512, 512)
      .png()
      .toFile(path.join(dir, "logo-512.png"));

    await sharp(iconBuffer)
      .resize(192, 192)
      .png()
      .toFile(path.join(dir, "logo-192.png"));

    await sharp(iconBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(dir, "favicon-32.png"));

    // 3. High-Res WebP (512x512, full wordmark 800x200)
    await sharp(iconBuffer)
      .resize(512, 512)
      .webp({ quality: 95 })
      .toFile(path.join(dir, "logo-512.webp"));

    await sharp(fullBuffer)
      .resize(800, 200)
      .webp({ quality: 95 })
      .toFile(path.join(dir, "logo-wordmark.webp"));

    await sharp(fullBuffer)
      .resize(800, 200)
      .png()
      .toFile(path.join(dir, "logo-wordmark.png"));

    console.log(`✓ Saved WebP & PNGs -> ${dir}`);
  }

  console.log("🚀 All Knotrun brand assets generated with perfection.");
}

generateLogoAssets().catch(console.error);
