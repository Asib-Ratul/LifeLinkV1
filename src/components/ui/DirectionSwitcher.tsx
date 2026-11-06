"use client";

import React from "react";
import { Check, Info, Sparkles, LayoutGrid, Stethoscope } from "lucide-react";

export type DirectionId = "direction-a" | "direction-b" | "direction-c";

interface DirectionSwitcherProps {
  activeDirection: DirectionId;
  onSelectDirection: (direction: DirectionId) => void;
}

export const DirectionSwitcher: React.FC<DirectionSwitcherProps> = ({
  activeDirection,
  onSelectDirection,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-800 px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center font-bold text-slate-950 text-lg">
            L
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-tight">LifeLink</span>
              <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs px-2 py-0.5 rounded-full font-medium">
                Phase 1: Design Switcher
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Select one visual direction to lock the LifeLink Design System
            </p>
          </div>
        </div>

        {/* Center direction tabs */}
        <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700 w-full md:w-auto overflow-x-auto">
          <button
            onClick={() => onSelectDirection("direction-a")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeDirection === "direction-a"
                ? "bg-slate-100 text-slate-900 shadow-sm"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Direction A</span>
            <span className="opacity-75 font-normal">Clinical Minimal</span>
          </button>

          <button
            onClick={() => onSelectDirection("direction-b")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeDirection === "direction-b"
                ? "bg-teal-500 text-slate-950 shadow-sm font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direction B</span>
            <span className="bg-teal-900/40 text-teal-200 text-[10px] px-1.5 py-0.5 rounded font-normal">
              Recommended SaaS
            </span>
          </button>

          <button
            onClick={() => onSelectDirection("direction-c")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeDirection === "direction-c"
                ? "bg-slate-100 text-slate-900 shadow-sm"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Direction C</span>
            <span className="opacity-75 font-normal">Compact Health</span>
          </button>
        </div>

        {/* Right status info */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400">
          <Info className="w-4 h-4 text-teal-400" />
          <span>Fictional Dhaka Demo Data</span>
        </div>
      </div>
    </header>
  );
};
