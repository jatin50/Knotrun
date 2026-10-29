import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROUTES = [
  {
    path: "/",
    outFile: "dist/client/index.html",
    title: "Knotrun — Industrial-Grade Workflow Orchestration & In-Memory DAG Engine",
    description: "Sub-millisecond in-memory DAG execution engine operating at 81,000+ ops/sec with distributed BullMQ queues, V8 sandboxed runtimes, and zero-trust SSRF security.",
    canonical: "https://knotrun.io/",
  },
  {
    path: "/privacy",
    outFile: "dist/client/privacy/index.html",
    title: "Privacy Policy | Knotrun Enterprise Workflow Engine",
    description: "Learn how Knotrun protects your data with zero-persistence ephemeral in-memory DAG execution, strict V8 memory bounds, and zero-trust SSRF firewalling.",
    canonical: "https://knotrun.io/privacy",
  },
  {
    path: "/404",
    outFile: "dist/client/404.html",
    title: "404 — Page Not Found | Knotrun",
    description: "The requested routing endpoint or DAG execution node does not exist in the Knotrun orchestration topology.",
    canonical: "https://knotrun.io/404",
  },
];

async function prerender() {
  console.log("⚡ Starting static pre-rendering (SSG)...");

  const templatePath = path.resolve(__dirname, "dist/client/index.html");
  if (!fs.existsSync(templatePath)) {
    console.error("❌ dist/client/index.html not found. Run client build first.");
    process.exit(1);
  }
  const template = fs.readFileSync(templatePath, "utf-8");

  const ssrBundlePath = path.resolve(__dirname, "dist/server/entry-server.js");
  if (!fs.existsSync(ssrBundlePath)) {
    console.error("❌ dist/server/entry-server.js not found. Run ssr build first.");
    process.exit(1);
  }
  const { render } = await import(`file://${ssrBundlePath}`);

  for (const route of ROUTES) {
    const { html: appHtml } = render(route.path);

    const headTags = `
    <title>${route.title}</title>
    <meta name="description" content="${route.description}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="google-site-verification" content="google-site-verification=KnotrunEnterpriseVerificationToken2026" />
    <link rel="canonical" href="${route.canonical}" />

    <!-- Open Graph Protocol -->
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:url" content="${route.canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://knotrun.io/og-image.webp" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/webp" />
    <meta property="og:site_name" content="Knotrun Orchestration" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@knotrun_io" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="https://knotrun.io/og-image.webp" />

    <!-- Organization Schema JSON-LD -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Knotrun Systems Inc.",
      "url": "https://knotrun.io",
      "logo": "https://knotrun.io/og-image.webp",
      "description": "Enterprise-grade high-throughput workflow orchestration engine and in-memory DAG scheduler.",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Support",
        "email": "support@knotrun.io"
      }
    }
    </script>
    `;

    const finalHtml = template
      .replace(/<title>[\s\S]*?<\/title>/, "")
      .replace(/<meta\s+name="description"[\s\S]*?>/i, "")
      .replace("</head>", `${headTags}\n</head>`)
      .replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`);

    const targetFile = path.resolve(__dirname, route.outFile);
    const targetDir = path.dirname(targetFile);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(targetFile, finalHtml, "utf-8");
    console.log(`✓ Pre-rendered [${route.path}] -> ${route.outFile} (${(finalHtml.length / 1024).toFixed(1)} KB)`);
  }

  console.log("✅ Static pre-rendering completed successfully.");
}

prerender().catch(console.error);
