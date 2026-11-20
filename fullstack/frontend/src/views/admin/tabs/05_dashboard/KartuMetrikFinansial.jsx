/**
 * KartuMetrikFinansial.jsx
 * 4 Kartu KPI Utama Finansial Toko Rina 2.
 */

import React from 'react';
import { formatRupiah } from '../../../../utils/currencyFormatter';
import { TrendingUp, DollarSign, Wallet, PackageCheck } from 'lucide-react';

export const KartuMetrikFinansial = () => {
  const metrics = [
    { title: 'Total Omset Penjualan', value: 42850000, subtitle: '+12.5% vs bulan lalu', icon: TrendingUp, color: 'text-[#1a827a]', border: 'border-[#b5e3e0]/60' },
    { title: 'Total Modal Pokok (HPP)', value: 34200000, subtitle: 'Beban pembelian barang', icon: DollarSign, color: 'text-[#996f21]', border: 'border-[#e3d2b5]/60' },
    { title: 'Estimasi Laba Bersih', value: 8650000, subtitle: 'Margin laba 20.2%', icon: Wallet, color: 'text-[#2d884c]', border: 'border-[#b5e3c8]/60' },
    { title: 'Total Nilai Aset Stok', value: 128500000, subtitle: 'Total 240 SKU aktif', icon: PackageCheck, color: 'text-[#8e722f]', border: 'border-[#e6ddcf]/60' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div key={idx} className={`bg-[#ffffff] border ${m.border} p-4 rounded-2xl space-y-2`}>
            <div className="flex items-center justify-between text-[#6d675d] text-xs">
              <span>{m.title}</span>
              <Icon size={16} className={m.color} />
            </div>
            <div className="text-xl font-black text-[#1b1a17]">{formatRupiah(m.value)}</div>
            <div className="text-[11px] text-[#6d675d]">{m.subtitle}</div>
          </div>
        );
      })}
    </div>
  );
};
