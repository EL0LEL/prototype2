/**
 * TabDashboardLaba.jsx
 * Pintu masuk utama Dashboard Monitoring Finansial & Restok Cerdas Toko Rina 2.
 */

import React from 'react';
import { KartuMetrikFinansial } from './KartuMetrikFinansial';
import { GrafikSalesTrend } from './GrafikSalesTrend';
import { RekomendasiRestokAI } from './RekomendasiRestokAI';
import { BarChart3 } from 'lucide-react';

export const TabDashboardLaba = () => {
  return (
    <div className="h-full w-full overflow-y-auto px-8 pb-6 pt-1 space-y-4 text-xs">
      {/* Header Dashboard */}
      <div className="flex items-center justify-between bg-[#ffffff] p-3.5 rounded-2xl border border-[#ece4d6]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#b24b35]/20 text-[#9e3d25] border border-[#cc6149]/30">
            <BarChart3 size={20} />
          </div>
          <div>
            <h2 className="font-bold text-base text-[#1b1a17]">Dashboard Finansial & Monitoring Laba Bersih</h2>
            <p className="text-[#6d675d] text-xs">Rekapitulasi omset, modal HPP, margin keuntungan, dan restok otomatis.</p>
          </div>
        </div>
        <div className="text-right text-[#6d675d] text-[11px]">
          Periode: <span className="text-[#1b1a17] font-semibold">Bulan Berjalan (November 2026)</span>
        </div>
      </div>

      {/* 1. Baris Kartu Metrik Finansial */}
      <KartuMetrikFinansial />

      {/* 2. Grid Dua Kolom: Grafik Tren Sales & Alarm Restok Cerdas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <GrafikSalesTrend />
        </div>
        <div className="lg:col-span-1">
          <RekomendasiRestokAI />
        </div>
      </div>
    </div>
  );
};
