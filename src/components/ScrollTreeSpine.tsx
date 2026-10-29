import React, { useEffect, useState, useRef } from "react";

export const ScrollTreeSpine: React.FC = () => {
  const spineRef = useRef<HTMLDivElement>(null);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [packetVelocity, setPacketVelocity] = useState(0);
  const lastScrollRef = useRef(0);
  const lastTimeRef = useRef(Date.now());

  useEffect(() => {
    let animId: number;
    let target = 0;

    const handleScroll = () => {
      if (!spineRef.current) return;
      const rect = spineRef.current.getBoundingClientRect();
      if (rect.height <= 0) return;

      // Focal plane tracking: place packet right at the user's viewport focal line (45% from top of screen)
      const focalPx = -rect.top + window.innerHeight * 0.45;
      target = Math.min(Math.max(focalPx / rect.height, 0), 1);

      const now = Date.now();
      const dt = Math.max(now - lastTimeRef.current, 1);
      const dy = Math.abs(window.scrollY - lastScrollRef.current);
      setPacketVelocity(Math.min(dy / dt, 3.0));
      lastScrollRef.current = window.scrollY;
      lastTimeRef.current = now;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Responsive physics loop with zero lag (lerp factor 0.18 for smooth & responsive tracking)
    let current = 0;
    const updatePhysics = () => {
      current += (target - current) * 0.18;
      setSmoothProgress(current);
      animId = requestAnimationFrame(updatePhysics);
    };
    updatePhysics();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  const p = smoothProgress; // 0.0 to 1.0 across Sections 2-5

  // Total vertical viewBox: 2800 units
  const packetY = p * 2760 + 20;

  // Fork 1 (Engine Section): Y = 100 to 650 (p = 0.04 to 0.25)
  const isFork1 = p >= 0.04 && p <= 0.25;
  const fork1T = isFork1 ? (p - 0.04) / (0.25 - 0.04) : 0;
  const fork1Sine = Math.sin(fork1T * Math.PI);
  const f1LeftX = 600 - fork1Sine * 300;
  const f1RightX = 600 + fork1Sine * 300;

  // Fork 2 (Templates 4-Way Fan-out): Y = 1200 to 2150 (p = 0.42 to 0.78)
  const isFork2 = p >= 0.42 && p <= 0.78;
  const fork2T = isFork2 ? (p - 0.42) / (0.78 - 0.42) : 0;
  const fork2Sine = Math.sin(fork2T * Math.PI);
  const b1X = 600 - fork2Sine * 420; // 600 -> 180 -> 600 (DevOps Orange)
  const b2X = 600 - fork2Sine * 180; // 600 -> 420 -> 600 (AI Cyan)
  const b3X = 600 + fork2Sine * 180; // 600 -> 780 -> 600 (Data Emerald)
  const b4X = 600 + fork2Sine * 420; // 600 -> 1020 -> 600 (Security Gold)

  return (
    <div
      ref={spineRef}
      className="hidden md:block absolute inset-0 pointer-events-none z-0 overflow-hidden w-full h-full max-w-full"
    >
      <svg
        className="w-full h-full min-h-[2800px]"
        viewBox="0 0 1200 2800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="trunkGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#FF9900" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#FF5500" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#00FF88" stopOpacity="0.9" />
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
            <stop offset="30%" stopColor="#FFB703" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#FF5500" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF5500" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* --- INITIAL INLET INTO SECTION 2 (Y: 0 -> 100) --- */}
        <path
          d="M 600 0 L 600 100"
          stroke="#00E5FF"
          strokeWidth="3.5"
          filter="url(#laserBlur)"
          opacity="0.85"
        />

        {/* --- FORK 1: V8 ENGINE SPLIT (Y: 100 -> 650) --- */}
        {/* Left Branch (Kahn Topological Sorter - Cyan) */}
        <path
          d="M 600 100 C 600 200, 300 240, 300 375 C 300 510, 580 550, 600 650"
          stroke="#00E5FF"
          strokeWidth="3"
          strokeDasharray="8 5"
          filter="url(#laserBlur)"
          opacity={isFork1 ? "0.95" : "0.45"}
        />
        {/* Right Branch (V8 Isolated Sandbox - Emerald) */}
        <path
          d="M 600 100 C 600 200, 900 240, 900 375 C 900 510, 620 550, 600 650"
          stroke="#00FF88"
          strokeWidth="3"
          strokeDasharray="8 5"
          filter="url(#laserBlur)"
          opacity={isFork1 ? "0.95" : "0.45"}
        />

        {/* Junction Diode 1 (Split Point at 100) */}
        <circle cx="600" cy="100" r="9" fill="#070A0F" stroke="#00E5FF" strokeWidth="2.5" />
        <circle cx="600" cy="100" r="4" fill="#00E5FF" />

        {/* Junction Diode 1 (Merge Point at 650) */}
        <circle cx="600" cy="650" r="9" fill="#070A0F" stroke="#00FF88" strokeWidth="2.5" />
        <circle cx="600" cy="650" r="4" fill="#00FF88" />

        {/* --- TRUNK 2: (Engine -> Telemetry Cockpit Y: 650 -> 1200) --- */}
        <path
          d="M 600 650 L 600 1200"
          stroke="#FF9900"
          strokeWidth="4"
          filter="url(#laserBlur)"
          opacity="0.85"
        />

        {/* --- FORK 2: 4-WAY TEMPLATE FAN-OUT (Y: 1200 -> 2150) --- */}
        {/* Branch 1: DevOps & SRE (Safety Orange #FF5500) */}
        <path
          d="M 600 1200 C 600 1350, 180 1450, 180 1675 C 180 1900, 560 2000, 600 2150"
          stroke="#FF5500"
          strokeWidth="2.5"
          filter="url(#laserBlur)"
          opacity={isFork2 ? "0.95" : "0.4"}
        />
        {/* Branch 2: AI & LLM Systems (Radar Cyan #00E5FF) */}
        <path
          d="M 600 1200 C 600 1350, 420 1450, 420 1675 C 420 1900, 580 2000, 600 2150"
          stroke="#00E5FF"
          strokeWidth="2.5"
          filter="url(#laserBlur)"
          opacity={isFork2 ? "0.95" : "0.4"}
        />
        {/* Branch 3: High-Scale Data ETL (Acid Emerald #00FF88) */}
        <path
          d="M 600 1200 C 600 1350, 780 1450, 780 1675 C 780 1900, 620 2000, 600 2150"
          stroke="#00FF88"
          strokeWidth="2.5"
          filter="url(#laserBlur)"
          opacity={isFork2 ? "0.95" : "0.4"}
        />
        {/* Branch 4: Security & Webhooks (Cyber Gold #FF9900) */}
        <path
          d="M 600 1200 C 600 1350, 1020 1450, 1020 1675 C 1020 1900, 640 2000, 600 2150"
          stroke="#FF9900"
          strokeWidth="2.5"
          filter="url(#laserBlur)"
          opacity={isFork2 ? "0.95" : "0.4"}
        />

        {/* Junction Diode 2 (4-way Split at 1200) */}
        <circle cx="600" cy="1200" r="10" fill="#070A0F" stroke="#FF9900" strokeWidth="2.5" />
        <circle cx="600" cy="1200" r="4.5" fill="#FFB703" />

        {/* Junction Diode 2 (Re-Fusion at 2150) */}
        <circle cx="600" cy="2150" r="10" fill="#070A0F" stroke="#00FF88" strokeWidth="2.5" />
        <circle cx="600" cy="2150" r="4.5" fill="#00FF88" />

        {/* --- FINAL CONDUIT: (Templates -> Studio CTA Y: 2150 -> 2780) --- */}
        <path
          d="M 600 2150 L 600 2780"
          stroke="#00FF88"
          strokeWidth="4"
          filter="url(#laserBlur)"
          opacity="0.9"
        />

        {/* --- DYNAMIC PHOTON PACKETS (REAL-TIME FOCAL TRACKING) --- */}

        {/* 1. Single Main Packet on Trunk (When not in any fork) */}
        {!isFork1 && !isFork2 && (
          <g transform={`translate(600, ${packetY})`}>
            <circle cx="0" cy="0" r="34" fill="url(#packetGlow)" opacity="0.8" />
            <ellipse
              cx="0"
              cy={-packetVelocity * 9}
              rx="5"
              ry={7 + packetVelocity * 12}
              fill="#FFFFFF"
              filter="url(#laserBlur)"
            />
            <circle cx="0" cy="0" r="6" fill="#FFFFFF" />
          </g>
        )}

        {/* 2. Fork 1: Smoothly dividing into 2 child packets based on scroll progress */}
        {isFork1 && (
          <>
            <g transform={`translate(${f1LeftX}, ${packetY})`}>
              <circle cx="0" cy="0" r="26" fill="#00E5FF" opacity="0.5" filter="url(#laserBlur)" />
              <ellipse
                cx="0"
                cy={-packetVelocity * 8}
                rx="4.5"
                ry={6 + packetVelocity * 10}
                fill="#FFFFFF"
              />
              <circle cx="0" cy="0" r="5.5" fill="#FFFFFF" />
            </g>
            <g transform={`translate(${f1RightX}, ${packetY})`}>
              <circle cx="0" cy="0" r="26" fill="#00FF88" opacity="0.5" filter="url(#laserBlur)" />
              <ellipse
                cx="0"
                cy={-packetVelocity * 8}
                rx="4.5"
                ry={6 + packetVelocity * 10}
                fill="#FFFFFF"
              />
              <circle cx="0" cy="0" r="5.5" fill="#FFFFFF" />
            </g>
          </>
        )}

        {/* 3. Fork 2: Smoothly dividing into 4 child packets along curves as user scrolls */}
        {isFork2 && (
          <>
            {/* Child 1: Safety Orange (DevOps) */}
            <g transform={`translate(${b1X}, ${packetY})`}>
              <circle cx="0" cy="0" r="24" fill="#FF5500" opacity="0.55" filter="url(#laserBlur)" />
              <circle cx="0" cy="0" r="5.5" fill="#FFFFFF" />
            </g>
            {/* Child 2: Radar Cyan (AI) */}
            <g transform={`translate(${b2X}, ${packetY})`}>
              <circle cx="0" cy="0" r="24" fill="#00E5FF" opacity="0.55" filter="url(#laserBlur)" />
              <circle cx="0" cy="0" r="5.5" fill="#FFFFFF" />
            </g>
            {/* Child 3: Acid Emerald (Data ETL) */}
            <g transform={`translate(${b3X}, ${packetY})`}>
              <circle cx="0" cy="0" r="24" fill="#00FF88" opacity="0.55" filter="url(#laserBlur)" />
              <circle cx="0" cy="0" r="5.5" fill="#FFFFFF" />
            </g>
            {/* Child 4: Cyber Gold (Security) */}
            <g transform={`translate(${b4X}, ${packetY})`}>
              <circle cx="0" cy="0" r="24" fill="#FF9900" opacity="0.55" filter="url(#laserBlur)" />
              <circle cx="0" cy="0" r="5.5" fill="#FFFFFF" />
            </g>
          </>
        )}
      </svg>
    </div>
  );
};
