/**
 * GrafikSalesTrend.jsx
 * Visualisasi grafik tren omset penjualan 7 hari terakhir (CSS Bar Chart).
 */

import React from 'react';
import { formatRupiah } from '../../../../utils/currencyFormatter';
import { Calendar } from 'lucide-react';

export const GrafikSalesTrend = () => {
  const salesDays = [
    { day: 'Kamis (13/11)', omset: 4500000, height: '55%' },
    { day: 'Jumat (14/11)', omset: 5200000, height: '65%' },
    { day: 'Sabtu (15/11)', omset: 7800000, height: '95%' },
    { day: 'Minggu (16/11)', omset: 8200000, height: '100%' },
    { day: 'Senin (17/11)', omset: 4100000, height: '50%' },
    { day: 'Selasa (18/11)', omset: 6300000, height: '78%' },
    { day: 'Rabu (19/11)', omset: 6800000, height: '84%' },
  ];

  return (
    <div className="bg-[#ffffff] border border-[#ece4d6] rounded-2xl p-4 space-y-4">
      <div className="flex items-center justify-between border-b border-[#ece4d6] pb-2">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-[#1a827a]" />
          <h3 className="font-bold text-sm text-[#1b1a17]">Tren Omset Penjualan 7 Hari Terakhir</h3>
        </div>
        <span className="text-[11px] text-[#2d884c] font-semibold">Puncak Tertinggi: Minggu (Rp 8.2 Jt)</span>
      </div>

      {/* Bar Chart Container */}
      <div className="h-44 flex items-end justify-between gap-2 pt-4 px-2">
        {salesDays.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
            <span className="text-[10px] text-[#6d675d] opacity-0 group-hover:opacity-100 transition font-mono">
              {formatRupiah(item.omset, false)}
            </span>
            <div
              style={{ height: item.height }}
              className="w-full max-w-[42px] bg-[#d4cdf6] hover:bg-[#161512] rounded-t-xl transition-colors"
            />
            <span className="text-[10px] text-[#6d675d] text-center truncate w-full">{item.day.split(' ')[0]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
