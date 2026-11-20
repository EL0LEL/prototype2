/**
 * RekomendasiRestokAI.jsx
 * Alarm rekomendasi restok cerdas barang yang stoknya mendekati batas minimum.
 */

import React from 'react';
import { AlertTriangle, ShoppingCart } from 'lucide-react';

export const RekomendasiRestokAI = () => {
  const lowStockItems = [
    { name: 'Minyak Goreng Bimoli 2L', sisa: 4, min: 20, saranRestok: '10 Dus', supplier: 'Distributor Minyak' },
    { name: 'Beras Pandan Wangi 5kg', sisa: 6, min: 25, saranRestok: '20 Karung', supplier: 'Beras Cianjur Jaya' },
    { name: 'Gula Pasir Gulaku 1kg', sisa: 8, min: 30, saranRestok: '5 Dus', supplier: 'Agen Gula' },
  ];

  return (
    <div className="bg-[#ffffff] border border-[#ece4d6] rounded-2xl p-4 space-y-3">
      <div className="flex items-center gap-2 border-b border-[#ece4d6] pb-2">
        <AlertTriangle size={16} className="text-[#996f21]" />
        <h3 className="font-bold text-sm text-[#1b1a17]">Alarm Prediksi Restok</h3>
      </div>

      <div className="space-y-2.5">
        {lowStockItems.map((item, idx) => (
          <div key={idx} className="p-2.5 rounded-lg bg-[#fbf8f2] border border-[#ece4d6] space-y-1">
            <div className="flex items-center justify-between font-semibold text-[#1b1a17]">
              <span className="truncate pr-1">{item.name}</span>
              <span className="text-[#9e3d25] text-xs font-bold shrink-0">{item.sisa} sisa</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#6d675d]">
              <span>Batas Min: {item.min}</span>
              <span className="text-[#21aa9d] font-medium">Saran Order: {item.saranRestok}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-2 bg-[#688a63]/30 hover:bg-[#688a63]/50 border border-[#7ea078]/40 text-[#36332e] font-semibold rounded-lg flex items-center justify-center gap-1.5 transition text-xs">
        <ShoppingCart size={13} /> Buat Draft Pesanan Supplier Otomatis
      </button>
    </div>
  );
};
