import React, { useEffect, useState, useRef } from "react";

export const ScrollTreeSpine: React.FC = () => {
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [packetVelocity, setPacketVelocity] = useState(0);
  const lastScrollRef = useRef(0);
  const lastTimeRef = useRef(Date.now());

  useEffect(() => {
    let animId: number;
    let target = 0;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      target = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);

      // Compute velocity for dynamic particle stretch
      const now = Date.now();
      const dt = Math.max(now - lastTimeRef.current, 1);
      const dy = Math.abs(window.scrollY - lastScrollRef.current);
      setPacketVelocity(Math.min(dy / dt, 2.5));
      lastScrollRef.current = window.scrollY;
      lastTimeRef.current = now;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Smooth LERP animation loop (silky physics)
    let current = 0;
    const updatePhysics = () => {
      current += (target - current) * 0.075;
      setSmoothProgress(current);
      animId = requestAnimationFrame(updatePhysics);
    };
    updatePhysics();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  // SVG Height is mapped to 100% of document
  const p = smoothProgress; // 0.0 to 1.0

  // Calculate packet position along the SVG spine:
  // Total vertical viewBox: 3600 units
  const packetY = p * 3400 + 100;

  // Branching math:
  // Fork 1 (Engine): Y = 700 to 1400 (Splits into Left & Right)
  const isFork1 = p > 0.18 && p < 0.42;
  const fork1T = Math.min(Math.max((p - 0.18) / 0.24, 0), 1);

  // Fork 2 (Templates): Y = 2100 to 2900 (Splits into 4 branches)
  const isFork2 = p > 0.58 && p < 0.85;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden w-full h-full">
      <svg
        className="w-full h-full min-h-[3600px]"
        viewBox="0 0 1200 3600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Glowing laser linear gradients */}
          <linearGradient id="trunkGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#818CF8" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#06B6D4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="75%" stopColor="#A855F7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.9" />
          </linearGradient>

          <filter id="laserBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="packetGlow">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor="#67e8f9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* --- MAIN ROOT CONDUIT (Hero -> Engine) --- */}
        <path
          d="M 600 120 L 600 700"
          stroke="url(#trunkGlow)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#laserBlur)"
          opacity="0.6"
        />

        {/* --- FORK 1: V8 ENGINE SPLIT (Y: 700 -> 1400) --- */}
        {/* Left Branch (Kahn Sorter) */}
        <path
          d="M 600 700 C 600 820, 280 880, 280 1050 C 280 1220, 580 1300, 600 1420"
          stroke="#06B6D4"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          filter="url(#laserBlur)"
          opacity={isFork1 ? "0.85" : "0.4"}
        />
        {/* Right Branch (V8 Sandbox) */}
        <path
          d="M 600 700 C 600 820, 920 880, 920 1050 C 920 1220, 620 1300, 600 1420"
          stroke="#10B981"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          filter="url(#laserBlur)"
          opacity={isFork1 ? "0.85" : "0.4"}
        />

        {/* Junction Diode 1 (Split Point) */}
        <circle cx="600" cy="700" r="7" fill="#04060A" stroke="#06B6D4" strokeWidth="2.5" />
        <circle cx="600" cy="700" r="3" fill="#38BDF8" />

        {/* Junction Diode 1 (Merge Point) */}
        <circle cx="600" cy="1420" r="7" fill="#04060A" stroke="#10B981" strokeWidth="2.5" />
        <circle cx="600" cy="1420" r="3" fill="#34D399" />

        {/* --- TRUNK 2: (Engine -> Telemetry HUD Y: 1420 -> 2100) --- */}
        <path
          d="M 600 1420 L 600 2100"
          stroke="#F59E0B"
          strokeWidth="3"
          filter="url(#laserBlur)"
          opacity="0.6"
        />

        {/* --- FORK 2: 4-WAY TEMPLATE FAN-OUT (Y: 2100 -> 2950) --- */}
        {/* Branch 1: DevOps (Lime) */}
        <path
          d="M 600 2100 C 600 2250, 180 2350, 180 2550 C 180 2750, 560 2850, 600 2950"
          stroke="#84CC16"
          strokeWidth="2"
          opacity={isFork2 ? "0.8" : "0.35"}
        />
        {/* Branch 2: AI (Purple) */}
        <path
          d="M 600 2100 C 600 2250, 420 2350, 420 2550 C 420 2750, 580 2850, 600 2950"
          stroke="#A855F7"
          strokeWidth="2"
          opacity={isFork2 ? "0.8" : "0.35"}
        />
        {/* Branch 3: Data ETL (Emerald) */}
        <path
          d="M 600 2100 C 600 2250, 780 2350, 780 2550 C 780 2750, 620 2850, 600 2950"
          stroke="#10B981"
          strokeWidth="2"
          opacity={isFork2 ? "0.8" : "0.35"}
        />
        {/* Branch 4: Security (Amber) */}
        <path
          d="M 600 2100 C 600 2250, 1020 2350, 1020 2550 C 1020 2750, 640 2850, 600 2950"
          stroke="#F59E0B"
          strokeWidth="2"
          opacity={isFork2 ? "0.8" : "0.35"}
        />

        {/* Junction Diode 2 (4-way Split) */}
        <circle cx="600" cy="2100" r="8" fill="#04060A" stroke="#F59E0B" strokeWidth="2.5" />
        <circle cx="600" cy="2100" r="3.5" fill="#FBBF24" />

        {/* Junction Diode 2 (Re-Fusion) */}
        <circle cx="600" cy="2950" r="8" fill="#04060A" stroke="#10B981" strokeWidth="2.5" />
        <circle cx="600" cy="2950" r="3.5" fill="#34D399" />

        {/* --- FINAL CONDUIT: (Templates -> Studio CTA Y: 2950 -> 3450) --- */}
        <path
          d="M 600 2950 L 600 3450"
          stroke="#10B981"
          strokeWidth="3.5"
          filter="url(#laserBlur)"
          opacity="0.8"
        />

        {/* --- THE TRAVELING PHOTON PACKETS (PHYSICS-BASED) --- */}
        {!isFork1 && !isFork2 && (
          <g transform={`translate(600, ${packetY})`}>
            {/* Ambient radiant glow aura */}
            <circle cx="0" cy="0" r="30" fill="url(#packetGlow)" opacity="0.6" />
            {/* Dynamic trailing laser tail */}
            <ellipse
              cx="0"
              cy={-packetVelocity * 8}
              rx="4"
              ry={6 + packetVelocity * 10}
              fill="#FFFFFF"
              filter="url(#laserBlur)"
            />
            {/* High-intensity photon core */}
            <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
          </g>
        )}

        {/* Dual Packets during Fork 1 (Engine Split) */}
        {isFork1 && (
          <>
            {/* Packet Left (Cyan) */}
            <g transform={`translate(${600 - Math.sin(fork1T * Math.PI) * 320}, ${packetY})`}>
              <circle cx="0" cy="0" r="22" fill="#06B6D4" opacity="0.3" filter="url(#laserBlur)" />
              <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
            </g>
            {/* Packet Right (Emerald) */}
            <g transform={`translate(${600 + Math.sin(fork1T * Math.PI) * 320}, ${packetY})`}>
              <circle cx="0" cy="0" r="22" fill="#10B981" opacity="0.3" filter="url(#laserBlur)" />
              <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
            </g>
          </>
        )}

        {/* Quad Packets during Fork 2 (Templates Split) */}
        {isFork2 && (
          <>
            <g transform={`translate(280, ${packetY})`}>
              <circle cx="0" cy="0" r="18" fill="#84CC16" opacity="0.4" />
              <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
            </g>
            <g transform={`translate(460, ${packetY})`}>
              <circle cx="0" cy="0" r="18" fill="#A855F7" opacity="0.4" />
              <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
            </g>
            <g transform={`translate(740, ${packetY})`}>
              <circle cx="0" cy="0" r="18" fill="#10B981" opacity="0.4" />
              <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
            </g>
            <g transform={`translate(920, ${packetY})`}>
              <circle cx="0" cy="0" r="18" fill="#F59E0B" opacity="0.4" />
              <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
            </g>
          </>
        )}
      </svg>
    </div>
  );
};
