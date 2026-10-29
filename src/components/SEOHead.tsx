import React, { useEffect } from "react";

export interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  schemaType?: "website" | "software";
}

const DEFAULT_TITLE = "Knotrun — Industrial-Grade Workflow Orchestration & In-Memory DAG Engine";
const DEFAULT_DESC = "Sub-millisecond in-memory DAG execution engine operating at 81,000+ ops/sec with distributed BullMQ queues, V8 sandboxed runtimes, and zero-trust SSRF security.";
const DEFAULT_CANONICAL = "https://knotrun.io/";
const DEFAULT_OG_IMAGE = "https://knotrun.io/og-image.webp";
const GA_MEASUREMENT_ID = (typeof import.meta !== "undefined" && import.meta.env?.VITE_GA_ID) || "G-KNOTRUN81K";
const GSC_VERIFICATION = (typeof import.meta !== "undefined" && import.meta.env?.VITE_GSC_KEY) || "google-site-verification=KnotrunEnterpriseVerificationToken2026";

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Knotrun Systems Inc.",
  "alternateName": "Knotrun Orchestration",
  "url": "https://knotrun.io",
  "logo": "https://knotrun.io/og-image.webp",
  "description": "Enterprise-grade high-throughput workflow orchestration engine and in-memory DAG scheduler.",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Support",
    "email": "support@knotrun.io",
    "url": "https://knotrun.io"
  },
  "sameAs": [
    "https://github.com/knotrun/orchestration-engine",
    "https://twitter.com/knotrun_io",
    "https://linkedin.com/company/knotrun"
  ]
};

export const SOFTWARE_APPLICATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Knotrun DAG Workflow Engine",
  "operatingSystem": "Linux, macOS, Windows, Docker, Kubernetes",
  "applicationCategory": "DeveloperApplication",
  "applicationSubCategory": "WorkflowAutomation",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.96",
    "ratingCount": "1840",
    "bestRating": "5",
    "worstRating": "1"
  },
  "description": "High-performance in-memory DAG workflow orchestration engine powered by Kahn's topological sort, BullMQ Redis streams, and V8 isolated execution.",
  "featureList": [
    "Kahn's Topological DAG Sorting (O(V+E) Complexity)",
    "Sub-millisecond In-Memory Execution (81,151 ops/sec)",
    "Zero-Trust SSRF IP & DNS Rebind Firewall",
    "Isolated V8 Runtimes with 128MB Strict Bounds",
    "Two-Phase Commit (2PC) Sinks (Discord, PostgreSQL, Resend)"
  ]
};

export const SEOHead: React.FC<SEOProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  canonicalUrl = DEFAULT_CANONICAL,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  schemaType = "software"
}) => {
  useEffect(() => {
    // 1. Update Title & Favicon in title bar
    document.title = title;

    let fav = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
    if (!fav) {
      fav = document.createElement("link");
      fav.setAttribute("rel", "icon");
      document.head.appendChild(fav);
    }
    fav.setAttribute("type", "image/svg+xml");
    fav.setAttribute("href", "/favicon.svg");

    // Helper to set or create meta tag
    const setMeta = (nameAttr: "name" | "property", key: string, content: string) => {
      let el = document.querySelector(`meta[${nameAttr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(nameAttr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // 2. Standard Meta Tags
    setMeta("name", "description", description);
    setMeta("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setMeta("name", "google-site-verification", GSC_VERIFICATION);

    // 3. Canonical Link Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // 4. Open Graph Tags
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:image:type", "image/webp");
    setMeta("property", "og:site_name", "Knotrun Orchestration");

    // 5. Twitter Card Tags
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:site", "@knotrun_io");
    setMeta("name", "twitter:creator", "@knotrun_io");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    // 6. Google Analytics (gtag.js) initialization
    if (typeof window !== "undefined" && !document.getElementById("ga4-script")) {
      const gaScript = document.createElement("script");
      gaScript.id = "ga4-script";
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(gaScript);

      const gaInit = document.createElement("script");
      gaInit.id = "ga4-init";
      gaInit.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });
      `;
      document.head.appendChild(gaInit);
    } else if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", GA_MEASUREMENT_ID, { page_path: window.location.pathname });
    }
  }, [title, description, canonicalUrl, ogImage, ogType]);

  const activeSchema = schemaType === "software" ? SOFTWARE_APPLICATION_SCHEMA : ORGANIZATION_SCHEMA;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(activeSchema) }}
      />
    </>
  );
};
