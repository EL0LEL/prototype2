/**
 * ReturPembelian.jsx
 * Form retur pengembalian barang rusak / bocor / expired ke supplier distributor.
 */

import React, { useState } from 'react';
import { formatRupiah } from '../../../../utils/currencyFormatter';
import { RotateCcw, Send } from 'lucide-react';

export const ReturPembelian = () => {
  const [supplier, setSupplier] = useState('PT Indofood Sukses Makmur');
  const [barang, setBarang] = useState('Indomie Goreng Original (Dus Remuk)');
  const [qtyRetur, setQtyRetur] = useState(2);
  const [alasan, setAlasan] = useState('Kemasan dus basah dan remuk saat pengiriman');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Retur barang "${barang}" sebanyak ${qtyRetur} berhasil dicatat dan memotong hutang supplier!`);
  };

  return (
    <div className="max-w-xl mx-auto space-y-4 text-xs">
      <div className="bg-[#ffffff] p-3 rounded-lg border border-[#ece4d6] flex items-center gap-2">
        <RotateCcw className="text-[#9e3d25]" size={18} />
        <div>
          <h3 className="font-bold text-sm text-[#1b1a17]">Form Retur Pembelian Barang Rusak</h3>
          <p className="text-[#6d675d]">Pengembalian barang cacat untuk pemotongan tagihan atau klaim ganti baru.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 bg-[#ffffff] border border-[#ece4d6] p-4 rounded-2xl">
        <div>
          <label className="text-[#4a453f] block mb-1">Supplier Tujuan</label>
          <input
            type="text"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            className="w-full bg-[#fbf8f2] border border-[#ddd3c2] rounded-lg p-2 text-[#1b1a17]"
          />
        </div>
        <div>
          <label className="text-[#4a453f] block mb-1">Nama Barang & Kondisi</label>
          <input
            type="text"
            value={barang}
            onChange={(e) => setBarang(e.target.value)}
            className="w-full bg-[#fbf8f2] border border-[#ddd3c2] rounded-lg p-2 text-[#1b1a17]"
          />
        </div>
        <div>
          <label className="text-[#4a453f] block mb-1">Jumlah Retur (Dus/Pcs)</label>
          <input
            type="number"
            value={qtyRetur}
            onChange={(e) => setQtyRetur(e.target.value)}
            className="w-full bg-[#fbf8f2] border border-[#ddd3c2] rounded-lg p-2 text-[#1b1a17] font-bold"
          />
        </div>
        <div>
          <label className="text-[#4a453f] block mb-1">Alasan Retur</label>
          <textarea
            rows={2}
            value={alasan}
            onChange={(e) => setAlasan(e.target.value)}
            className="w-full bg-[#fbf8f2] border border-[#ddd3c2] rounded-lg p-2 text-[#1b1a17]"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-[#b24b35] hover:bg-[#cc6149] text-[#1b1a17] font-semibold rounded-lg flex items-center justify-center gap-1.5 transition"
        >
          <Send size={13} /> Kirim Form Retur Pembelian
        </button>
      </form>
    </div>
  );
};
