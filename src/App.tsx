import { Navbar } from "./components/Navbar";
import { HeroScene3D } from "./components/HeroScene3D";
import { ScrollTreeSpine } from "./components/ScrollTreeSpine";
import { EngineSection } from "./components/EngineSection";
import { TelemetrySection } from "./components/TelemetrySection";
import { TemplatesSection } from "./components/TemplatesSection";
import { LaunchCTASection } from "./components/LaunchCTASection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#070A0F] text-slate-100 overflow-x-hidden font-['Space_Grotesk'] selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background ambient noise grid */}
      <div className="fixed inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none z-0" />

      {/* CONTINUOUS PHYSICS-DRIVEN SCROLL CONDUIT SPINE */}
      <ScrollTreeSpine />

      {/* Floating Glass Navbar */}
      <Navbar />

      <main className="relative z-10 flex flex-col items-center">
        {/* Section 1: 3D Interactive Pipeline Hero (Full Width & Height 100vw, 100vh) */}
        <section id="pipeline-3d" className="w-full">
          <HeroScene3D />
        </section>

        {/* Section 2: V8 Engine & Angled 3D Silicon Chip */}
        <EngineSection />

        {/* Section 3: Live Telemetry Cockpit & Speedometer */}
        <TelemetrySection />

        {/* Section 4: 10 Enterprise Workflow Templates */}
        <TemplatesSection />

        {/* Section 5: Studio Gateway & Final CTA */}
        <LaunchCTASection />
      </main>

      {/* Enterprise Status Footer */}
      <Footer />
    </div>
  );
}
