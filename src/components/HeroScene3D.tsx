import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CheckCircle2, Zap, Terminal } from "lucide-react";

interface Scenario {
  id: string;
  name: string;
  badge: string;
  originLabel: string;
  originSub: string;
  engineLabel: string;
  engineSub: string;
  targetALabel: string;
  targetBLabel: string;
  popupTitle: string;
  popupBody: string;
  accentColor: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "github-discord",
    name: "GitHub CI/CD → Discord Deploy",
    badge: "DevOps & Cloud",
    originLabel: "GitHub Webhook",
    originSub: "POST /deploy-event",
    engineLabel: "V8 DAG Engine",
    engineSub: "Kahn's Sort (0.01ms)",
    targetALabel: "Discord Webhook",
    targetBLabel: "Cloud PostgreSQL",
    popupTitle: "[#deployments] CI/CD Bot",
    popupBody: "🚀 Release v2.4.0 successfully deployed to production! All 21 tests passed (42ms).",
    accentColor: "#5865F2",
  },
  {
    id: "uptime-alert",
    name: "Uptime Pinger → Email Alert",
    badge: "Monitoring",
    originLabel: "Cron Schedule",
    originSub: "*/2 * * * * (BullMQ)",
    engineLabel: "V8 Pinger & Logic",
    engineSub: "SSRF Verified Probe",
    targetALabel: "Send Email Alert",
    targetBLabel: "Audit Logs Store",
    popupTitle: "🚨 High-Priority DevOps Alert",
    popupBody: "Keep-Alive Heartbeat: https://my-cloud-app.com/ answered in 38ms (200 OK).",
    accentColor: "#10B981",
  },
  {
    id: "stripe-fulfillment",
    name: "Stripe Checkout → Customer Welcome",
    badge: "E-Commerce & SaaS",
    originLabel: "Stripe Webhook",
    originSub: "checkout.session.completed",
    engineLabel: "HMAC-SHA256 Guard",
    engineSub: "Verified Signature",
    targetALabel: "Customer Email",
    targetBLabel: "Stripe ACK (200 OK)",
    popupTitle: "💳 Payment Fulfilled",
    popupBody: "Pro Plan Activated: $49.00 USD received. Welcome email dispatched to customer.",
    accentColor: "#F59E0B",
  },
];

export const HeroScene3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[0]);
  const [showPopupA, setShowPopupA] = useState(false);
  const [showPopupB, setShowPopupB] = useState(false);
  const [telemetrySpeed, setTelemetrySpeed] = useState("81,151");
  const [telemetryLatency, setTelemetryLatency] = useState("0.012");

  // Screen coordinates for 3D projected overlay cards
  const [popupPosA, setPopupPosA] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [popupPosB, setPopupPosB] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04060a, 0.05);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const bluePoint = new THREE.PointLight(0x6366f1, 3, 20);
    bluePoint.position.set(-4, 2, 2);
    scene.add(bluePoint);

    const targetPointLight = new THREE.PointLight(0x5865f2, 0, 15);
    targetPointLight.position.set(4.5, 1.2, 2);
    scene.add(targetPointLight);

    // Dynamic photon moving point light
    const photonLight = new THREE.PointLight(0xc4b5fd, 4, 8);
    scene.add(photonLight);

    // --- 3D NODE MODULES ---
    const nodeGeometry = new THREE.BoxGeometry(2.2, 1.4, 0.6);

    // Glass physical material
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111726,
      metalness: 0.2,
      roughness: 0.15,
      transmission: 0.7,
      thickness: 1.2,
      reflectivity: 0.9,
      transparent: true,
      opacity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const createNodeMesh = (x: number, y: number, z: number, accentHex: number) => {
      const group = new THREE.Group();
      const mesh = new THREE.Mesh(nodeGeometry, glassMaterial.clone());
      group.add(mesh);

      // Edge wireframe highlight
      const edges = new THREE.EdgesGeometry(nodeGeometry);
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: accentHex, transparent: true, opacity: 0.75 }));
      group.add(line);

      // Core pulsing glow chip inside the module
      const coreGeo = new THREE.BoxGeometry(0.8, 0.4, 0.1);
      const coreMat = new THREE.MeshBasicMaterial({ color: accentHex });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      group.add(coreMesh);

      group.position.set(x, y, z);
      scene.add(group);
      return { group, line, coreMesh };
    };

    // Node Positions in 3D Space
    const nodeOrigin = createNodeMesh(-4.5, 0, 0, 0x38bdf8); // Trigger
    const nodeEngine = createNodeMesh(0, 0, 0.4, 0x06b6d4);   // Engine Processor
    const nodeTargetA = createNodeMesh(4.5, 1.4, 0, 0x5865f2); // Target A (Discord)
    const nodeTargetB = createNodeMesh(4.5, -1.4, 0, 0x10b981); // Target B (Email/DB)

    // --- 3D CONDUITS & DATA TUBES ---
    // Curve 1: Origin -> Engine
    const curve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.4, 0, 0),
      new THREE.Vector3(-2.0, 0.6, 0.3),
      new THREE.Vector3(-1.1, 0, 0.4),
    ]);

    // Curve 2A: Engine -> Target A (Discord)
    const curve2A = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.1, 0, 0.4),
      new THREE.Vector3(2.6, 0.9, 0.2),
      new THREE.Vector3(3.4, 1.4, 0),
    ]);

    // Curve 2B: Engine -> Target B (Email/DB)
    const curve2B = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.1, 0, 0.4),
      new THREE.Vector3(2.6, -0.9, 0.2),
      new THREE.Vector3(3.4, -1.4, 0),
    ]);

    const tubeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      transparent: true,
      opacity: 0.45,
      roughness: 0.2,
      transmission: 0.8,
    });

    const tube1 = new THREE.Mesh(new THREE.TubeGeometry(curve1, 32, 0.08, 12, false), tubeMaterial);
    const tube2A = new THREE.Mesh(new THREE.TubeGeometry(curve2A, 32, 0.08, 12, false), tubeMaterial);
    const tube2B = new THREE.Mesh(new THREE.TubeGeometry(curve2B, 32, 0.08, 12, false), tubeMaterial);
    scene.add(tube1, tube2A, tube2B);

    // Glowing photon particle meshes
    const photonGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const photonMat = new THREE.MeshBasicMaterial({ color: 0xc4b5fd });

    const photon1 = new THREE.Mesh(photonGeo, photonMat);
    const photon2A = new THREE.Mesh(photonGeo, new THREE.MeshBasicMaterial({ color: 0x5865f2 }));
    const photon2B = new THREE.Mesh(photonGeo, new THREE.MeshBasicMaterial({ color: 0x10b981 }));
    scene.add(photon1, photon2A, photon2B);
    photon2A.visible = false;
    photon2B.visible = false;

    // Ambient floating star dust particles
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 200;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({ size: 0.04, color: 0x818cf8, transparent: true, opacity: 0.4 });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // --- ANIMATION TIMELINE & PHYSICS ---
    let progress = 0;
    let clock = new THREE.Clock();
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.targetY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    container.addEventListener("mousemove", handleMouseMove);

    // Coordinate projector for HTML cards
    const project3dToScreen = (pos: THREE.Vector3) => {
      const v = pos.clone();
      v.project(camera);
      const halfWidth = container.clientWidth / 2;
      const halfHeight = container.clientHeight / 2;
      return {
        x: v.x * halfWidth + halfWidth,
        y: -v.y * halfHeight + halfHeight,
      };
    };

    let animationId: number;
    let lastFlashTime = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Camera parallax with smooth inertia (damping)
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      camera.position.x = mouse.x * 1.5;
      camera.position.y = mouse.y * 1.2;
      camera.lookAt(0, 0, 0);

      // Subtle organic floating for nodes
      nodeOrigin.group.position.y = Math.sin(time * 1.8) * 0.08;
      nodeEngine.group.position.y = Math.cos(time * 1.5) * 0.06;
      nodeTargetA.group.position.y = 1.4 + Math.sin(time * 1.6 + 1) * 0.08;
      nodeTargetB.group.position.y = -1.4 + Math.cos(time * 1.7 + 2) * 0.08;

      // Rotate star dust
      particleSystem.rotation.y = time * 0.02;

      // Project Target node positions for 2D HTML popups
      const posA = project3dToScreen(new THREE.Vector3(4.5, nodeTargetA.group.position.y + 1.2, 0));
      const posB = project3dToScreen(new THREE.Vector3(4.5, nodeTargetB.group.position.y - 0.9, 0));
      setPopupPosA(posA);
      setPopupPosB(posB);

      // Continuous Physics-Based Packet Transit
      progress += delta * 0.45; // Speed multiplier

      if (progress < 0.5) {
        // Stage 1: Origin -> Engine
        const t1 = progress / 0.5; // 0 to 1
        const pt = curve1.getPointAt(t1);
        photon1.position.copy(pt);
        photonLight.position.copy(pt);
        photon1.visible = true;
        photon2A.visible = false;
        photon2B.visible = false;
        setShowPopupA(false);
        setShowPopupB(false);
        targetPointLight.intensity = Math.max(0, targetPointLight.intensity - delta * 4);
      } else {
        // Stage 2: Bifurcation! Splits into two packets
        const t2 = (progress - 0.5) / 0.5; // 0 to 1
        photon1.visible = false;
        photon2A.visible = true;
        photon2B.visible = true;

        if (t2 <= 1.0) {
          const ptA = curve2A.getPointAt(t2);
          const ptB = curve2B.getPointAt(t2);
          photon2A.position.copy(ptA);
          photon2B.position.copy(ptB);
          photonLight.position.copy(ptA);

          // Arrival moment!
          if (t2 > 0.95 && time - lastFlashTime > 1.5) {
            lastFlashTime = time;
            targetPointLight.intensity = 6;
            setShowPopupA(true);
            setShowPopupB(true);
            // Dynamic telemetry jitter
            setTelemetrySpeed((80000 + Math.floor(Math.random() * 3500)).toLocaleString());
            setTelemetryLatency((0.01 + Math.random() * 0.005).toFixed(3));
          }
        } else {
          // Reset loop
          progress = 0;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [activeScenario]);

  return (
    <div className="relative w-full min-h-[92vh] flex flex-col items-center justify-between pt-28 pb-12 overflow-hidden bg-[#04060A]">
      {/* Background radial ambient illumination */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Hero Header Typography */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-emerald-400 font-semibold">Live Engine Telemetry:</span>
          <span>{telemetrySpeed} ops/sec</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400 font-mono">{telemetryLatency}ms node latency</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-['Plus_Jakarta_Sans'] leading-[1.12]">
          The High-Performance <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-400">
            Workflow Orchestration Engine
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
          Engineered for sub-millisecond in-memory DAG pipelines, resilient BullMQ distributed queues, and zero-trust sandboxed code execution. Watch real-time data packets navigate the 3D pipeline below.
        </p>

        {/* Scenario Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => {
                setActiveScenario(scenario);
                setShowPopupA(false);
                setShowPopupB(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeScenario.id === scenario.id
                  ? "bg-white/10 text-white border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  : "text-slate-400 hover:text-slate-200 bg-black/40 border border-white/5 hover:border-white/10"
              }`}
            >
              {scenario.name}
            </button>
          ))}
        </div>
      </div>

      {/* THREE.JS 3D INTERACTIVE WORKBENCH STAGE */}
      <div className="relative w-full max-w-5xl h-[460px] sm:h-[520px] my-4 cursor-grab active:cursor-grabbing">
        {/* The WebGL Canvas */}
        <div ref={mountRef} className="w-full h-full relative" />

        {/* 2D Projected High-DPI DOM Node Labels */}
        {/* Node 1 Label: Origin */}
        <div className="absolute top-[52%] left-[12%] -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center space-y-0.5">
          <div className="px-2.5 py-1 rounded bg-[#090D16]/90 border border-sky-500/40 backdrop-blur-md text-[11px] font-semibold text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            {activeScenario.originLabel}
          </div>
          <p className="text-[10px] font-mono text-slate-400">{activeScenario.originSub}</p>
        </div>

        {/* Node 2 Label: Engine Brain */}
        <div className="absolute top-[52%] left-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center space-y-0.5">
          <div className="px-3 py-1 rounded bg-[#090D16]/90 border border-cyan-500/50 backdrop-blur-md text-[11px] font-bold text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-cyan-400" />
            <span>{activeScenario.engineLabel}</span>
          </div>
          <p className="text-[10px] font-mono text-cyan-400/80">{activeScenario.engineSub}</p>
        </div>

        {/* Node 3 Label: Target A */}
        <div className="absolute top-[28%] right-[10%] translate-x-1/2 -translate-y-1/2 pointer-events-none text-center space-y-0.5">
          <div className="px-2.5 py-1 rounded bg-[#090D16]/90 border border-indigo-500/50 backdrop-blur-md text-[11px] font-semibold text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.25)]">
            {activeScenario.targetALabel}
          </div>
        </div>

        {/* Node 4 Label: Target B */}
        <div className="absolute top-[76%] right-[10%] translate-x-1/2 -translate-y-1/2 pointer-events-none text-center space-y-0.5">
          <div className="px-2.5 py-1 rounded bg-[#090D16]/90 border border-emerald-500/50 backdrop-blur-md text-[11px] font-semibold text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]">
            {activeScenario.targetBLabel}
          </div>
        </div>

        {/* Dynamic Holographic Popup Card A (Discord / Primary) */}
        {showPopupA && (
          <div
            style={{
              position: "absolute",
              left: `${popupPosA.x}px`,
              top: `${popupPosA.y}px`,
              transform: "translate(-50%, -100%)",
            }}
            className="pointer-events-none z-30 w-72 p-3.5 rounded-xl bg-[#090D16]/95 border border-indigo-500/60 shadow-[0_10px_35px_rgba(99,102,241,0.4)] backdrop-blur-2xl animate-in zoom-in-95 duration-200 space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigo-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                {activeScenario.popupTitle}
              </span>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800">
                200 OK
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-snug font-medium">
              {activeScenario.popupBody}
            </p>
          </div>
        )}

        {/* Dynamic Confirmation Pill B (Email / DB) */}
        {showPopupB && (
          <div
            style={{
              position: "absolute",
              left: `${popupPosB.x}px`,
              top: `${popupPosB.y}px`,
              transform: "translate(-50%, 20%)",
            }}
            className="pointer-events-none z-30 px-3 py-1.5 rounded-lg bg-[#090D16]/95 border border-emerald-500/60 shadow-[0_8px_25px_rgba(16,185,129,0.3)] backdrop-blur-xl animate-in fade-in duration-200 flex items-center gap-2"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-mono text-emerald-300">
              Payload verified & committed (1ms)
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-2">
        <a
          href="http://localhost:5173"
          className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:shadow-[0_0_40px_rgba(99,102,241,0.7)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>Launch Live Studio (1-Click Demo)</span>
          <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
        </a>

        <a
          href="https://github.com/jatin50/n8n_workflow"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:-translate-y-0.5"
        >
          <Terminal className="w-4 h-4 text-slate-400" />
          <span>Clone & Self-Host Guide</span>
        </a>
      </div>
    </div>
  );
};
