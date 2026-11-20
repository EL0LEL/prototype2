/**
 * TabPersediaan.jsx
 * Pintu masuk Tab 4: Persediaan dengan sub-menu ribbon:
 * (1) Pecah Satuan Dus, (2) Stok Opname Fisik, (3) Log Mutasi Stok.
 */

import React, { useState } from 'react';
import { PecahSatuanDus } from './PecahSatuanDus';
import { StokOpnameFisik } from './StokOpnameFisik';
import { LogMutasiStok } from './LogMutasiStok';
import { Split, ClipboardCheck, History } from 'lucide-react';

export const TabPersediaan = () => {
  const [subTab, setSubTab] = useState('pecah');

  const SUB_MENUS = [
    { id: 'pecah', label: 'Pecah Satuan Dus (Konversi Eceran)', icon: Split },
    { id: 'opname', label: 'Stok Opname Fisik & Audit', icon: ClipboardCheck },
    { id: 'mutasi', label: 'Log Mutasi & Kartu Stok', icon: History },
  ];

  return (
    <div className="h-full w-full flex flex-col">
      <div className="px-8 pt-1 pb-4 flex items-center gap-2 shrink-0 overflow-x-auto">
        {SUB_MENUS.map((menu) => {
          const Icon = menu.icon;
          const isCurrent = subTab === menu.id;
          return (
            <button
              key={menu.id}
              onClick={() => setSubTab(menu.id)}
              className={`flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full text-[13px] font-medium transition shrink-0 ${
                isCurrent
                  ? 'bg-[#161512] text-white'
                  : 'bg-white text-[#4a463f] border border-[#ece4d6] hover:border-[#161512]'
              }`}
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center ${isCurrent ? 'bg-white/15' : 'bg-[#f4eee4]'}`}><Icon size={14} /></span>
              <span>{menu.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-auto px-8 pb-6 pt-1">
        {subTab === 'pecah' && <PecahSatuanDus />}
        {subTab === 'opname' && <StokOpnameFisik />}
        {subTab === 'mutasi' && <LogMutasiStok />}
      </div>
    </div>
  );
};
