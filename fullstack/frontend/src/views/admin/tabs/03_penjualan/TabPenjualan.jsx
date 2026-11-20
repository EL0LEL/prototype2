/**
 * TabPenjualan.jsx
 * Pintu masuk Tab 3: Penjualan dengan sub-menu ribbon:
 * (1) Layar Kasir POS, (2) Daftar Bon Faktur Jual, (3) Antrean Nota Salesman HP, (4) Pelunasan Piutang.
 */

import React, { useState } from 'react';
import { LayarKasirPos } from './LayarKasirPos';
import { DaftarFakturJual } from './DaftarFakturJual';
import { AntreanNotaSales } from './AntreanNotaSales';
import { BayarPiutangUsaha } from './BayarPiutangUsaha';
import { ShoppingCart, Receipt, Smartphone, HandCoins } from 'lucide-react';
import { useSync } from '../../../../contexts/SyncContext';

export const TabPenjualan = () => {
  const [subTab, setSubTab] = useState('kasir');
  const { pendingOrderCount } = useSync();

  const SUB_MENUS = [
    { id: 'kasir', label: 'Layar Kasir POS', icon: ShoppingCart },
    { id: 'riwayat', label: 'Daftar Faktur Penjualan (Bon)', icon: Receipt },
    { id: 'antrean', label: 'Antrean Nota Salesman HP', icon: Smartphone, badge: pendingOrderCount },
    { id: 'piutang', label: 'Pelunasan Piutang Pelanggan', icon: HandCoins },
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
              {menu.badge > 0 && (
                <span className="bg-[#30d5c8] text-[#07322f] text-[10px] font-bold px-1.5 rounded-full">
                  {menu.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-hidden px-8 pb-6 pt-1">
        {subTab === 'kasir' && <LayarKasirPos />}
        {subTab === 'riwayat' && <DaftarFakturJual />}
        {subTab === 'antrean' && <AntreanNotaSales onProcessToCart={() => setSubTab('kasir')} />}
        {subTab === 'piutang' && <BayarPiutangUsaha />}
      </div>
    </div>
  );
};
