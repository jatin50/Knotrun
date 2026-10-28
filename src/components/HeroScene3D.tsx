import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Zap, ShieldCheck, Send, Radio, ChevronDown, Activity, Cpu, ArrowRight, Play } from "lucide-react";

interface StationInfo {
  index: string;
  name: string;
  subtitle: string;
  metric: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}

const STATIONS: Record<number, StationInfo> = {
  1: {
    index: "01",
    name: "INGESTION & SSRF GATEWAY",
    subtitle: "Incoming Webhook & Schedule Intake",
    metric: "0.001ms • Zero-Trust Filter",
    desc: "Pre-flight cryptographic HMAC-SHA256 signature verification and DNS/IP firewall check to block private LAN and AWS metadata spoofing.",
    icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
    color: "#FF9900",
  },
  2: {
    index: "02",
    name: "V8 IN-MEMORY DAG REACTOR",
    subtitle: "Kahn's Topological Dependency Sorter",
    metric: "81,151 ops/s • 0.012ms Latency",
    desc: "Resolves execution sequence in-memory in O(V+E) time without cloud database roundtrips. Sandboxes custom JavaScript in isolated V8 contexts.",
    icon: <Zap className="w-5 h-5 text-cyan-400" />,
    color: "#00E5FF",
  },
  3: {
    index: "03",
    name: "BULLMQ DISTRIBUTED QUEUE",
    subtitle: "Upstash Redis TLS Message Buffer",
    metric: "2,551 req/s • Zero Frame Drops",
    desc: "Asynchronous task distributor buffering high-concurrency traffic bursts with resilient in-process async worker failover guarantees.",
    icon: <Radio className="w-5 h-5 text-orange-400" />,
    color: "#FF5500",
  },
  4: {
    index: "04",
    name: "MULTI-CHANNEL DISPATCH BAY",
    subtitle: "Webhook Relay & DB Persistence",
    metric: "200 OK • Neon DB Synchronized",
    desc: "Simultaneous multi-target payload delivery to Discord webhooks, transactional email APIs, and serverless PostgreSQL storage.",
    icon: <Send className="w-5 h-5 text-emerald-400" />,
    color: "#00FF88",
  },
};

export const HeroScene3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStation, setActiveStation] = useState<number | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    const scrollContainer = scrollContainerRef.current;
    if (!container || !scrollContainer) return;

    // --- THREE.JS SCENE INITIALIZATION ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070a0f, 0.016);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.setClearColor(0x070a0f, 1);
    container.appendChild(renderer.domElement);

    // --- LIGHTING RIG ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const keySun = new THREE.DirectionalLight(0xfffaed, 2.4);
    keySun.position.set(15, 30, 20);
    scene.add(keySun);

    // Studio rim light for launcher deck
    const crimsonRimLight = new THREE.PointLight(0xff3311, 6.0, 35);
    crimsonRimLight.position.set(-28, 4, 8);
    scene.add(crimsonRimLight);

    // Station ambient fill lights
    const amberLight = new THREE.PointLight(0xff9900, 3.5, 45);
    amberLight.position.set(-5, 8, 8);
    scene.add(amberLight);

    const cyanLight = new THREE.PointLight(0x00e5ff, 4, 40);
    cyanLight.position.set(12, 6, 6);
    scene.add(cyanLight);

    const emeraldLight = new THREE.PointLight(0x00ff88, 3.5, 40);
    emeraldLight.position.set(36, 6, 6);
    scene.add(emeraldLight);

    // Dynamic photon point light riding directly with the data packet
    const packetGlowLight = new THREE.PointLight(0xffaa00, 5, 8);
    scene.add(packetGlowLight);

    // --- SCI-FI HANGAR FLOOR & GANTRY ---
    const gridHelper = new THREE.GridHelper(220, 110, 0xff9900, 0x131d2b);
    gridHelper.position.y = -6.5;
    scene.add(gridHelper);

    const gantryMat = new THREE.MeshStandardMaterial({
      color: 0x111927,
      metalness: 0.9,
      roughness: 0.4,
    });
    for (let x = -35; x <= 45; x += 16) {
      const archGroup = new THREE.Group();
      archGroup.position.set(x, 0, -8);
      const pillarGeo = new THREE.BoxGeometry(0.8, 22, 0.8);
      const pLeft = new THREE.Mesh(pillarGeo, gantryMat);
      pLeft.position.set(-7, 2, 0);
      const pRight = new THREE.Mesh(pillarGeo, gantryMat);
      pRight.position.set(7, 2, 0);
      const crossGeo = new THREE.BoxGeometry(15, 0.8, 0.8);
      const crossBeam = new THREE.Mesh(crossGeo, gantryMat);
      crossBeam.position.set(0, 12, 0);
      archGroup.add(pLeft, pRight, crossBeam);
      scene.add(archGroup);
    }

    // --- 1. HEAVY SCI-FI RAILGUN CANNON (POSITIONED AT X: -25) ---
    const cannonMountGroup = new THREE.Group();
    cannonMountGroup.position.set(-25, 0, 0);

    const darkTitaniumMat = new THREE.MeshStandardMaterial({
      color: 0x141c2b,
      metalness: 0.88,
      roughness: 0.22,
    });

    const crimsonAccentMat = new THREE.MeshStandardMaterial({
      color: 0xff3311,
      emissive: 0xff1a0a,
      emissiveIntensity: 0.8,
      metalness: 0.7,
      roughness: 0.2,
    });

    // Base Pedestal
    const basePylon = new THREE.Mesh(
      new THREE.CylinderGeometry(3.0, 4.0, 1.8, 6),
      darkTitaniumMat
    );
    basePylon.position.y = -1.2;
    cannonMountGroup.add(basePylon);

    // Hazard Trim Ring
    const hazardRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.4, 0.15, 8, 6),
      crimsonAccentMat
    );
    hazardRing.rotateX(Math.PI / 2);
    hazardRing.position.y = -1.2;
    cannonMountGroup.add(hazardRing);

    // Yaw Turret
    const yawTurret = new THREE.Group();
    yawTurret.position.y = 0;
    const turntableGeo = new THREE.CylinderGeometry(2.4, 2.6, 0.8, 16);
    const turntable = new THREE.Mesh(turntableGeo, darkTitaniumMat);
    turntable.position.y = -0.2;
    yawTurret.add(turntable);

    // Side Armor Brackets
    const bracketGeo = new THREE.BoxGeometry(0.75, 2.8, 2.4);
    const leftBracket = new THREE.Mesh(bracketGeo, darkTitaniumMat);
    leftBracket.position.set(-1.5, 1.1, 0);
    const rightBracket = new THREE.Mesh(bracketGeo, darkTitaniumMat);
    rightBracket.position.set(1.5, 1.1, 0);
    yawTurret.add(leftBracket, rightBracket);

    // Movable Pitch Barrel Assembly
    const pitchAssembly = new THREE.Group();
    pitchAssembly.position.set(0, 1.1, 0);

    // Twin Accelerator Rails
    const railGeo = new THREE.BoxGeometry(6.6, 0.4, 0.55);
    const topRail = new THREE.Mesh(railGeo, darkTitaniumMat);
    topRail.position.set(3.3, 0.6, 0);
    const btmRail = new THREE.Mesh(railGeo, darkTitaniumMat);
    btmRail.position.set(3.3, -0.6, 0);
    pitchAssembly.add(topRail, btmRail);

    // Breech Core
    const breechGeo = new THREE.CylinderGeometry(0.95, 1.2, 2.4, 16);
    breechGeo.rotateZ(Math.PI / 2);
    const breech = new THREE.Mesh(breechGeo, darkTitaniumMat);
    breech.position.x = 0.5;
    pitchAssembly.add(breech);

    // Magnetic Accelerator Coils
    const coilMat = new THREE.MeshStandardMaterial({
      color: 0xff9900,
      emissive: 0xff6600,
      emissiveIntensity: 2.2,
      metalness: 0.3,
      roughness: 0.2,
    });
    const coilGeo = new THREE.TorusGeometry(0.9, 0.12, 12, 24);
    coilGeo.rotateY(Math.PI / 2);

    const coilMeshes: THREE.Mesh[] = [];
    for (let c = 0; c < 5; c++) {
      const coil = new THREE.Mesh(coilGeo, coilMat);
      coil.position.x = 1.7 + c * 1.0;
      pitchAssembly.add(coil);
      coilMeshes.push(coil);
    }

    // Heavy Muzzle Emitter
    const muzzleGeo = new THREE.CylinderGeometry(1.05, 0.8, 1.0, 16);
    muzzleGeo.rotateZ(-Math.PI / 2);
    const muzzle = new THREE.Mesh(
      muzzleGeo,
      new THREE.MeshStandardMaterial({
        color: 0xffaa00,
        emissive: 0xff8800,
        emissiveIntensity: 2.8,
      })
    );
    muzzle.position.x = 6.6;
    pitchAssembly.add(muzzle);

    // Targeting Laser Line
    const laserMat = new THREE.LineBasicMaterial({
      color: 0xff5500,
      transparent: true,
      opacity: 0.75,
    });
    const laserGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(7.0, 0, 0),
      new THREE.Vector3(14.0, 0, 0),
    ]);
    const targetingLaser = new THREE.Line(laserGeo, laserMat);
    pitchAssembly.add(targetingLaser);

    yawTurret.add(pitchAssembly);
    cannonMountGroup.add(yawTurret);
    scene.add(cannonMountGroup);

    // --- 2. THICK VISIBLE INDUSTRIAL GLASS CONDUIT ---
    // Smooth, straight coaxial entry through Station 1 to eliminate any shift or kink!
    const splinePoints = [
      new THREE.Vector3(-18.4, 1.1, 0),    // Muzzle exit (-25 + 6.6)
      new THREE.Vector3(-14.0, 0.0, 0),    // Smooth descent to conduit level
      new THREE.Vector3(-10.0, 0.0, 0),    // Straight coaxial line into Station 1
      new THREE.Vector3(-5.0, 0.0, 0),     // Station 1: Ingestion Gateway center
      new THREE.Vector3(0.0, 0.0, 0),      // Straight coaxial exit from Station 1
      new THREE.Vector3(6.0, -1.5, 1.8),   // Smooth gradual banking curve
      new THREE.Vector3(12.0, 0.5, 0),     // Station 2: V8 DAG Reactor
      new THREE.Vector3(18.0, 2.0, -1.8),  // High elevation S-curve
      new THREE.Vector3(24.0, 0.0, 0),     // Station 3: BullMQ Queue
      new THREE.Vector3(30.0, -1.2, 1.5),  // Lower swoop
      new THREE.Vector3(36.0, 0.5, 0),     // Station 4: Dispatch Bay
      new THREE.Vector3(40.0, -1.0, 0),    // Exit swoop
      new THREE.Vector3(42.0, -8.0, 0),    // Sub-floor plunge
    ];
    const conduitSpline = new THREE.CatmullRomCurve3(splinePoints);

    // Heavy PBR Refractive Glass Pipe (Radius 0.72)
    const glassTubeGeo = new THREE.TubeGeometry(conduitSpline, 240, 0.72, 20, false);
    const thickGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x1d2c3f,
      metalness: 0.15,
      roughness: 0.06,
      transmission: 0.90,
      thickness: 2.2,
      ior: 1.54,
      reflectivity: 0.98,
      transparent: true,
      opacity: 0.88,
    });
    const glassTubeMesh = new THREE.Mesh(glassTubeGeo, thickGlassMat);
    scene.add(glassTubeMesh);

    // Inner Glowing Conduit Filament
    const innerCoreGeo = new THREE.TubeGeometry(conduitSpline, 200, 0.08, 8, false);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      transparent: true,
      opacity: 0.45,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    scene.add(innerCoreMesh);

    // Support Collars
    const collarsGroup = new THREE.Group();
    const collarGeo = new THREE.TorusGeometry(0.85, 0.12, 12, 24);
    collarGeo.rotateY(Math.PI / 2);
    const collarMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.92,
      roughness: 0.25,
    });

    const pylonGeo = new THREE.CylinderGeometry(0.14, 0.18, 6.0, 8);
    const pylonMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.4,
    });

    for (let t = 0.04; t < 0.92; t += 0.06) {
      const pt = conduitSpline.getPointAt(t);
      const tangent = conduitSpline.getTangentAt(t);

      const collar = new THREE.Mesh(collarGeo, collarMat);
      collar.position.copy(pt);
      collar.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), tangent);
      collarsGroup.add(collar);

      if (Math.round(t * 100) % 2 === 0) {
        const pylon = new THREE.Mesh(pylonGeo, pylonMat);
        pylon.position.set(pt.x, (pt.y - 6.5) / 2, pt.z);
        pylon.scale.y = Math.abs(pt.y - (-6.5)) / 6.0;
        collarsGroup.add(pylon);
      }
    }
    scene.add(collarsGroup);

    // --- 3. THE 4 INDUSTRIAL DOCKING STATIONS ---
    const stationsGroup = new THREE.Group();

    // STATION 1: INGESTION & SSRF GATEWAY (at -5.0, 0, 0)
    const st1 = new THREE.Group();
    st1.position.set(-5.0, 0, 0);

    const st1RingMat = new THREE.MeshStandardMaterial({
      color: 0xff9900,
      emissive: 0xff6600,
      emissiveIntensity: 0.8,
      metalness: 0.85,
      roughness: 0.2,
    });
    const st1OuterFrame = new THREE.Mesh(new THREE.TorusGeometry(2.8, 0.35, 6, 6), st1RingMat);
    const st1InnerScanner = new THREE.Mesh(
      new THREE.TorusGeometry(2.1, 0.15, 12, 32),
      new THREE.MeshStandardMaterial({
        color: 0xffaa00,
        emissive: 0xffaa00,
        emissiveIntensity: 1.8,
      })
    );
    st1.add(st1OuterFrame, st1InnerScanner);
    stationsGroup.add(st1);

    // STATION 2: V8 IN-MEMORY DAG REACTOR (at 12.0, 0.5, 0)
    const st2 = new THREE.Group();
    st2.position.set(12.0, 0.5, 0);

    const st2Core = new THREE.Mesh(
      new THREE.CylinderGeometry(2.4, 2.4, 3.8, 16),
      new THREE.MeshStandardMaterial({
        color: 0x090f1a,
        metalness: 0.95,
        roughness: 0.15,
      })
    );
    const st2CyanRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(3.0, 0.22, 16, 32),
      new THREE.MeshStandardMaterial({
        color: 0x00e5ff,
        emissive: 0x00b4d8,
        emissiveIntensity: 1.6,
      })
    );
    st2CyanRing1.rotateX(Math.PI / 2);

    const st2CyanRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.4, 0.15, 16, 32),
      new THREE.MeshStandardMaterial({
        color: 0x00e5ff,
        emissive: 0x00e5ff,
        emissiveIntensity: 1.2,
      })
    );
    st2CyanRing2.rotateZ(Math.PI / 3);

    st2.add(st2Core, st2CyanRing1, st2CyanRing2);
    stationsGroup.add(st2);

    // STATION 3: BULLMQ DISTRIBUTED QUEUE BUFFER (at 24.0, 0, 0)
    const st3 = new THREE.Group();
    st3.position.set(24.0, 0, 0);

    const st3SiloMat = new THREE.MeshStandardMaterial({
      color: 0x1b2434,
      metalness: 0.88,
      roughness: 0.3,
    });
    const siloLeft = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 4.6, 16), st3SiloMat);
    siloLeft.position.z = -2.2;
    const siloRight = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 4.6, 16), st3SiloMat);
    siloRight.position.z = 2.2;

    const st3HazardRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.7, 0.2, 16, 32),
      new THREE.MeshStandardMaterial({
        color: 0xff5500,
        emissive: 0xff3300,
        emissiveIntensity: 1.4,
      })
    );
    st3HazardRing.rotateX(Math.PI / 2);

    st3.add(siloLeft, siloRight, st3HazardRing);
    stationsGroup.add(st3);

    // STATION 4: MULTI-CHANNEL DISPATCH BAY (at 36.0, 0.5, 0)
    const st4 = new THREE.Group();
    st4.position.set(36.0, 0.5, 0);

    const st4Hub = new THREE.Mesh(
      new THREE.OctahedronGeometry(2.4, 1),
      new THREE.MeshStandardMaterial({
        color: 0x061118,
        metalness: 0.9,
        roughness: 0.2,
      })
    );
    const st4EmitterRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.1, 0.25, 16, 32),
      new THREE.MeshStandardMaterial({
        color: 0x00ff88,
        emissive: 0x00cc66,
        emissiveIntensity: 1.8,
      })
    );
    st4EmitterRing.rotateY(Math.PI / 2);

    st4.add(st4Hub, st4EmitterRing);
    stationsGroup.add(st4);

    scene.add(stationsGroup);

    // --- 4. ULTRA-BRIGHT HIGH-ENERGY DATA PACKET & TRANSFER SHINE TRAIL ---
    const packetGroup = new THREE.Group();

    // Pure Blinding White Energy Core
    const packetCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.38, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    packetGroup.add(packetCore);

    // Mid Electric Cyan Plasma Corona
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.85,
    });
    const packetCorona = new THREE.Mesh(
      new THREE.SphereGeometry(0.65, 16, 16),
      coronaMat
    );
    packetGroup.add(packetCorona);

    // Outer Radiant Golden Plasma Flare
    const auraMat = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const packetAura = new THREE.Mesh(
      new THREE.SphereGeometry(1.05, 16, 16),
      auraMat
    );
    packetGroup.add(packetAura);

    // Shockwave Transfer Ring
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const shockwaveRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.68, 0.05, 12, 24),
      shockwaveMat
    );
    shockwaveRing.rotateY(Math.PI / 2);
    packetGroup.add(shockwaveRing);

    scene.add(packetGroup);

    // Glowing Trailing Energy Transfer Beads
    const trailBeads: THREE.Mesh[] = [];
    for (let b = 0; b < 4; b++) {
      const bead = new THREE.Mesh(
        new THREE.SphereGeometry(0.28 - b * 0.05, 12, 12),
        new THREE.MeshBasicMaterial({
          color: b % 2 === 0 ? 0x00e5ff : 0xff9900,
          transparent: true,
          opacity: 0.6 - b * 0.12,
          blending: THREE.AdditiveBlending,
        })
      );
      scene.add(bead);
      trailBeads.push(bead);
    }

    // --- SMOOTH MOUSE TRACKING FOR CANNON AIMING (REDUCED SENSITIVITY) ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      // Reduced sensitivity by 55% for smooth, controlled hydraulic turret aiming
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // --- SCROLL DRIVER & ANIMATION LOOP (CALIBRATED FOR GENTLE, SLOW-MOTION FLIGHT) ---
    let currentT = 0;
    let targetT = 0;
    const clock = new THREE.Clock();
    let animId: number;

    const handleScroll = () => {
      const containerRect = scrollContainer.getBoundingClientRect();
      const totalScroll = scrollContainer.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const progress = Math.min(Math.max(-containerRect.top / totalScroll, 0), 1);
      setScrollProgress(progress);

      // EXTENDED CALIBRATED STAGES (Generous scroll runway so nothing moves too fast):
      // 0.00 to 0.20: Slide 1 (Spacious Executive Hero)
      // 0.20 to 0.35: Slide 2 (Launcher Turret Stage with time to aim)
      // 0.35 to 0.94: Slow-motion conduit journey from gun to Station 4
      if (progress < 0.22) {
        targetT = 0.0; // Payload remains locked inside gun muzzle
      } else {
        targetT = Math.min(Math.max((progress - 0.22) / (0.94 - 0.22), 0), 1);
      }

      // Station triggers synchronized with packet travel
      if (targetT >= 0.15 && targetT < 0.38) {
        setActiveStation(1); // Station 1: Ingestion
      } else if (targetT >= 0.38 && targetT < 0.62) {
        setActiveStation(2); // Station 2: V8 Reactor
      } else if (targetT >= 0.62 && targetT < 0.82) {
        setActiveStation(3); // Station 3: BullMQ Queue
      } else if (targetT >= 0.82 && targetT <= 0.98) {
        setActiveStation(4); // Station 4: Dispatch Bay
      } else {
        setActiveStation(null);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Damped, heavy hydraulic mouse aiming (no sudden twitching or high sensitivity)
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;
      yawTurret.rotation.y = mouse.x * 0.20; // Reduced angle range
      pitchAssembly.rotation.z = mouse.y * 0.15;

      // Gentle coil pulsation
      coilMeshes.forEach((mesh, i) => {
        mesh.scale.setScalar(1 + Math.sin(time * 5 + i * 1.2) * 0.08);
      });

      // Docking Station Dynamics
      st1OuterFrame.rotation.z = time * 0.3;
      st1InnerScanner.rotation.z = -time * 0.6;
      st2CyanRing1.rotation.z = time * -0.5;
      st2CyanRing2.rotation.y = time * 0.45;
      st3HazardRing.rotation.z = time * 0.4;
      st4Hub.rotation.y = time * 0.4;
      st4EmitterRing.rotation.x = time * 0.6;

      // Gentle, weighted slow-motion scroll interpolation (damping factor 0.038)
      currentT += (targetT - currentT) * 0.038;

      const clampedT = Math.min(Math.max(currentT, 0.0001), 0.9999);
      const packetPos = conduitSpline.getPointAt(clampedT);

      // Packet Position & Synchronized Internal Glow
      packetGroup.position.copy(packetPos);
      packetGlowLight.position.copy(packetPos);

      // Energy Pulsing & Shockwave Rippling
      packetCorona.scale.setScalar(1 + Math.sin(time * 8) * 0.16);
      packetAura.scale.setScalar(1 + Math.sin(time * 10) * 0.20);
      shockwaveRing.scale.setScalar(1 + Math.sin(time * 12) * 0.22);

      // Trailing Energy Transfer Beads
      trailBeads.forEach((bead, idx) => {
        const trailOffset = (idx + 1) * 0.016;
        const trailT = Math.max(clampedT - trailOffset, 0.0001);
        const trailPos = conduitSpline.getPointAt(trailT);
        bead.position.copy(trailPos);
        bead.visible = currentT > 0.01;
      });

      // SCENE VISIBILITY: HIDE RAILGUN & STATIONS ON SLIDE 1 TO KEEP INITIAL VIEW SPACIOUS & UNCONGESTED
      const isInitialSlide = currentT < 0.01 && targetT < 0.01;
      cannonMountGroup.visible = !isInitialSlide;
      glassTubeMesh.visible = !isInitialSlide;
      innerCoreMesh.visible = !isInitialSlide;
      stationsGroup.visible = !isInitialSlide;
      collarsGroup.visible = !isInitialSlide;
      packetGroup.visible = !isInitialSlide;

      // CINEMATIC STAGE-BY-STAGE CAMERA CHOREOGRAPHY (BUTTERY SMOOTH DAMPING)
      if (currentT < 0.02) {
        // STAGE 1: EXPANSIVE EDITORIAL PERSPECTIVE (SLIDE 1 - CLEAN, SPACIOUS, UNCLUTTERED)
        const slide1CamPos = new THREE.Vector3(0, 5.0, 22.0);
        camera.position.lerp(slide1CamPos, 0.045);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
      } else if (currentT >= 0.02 && currentT < 0.12) {
        // STAGE 2: RAILGUN LAUNCHER DECK (SLIDE 2 - DEDICATED CANNON STAGE)
        const cannonCamPos = new THREE.Vector3(-21.5, 3.2, 8.5);
        camera.position.lerp(cannonCamPos, 0.045);
        camera.lookAt(new THREE.Vector3(-18.0, 1.2, 0));
      } else if (currentT > 0.92) {
        // STAGE 4: TRANSITION DOWN INTO SECTION 2
        const exitCamPos = new THREE.Vector3(38.0, 4.0, 10.0);
        camera.position.lerp(exitCamPos, 0.045);
        camera.lookAt(packetPos);
      } else {
        // STAGE 3: CONDUIT ESCORT (CINEMATIC 3RD-PERSON FOLLOW CAM CENTERING THE PACKET)
        const cameraOffset = new THREE.Vector3(-4.8, 3.2, 8.2);
        const targetCamPos = packetPos.clone().add(cameraOffset);
        camera.position.lerp(targetCamPos, 0.045);
        camera.lookAt(packetPos.clone().add(new THREE.Vector3(2.5, 0, 0)));
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  const station = activeStation ? STATIONS[activeStation] : null;

  // Slide 2 (Gun Stage) indicator active state (extended comfortable window)
  const isGunStage = scrollProgress >= 0.10 && scrollProgress < 0.28;

  return (
    // EXTENDED RUNWAY HEIGHT (h-[850vh] gives generous, un-rushed slow-motion scroll depth)
    <div ref={scrollContainerRef} className="relative w-full h-[850vh] bg-[#070A0F]">
      {/* PINNED FULLSCREEN 3D VIEWPORT */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Three.js Canvas Container */}
        <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-crosshair" />

        {/* ============================================================ */}
        {/* SLIDE 1: CLEAN, SPACIOUS, EXECUTIVE EDITORIAL HERO (SCROLL 0-15%) */}
        {/* ============================================================ */}
        <div
          style={{
            // Gentle fade-out curve (stays comfortable and readable throughout Slide 1)
            opacity: Math.max(0, 1 - scrollProgress * 5.0),
            transform: `translateY(${-scrollProgress * 120}px)`,
            pointerEvents: scrollProgress > 0.12 ? "none" : "auto",
          }}
          className="absolute inset-0 z-20 flex flex-col justify-between px-8 sm:px-16 pt-32 pb-14 transition-all duration-75 select-none"
        >
          {/* Top Eyebrow Tag */}
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_12px_#ff9900]" />
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
              AETHELFLOW ORCHESTRATION ENGINE // V2.0
            </span>
          </div>

          {/* Main Headline & Narrative (Spacious, Uncluttered, Pure Contrast) */}
          <div className="max-w-4xl space-y-6">
            <h1 className="text-4xl sm:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.05] font-['Space_Grotesk']">
              HIGH-PERFORMANCE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
                WORKFLOW AUTOMATION
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed font-['Space_Grotesk']">
              Sub-millisecond in-memory orchestration. Kahn's topological DAG sorting and sandboxed V8 execution operating at 81,000+ ops/sec — completely decoupled from cloud database latency.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="http://localhost:5173"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-mono text-xs font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400 hover:from-amber-300 hover:to-orange-300 shadow-[0_0_30px_rgba(255,153,0,0.4)] transition-all transform hover:scale-105 active:scale-95"
              >
                <Play className="w-4 h-4 fill-current text-black" />
                <span>LAUNCH STUDIO (PORT 5173)</span>
              </a>

              <a
                href="#engine-chip"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/20 hover:border-amber-400 bg-white/5 hover:bg-white/10 text-xs font-mono font-medium text-slate-300 hover:text-white transition-all"
              >
                <span>EXPLORE ARCHITECTURE</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </a>

              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 pl-2">
                <ChevronDown className="w-4 h-4 animate-bounce" />
                <span>Scroll down to enter 3D pipeline deck</span>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10 max-w-5xl">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase text-slate-500">DAG VELOCITY</span>
              <div className="text-lg font-bold text-white font-mono">81,151 ops/s</div>
              <span className="text-[10px] font-mono text-amber-400">+170% Headroom</span>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase text-slate-500">ISOLATE LATENCY</span>
              <div className="text-lg font-bold text-white font-mono">0.012 ms</div>
              <span className="text-[10px] font-mono text-cyan-400">Topological Sort p50</span>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase text-slate-500">QUEUE CONCURRENCY</span>
              <div className="text-lg font-bold text-white font-mono">2,551 req/s</div>
              <span className="text-[10px] font-mono text-orange-400">Zero Drops • BullMQ</span>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase text-slate-500">SSRF FIREWALL</span>
              <div className="text-lg font-bold text-white font-mono">Active</div>
              <span className="text-[10px] font-mono text-emerald-400">Zero-Trust Pre-Flight</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SLIDE 2: THE 3D LAUNCHER TURRET STAGE (SCROLL 10-28%) */}
        {/* ============================================================ */}
        {isGunStage && (
          <div className="absolute top-28 left-8 sm:left-14 z-20 max-w-lg space-y-4 animate-in fade-in duration-300 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs font-mono font-bold text-amber-400 shadow-[0_0_20px_rgba(255,153,0,0.2)]">
              <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>STAGE 01 // PARTICLE ACCELERATOR TURRET</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#090D16]/90 border border-white/15 backdrop-blur-xl space-y-3 shadow-2xl">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk']">
                Magnetic Particle Cannon
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Aim the launcher turret gently with your mouse. Continue scrolling down to charge the magnetic stator coils and fire the payload directly from the gun muzzle into the conduit.
              </p>
              <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-amber-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  Turret Armed at Muzzle
                </span>
                <span>Scroll to accelerate payload &rarr;</span>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* FLIGHT PROGRESS BAR (Active during conduit escort) */}
        {/* ============================================================ */}
        {scrollProgress > 0.22 && (
          <div className="absolute top-24 left-0 right-0 z-20 flex items-center justify-between px-8 sm:px-14 pointer-events-none animate-in fade-in duration-200">
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-[#070A0F]/80 border border-white/10 backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Activity className="w-3.5 h-3.5" />
                <span>CONDUIT FLIGHT // ACTIVE</span>
              </span>
            </div>

            <div className="flex items-center gap-4 px-4 py-2 rounded-xl bg-[#070A0F]/80 border border-white/10 backdrop-blur-md text-xs font-mono text-slate-300">
              <span>PROGRESS: {Math.round(scrollProgress * 100)}%</span>
              <div className="w-36 h-2 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 rounded-full transition-all duration-75"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* DYNAMIC STATION ARCHITECTURE HUD CARD (Slides in at each station) */}
        {/* ============================================================ */}
        {station && (
          <div className="absolute bottom-10 left-6 sm:left-14 z-30 max-w-md w-full p-6 rounded-2xl bg-[#090D16]/95 border-2 border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(255,153,0,0.2)] backdrop-blur-2xl animate-in slide-in-from-bottom-6 duration-200 space-y-3 pointer-events-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  {station.icon}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    STATION {station.index} // ARCHITECTURE
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-wide font-['Space_Grotesk']">
                    {station.name}
                  </h3>
                </div>
              </div>
              <span
                className="text-[10px] font-mono px-2.5 py-1 rounded font-bold"
                style={{
                  backgroundColor: `${station.color}20`,
                  color: station.color,
                  border: `1px solid ${station.color}50`,
                }}
              >
                {station.metric}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {station.desc}
            </p>

            <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Pipeline Stream: Active
              </span>
              <span className="text-amber-400 flex items-center gap-1">
                Scroll to advance &rarr;
              </span>
            </div>
          </div>
        )}

        {/* BOTTOM RIGHT: HARDWARE IDENTIFIER */}
        <div className="absolute bottom-8 right-8 hidden lg:flex items-center gap-3 px-4 py-2 rounded-xl bg-[#090D16]/80 border border-white/10 backdrop-blur-md text-[11px] font-mono text-slate-400">
          <Cpu className="w-3.5 h-3.5 text-amber-400" />
          <span>AETHELFLOW KERNEL // V8 IN-MEMORY RUNTIME</span>
        </div>
      </div>
    </div>
  );
};
