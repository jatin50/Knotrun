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

    // Smooth LERP animation loop (silky slow-motion physics)
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

  const p = smoothProgress; // 0.0 to 1.0

  // Total vertical viewBox: 3600 units
  const packetY = p * 3400 + 100;

  // Fork 1 (Engine Section): Y = 700 to 1420 (p = 0.18 to 0.42)
  const isFork1 = p >= 0.18 && p <= 0.42;
  const fork1T = isFork1 ? (p - 0.18) / (0.42 - 0.18) : 0;

  // Fork 2 (Templates 4-Way Fan-out): Y = 2100 to 2950 (p = 0.58 to 0.84)
  const isFork2 = p >= 0.58 && p <= 0.84;
  const fork2T = isFork2 ? (p - 0.58) / (0.84 - 0.58) : 0;

  // Continuous curve math for Fork 2 so child packets divide smoothly on scroll
  const fork2Sine = Math.sin(fork2T * Math.PI);
  const b1X = 600 - fork2Sine * 420; // 600 -> 180 -> 600
  const b2X = 600 - fork2Sine * 180; // 600 -> 420 -> 600
  const b3X = 600 + fork2Sine * 180; // 600 -> 780 -> 600
  const b4X = 600 + fork2Sine * 420; // 600 -> 1020 -> 600

  // Continuous curve math for Fork 1
  const fork1Sine = Math.sin(fork1T * Math.PI);
  const f1LeftX = 600 - fork1Sine * 320;
  const f1RightX = 600 + fork1Sine * 320;

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
          {/* Glowing laser linear gradients with rich industrial palette */}
          <linearGradient id="trunkGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF9900" stopOpacity="0.85" />
            <stop offset="30%" stopColor="#00E5FF" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#FF5500" stopOpacity="0.85" />
            <stop offset="80%" stopColor="#00FF88" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FF9900" stopOpacity="0.9" />
          </linearGradient>

          <filter id="laserBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="packetGlow">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="35%" stopColor="#FFB703" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#FF9900" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FF5500" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* --- MAIN ROOT CONDUIT (Hero -> Engine) --- */}
        <path
          d="M 600 120 L 600 700"
          stroke="url(#trunkGlow)"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#laserBlur)"
          opacity="0.75"
        />

        {/* --- FORK 1: V8 ENGINE SPLIT (Y: 700 -> 1420) --- */}
        {/* Left Branch (Kahn Topological Sorter - Radar Cyan) */}
        <path
          d="M 600 700 C 600 820, 280 880, 280 1060 C 280 1240, 580 1300, 600 1420"
          stroke="#00E5FF"
          strokeWidth="2.5"
          strokeDasharray="8 5"
          filter="url(#laserBlur)"
          opacity={isFork1 ? "0.9" : "0.4"}
        />
        {/* Right Branch (V8 Isolated Sandbox - Acid Emerald) */}
        <path
          d="M 600 700 C 600 820, 920 880, 920 1060 C 920 1240, 620 1300, 600 1420"
          stroke="#00FF88"
          strokeWidth="2.5"
          strokeDasharray="8 5"
          filter="url(#laserBlur)"
          opacity={isFork1 ? "0.9" : "0.4"}
        />

        {/* Junction Diode 1 (Split Point at 700) */}
        <circle cx="600" cy="700" r="8" fill="#070A0F" stroke="#00E5FF" strokeWidth="2.5" />
        <circle cx="600" cy="700" r="3.5" fill="#00E5FF" />

        {/* Junction Diode 1 (Merge Point at 1420) */}
        <circle cx="600" cy="1420" r="8" fill="#070A0F" stroke="#00FF88" strokeWidth="2.5" />
        <circle cx="600" cy="1420" r="3.5" fill="#00FF88" />

        {/* --- TRUNK 2: (Engine -> Telemetry Cockpit Y: 1420 -> 2100) --- */}
        <path
          d="M 600 1420 L 600 2100"
          stroke="#FF9900"
          strokeWidth="3.5"
          filter="url(#laserBlur)"
          opacity="0.75"
        />

        {/* --- FORK 2: 4-WAY TEMPLATE FAN-OUT (Y: 2100 -> 2950) --- */}
        {/* Branch 1: DevOps & SRE (Safety Orange #FF5500) */}
        <path
          d="M 600 2100 C 600 2250, 180 2350, 180 2525 C 180 2700, 560 2820, 600 2950"
          stroke="#FF5500"
          strokeWidth="2.5"
          filter="url(#laserBlur)"
          opacity={isFork2 ? "0.9" : "0.35"}
        />
        {/* Branch 2: AI & LLM Pipelines (Radar Cyan #00E5FF) */}
        <path
          d="M 600 2100 C 600 2250, 420 2350, 420 2525 C 420 2700, 580 2820, 600 2950"
          stroke="#00E5FF"
          strokeWidth="2.5"
          filter="url(#laserBlur)"
          opacity={isFork2 ? "0.9" : "0.35"}
        />
        {/* Branch 3: High-Scale Data ETL (Acid Emerald #00FF88) */}
        <path
          d="M 600 2100 C 600 2250, 780 2350, 780 2525 C 780 2700, 620 2820, 600 2950"
          stroke="#00FF88"
          strokeWidth="2.5"
          filter="url(#laserBlur)"
          opacity={isFork2 ? "0.9" : "0.35"}
        />
        {/* Branch 4: Security & Webhooks (Cyber Gold #FF9900) */}
        <path
          d="M 600 2100 C 600 2250, 1020 2350, 1020 2525 C 1020 2700, 640 2820, 600 2950"
          stroke="#FF9900"
          strokeWidth="2.5"
          filter="url(#laserBlur)"
          opacity={isFork2 ? "0.9" : "0.35"}
        />

        {/* Junction Diode 2 (4-way Split at 2100) */}
        <circle cx="600" cy="2100" r="9" fill="#070A0F" stroke="#FF9900" strokeWidth="2.5" />
        <circle cx="600" cy="2100" r="4" fill="#FFB703" />

        {/* Junction Diode 2 (Re-Fusion at 2950) */}
        <circle cx="600" cy="2950" r="9" fill="#070A0F" stroke="#00FF88" strokeWidth="2.5" />
        <circle cx="600" cy="2950" r="4" fill="#00FF88" />

        {/* --- FINAL CONDUIT: (Templates -> Studio CTA Y: 2950 -> 3480) --- */}
        <path
          d="M 600 2950 L 600 3480"
          stroke="#00FF88"
          strokeWidth="4"
          filter="url(#laserBlur)"
          opacity="0.85"
        />

        {/* --- DYNAMIC PHOTON PACKETS (SMOOTH SCROLL PHYSICS) --- */}

        {/* 1. Single Main Packet on Trunk (When not in any fork) */}
        {!isFork1 && !isFork2 && (
          <g transform={`translate(600, ${packetY})`}>
            <circle cx="0" cy="0" r="32" fill="url(#packetGlow)" opacity="0.65" />
            <ellipse
              cx="0"
              cy={-packetVelocity * 7}
              rx="4.5"
              ry={6 + packetVelocity * 10}
              fill="#FFFFFF"
              filter="url(#laserBlur)"
            />
            <circle cx="0" cy="0" r="5.5" fill="#FFFFFF" />
          </g>
        )}

        {/* 2. Fork 1: Smoothly dividing into 2 child packets based on scroll progress */}
        {isFork1 && (
          <>
            {/* Left Child Packet (Cyan) */}
            <g transform={`translate(${f1LeftX}, ${packetY})`}>
              <circle cx="0" cy="0" r="24" fill="#00E5FF" opacity="0.4" filter="url(#laserBlur)" />
              <ellipse
                cx="0"
                cy={-packetVelocity * 6}
                rx="4"
                ry={5 + packetVelocity * 8}
                fill="#FFFFFF"
              />
              <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
            </g>
            {/* Right Child Packet (Emerald) */}
            <g transform={`translate(${f1RightX}, ${packetY})`}>
              <circle cx="0" cy="0" r="24" fill="#00FF88" opacity="0.4" filter="url(#laserBlur)" />
              <ellipse
                cx="0"
                cy={-packetVelocity * 6}
                rx="4"
                ry={5 + packetVelocity * 8}
                fill="#FFFFFF"
              />
              <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
            </g>
          </>
        )}

        {/* 3. Fork 2: Smoothly dividing into 4 child packets along curves as user scrolls */}
        {isFork2 && (
          <>
            {/* Child 1: Safety Orange (DevOps) */}
            <g transform={`translate(${b1X}, ${packetY})`}>
              <circle cx="0" cy="0" r="22" fill="#FF5500" opacity="0.45" filter="url(#laserBlur)" />
              <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
            </g>
            {/* Child 2: Radar Cyan (AI) */}
            <g transform={`translate(${b2X}, ${packetY})`}>
              <circle cx="0" cy="0" r="22" fill="#00E5FF" opacity="0.45" filter="url(#laserBlur)" />
              <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
            </g>
            {/* Child 3: Acid Emerald (Data ETL) */}
            <g transform={`translate(${b3X}, ${packetY})`}>
              <circle cx="0" cy="0" r="22" fill="#00FF88" opacity="0.45" filter="url(#laserBlur)" />
              <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
            </g>
            {/* Child 4: Cyber Gold (Security) */}
            <g transform={`translate(${b4X}, ${packetY})`}>
              <circle cx="0" cy="0" r="22" fill="#FF9900" opacity="0.45" filter="url(#laserBlur)" />
              <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
            </g>
          </>
        )}
      </svg>
    </div>
  );
};
