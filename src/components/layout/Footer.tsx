"use client";

import React from "react";
import Link from "next/link";
import { Activity, ShieldCheck, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F172A] text-[#94A3B8] py-12 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2 text-white font-extrabold text-xl">
            <Activity className="w-5 h-5 text-[#087E8B]" />
            <span>Life<span className="text-[#087E8B]">Link</span></span>
          </div>
          <p className="text-[#94A3B8] text-xs leading-relaxed max-w-md">
            LifeLink is an academic demonstration project. Data shown is fictional. Demo actions are stored in this browser only; there is no sign-in, hospital connection, donor alert, or clinical service. Do not use for actual medical emergencies or clinical decisions.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-3">Platform Navigation</h4>
          <ul className="space-y-2">
            <li><Link href="/doctors" className="hover:text-white transition">Find Doctors</Link></li>
            <li><Link href="/hospitals" className="hover:text-white transition">Hospital Directory</Link></li>
            <li><Link href="/queue/apt-10492" className="hover:text-white transition">Live Queue Tracker</Link></li>
            <li><Link href="/blood" className="hover:text-white transition">Emergency Blood Network</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-3">Demo Details</h4>
          <ul className="space-y-2 text-[#94A3B8]">
            <li><span>Location: Dhaka, Bangladesh</span></li>
            <li><span>Stack: Next.js + React + Tailwind CSS</span></li>
            <li className="text-teal-400 font-semibold"><span>Design: Direction B — Modern Health SaaS</span></li>
            <li><span className="text-slate-500">Non-commercial prototype</span></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 flex flex-col sm:flex-row items-center justify-between text-[#64748B]">
        <div>© 2026 LifeLink Academic Demonstration Project.</div>
        <div className="flex items-center gap-1 text-[11px]">
          <span>Built for Dhaka Healthcare Access Demo</span>
        </div>
      </div>
    </footer>
  );
};
