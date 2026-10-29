import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ChevronDown, Activity, Cpu, ArrowRight, Play } from "lucide-react";
import { HoloStationHUD } from "./HoloStationHUD";
import { HoloGunHUD } from "./HoloGunHUD";

export const HeroScene3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStation, setActiveStation] = useState<number | null>(null);
  const [visibleStation, setVisibleStation] = useState<number | null>(null);
  const [isCardExiting, setIsCardExiting] = useState(false);
  const exitTimerRef = useRef<number | null>(null);
  const lastDetectedStationRef = useRef<number | null>(null);

  useEffect(() => {
    if (activeStation !== null) {
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
      setVisibleStation(activeStation);
      setIsCardExiting(false);
    } else {
      if (visibleStation !== null && !isCardExiting) {
        setIsCardExiting(true);
        exitTimerRef.current = window.setTimeout(() => {
          setVisibleStation(null);
          setIsCardExiting(false);
          exitTimerRef.current = null;
        }, 220);
      }
    }
  }, [activeStation, visibleStation, isCardExiting]);

  useEffect(() => {
    const container = mountRef.current;
    const scrollContainer = scrollContainerRef.current;
    if (!container || !scrollContainer) return;

    // --- THREE.JS SCENE INITIALIZATION ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070a0f, 0.016);

    const isMobileInitial = window.innerWidth < 768;
    const camera = new THREE.PerspectiveCamera(
      isMobileInitial ? 58 : 45,
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
    const amberLight = new THREE.PointLight(0xff9900, 4.0, 45);
    amberLight.position.set(-5, 8, 8);
    scene.add(amberLight);

    const cyanLight = new THREE.PointLight(0x00e5ff, 4.5, 40);
    cyanLight.position.set(12, 6, 6);
    scene.add(cyanLight);

    const orangeLight = new THREE.PointLight(0xff5500, 4.5, 40);
    orangeLight.position.set(24, 7, 7);
    scene.add(orangeLight);

    const emeraldLight = new THREE.PointLight(0x00ff88, 4.0, 40);
    emeraldLight.position.set(36, 6, 6);
    scene.add(emeraldLight);

    // Frontal directional key light to make the lunar ceramic surfaces gleam with crisp specular highlights
    const lunarSpecSun = new THREE.DirectionalLight(0xffffff, 2.0);
    lunarSpecSun.position.set(5, 18, 22);
    scene.add(lunarSpecSun);

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
    // Redesigned in Frosted Arctic Ceramic & Brushed Lunar Titanium Mech Aerospace Aesthetic
    const cannonMountGroup = new THREE.Group();
    cannonMountGroup.position.set(-25, 0, 0);

    const gunCeramicMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc, // High-gloss Arctic Ceramic White Armor
      metalness: 0.88,
      roughness: 0.14,
    });

    const gunTitaniumMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0, // Brushed Lunar Titanium Plating & Rails
      metalness: 0.94,
      roughness: 0.18,
    });

    const gunCarbonMat = new THREE.MeshStandardMaterial({
      color: 0x141a24, // Deep Carbon Composite Chassis & Recesses
      metalness: 0.70,
      roughness: 0.38,
    });

    const gunAccentMat = new THREE.MeshStandardMaterial({
      color: 0xff3311, // High-visibility Safety Crimson Trim
      emissive: 0xaa1100,
      emissiveIntensity: 1.4,
      metalness: 0.75,
      roughness: 0.2,
    });

    const gunCoilMat = new THREE.MeshStandardMaterial({
      color: 0xffaa00, // Magnetic Stator Accelerator Coils
      emissive: 0xff7700,
      emissiveIntensity: 2.6,
      metalness: 0.4,
      roughness: 0.2,
    });

    // A. Ground Foundation Base (Octagonal Heavy Carbon Pedestal)
    const basePedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(3.6, 4.4, 1.4, 8),
      gunCarbonMat
    );
    basePedestal.position.y = -1.3;
    cannonMountGroup.add(basePedestal);

    // B. Four White Ceramic Outrigger Stabilization Footpads
    for (let o = 0; o < 4; o++) {
      const padAngle = (o * Math.PI) / 2 + Math.PI / 4;
      const footpad = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.55, 1.8),
        gunCeramicMat
      );
      footpad.position.set(
        Math.cos(padAngle) * 3.8,
        -1.7,
        Math.sin(padAngle) * 3.8
      );
      footpad.rotation.y = -padAngle;
      cannonMountGroup.add(footpad);
    }

    // C. Octagonal Hazard Crimson Safety Trim
    const hazardRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.9, 0.14, 8, 8),
      gunAccentMat
    );
    hazardRing.rotateX(Math.PI / 2);
    hazardRing.position.y = -1.3;
    cannonMountGroup.add(hazardRing);

    // D. Brushed Platinum Azimuth Turntable Ring
    const turntableBearing = new THREE.Mesh(
      new THREE.CylinderGeometry(2.7, 2.9, 0.45, 32),
      gunTitaniumMat
    );
    turntableBearing.position.y = -0.45;
    cannonMountGroup.add(turntableBearing);

    // E. Yaw Turret Swivel Assembly
    const yawTurret = new THREE.Group();
    yawTurret.position.y = 0;

    // Turret Swivel Deck
    const turretDeck = new THREE.Mesh(
      new THREE.CylinderGeometry(2.4, 2.6, 0.65, 24),
      gunCarbonMat
    );
    turretDeck.position.y = -0.15;
    yawTurret.add(turretDeck);

    // Dual Reinforced White Ceramic Cheek Armor Sponsons
    const createCheekSponson = (zOffset: number) => {
      const cheekGroup = new THREE.Group();
      cheekGroup.position.set(0, 1.1, zOffset);

      // Main Outer White Ceramic Armor Sponson
      const armorPlate = new THREE.Mesh(
        new THREE.BoxGeometry(2.6, 3.2, 0.8),
        gunCeramicMat
      );
      cheekGroup.add(armorPlate);

      // Recessed Carbon Cooling Vents
      const ventPlate = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 1.8, 0.86),
        gunCarbonMat
      );
      ventPlate.position.set(-0.2, 0.2, 0);
      cheekGroup.add(ventPlate);

      // Crimson Hazard Strip
      const trim = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 0.16, 0.84),
        gunAccentMat
      );
      trim.position.set(0, -0.9, 0);
      cheekGroup.add(trim);

      // Heavy Brushed Titanium Trunnion Pivot Hub
      const trunnionHub = new THREE.Mesh(
        new THREE.CylinderGeometry(0.85, 0.85, 0.35, 24),
        gunTitaniumMat
      );
      trunnionHub.rotateX(Math.PI / 2);
      trunnionHub.position.set(0, 0, zOffset > 0 ? 0.35 : -0.35);
      cheekGroup.add(trunnionHub);

      return cheekGroup;
    };

    const leftCheek = createCheekSponson(-1.7);
    const rightCheek = createCheekSponson(1.7);
    yawTurret.add(leftCheek, rightCheek);

    // F. Movable Pitch Barrel Assembly (Pivots smoothly on pitch axis)
    const pitchAssembly = new THREE.Group();
    pitchAssembly.position.set(0, 1.1, 0);

    // 1. Heavy Receiver & Breech Core (X: -2.2 to 1.2)
    const breechCore = new THREE.Mesh(
      new THREE.BoxGeometry(3.4, 1.8, 1.8),
      gunCarbonMat
    );
    breechCore.position.set(-0.5, 0, 0);
    pitchAssembly.add(breechCore);

    // White Ceramic Top Breech Cowling
    const topCowling = new THREE.Mesh(
      new THREE.BoxGeometry(2.9, 0.42, 2.1),
      gunCeramicMat
    );
    topCowling.position.set(-0.6, 0.95, 0);
    pitchAssembly.add(topCowling);

    // Twin High-Voltage Fusion Battery Cells (Flanking Breech)
    const createBatteryCell = (zPos: number) => {
      const battGroup = new THREE.Group();
      battGroup.position.set(-0.5, 0.1, zPos);

      const cellCasing = new THREE.Mesh(
        new THREE.CylinderGeometry(0.38, 0.38, 2.4, 16),
        gunTitaniumMat
      );
      cellCasing.rotateZ(Math.PI / 2);
      battGroup.add(cellCasing);

      // Glowing Amber Plasma Core Window
      const energyCore = new THREE.Mesh(
        new THREE.CylinderGeometry(0.39, 0.39, 1.5, 16),
        new THREE.MeshBasicMaterial({ color: 0xffaa00 })
      );
      energyCore.rotateZ(Math.PI / 2);
      battGroup.add(energyCore);

      return battGroup;
    };
    pitchAssembly.add(createBatteryCell(-1.15), createBatteryCell(1.15));

    // Rear Radiator Heat Sink Grill (Cooling Fins at Breech Rear)
    for (let r = 0; r < 5; r++) {
      const radiatorFin = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 1.5, 1.6),
        gunTitaniumMat
      );
      radiatorFin.position.set(-2.0 - r * 0.22, 0, 0);
      pitchAssembly.add(radiatorFin);
    }

    // 2. Heavy Quad-Rail Magnetic Accelerator Assembly (X: 1.2 to 6.6)
    // 4 Heavy Titanium Corner Guide Rails
    const railPositions = [
      { y: 0.65, z: -0.65 },
      { y: 0.65, z: 0.65 },
      { y: -0.65, z: -0.65 },
      { y: -0.65, z: 0.65 },
    ];
    railPositions.forEach((pos) => {
      const cornerRail = new THREE.Mesh(
        new THREE.BoxGeometry(5.4, 0.28, 0.28),
        gunTitaniumMat
      );
      cornerRail.position.set(3.9, pos.y, pos.z);
      pitchAssembly.add(cornerRail);
    });

    // White Ceramic Barrel Fairings (Top & Bottom Armor Shells)
    const topBarrelArmor = new THREE.Mesh(
      new THREE.BoxGeometry(4.4, 0.22, 1.3),
      gunCeramicMat
    );
    topBarrelArmor.position.set(3.6, 0.82, 0);
    const btmBarrelArmor = new THREE.Mesh(
      new THREE.BoxGeometry(4.4, 0.22, 1.3),
      gunCeramicMat
    );
    btmBarrelArmor.position.set(3.6, -0.82, 0);
    pitchAssembly.add(topBarrelArmor, btmBarrelArmor);

    // Glowing Central Plasma Accelerator Bore
    const innerPlasmaBore = new THREE.Mesh(
      new THREE.CylinderGeometry(0.42, 0.42, 5.2, 16),
      new THREE.MeshBasicMaterial({
        color: 0xffaa00,
        transparent: true,
        opacity: 0.5,
      })
    );
    innerPlasmaBore.rotateZ(Math.PI / 2);
    innerPlasmaBore.position.set(3.8, 0, 0);
    pitchAssembly.add(innerPlasmaBore);

    // 3. Six Magnetic Stator Accelerator Coils
    const coilGeo = new THREE.TorusGeometry(0.95, 0.14, 8, 24);
    coilGeo.rotateY(Math.PI / 2);

    const coilMeshes: THREE.Mesh[] = [];
    const coilXPositions = [1.6, 2.4, 3.2, 4.0, 4.8, 5.6];
    coilXPositions.forEach((xPos) => {
      const coil = new THREE.Mesh(coilGeo, gunCoilMat);
      coil.position.x = xPos;

      // Heavy Titanium Mounting Collar on each coil
      const coilCollar = new THREE.Mesh(
        new THREE.TorusGeometry(1.12, 0.08, 6, 8),
        gunTitaniumMat
      );
      coilCollar.rotateY(Math.PI / 2);
      coilCollar.position.x = xPos;
      pitchAssembly.add(coilCollar);

      pitchAssembly.add(coil);
      coilMeshes.push(coil);
    });

    // 4. Heavy Multi-Slotted Muzzle Brake & Emitter Head (X = 6.6)
    // Outer Ceramic Muzzle Cowl
    const muzzleCowl = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 0.95, 1.1, 8),
      gunCeramicMat
    );
    muzzleCowl.rotateZ(-Math.PI / 2);
    muzzleCowl.position.x = 6.45;
    pitchAssembly.add(muzzleCowl);

    // Titanium Muzzle Crown
    const muzzleCrown = new THREE.Mesh(
      new THREE.CylinderGeometry(1.05, 1.15, 0.35, 16),
      gunTitaniumMat
    );
    muzzleCrown.rotateZ(-Math.PI / 2);
    muzzleCrown.position.x = 7.0;
    pitchAssembly.add(muzzleCrown);

    // Blinding White Plasma Flash Aperture
    const muzzleAperture = new THREE.Mesh(
      new THREE.TorusGeometry(0.55, 0.1, 12, 24),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffaa00,
        emissiveIntensity: 3.5,
      })
    );
    muzzleAperture.rotateY(Math.PI / 2);
    muzzleAperture.position.x = 7.05;
    pitchAssembly.add(muzzleAperture);

    // Side Plasma Baffle Vents
    const baffleLeft = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.75, 0.25),
      gunCarbonMat
    );
    baffleLeft.position.set(6.45, 0, -0.9);
    const baffleRight = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.75, 0.25),
      gunCarbonMat
    );
    baffleRight.position.set(6.45, 0, 0.9);
    pitchAssembly.add(baffleLeft, baffleRight);

    // 5. Dual Precision Laser Targeting Guidance
    const laserMat = new THREE.LineBasicMaterial({
      color: 0xff4400,
      transparent: true,
      opacity: 0.85,
    });
    const laserGeo1 = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(7.1, 0.35, 0),
      new THREE.Vector3(15.0, 0.1, 0),
    ]);
    const laserGeo2 = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(7.1, -0.35, 0),
      new THREE.Vector3(15.0, -0.1, 0),
    ]);
    const targetingLaser1 = new THREE.Line(laserGeo1, laserMat);
    const targetingLaser2 = new THREE.Line(laserGeo2, laserMat);
    pitchAssembly.add(targetingLaser1, targetingLaser2);

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
      color: 0xe2e8f0, // Brushed Lunar Titanium
      metalness: 0.94,
      roughness: 0.18,
    });

    const pylonGeo = new THREE.CylinderGeometry(0.14, 0.18, 6.0, 8);
    const pylonMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.85,
      roughness: 0.35,
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

    // ============================================================
    // OPTION 1: FROSTED CERAMIC & BRUSHED LUNAR TITANIUM
    // High-albedo, razor-sharp contrast against #070A0F background
    // ============================================================
    const lunarCeramicMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc, // High-gloss Arctic Ceramic White
      metalness: 0.88,
      roughness: 0.14,
    });

    const brushedPlatinumMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0, // Brushed Lunar Titanium / Platinum
      metalness: 0.94,
      roughness: 0.20,
    });

    const carbonRecessMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b, // Dark Carbon-Fiber Inset Ribs
      metalness: 0.65,
      roughness: 0.40,
    });

    const stationPylonMat = new THREE.MeshStandardMaterial({
      color: 0x334155, // Heavy Structural Titanium
      metalness: 0.90,
      roughness: 0.28,
    });

    // --- 3. THE 4 INDUSTRIAL DOCKING STATIONS ---
    const stationsGroup = new THREE.Group();

    // --- STATION 1: INGESTION & SSRF GATEWAY (at -5.0, 0, 0) ---
    // Heavy Octagonal Airlock Bulkhead in High-Gloss Ceramic & Lunar Titanium
    const st1 = new THREE.Group();
    st1.position.set(-5.0, 0, 0);
    st1.userData = { stationIndex: 1 };

    // 1. Heavy Outer Octagonal Ceramic Bulkhead Frame (8-sided Torus)
    const st1OuterFrame = new THREE.Mesh(
      new THREE.TorusGeometry(3.1, 0.46, 8, 8),
      lunarCeramicMat
    );
    st1.add(st1OuterFrame);

    // 2. Recessed Carbon-Fiber Chamfer Collar
    const st1CarbonCollar = new THREE.Mesh(
      new THREE.TorusGeometry(2.45, 0.18, 6, 8),
      carbonRecessMat
    );
    st1.add(st1CarbonCollar);

    // 3. Four Radial Lunar Titanium Hydraulic Clamping Calipers
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const caliper = new THREE.Mesh(
        new THREE.BoxGeometry(0.38, 1.1, 0.5),
        brushedPlatinumMat
      );
      caliper.position.set(Math.cos(angle) * 2.1, Math.sin(angle) * 2.1, 0);
      caliper.rotation.z = angle + Math.PI / 2;
      st1.add(caliper);
    }

    // 4. Rotating Amber Holographic Scanner Ring & Laser Teeth
    const st1InnerScanner = new THREE.Mesh(
      new THREE.TorusGeometry(1.95, 0.12, 12, 32),
      new THREE.MeshStandardMaterial({
        color: 0xffaa00,
        emissive: 0xff8800,
        emissiveIntensity: 2.6,
        roughness: 0.2,
      })
    );
    st1.add(st1InnerScanner);

    // 8 Amber Sensor Emitter Studs around the rim
    for (let s = 0; s < 8; s++) {
      const a = (s * Math.PI) / 4;
      const stud = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xffbb00 })
      );
      stud.position.set(Math.cos(a) * 3.3, Math.sin(a) * 3.3, 0.25);
      st1.add(stud);
    }

    // 5. Heavy Titanium Mounting Pylon to Floor
    const st1BasePylon = new THREE.Mesh(
      new THREE.CylinderGeometry(0.45, 0.75, 4.5, 8),
      stationPylonMat
    );
    st1BasePylon.position.set(0, -4.25, 0);
    st1.add(st1BasePylon);

    stationsGroup.add(st1);

    // --- STATION 2: V8 IN-MEMORY DAG REACTOR (at 12.0, 0.5, 0) ---
    // Massive Multi-Tier Tokamak Vessel in High-Gloss Ceramic Armor & Cyan Plasma Rings
    const st2 = new THREE.Group();
    st2.position.set(12.0, 0.5, 0);
    st2.userData = { stationIndex: 2 };

    // 1. Central Tokamak Reactor Vessel in High-Gloss White Ceramic
    const st2Core = new THREE.Mesh(
      new THREE.CylinderGeometry(2.5, 2.5, 3.8, 32),
      lunarCeramicMat
    );
    st2.add(st2Core);

    // 2. Cyan Plasma Viewport Band (Glowing Center Window)
    const st2PlasmaBelt = new THREE.Mesh(
      new THREE.CylinderGeometry(2.52, 2.52, 1.1, 32),
      new THREE.MeshBasicMaterial({ color: 0x00e5ff })
    );
    st2.add(st2PlasmaBelt);

    // 3. Top and Bottom Brushed Titanium Compression Caps
    const st2CapTop = new THREE.Mesh(
      new THREE.CylinderGeometry(2.7, 2.5, 0.45, 32),
      brushedPlatinumMat
    );
    st2CapTop.position.y = 2.0;
    const st2CapBtm = new THREE.Mesh(
      new THREE.CylinderGeometry(2.5, 2.7, 0.45, 32),
      brushedPlatinumMat
    );
    st2CapBtm.position.y = -2.0;
    st2.add(st2CapTop, st2CapBtm);

    // 4. Eight Radial Lunar Ceramic Cooling Fins
    for (let f = 0; f < 8; f++) {
      const finAngle = (f * Math.PI) / 4;
      const fin = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 3.6, 0.7),
        lunarCeramicMat
      );
      fin.position.set(Math.cos(finAngle) * 2.65, 0, Math.sin(finAngle) * 2.65);
      fin.rotation.y = -finAngle;
      st2.add(fin);
    }

    // 5. Dual Counter-Rotating Magnetic Confinement Rings
    const st2CyanRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(3.35, 0.22, 16, 48),
      new THREE.MeshStandardMaterial({
        color: 0x00e5ff,
        emissive: 0x00e5ff,
        emissiveIntensity: 2.2,
      })
    );
    st2CyanRing1.rotateX(Math.PI / 2);

    const st2CyanRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.85, 0.16, 16, 48),
      new THREE.MeshStandardMaterial({
        color: 0x00e5ff,
        emissive: 0x38bdf8,
        emissiveIntensity: 1.9,
      })
    );
    st2CyanRing2.rotateZ(Math.PI / 3);
    st2.add(st2CyanRing1, st2CyanRing2);

    // 6. Heavy 4-Legged Titanium Base Cradle
    for (let l = 0; l < 4; l++) {
      const legAngle = (l * Math.PI) / 2 + Math.PI / 4;
      const leg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.35, 5.2, 8),
        stationPylonMat
      );
      leg.position.set(Math.cos(legAngle) * 2.4, -4.0, Math.sin(legAngle) * 2.4);
      st2.add(leg);
    }

    stationsGroup.add(st2);

    // --- STATION 3: BULLMQ DISTRIBUTED QUEUE BUFFER (at 24.0, 0, 0) ---
    // Twin Cryogenic Buffer Silos in Lunar Ceramic with Safety Hazard Orange Accents
    const st3 = new THREE.Group();
    st3.position.set(24.0, 0, 0);
    st3.userData = { stationIndex: 3 };

    const createSilo = (zPos: number) => {
      const siloGroup = new THREE.Group();
      siloGroup.position.z = zPos;

      // High-Gloss Lunar Ceramic Silo Body
      const siloBody = new THREE.Mesh(
        new THREE.CylinderGeometry(1.45, 1.45, 5.2, 28),
        lunarCeramicMat
      );
      siloGroup.add(siloBody);

      // Domed Titanium Caps
      const domeGeo = new THREE.SphereGeometry(1.45, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2);
      const topDome = new THREE.Mesh(domeGeo, brushedPlatinumMat);
      topDome.position.y = 2.6;
      const btmDome = new THREE.Mesh(domeGeo, brushedPlatinumMat);
      btmDome.position.y = -2.6;
      btmDome.rotation.x = Math.PI;
      siloGroup.add(topDome, btmDome);

      // Safety Orange Industrial Hazard Rings
      const hazardCollarGeo = new THREE.TorusGeometry(1.5, 0.12, 12, 28);
      hazardCollarGeo.rotateX(Math.PI / 2);
      const hazardCollarMat = new THREE.MeshStandardMaterial({
        color: 0xff5500,
        emissive: 0xff3300,
        emissiveIntensity: 2.0,
      });
      const topCollar = new THREE.Mesh(hazardCollarGeo, hazardCollarMat);
      topCollar.position.y = 1.6;
      const btmCollar = new THREE.Mesh(hazardCollarGeo, hazardCollarMat);
      btmCollar.position.y = -1.6;
      siloGroup.add(topCollar, btmCollar);

      // Vertical Glowing Sight-Glass (Queue Fill-Level Telemetry)
      const sightGlass = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 3.8, 0.22),
        new THREE.MeshBasicMaterial({ color: 0xff7700 })
      );
      sightGlass.position.set(1.4, 0, 0);
      siloGroup.add(sightGlass);

      return siloGroup;
    };

    const siloLeft = createSilo(-2.4);
    const siloRight = createSilo(2.4);
    st3.add(siloLeft, siloRight);

    // Overhead Titanium Connecting Bridge Manifold
    const bridgeTruss = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 0.65, 4.9),
      brushedPlatinumMat
    );
    bridgeTruss.position.y = 2.4;
    st3.add(bridgeTruss);

    // Central Rotating Safety Orange Induction Throttle Ring
    const st3HazardRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.8, 0.22, 16, 32),
      new THREE.MeshStandardMaterial({
        color: 0xff5500,
        emissive: 0xff3300,
        emissiveIntensity: 2.2,
      })
    );
    st3HazardRing.rotateX(Math.PI / 2);
    st3.add(st3HazardRing);

    // Base Support Foundation
    const st3BasePlatform = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 0.6, 7.0),
      carbonRecessMat
    );
    st3BasePlatform.position.y = -3.8;
    const st3PylonL = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.5, 3.2, 8), stationPylonMat);
    st3PylonL.position.set(0, -5.2, -2.4);
    const st3PylonR = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.5, 3.2, 8), stationPylonMat);
    st3PylonR.position.set(0, -5.2, 2.4);
    st3.add(st3BasePlatform, st3PylonL, st3PylonR);

    stationsGroup.add(st3);

    // --- STATION 4: MULTI-CHANNEL DISPATCH BAY (at 36.0, 0.5, 0) ---
    // Faceted Lunar Ceramic Octahedral Core & 4 Titanium Multi-Target Emitter Horns
    const st4 = new THREE.Group();
    st4.position.set(36.0, 0.5, 0);
    st4.userData = { stationIndex: 4 };

    // 1. Faceted Lunar Ceramic Octahedron Core
    const st4Hub = new THREE.Mesh(
      new THREE.OctahedronGeometry(2.6, 1),
      lunarCeramicMat
    );
    st4.add(st4Hub);

    // 2. Inner Carbon-Fiber Energy Core
    const st4InnerCore = new THREE.Mesh(
      new THREE.OctahedronGeometry(2.1, 0),
      carbonRecessMat
    );
    st4.add(st4InnerCore);

    // 3. Four Divergent Brushed Titanium Emitter Horns (Discord, Neon DB, Webhook, Email)
    const emitterAngles = [
      Math.PI / 4,
      (3 * Math.PI) / 4,
      (5 * Math.PI) / 4,
      (7 * Math.PI) / 4,
    ];
    emitterAngles.forEach((ang) => {
      const emitterGroup = new THREE.Group();
      emitterGroup.position.set(Math.cos(ang) * 2.2, Math.sin(ang) * 2.2, 0);
      emitterGroup.rotation.z = ang - Math.PI / 2;

      // Titanium Horn
      const horn = new THREE.Mesh(
        new THREE.ConeGeometry(0.55, 1.8, 16),
        brushedPlatinumMat
      );
      horn.rotation.x = Math.PI;
      emitterGroup.add(horn);

      // Acid Emerald Tip Emitter Ring
      const tipRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.52, 0.08, 8, 16),
        new THREE.MeshBasicMaterial({ color: 0x00ff88 })
      );
      tipRing.position.y = -0.9;
      tipRing.rotateX(Math.PI / 2);
      emitterGroup.add(tipRing);

      st4.add(emitterGroup);
    });

    // 4. Orbiting Acid Emerald Induction Ring
    const st4EmitterRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.4, 0.24, 16, 48),
      new THREE.MeshStandardMaterial({
        color: 0x00ff88,
        emissive: 0x00cc66,
        emissiveIntensity: 2.4,
      })
    );
    st4EmitterRing.rotateY(Math.PI / 2);
    st4.add(st4EmitterRing);

    // 5. Heavy Titanium Vertical Mounting Pylon
    const st4Pylon = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.8, 6.5, 8),
      stationPylonMat
    );
    st4Pylon.position.set(0, -4.8, 0);
    st4.add(st4Pylon);

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
    const raycaster = new THREE.Raycaster();
    const mouseVec = new THREE.Vector2();

    const handleMouseMove = (e: MouseEvent) => {
      // Reduced sensitivity by 55% for smooth, controlled hydraulic turret aiming
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;

      mouseVec.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseVec.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouseVec, camera);
      const intersects = raycaster.intersectObjects([st1, st2, st3, st4], true);
      if (intersects.length > 0) {
        renderer.domElement.style.cursor = "pointer";
      } else {
        renderer.domElement.style.cursor = "crosshair";
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleCanvasClick = (event: MouseEvent) => {
      mouseVec.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseVec.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouseVec, camera);

      const intersects = raycaster.intersectObjects([st1, st2, st3, st4], true);
      if (intersects.length > 0) {
        let obj: THREE.Object3D | null = intersects[0].object;
        while (obj && !obj.userData?.stationIndex) {
          obj = obj.parent;
        }
        if (obj && obj.userData?.stationIndex) {
          const idx = obj.userData.stationIndex as number;
          if (scrollContainerRef.current) {
            const stationRatios: Record<number, number> = {
              1: 0.360,
              2: 0.549,
              3: 0.685,
              4: 0.818,
            };
            const ratio = stationRatios[idx] || 0.360;
            const totalScroll =
              scrollContainerRef.current.offsetHeight - window.innerHeight;
            const targetY =
              scrollContainerRef.current.offsetTop + totalScroll * ratio;
            window.scrollTo({ top: targetY, behavior: "smooth" });
          }
        }
      }
    };
    renderer.domElement.addEventListener("click", handleCanvasClick);

    // --- SCROLL DRIVER & ANIMATION LOOP (CALIBRATED FOR GENTLE, SLOW-MOTION FLIGHT) ---
    let currentT = 0;
    let targetT = 0;
    let scrollRatio = 0;
    const clock = new THREE.Clock();
    let animId: number;

    const handleScroll = () => {
      const containerRect = scrollContainer.getBoundingClientRect();
      const totalScroll = scrollContainer.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const progress = Math.min(Math.max(-containerRect.top / totalScroll, 0), 1);
      scrollRatio = progress;
      setScrollProgress(progress);

      // EXTENDED CALIBRATED STAGES (Generous scroll runway so nothing moves too fast):
      // 0.00 to 0.09: Slide 1 (Clean Editorial Hero - 3D pipeline hidden on 1st page)
      // 0.09 to 0.25: Slide 2 (3D Launcher Turret Stage with time to aim)
      // 0.25 to 0.94: Slow-motion conduit journey from gun to Station 4
      if (progress < 0.25) {
        targetT = 0.0; // Payload remains locked inside gun muzzle during Slide 1 & Slide 2
      } else {
        targetT = Math.min(Math.max((progress - 0.25) / (0.94 - 0.25), 0), 1);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Damped, heavy hydraulic mouse aiming (no sudden twitching or high sensitivity)
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;
      yawTurret.rotation.y = mouse.x * 0.20; // Reduced angle range
      pitchAssembly.rotation.z = mouse.y * 0.15;

      // Dynamic electromagnetic coil charge wave (charges up as user scrolls through Slide 2)
      const chargeLevel = Math.min(Math.max((scrollRatio - 0.08) / 0.14, 0), 1);
      coilMeshes.forEach((mesh, i) => {
        mesh.scale.setScalar(1 + Math.sin(time * 7 + i * 0.85) * (0.06 + chargeLevel * 0.08));
      });

      // Gentle, weighted slow-motion scroll interpolation (damping factor 0.038)
      currentT += (targetT - currentT) * 0.038;

      const clampedT = Math.min(Math.max(currentT, 0.0001), 0.9999);
      const packetPos = conduitSpline.getPointAt(clampedT);

      // Packet Position & Synchronized Internal Glow
      packetGroup.position.copy(packetPos);
      packetGlowLight.position.copy(packetPos);

      // Physical Docking Station Centers
      const st1Pos = new THREE.Vector3(-5.0, 0.0, 0);
      const st2Pos = new THREE.Vector3(12.0, 0.5, 0);
      const st3Pos = new THREE.Vector3(24.0, 0.0, 0);
      const st4Pos = new THREE.Vector3(36.0, 0.5, 0);

      // TOUCH_RADIUS: Triggers ONLY when packet is in or physically touching node boundary envelope
      const TOUCH_RADIUS = 3.2;

      let detectedStation: number | null = null;
      if (currentT > 0.04 && currentT < 0.94) {
        if (packetPos.distanceTo(st1Pos) <= TOUCH_RADIUS) {
          detectedStation = 1;
        } else if (packetPos.distanceTo(st2Pos) <= TOUCH_RADIUS) {
          detectedStation = 2;
        } else if (packetPos.distanceTo(st3Pos) <= TOUCH_RADIUS) {
          detectedStation = 3;
        } else if (packetPos.distanceTo(st4Pos) <= TOUCH_RADIUS) {
          detectedStation = 4;
        }
      }

      if (detectedStation !== lastDetectedStationRef.current) {
        lastDetectedStationRef.current = detectedStation;
        setActiveStation(detectedStation);
      }

      // Docking Station Dynamics & Contact Excitation
      const isSt1Hit = detectedStation === 1;
      const isSt2Hit = detectedStation === 2;
      const isSt3Hit = detectedStation === 3;
      const isSt4Hit = detectedStation === 4;

      st1OuterFrame.rotation.z = time * (isSt1Hit ? 0.85 : 0.25);
      st1InnerScanner.rotation.z = -time * (isSt1Hit ? 1.8 : 0.55);
      st2CyanRing1.rotation.z = time * (isSt2Hit ? -1.6 : -0.45);
      st2CyanRing2.rotation.y = time * (isSt2Hit ? 1.6 : 0.40);
      st3HazardRing.rotation.z = time * (isSt3Hit ? 1.4 : 0.35);
      st4Hub.rotation.y = time * (isSt4Hit ? 1.4 : 0.35);
      st4Hub.rotation.x = Math.sin(time * 0.6) * (isSt4Hit ? 0.25 : 0.12);
      st4EmitterRing.rotation.x = time * (isSt4Hit ? 1.8 : 0.55);
      st4EmitterRing.rotation.y = time * 0.25;

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

      // SCENE VISIBILITY: HIDE ON INITIAL 1ST PAGE TO PREVENT CLASHING WITH EDITORIAL HEADLINE
      // As soon as the user starts scrolling (scrollRatio >= 0.035), the 3D pipeline emerges
      const isInitialSlide = scrollRatio < 0.035;
      cannonMountGroup.visible = !isInitialSlide;
      glassTubeMesh.visible = !isInitialSlide;
      innerCoreMesh.visible = !isInitialSlide;
      stationsGroup.visible = !isInitialSlide;
      collarsGroup.visible = !isInitialSlide;
      packetGroup.visible = !isInitialSlide;

      // CINEMATIC STAGE-BY-STAGE CAMERA CHOREOGRAPHY (BUTTERY SMOOTH DAMPING)
      const isMob = window.innerWidth < 768;
      if (scrollRatio < 0.05) {
        // STAGE 1: EXPANSIVE EDITORIAL PERSPECTIVE (SLIDE 1 - CLEAN, SPACIOUS, UNCLUTTERED)
        const slide1CamPos = isMob
          ? new THREE.Vector3(0, 6.0, 26.0)
          : new THREE.Vector3(0, 5.0, 22.0);
        camera.position.lerp(slide1CamPos, 0.05);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
      } else if (scrollRatio >= 0.05 && scrollRatio < 0.25) {
        // STAGE 2: RAILGUN LAUNCHER DECK (SLIDE 2 - DEDICATED TURRET DECK)
        const cannonCamPos = isMob
          ? new THREE.Vector3(-22.5, 4.0, 12.0)
          : new THREE.Vector3(-21.5, 3.2, 8.5);
        camera.position.lerp(cannonCamPos, 0.05);
        camera.lookAt(new THREE.Vector3(-18.0, 1.2, 0));
      } else if (scrollRatio > 0.92) {
        // STAGE 4: TRANSITION DOWN INTO SECTION 2
        const exitCamPos = isMob
          ? new THREE.Vector3(38.0, 5.0, 14.0)
          : new THREE.Vector3(38.0, 4.0, 10.0);
        camera.position.lerp(exitCamPos, 0.05);
        camera.lookAt(packetPos);
      } else {
        // STAGE 3: CONDUIT ESCORT (CINEMATIC 3RD-PERSON FOLLOW CAM CENTERING THE PACKET)
        const cameraOffset = isMob
          ? new THREE.Vector3(-5.2, 4.0, 11.5)
          : new THREE.Vector3(-4.8, 3.2, 8.2);
        const targetCamPos = packetPos.clone().add(cameraOffset);
        camera.position.lerp(targetCamPos, 0.05);
        camera.lookAt(packetPos.clone().add(new THREE.Vector3(2.5, 0, 0)));
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const isMobNow = window.innerWidth < 768;
      camera.fov = isMobNow ? 58 : 45;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("click", handleCanvasClick);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Slide 2 (Gun Stage) indicator active state (activates after Slide 1 is completely gone)
  const isGunStage = scrollProgress >= 0.09 && scrollProgress < 0.26;

  return (
    // OPTIMIZED RUNWAY DEPTH (h-[480vh] provides buttery smooth 3D slow-motion without user scroll fatigue)
    <div ref={scrollContainerRef} className="relative w-full h-[480vh] bg-[#070A0F]">
      {/* PINNED FULLSCREEN 3D VIEWPORT */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Three.js Canvas Container */}
        <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-crosshair" />

        {/* ============================================================ */}
        {/* SLIDE 1: CLEAN, SPACIOUS, EXECUTIVE EDITORIAL HERO (SCROLL 0-9%) */}
        {/* ============================================================ */}
        <div
          style={{
            // Fades out smoothly on the first scroll and hides completely before Slide 2 activates
            opacity: Math.max(0, 1 - scrollProgress * 12.0),
            transform: `translateY(${-scrollProgress * 150}px)`,
            pointerEvents: scrollProgress > 0.05 ? "none" : "auto",
            display: scrollProgress >= 0.09 ? "none" : "flex",
          }}
          className="absolute inset-0 z-20 flex-col justify-between px-4 sm:px-16 pt-16 sm:pt-32 pb-4 sm:pb-14 transition-all duration-75 select-none"
        >
          {/* Top Eyebrow Tag */}
          <div className="flex items-center gap-2">
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_12px_#ff9900]" />
            <span className="text-[9px] sm:text-xs font-mono font-bold tracking-[0.18em] sm:tracking-[0.25em] text-amber-400 uppercase">
              Knotrun ORCHESTRATION ENGINE // V2.0
            </span>
          </div>

          {/* Main Headline & Narrative (Spacious, Uncluttered, Pure Contrast) */}
          <div className="max-w-4xl space-y-2.5 sm:space-y-6">
            <h1 className="text-2xl xs:text-3xl sm:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.08] font-['Space_Grotesk']">
              HIGH-PERFORMANCE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
                WORKFLOW AUTOMATION
              </span>
            </h1>

            <p className="text-[11px] xs:text-xs sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed font-['Space_Grotesk'] line-clamp-3 sm:line-clamp-none">
              Sub-millisecond in-memory orchestration. Kahn's topological DAG sorting and sandboxed V8 execution operating at 81,000+ ops/sec — completely decoupled from cloud database latency.
            </p>

            {/* CTAs */}
            <div className="pt-0.5 sm:pt-2 flex flex-wrap items-center gap-2.5 sm:gap-4">
              <a
                href="https://knotrun-studio.onrender.com/dashboard"
                className="inline-flex items-center gap-2 px-5 sm:px-8 py-2.5 sm:py-4 rounded-full font-mono text-xs font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400 hover:from-amber-300 hover:to-orange-300 shadow-[0_0_30px_rgba(255,153,0,0.4)] transition-all transform hover:scale-105 active:scale-95"
              >
                <Play className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-current text-black" />
                <span>LAUNCH STUDIO DEMO</span>
              </a>

              <a
                href="#engine-chip"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("engine-chip")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hidden sm:inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/20 hover:border-amber-400 bg-white/5 hover:bg-white/10 text-xs font-mono font-medium text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <span>EXPLORE ARCHITECTURE</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </a>

              <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono text-amber-400">
                <ChevronDown className="w-3.5 sm:w-4 h-3.5 sm:h-4 animate-bounce" />
                <span>Scroll down to enter 3D pipeline deck</span>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6 pt-2.5 sm:pt-8 border-t border-white/10 max-w-5xl">
            <div className="space-y-0.5 sm:space-y-1">
              <span className="text-[9px] sm:text-[11px] font-mono uppercase text-slate-500">DAG VELOCITY</span>
              <div className="text-xs sm:text-lg font-bold text-white font-mono">81,151 ops/s</div>
              <span className="text-[8px] sm:text-[10px] font-mono text-amber-400">+170% Headroom</span>
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <span className="text-[9px] sm:text-[11px] font-mono uppercase text-slate-500">ISOLATE LATENCY</span>
              <div className="text-xs sm:text-lg font-bold text-white font-mono">0.012 ms</div>
              <span className="text-[8px] sm:text-[10px] font-mono text-cyan-400">Sort p50</span>
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <span className="text-[9px] sm:text-[11px] font-mono uppercase text-slate-500">QUEUE CONCURRENCY</span>
              <div className="text-xs sm:text-lg font-bold text-white font-mono">2,551 req/s</div>
              <span className="text-[8px] sm:text-[10px] font-mono text-orange-400">Zero Drops</span>
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <span className="text-[9px] sm:text-[11px] font-mono uppercase text-slate-500">SSRF FIREWALL</span>
              <div className="text-xs sm:text-lg font-bold text-white font-mono">Active</div>
              <span className="text-[8px] sm:text-[10px] font-mono text-emerald-400">Zero-Trust</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SLIDE 2: THE 3D LAUNCHER TURRET STAGE (SCROLL 10-28%) */}
        {/* ============================================================ */}
        {isGunStage && (
          <div className="absolute top-20 sm:top-28 left-3 right-3 sm:left-14 sm:right-auto z-30 flex justify-center sm:justify-start animate-in fade-in zoom-in-95 duration-200">
            <HoloGunHUD scrollProgress={scrollProgress} />
          </div>
        )}

        {/* ============================================================ */}
        {/* FLIGHT PROGRESS BAR (Active during conduit escort) */}
        {/* ============================================================ */}
        {scrollProgress >= 0.25 && (
          <div className="absolute top-16 sm:top-24 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-14 pointer-events-none animate-in fade-in duration-200">
            <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#070A0F]/80 border border-white/10 backdrop-blur-md">
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 sm:gap-2">
                <Activity className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                <span className="hidden sm:inline">CONDUIT FLIGHT // ACTIVE</span>
                <span className="sm:hidden">FLIGHT ACTIVE</span>
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#070A0F]/80 border border-white/10 backdrop-blur-md text-[10px] sm:text-xs font-mono text-slate-300">
              <span>{Math.round(scrollProgress * 100)}%</span>
              <div className="w-20 sm:w-36 h-1.5 sm:h-2 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 rounded-full transition-all duration-75"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* DYNAMIC STATION ARCHITECTURE HUD CARD (Holographic Node Contact) */}
        {/* ============================================================ */}
        {visibleStation && (
          <div className="absolute bottom-4 sm:bottom-10 left-3 right-3 sm:left-14 sm:right-auto z-30 flex justify-center sm:justify-start pointer-events-auto">
            <HoloStationHUD
              stationIndex={visibleStation}
              isExiting={isCardExiting}
              onSelectStation={(idx) => {
                if (scrollContainerRef.current) {
                  const stationRatios: Record<number, number> = {
                    1: 0.360,
                    2: 0.549,
                    3: 0.685,
                    4: 0.818,
                  };
                  const ratio = stationRatios[idx] || 0.360;
                  const totalScroll =
                    scrollContainerRef.current.offsetHeight - window.innerHeight;
                  const targetY =
                    scrollContainerRef.current.offsetTop + totalScroll * ratio;
                  window.scrollTo({ top: targetY, behavior: "smooth" });
                }
              }}
              onClose={() => setActiveStation(null)}
            />
          </div>
        )}

        {/* BOTTOM RIGHT: HARDWARE IDENTIFIER */}
        <div className="absolute bottom-8 right-8 hidden lg:flex items-center gap-3 px-4 py-2 rounded-xl bg-[#090D16]/80 border border-white/10 backdrop-blur-md text-[11px] font-mono text-slate-400">
          <Cpu className="w-3.5 h-3.5 text-amber-400" />
          <span>Knotrun KERNEL // V8 IN-MEMORY RUNTIME</span>
        </div>
      </div>
    </div>
  );
};
