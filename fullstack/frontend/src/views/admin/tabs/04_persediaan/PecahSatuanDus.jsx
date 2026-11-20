/**
 * PecahSatuanDus.jsx
 * Fitur konversi stok dari satuan induk (Dus/Karton) menjadi satuan eceran (Renceng/Pcs/Bks).
 */

import React, { useState } from 'react';
import { Split, ArrowRight, CheckCircle2 } from 'lucide-react';

export const PecahSatuanDus = () => {
  const [selectedItem, setSelectedItem] = useState('Indomie Goreng Original');
  const [qtyDus, setQtyDus] = useState(1);
  const conversionRate = 40; // 1 Dus = 40 Bungkus
  const targetSatuan = 'BKS';

  const hasilEceran = qtyDus * conversionRate;

  const handleConvert = (e) => {
    e.preventDefault();
    alert(`Berhasil memecah ${qtyDus} DUS ${selectedItem} menjadi ${hasilEceran} ${targetSatuan}! Stok komputer telah diperbarui.`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 text-xs">
      <div className="bg-[#ffffff] p-3 rounded-lg border border-[#ece4d6] flex items-center gap-2">
        <Split className="text-[#1a827a]" size={18} />
        <div>
          <h3 className="font-bold text-sm text-[#1b1a17]">Form Pecah Satuan Dus ke Satuan Eceran</h3>
          <p className="text-[#6d675d]">Mengurangi stok dus dan otomatis menambah stok eceran untuk barang yang dijual ecer.</p>
        </div>
      </div>

      <form onSubmit={handleConvert} className="bg-[#ffffff] border border-[#ece4d6] p-5 rounded-2xl space-y-4">
        <div>
          <label className="text-[#4a453f] block mb-1 font-semibold">Pilih Barang yang Akan Dipecah</label>
          <select
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            className="w-full bg-[#fbf8f2] border border-[#ddd3c2] rounded-lg p-2.5 text-[#1b1a17]"
          >
            <option>Indomie Goreng Original (1 Dus = 40 Bks)</option>
            <option>Minyak Goreng Bimoli 2L (1 Dus = 6 Pouch)</option>
            <option>Gula Pasir Gulaku 1kg (1 Dus = 24 Bks)</option>
            <option>Kopi Kapal Api Spesial (1 Dus = 12 Renceng = 120 Sachet)</option>
          </select>
        </div>

        <div className="grid grid-cols-5 gap-3 items-center bg-[#fbf8f2] p-4 rounded-2xl border border-[#ece4d6]">
          <div className="col-span-2 text-center">
            <label className="text-[#6d675d] block mb-1 text-[11px]">Jumlah Dus Dipecah</label>
            <input
              type="number"
              min={1}
              value={qtyDus}
              onChange={(e) => setQtyDus(Math.max(1, Number(e.target.value)))}
              className="w-24 text-center bg-[#f1eadf] border border-[#ddd3c2] rounded-lg py-1.5 text-[#1b1a17] font-bold text-base"
            />
            <span className="block text-[#738876] text-[10px] mt-1">Satuan: DUS</span>
          </div>

          <div className="col-span-1 flex justify-center text-[#1a827a]">
            <ArrowRight size={24} />
          </div>

          <div className="col-span-2 text-center">
            <label className="text-[#6d675d] block mb-1 text-[11px]">Stok Eceran Bertambah</label>
            <div className="text-2xl font-black text-[#2d884c] py-1">+{hasilEceran}</div>
            <span className="block text-[#6d675d] text-[10px] font-semibold">Satuan: {targetSatuan}</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-[#161512] hover:bg-[#161512] text-[#ffffff] font-bold rounded-lg flex items-center justify-center gap-2 shadow transition"
        >
          <CheckCircle2 size={15} /> Proses Konversi Pecah Satuan
        </button>
      </form>
    </div>
  );
};
