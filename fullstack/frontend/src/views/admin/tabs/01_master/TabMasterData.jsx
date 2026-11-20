/**
 * TabMasterData.jsx
 * Pintu masuk Tab 1: Master Data dengan sub-menu ribbon:
 * (1) Katalog Produk, (2) Input Item F2, (3) Satuan Multi-UOM, (4) Pelanggan, (5) Supplier.
 */

import React, { useState } from 'react';
import { DaftarItemProduk } from './DaftarItemProduk';
import { FormInputItemBaru } from './FormInputItemBaru';
import { SatuanMultiUom } from './SatuanMultiUom';
import { DataPelanggan } from './DataPelanggan';
import { DataSupplier } from './DataSupplier';
import { Package, PlusCircle, Layers, Users, Truck } from 'lucide-react';

export const TabMasterData = () => {
  const [subTab, setSubTab] = useState('katalog'); // 'katalog' | 'tambah' | 'satuan' | 'pelanggan' | 'supplier'

  const SUB_MENUS = [
    { id: 'katalog', label: 'Daftar Item & Katalog', icon: Package },
    { id: 'tambah', label: 'Tambah Item Baru (F2)', icon: PlusCircle },
    { id: 'satuan', label: 'Konfigurasi Multi-UOM', icon: Layers },
    { id: 'pelanggan', label: 'Data Pelanggan', icon: Users },
    { id: 'supplier', label: 'Data Supplier', icon: Truck },
  ];

  return (
    <div className="h-full w-full flex flex-col">
      {/* Sub Ribbon Bar */}
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

      {/* Konten Sub Menu */}
      <div className="flex-1 overflow-auto px-8 pb-6 pt-1">
        {subTab === 'katalog' && <DaftarItemProduk onOpenTambahItem={() => setSubTab('tambah')} />}
        {subTab === 'tambah' && <FormInputItemBaru onDone={() => setSubTab('katalog')} />}
        {subTab === 'satuan' && <SatuanMultiUom />}
        {subTab === 'pelanggan' && <DataPelanggan />}
        {subTab === 'supplier' && <DataSupplier />}
      </div>
    </div>
  );
};
