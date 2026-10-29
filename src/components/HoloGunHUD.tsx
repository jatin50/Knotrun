import React, { useState } from "react";
import { Zap, Crosshair } from "lucide-react";

interface HoloGunHUDProps {
  scrollProgress: number;
}

export const HoloGunHUD: React.FC<HoloGunHUDProps> = ({ scrollProgress }) => {
  // 3D Tilt Physics
  const [rotateX, setRotateX] = useState<number>(4);
  const [rotateY, setRotateY] = useState<number>(8);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Interactive controls
  const [isGimbalMode, setIsGimbalMode] = useState(false);
  const [isDischarging, setIsDischarging] = useState(false);
  const [dischargeCount, setDischargeCount] = useState(0);
  const [testCapacitorCharge, setTestCapacitorCharge] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 14;
    const rotY = ((x - centerX) / centerX) * 14;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(3);
    setRotateY(7);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleDischargeBurst = () => {
    setIsDischarging(true);
    setTestCapacitorCharge(100);

    setTimeout(() => {
      setTestCapacitorCharge(0);
      setDischargeCount((prev) => prev + 1);
      setTimeout(() => {
        setTestCapacitorCharge(null);
        setIsDischarging(false);
      }, 350);
    }, 450);
  };

  // Base scroll coil charge
  const scrollChargePct = Math.round(
    Math.min(Math.max((scrollProgress - 0.1) / 0.12, 0), 1) * 100
  );
  const displayedCharge = testCapacitorCharge !== null ? testCapacitorCharge : scrollChargePct;

  return (
    <div
      className="relative select-none pointer-events-auto"
      style={{
        perspective: 1200,
      }}
    >
      {/* 3D TILTED CARD WRAPPER */}
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${
            isHovered ? 1.025 : 1
          }, ${isHovered ? 1.025 : 1}, 1)`,
          transformStyle: "preserve-3d",
          transition: isHovered
            ? "transform 0.08s ease-out"
            : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
          willChange: "transform",
        }}
        className="relative w-[480px] max-w-[calc(100vw-2.5rem)] rounded-2xl p-6 bg-[#080C14]/92 border border-white/25 shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(255,153,0,0.25)] backdrop-blur-2xl overflow-hidden group"
      >
        {/* DYNAMIC SPECULAR LIGHT SHEEN */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, ${glarePos.opacity}) 0%, transparent 75%)`,
          }}
        />

        {/* CARBON MESH BACKGROUND */}
        <div
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)`,
            backgroundSize: "12px 12px",
          }}
        />

        {/* MACHINED HEX BOLTS */}
        <div className="pointer-events-none absolute top-3 left-3 flex items-center gap-1 opacity-60">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 border border-amber-600 shadow-sm" />
          <span className="text-[9px] font-mono tracking-widest text-slate-500">
            TURRET.STAGE-01
          </span>
        </div>
        <div className="pointer-events-none absolute top-3 right-3 flex items-center gap-1 opacity-60">
          <span className="text-[9px] font-mono tracking-widest text-slate-500">
            AZ: 38.4° / TRUNNION
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 border border-amber-600 shadow-sm" />
        </div>

        {/* ============================================================ */}
        {/* LAYER 1: FLOATING 3D HEADER (Z: 25px) */}
        {/* ============================================================ */}
        <div
          style={{ transform: "translateZ(25px)" }}
          className="space-y-3.5 border-b border-white/10 pb-4 relative z-20"
        >
          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400 font-bold">
                  STAGE 01 // LUNAR TITANIUM GAUSS LAUNCHER
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white font-['Space_Grotesk'] tracking-wide">
                Magnetic Particle Cannon
              </h2>
            </div>

            <span className="text-[10px] font-mono px-2.5 py-1 rounded font-bold bg-amber-500/20 text-amber-400 border border-amber-500/50 shadow-[0_0_12px_rgba(255,153,0,0.3)]">
              ARMED // 6-STAGE STATOR
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-normal">
            Aim the heavy dual-cheek turret assembly with your mouse cursor. Tilt this HUD card in 3D to inspect capacitor parameters, or discharge a test pulse.
          </p>
        </div>

        {/* ============================================================ */}
        {/* LAYER 2: INTERACTIVE STATOR COIL CHARGE BAR (Z: 35px) */}
        {/* ============================================================ */}
        <div
          style={{ transform: "translateZ(35px)" }}
          className="space-y-2 py-3 border-b border-white/10 relative z-20"
        >
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              STATOR CAPACITOR CHARGE
            </span>
            <span className="text-amber-400 font-bold text-xs">{displayedCharge}%</span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-black/60 overflow-hidden border border-white/15 p-0.5">
            <div
              className={`h-full rounded-full transition-all ${
                isDischarging ? "duration-100 bg-white shadow-[0_0_20px_#ffffff]" : "duration-150 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-300 shadow-[0_0_12px_#ff9900]"
              }`}
              style={{ width: `${displayedCharge}%` }}
            />
          </div>

          {/* 6 Individual Stator Indicators */}
          <div className="grid grid-cols-6 gap-1 pt-1">
            {[1, 2, 3, 4, 5, 6].map((stator) => {
              const active = displayedCharge >= stator * 16.6;
              return (
                <div
                  key={stator}
                  className={`py-1 text-center rounded text-[9px] font-mono transition-all ${
                    active
                      ? "bg-amber-500/30 text-amber-300 border border-amber-500/50 shadow-[0_0_8px_rgba(255,153,0,0.2)] font-bold"
                      : "bg-white/5 text-slate-600 border border-white/5"
                  }`}
                >
                  S-0{stator}
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* LAYER 3: INTERACTIVE CONTROLS (Z: 45px) */}
        {/* ============================================================ */}
        <div
          style={{ transform: "translateZ(45px)" }}
          className="pt-3 pb-2 flex items-center justify-between gap-3 relative z-20 text-xs font-mono"
        >
          {/* TEST FIRE BUTTON */}
          <button
            onClick={handleDischargeBurst}
            disabled={isDischarging}
            className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold text-[11px] flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,153,0,0.3)] active:scale-95 cursor-pointer disabled:opacity-60"
          >
            <Zap className={`w-3.5 h-3.5 ${isDischarging ? "animate-spin fill-black" : "fill-black"}`} />
            <span>
              {isDischarging
                ? "DISCHARGING 4.8 MJ..."
                : dischargeCount > 0
                ? `PULSE FIRED (${dischargeCount})`
                : "TEST DISCHARGE STATORS"}
            </span>
          </button>

          {/* GIMBAL / COAXIAL TOGGLE */}
          <button
            onClick={() => setIsGimbalMode(!isGimbalMode)}
            className={`py-2 px-3 rounded-xl border transition-all text-[11px] flex items-center gap-1.5 cursor-pointer ${
              isGimbalMode
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_12px_rgba(0,229,255,0.25)] font-bold"
                : "bg-white/5 text-slate-300 border-white/10 hover:border-white/20"
            }`}
          >
            <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isGimbalMode ? "GIMBAL ACTIVE" : "COAXIAL LOCK"}</span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* LAYER 4: BOTTOM TELEMETRY STRIP (Z: 25px) */}
        {/* ============================================================ */}
        <div
          style={{ transform: "translateZ(25px)" }}
          className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400 relative z-20"
        >
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Muzzle Coaxial Alignment: Verified
          </span>
          <span className="text-amber-400/90">Scroll down to launch &rarr;</span>
        </div>
      </div>
    </div>
  );
};
