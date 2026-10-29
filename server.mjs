import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 3000;

const ROUTE_METADATA = {
  "/": {
    title: "Knotrun — Industrial-Grade Workflow Orchestration & In-Memory DAG Engine",
    description: "Sub-millisecond in-memory DAG execution engine operating at 81,000+ ops/sec with distributed BullMQ queues, V8 sandboxed runtimes, and zero-trust SSRF security.",
    canonical: "https://knotrun.io/",
    status: 200,
  },
  "/privacy": {
    title: "Privacy Policy | Knotrun Enterprise Workflow Engine",
    description: "Learn how Knotrun protects your data with zero-persistence ephemeral in-memory DAG execution, strict V8 memory bounds, and zero-trust SSRF firewalling.",
    canonical: "https://knotrun.io/privacy",
    status: 200,
  },
};

const DEFAULT_404_META = {
  title: "404 — Page Not Found | Knotrun",
  description: "The requested routing endpoint or DAG execution node does not exist in the Knotrun orchestration topology.",
  canonical: "https://knotrun.io/404",
  status: 404,
};

// 301 Permanent Redirect Maps
const REDIRECTS_301 = {
  "/home": "/",
  "/index.html": "/",
  "/privacy-policy": "/privacy",
  "/privacy.html": "/privacy",
  "/demo": "http://localhost:5173",
  "/app": "http://localhost:5173",
  "/studio": "http://localhost:5173",
  "/workspaces": "http://localhost:5173/dashboard",
};

export async function createServer() {
  const app = express();

  // 1. 301 REDIRECTS MIDDLEWARE
  app.use((req, res, next) => {
    const rawUrl = req.url.split("?")[0];

    // Trailing slash redirect (except root)
    if (rawUrl.length > 1 && rawUrl.endsWith("/")) {
      const cleanPath = rawUrl.slice(0, -1) + (req.url.includes("?") ? `?${req.url.split("?")[1]}` : "");
      return res.redirect(301, cleanPath);
    }

    // Explicit path redirects
    if (REDIRECTS_301[rawUrl]) {
      const target = REDIRECTS_301[rawUrl];
      return res.redirect(301, target);
    }

    next();
  });

  // 2. STATIC FILES SERVING
  app.use(express.static(path.resolve(__dirname, "public"), { maxAge: "1d" }));
  if (fs.existsSync(path.resolve(__dirname, "dist/client"))) {
    app.use(express.static(path.resolve(__dirname, "dist/client"), { index: false, maxAge: "7d" }));
  }

  // 3. SERVER-SIDE RENDERING (SSR) HANDLER
  app.use(async (req, res) => {
    const url = req.originalUrl.split("?")[0];
    const meta = ROUTE_METADATA[url] || DEFAULT_404_META;

    try {
      // Read base template
      let templatePath = path.resolve(__dirname, "dist/client/index.html");
      if (!fs.existsSync(templatePath)) {
        templatePath = path.resolve(__dirname, "index.html");
      }
      let template = fs.readFileSync(templatePath, "utf-8");

      // Load SSR render function
      let render;
      const ssrBundlePath = path.resolve(__dirname, "dist/server/entry-server.js");
      if (fs.existsSync(ssrBundlePath)) {
        const mod = await import(`file://${ssrBundlePath}`);
        render = mod.render;
      } else {
        // Fallback for dev without build
        render = (u) => ({ html: `<div id="ssr-fallback">Server rendering path: ${u}</div>` });
      }

      const { html: appHtml } = render(url);

      // Construct head injection with complete SEO metadata, Open Graph, Twitter, Canonical, Schemas, Analytics
      const headTags = `
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="google-site-verification" content="google-site-verification=KnotrunEnterpriseVerificationToken2026" />
    <link rel="canonical" href="${meta.canonical}" />

    <!-- Open Graph Protocol -->
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:url" content="${meta.canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://knotrun.io/og-image.webp" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/webp" />
    <meta property="og:site_name" content="Knotrun Orchestration" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@knotrun_io" />
    <meta name="twitter:creator" content="@knotrun_io" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
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

    <!-- Google Analytics (GA4) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-KNOTRUN81K"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-KNOTRUN81K', { page_path: '${url}' });
    </script>
      `;

      // Inject into template
      let finalHtml = template
        .replace(/<title>[\s\S]*?<\/title>/, "")
        .replace(/<meta\s+name="description"[\s\S]*?>/i, "")
        .replace("</head>", `${headTags}\n</head>`)
        .replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`);

      res.status(meta.status).set({ "Content-Type": "text/html; charset=utf-8" }).send(finalHtml);
    } catch (err) {
      console.error("[SSR Error]", err);
      res.status(500).send("Server-Side Rendering Exception: " + err.message);
    }
  });

  return app;
}

if (process.env.NODE_ENV !== "test") {
  createServer().then((app) => {
    app.listen(PORT, () => {
      console.log(`🚀 Knotrun SSR Server listening on http://localhost:${PORT}`);
    });
  });
}
