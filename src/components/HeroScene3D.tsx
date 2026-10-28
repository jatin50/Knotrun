import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Zap, ShieldCheck, Send, Radio, ChevronDown, Activity, Cpu, ArrowRight } from "lucide-react";

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
    scene.fog = new THREE.FogExp2(0x070a0f, 0.022);

    const camera = new THREE.PerspectiveCamera(
      46,
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

    // --- DRAMATIC STUDIO LIGHTING RIG (MATCHING LUXURY EDITORIAL REF) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const keySun = new THREE.DirectionalLight(0xfffaed, 2.2);
    keySun.position.set(15, 30, 20);
    scene.add(keySun);

    // Striking Crimson/Scarlet Studio Rim Light (highlighting the left cannon like the car taillight)
    const crimsonRimLight = new THREE.PointLight(0xff2a1a, 6.5, 35);
    crimsonRimLight.position.set(-20, 3.5, 6);
    scene.add(crimsonRimLight);

    // Amber Gantry Fill Light
    const amberHangarLight = new THREE.PointLight(0xff9900, 3.5, 45);
    amberHangarLight.position.set(-10, 8, 8);
    scene.add(amberHangarLight);

    // Cyan Reactor Station Light
    const cyanReactorLight = new THREE.PointLight(0x00e5ff, 4, 40);
    cyanReactorLight.position.set(8, 6, 6);
    scene.add(cyanReactorLight);

    // Emerald Dispatch Light
    const emeraldExitLight = new THREE.PointLight(0x00ff88, 3.5, 40);
    emeraldExitLight.position.set(30, 6, 6);
    scene.add(emeraldExitLight);

    // Dynamic photon point light riding the data packet
    const packetGlowLight = new THREE.PointLight(0xffaa00, 6, 14);
    scene.add(packetGlowLight);

    // --- DARK REFLECTIVE FLOOR & INDUSTRIAL GANTRY ---
    const gridHelper = new THREE.GridHelper(180, 90, 0xff3b20, 0x141f2e);
    gridHelper.position.y = -6.5;
    scene.add(gridHelper);

    // Background Gantry Structure
    const gantryMat = new THREE.MeshStandardMaterial({
      color: 0x111927,
      metalness: 0.9,
      roughness: 0.4,
    });
    for (let x = -25; x <= 35; x += 15) {
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

    // --- 1. HEAVY SCI-FI RAILGUN CANNON (STATION 0 - COMMANDING LEFT SIDE) ---
    // Positioned at X: -14 to dominate the left 45% of the frame
    const cannonMountGroup = new THREE.Group();
    cannonMountGroup.position.set(-14, 0, 0);

    const darkTitaniumMat = new THREE.MeshStandardMaterial({
      color: 0x141c2b,
      metalness: 0.88,
      roughness: 0.22,
    });

    const crimsonAccentMat = new THREE.MeshStandardMaterial({
      color: 0xff2a1a,
      emissive: 0xff1a0a,
      emissiveIntensity: 0.8,
      metalness: 0.7,
      roughness: 0.2,
    });

    // Heavy Hexagonal Base Pedestal
    const basePylon = new THREE.Mesh(
      new THREE.CylinderGeometry(3.0, 4.0, 1.8, 6),
      darkTitaniumMat
    );
    basePylon.position.y = -1.2;
    cannonMountGroup.add(basePylon);

    // Crimson Trim Ring on Pedestal
    const hazardRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.4, 0.15, 8, 6),
      crimsonAccentMat
    );
    hazardRing.rotateX(Math.PI / 2);
    hazardRing.position.y = -1.2;
    cannonMountGroup.add(hazardRing);

    // Heavy Turret Yaw Turntable (Rotates with Mouse X)
    const yawTurret = new THREE.Group();
    yawTurret.position.y = 0;
    const turntableGeo = new THREE.CylinderGeometry(2.4, 2.6, 0.8, 16);
    const turntable = new THREE.Mesh(turntableGeo, darkTitaniumMat);
    turntable.position.y = -0.2;
    yawTurret.add(turntable);

    // Turret Side Armor Brackets
    const bracketGeo = new THREE.BoxGeometry(0.75, 2.8, 2.4);
    const leftBracket = new THREE.Mesh(bracketGeo, darkTitaniumMat);
    leftBracket.position.set(-1.5, 1.1, 0);
    const rightBracket = new THREE.Mesh(bracketGeo, darkTitaniumMat);
    rightBracket.position.set(1.5, 1.1, 0);
    yawTurret.add(leftBracket, rightBracket);

    // Movable Pitch Barrel Assembly (Pivots with Mouse Y)
    const pitchAssembly = new THREE.Group();
    pitchAssembly.position.set(0, 1.1, 0);

    // Twin Magnetic Accelerator Rails
    const railGeo = new THREE.BoxGeometry(6.6, 0.4, 0.55);
    const topRail = new THREE.Mesh(railGeo, darkTitaniumMat);
    topRail.position.set(3.3, 0.6, 0);
    const btmRail = new THREE.Mesh(railGeo, darkTitaniumMat);
    btmRail.position.set(3.3, -0.6, 0);
    pitchAssembly.add(topRail, btmRail);

    // Heavy Central Breech Core
    const breechGeo = new THREE.CylinderGeometry(0.95, 1.2, 2.4, 16);
    breechGeo.rotateZ(Math.PI / 2);
    const breech = new THREE.Mesh(breechGeo, darkTitaniumMat);
    breech.position.x = 0.5;
    pitchAssembly.add(breech);

    // Magnetic Flux Accelerator Coils (Glow Crimson/Amber)
    const coilMat = new THREE.MeshStandardMaterial({
      color: 0xff3b20,
      emissive: 0xff2200,
      emissiveIntensity: 2.5,
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

    // Heavy Muzzle Emitter Cone
    const muzzleGeo = new THREE.CylinderGeometry(1.05, 0.8, 1.0, 16);
    muzzleGeo.rotateZ(-Math.PI / 2);
    const muzzle = new THREE.Mesh(
      muzzleGeo,
      new THREE.MeshStandardMaterial({
        color: 0xff5500,
        emissive: 0xff3300,
        emissiveIntensity: 2.8,
      })
    );
    muzzle.position.x = 6.6;
    pitchAssembly.add(muzzle);

    // Targeting Laser Line
    const laserMat = new THREE.LineBasicMaterial({
      color: 0xff2a1a,
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
    // Spline spanning from Cannon Muzzle through the 4 Stations
    const splinePoints = [
      new THREE.Vector3(-7.4, 1.1, 0),    // Cannon Muzzle entry
      new THREE.Vector3(-4.0, 1.3, -1.2), // Approaching Station 1
      new THREE.Vector3(0.0, 0.0, 0),     // Station 1: Ingestion
      new THREE.Vector3(5.0, -1.6, 2.0),  // Banking curve
      new THREE.Vector3(11.0, 0.5, 0),    // Station 2: V8 DAG Reactor
      new THREE.Vector3(17.0, 2.2, -1.8), // S-curve
      new THREE.Vector3(23.0, 0.0, 0),    // Station 3: BullMQ Queue
      new THREE.Vector3(28.0, -1.5, 1.6), // Swoop
      new THREE.Vector3(34.0, 0.5, 0),    // Station 4: Dispatch Bay
      new THREE.Vector3(38.0, -1.0, 0),   // Exit swoop
      new THREE.Vector3(40.0, -8.0, 0),   // Sub-floor plunge
    ];
    const conduitSpline = new THREE.CatmullRomCurve3(splinePoints);

    // Heavy Glass Tube (Radius 0.72)
    const glassTubeGeo = new THREE.TubeGeometry(conduitSpline, 220, 0.72, 20, false);
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

    // Inner Glowing Conduit Wire
    const innerCoreGeo = new THREE.TubeGeometry(conduitSpline, 180, 0.08, 8, false);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      transparent: true,
      opacity: 0.45,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    scene.add(innerCoreMesh);

    // Titanium Support Collars
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

    for (let t = 0.04; t < 0.92; t += 0.065) {
      const pt = conduitSpline.getPointAt(t);
      const tangent = conduitSpline.getTangentAt(t);

      const collar = new THREE.Mesh(collarGeo, collarMat);
      collar.position.copy(pt);
      collar.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), tangent);
      scene.add(collar);

      if (Math.round(t * 100) % 2 === 0) {
        const pylon = new THREE.Mesh(pylonGeo, pylonMat);
        pylon.position.set(pt.x, (pt.y - 6.5) / 2, pt.z);
        pylon.scale.y = Math.abs(pt.y - (-6.5)) / 6.0;
        scene.add(pylon);
      }
    }

    // --- 3. THE 4 INDUSTRIAL DOCKING STATIONS ---
    const stationsGroup = new THREE.Group();

    // STATION 1: INGESTION & SSRF GATEWAY (at 0.0, 0, 0)
    const st1 = new THREE.Group();
    st1.position.set(0.0, 0, 0);

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

    // STATION 2: V8 IN-MEMORY DAG REACTOR (at 11.0, 0.5, 0)
    const st2 = new THREE.Group();
    st2.position.set(11.0, 0.5, 0);

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

    // STATION 3: BULLMQ DISTRIBUTED QUEUE BUFFER (at 23.0, 0, 0)
    const st3 = new THREE.Group();
    st3.position.set(23.0, 0, 0);

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

    // STATION 4: MULTI-CHANNEL DISPATCH BAY (at 34.0, 0.5, 0)
    const st4 = new THREE.Group();
    st4.position.set(34.0, 0.5, 0);

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

    // --- 4. GLOWING HIGH-ENERGY DATA PACKET ---
    const packetGroup = new THREE.Group();

    const packetCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.42, 24, 24),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffaa00,
        emissiveIntensity: 4.5,
      })
    );
    packetGroup.add(packetCore);

    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xff7700,
      transparent: true,
      opacity: 0.5,
    });
    const packetCorona = new THREE.Mesh(
      new THREE.SphereGeometry(0.72, 16, 16),
      coronaMat
    );
    packetGroup.add(packetCorona);

    scene.add(packetGroup);

    // --- MOUSE TRACKING FOR CANNON AIMING ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // --- SCROLL DRIVER & ANIMATION LOOP ---
    let currentT = 0;
    let targetT = 0;
    const clock = new THREE.Clock();
    let animId: number;

    const handleScroll = () => {
      const containerRect = scrollContainer.getBoundingClientRect();
      const totalScroll = scrollContainer.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const progress = Math.min(Math.max(-containerRect.top / totalScroll, 0), 1);
      targetT = progress;
      setScrollProgress(progress);

      // Station triggers
      if (progress > 0.12 && progress < 0.32) {
        setActiveStation(1);
      } else if (progress >= 0.32 && progress < 0.56) {
        setActiveStation(2);
      } else if (progress >= 0.56 && progress < 0.80) {
        setActiveStation(3);
      } else if (progress >= 0.80 && progress <= 0.95) {
        setActiveStation(4);
      } else {
        setActiveStation(null);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // 1. Mouse Aiming for the Railgun Turret (Pitch & Yaw)
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;
      yawTurret.rotation.y = mouse.x * 0.45;
      pitchAssembly.rotation.z = mouse.y * 0.35;

      // 2. Coil Pulsation and Magnetic Field charging
      coilMeshes.forEach((mesh, i) => {
        mesh.scale.setScalar(1 + Math.sin(time * 6 + i * 1.2) * 0.09);
      });

      // 3. Docking Station Rotational Dynamics
      st1OuterFrame.rotation.z = time * 0.4;
      st1InnerScanner.rotation.z = -time * 0.8;
      st2CyanRing1.rotation.z = time * -0.7;
      st2CyanRing2.rotation.y = time * 0.6;
      st3HazardRing.rotation.z = time * 0.5;
      st4Hub.rotation.y = time * 0.5;
      st4EmitterRing.rotation.x = time * 0.8;

      // 4. Slow-Motion Scroll Interpolation (Silky LERP Physics)
      currentT += (targetT - currentT) * 0.065;

      const clampedT = Math.min(Math.max(currentT, 0.001), 0.999);
      const packetPos = conduitSpline.getPointAt(clampedT);

      packetGroup.position.copy(packetPos);
      packetGlowLight.position.copy(packetPos);

      packetCorona.scale.setScalar(1 + Math.sin(time * 9) * 0.16);

      // 5. CINEMATIC SLOW-MOTION CAMERA TRACKING
      if (clampedT < 0.04) {
        // Asymmetrical Hero Camera: Cannon commands left 45%, leaving right 55% for monumental typography
        const introCamPos = new THREE.Vector3(-10.5, 2.2, 9.8);
        camera.position.lerp(introCamPos, 0.08);
        camera.lookAt(new THREE.Vector3(-7.0, 0.8, 0));
      } else if (clampedT > 0.88) {
        // Transition down into section 2
        const exitCamPos = new THREE.Vector3(34.0, 4.0, 10.0);
        camera.position.lerp(exitCamPos, 0.07);
        camera.lookAt(packetPos);
      } else {
        // Smooth Slow-Motion Follow Cam tracking packet
        const cameraOffset = new THREE.Vector3(-4.8, 3.2, 8.2);
        const targetCamPos = packetPos.clone().add(cameraOffset);
        camera.position.lerp(targetCamPos, 0.07);
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

  return (
    <div ref={scrollContainerRef} className="relative w-full h-[450vh] bg-[#070A0F]">
      {/* PINNED FULLSCREEN 3D VIEWPORT */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Three.js Canvas Container */}
        <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-crosshair" />

        {/* FULL-BLEED EDITORIAL HERO CONTENT (MATCHING LUXURY REFERENCE IMAGE) */}
        <div
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 10),
            transform: `translateX(${scrollProgress * 220}px)`,
            pointerEvents: scrollProgress > 0.05 ? "none" : "auto",
          }}
          className="absolute inset-y-0 right-0 w-full lg:w-7/12 flex flex-col justify-center px-8 sm:px-14 lg:pr-24 z-20 transition-all duration-75 select-none"
        >
          {/* Eyebrow Tracking Header */}
          <div className="space-y-1 pb-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-400 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF3B20] animate-pulse" />
              IN-MEMORY DAG ARCHITECTURE // ZERO-LATENCY
            </span>
          </div>

          {/* MONUMENTAL "BUILT DIFFERENTLY" DISPLAY TYPOGRAPHY */}
          <div className="space-y-0 tracking-tighter leading-none">
            <h1 className="text-7xl sm:text-9xl lg:text-[9.5rem] font-black text-[#FF3B20] tracking-tight leading-[0.85] font-['Playfair_Display','Syne'] drop-shadow-[0_12px_45px_rgba(255,59,32,0.35)]">
              BUILT
            </h1>
            <h2 className="text-5xl sm:text-7xl lg:text-[7.2rem] font-light text-[#EAF6F0] tracking-tight leading-[0.9] font-['Playfair_Display','Space_Grotesk']">
              DIFFERENTLY
            </h2>
          </div>

          {/* Subtitle Editorial Narrative */}
          <p className="pt-6 text-sm sm:text-base text-slate-300 max-w-lg font-normal leading-relaxed font-['Space_Grotesk']">
            A fresh take on workflow execution — where Kahn's topological DAG sorting meets isolated V8 sandboxing at 81,000+ ops/sec. Decoupled from cloud database latency.
          </p>

          {/* Minimalist Explore Action Pill */}
          <div className="pt-8 flex flex-wrap items-center gap-5">
            <a
              href="#engine-chip"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 hover:border-[#FF3B20] bg-black/40 hover:bg-[#FF3B20]/15 text-xs font-mono font-bold uppercase tracking-wider text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl"
            >
              <span>EXPLORE PIPELINE</span>
              <ArrowRight className="w-4 h-4 text-[#FF3B20]" />
            </a>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <ChevronDown className="w-4 h-4 text-[#FF3B20] animate-bounce" />
              <span>Scroll to fire data packet</span>
            </div>
          </div>
        </div>

        {/* SIDE PAGINATION COUNTER (AS IN LUXURY EDITORIAL REFERENCE) */}
        <div
          style={{ opacity: Math.max(0, 1 - scrollProgress * 10) }}
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-1.5 font-mono text-xs text-slate-500 z-20 pointer-events-none"
        >
          <span className="text-white font-bold">01</span>
          <div className="w-5 h-[1.5px] bg-white/20" />
          <span>04</span>
        </div>

        {/* BOTTOM-RIGHT PREVIEW THUMBNAIL CARD (MATCHING CAR THUMBNAIL IN REFERENCE IMAGE) */}
        <div
          style={{ opacity: Math.max(0, 1 - scrollProgress * 10) }}
          className="absolute bottom-8 right-8 sm:right-14 z-20 hidden md:flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#090E17]/90 border border-white/15 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-auto"
        >
          <div className="w-16 h-14 rounded-xl bg-gradient-to-br from-[#FF3B20]/25 to-amber-500/25 border border-[#FF3B20]/40 flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(#ff3b20_1px,transparent_1px)] [background-size:6px_6px] opacity-40" />
            <Cpu className="w-6 h-6 text-[#FF3B20] animate-pulse relative z-10" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">V8 ENGINE CORE</span>
            <span className="text-xs font-mono font-bold text-white">81,151 ops/s</span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">0.012ms • ZERO LATENCY</span>
          </div>
        </div>

        {/* DYNAMIC STATION ARCHITECTURE HUD CARD (Slides in when reaching Station 1, 2, 3, or 4) */}
        {station && (
          <div className="absolute bottom-10 left-6 sm:left-12 z-30 max-w-md w-full p-6 rounded-2xl bg-[#090D16]/95 border-2 border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(255,153,0,0.2)] backdrop-blur-2xl animate-in slide-in-from-bottom-6 duration-200 space-y-3 pointer-events-auto">
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
                Scroll to next node &rarr;
              </span>
            </div>
          </div>
        )}

        {/* BOTTOM LEFT HARDWARE IDENTIFIER */}
        <div className="absolute bottom-8 left-8 hidden lg:flex items-center gap-3 px-4 py-2 rounded-xl bg-[#090D16]/80 border border-white/10 backdrop-blur-md text-[11px] font-mono text-slate-400">
          <Activity className="w-3.5 h-3.5 text-[#FF3B20]" />
          <span>PARTICLE ACCELERATOR // PBR CONDUIT 2.2MM</span>
        </div>
      </div>
    </div>
  );
};
