/**
 * TabPembelian.jsx
 * Pintu masuk Tab 2: Pembelian dengan sub-menu ribbon:
 * (1) Form Faktur Beli, (2) Riwayat Faktur Beli, (3) Bayar Hutang Usaha, (4) Retur Pembelian.
 */

import React, { useState } from 'react';
import { FormFakturBeli } from './FormFakturBeli';
import { DaftarFakturBeli } from './DaftarFakturBeli';
import { BayarHutangUsaha } from './BayarHutangUsaha';
import { ReturPembelian } from './ReturPembelian';
import { FilePlus, FileText, CreditCard, RotateCcw } from 'lucide-react';

export const TabPembelian = () => {
  const [subTab, setSubTab] = useState('input');

  const SUB_MENUS = [
    { id: 'input', label: 'Input Faktur Beli (Faktur Masuk)', icon: FilePlus },
    { id: 'riwayat', label: 'Daftar Faktur Beli Supplier', icon: FileText },
    { id: 'hutang', label: 'Pelunasan Hutang Usaha', icon: CreditCard },
    { id: 'retur', label: 'Retur Pembelian Barang Rusak', icon: RotateCcw },
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
        {subTab === 'input' && <FormFakturBeli onSaved={() => setSubTab('riwayat')} />}
        {subTab === 'riwayat' && <DaftarFakturBeli onOpenInput={() => setSubTab('input')} />}
        {subTab === 'hutang' && <BayarHutangUsaha />}
        {subTab === 'retur' && <ReturPembelian />}
      </div>
    </div>
  );
};
