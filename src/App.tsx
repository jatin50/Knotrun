import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HeroScene3D } from "./components/HeroScene3D";
import { ScrollTreeSpine } from "./components/ScrollTreeSpine";
import { EngineSection } from "./components/EngineSection";
import { TelemetrySection } from "./components/TelemetrySection";
import { TemplatesSection } from "./components/TemplatesSection";
import { LaunchCTASection } from "./components/LaunchCTASection";
import { Footer } from "./components/Footer";
import { PrivacyPage } from "./components/PrivacyPage";
import { NotFoundPage } from "./components/NotFoundPage";
import { SEOHead } from "./components/SEOHead";

function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#070A0F] text-slate-100 font-['Space_Grotesk'] selection:bg-amber-500/30 selection:text-amber-200 w-full">
      {/* Dynamic SEO Meta, Social Open Graph & Schema.org JSON-LD */}
      <SEOHead
        title="Knotrun — Industrial-Grade Workflow Orchestration & In-Memory DAG Engine"
        description="Sub-millisecond in-memory DAG execution engine operating at 81,000+ ops/sec with distributed BullMQ queues, V8 sandboxed runtimes, and zero-trust SSRF security."
        canonicalUrl="https://knotrun.io/"
        schemaType="software"
      />

      {/* Background ambient noise grid */}
      <div className="fixed inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none z-0" />

      {/* Floating Glass Navbar */}
      <Navbar />

      <main className="relative z-10 w-full flex flex-col items-center">
        {/* Section 1: 3D Interactive Pipeline Hero (Full Width & Height Pinned 3D Viewport) */}
        <section id="pipeline-3d" className="w-full">
          <HeroScene3D />
        </section>

        {/* Sections 2-5: V8 Engine, Telemetry, Templates, and Launch CTA connected via Physics-Driven SVG Spine */}
        <div className="relative w-full flex flex-col items-center overflow-hidden">
          <ScrollTreeSpine />
          <EngineSection />
          <TelemetrySection />
          <TemplatesSection />
          <LaunchCTASection />
        </div>
      </main>

      {/* Enterprise Status Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/privacy-policy" element={<Navigate to="/privacy" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
