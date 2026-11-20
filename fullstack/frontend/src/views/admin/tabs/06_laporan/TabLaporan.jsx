/**
 * TabLaporan.jsx
 * Pintu masuk Tab 6: Pusat Laporan Resmi iPOS 5 Toko Rina 2 (19 Laporan).
 */

import React, { useState } from 'react';
import { SelectorDropdownLaporan } from './SelectorDropdownLaporan';
import { LaporanPenjualan } from './sheets/LaporanPenjualan';
import { LaporanPembelian } from './sheets/LaporanPembelian';
import { LaporanPersediaan } from './sheets/LaporanPersediaan';
import { LaporanKasBank } from './sheets/LaporanKasBank';
import { Printer } from 'lucide-react';

export const TabLaporan = () => {
  const [activeCategory, setActiveCategory] = useState('PENJUALAN'); // PENJUALAN | PEMBELIAN | PERSEDIAAN | KAS_BANK
  const [activeSubReport, setActiveSubReport] = useState('rekap_harian');

  const handlePrintSheet = () => {
    window.print();
  };

  return (
    <div className="h-full w-full flex flex-col text-xs">
      {/* Bar Filter Laporan Atas */}
      <div className="p-3 bg-[#ffffff] border-b border-[#ece4d6] flex items-center justify-between gap-3 shrink-0">
        <SelectorDropdownLaporan
          category={activeCategory}
          subReport={activeSubReport}
          onSelectReport={(cat, sub) => {
            setActiveCategory(cat);
            setActiveSubReport(sub);
          }}
        />

        <button
          onClick={handlePrintSheet}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161512] hover:bg-[#161512] text-[#ffffff] font-semibold shadow transition"
        >
          <Printer size={14} /> Cetak Laporan Resmi
        </button>
      </div>

      {/* Lembar Dokumen Laporan (Printable Sheet) */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#f4eee4] flex justify-center">
        <div className="w-full max-w-4xl bg-[#fbf8f2] border border-[#ece4d6] rounded-2xl p-5 shadow-xl text-[#24221e]">
          {activeCategory === 'PENJUALAN' && <LaporanPenjualan subReport={activeSubReport} />}
          {activeCategory === 'PEMBELIAN' && <LaporanPembelian subReport={activeSubReport} />}
          {activeCategory === 'PERSEDIAAN' && <LaporanPersediaan subReport={activeSubReport} />}
          {activeCategory === 'KAS_BANK' && <LaporanKasBank subReport={activeSubReport} />}
        </div>
      </div>
    </div>
  );
};
