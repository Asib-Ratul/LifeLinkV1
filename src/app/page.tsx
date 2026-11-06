"use client";

import React from "react";
import { DirectionB_ModernHealthSaaS } from "@/components/directions/DirectionB_ModernHealthSaaS";
import { RoleSwitcher } from "@/components/ui/RoleSwitcher";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <RoleSwitcher />
      <DirectionB_ModernHealthSaaS />
    </main>
  );
}
