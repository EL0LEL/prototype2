/**
 * sheets/LaporanPersediaan.jsx
 * Lembar dokumen cetak Laporan Aset Stok & Hasil Opname.
 */

import React from 'react';
import { formatRupiah } from '../../../../../utils/currencyFormatter';
import { APP_CONFIG } from '../../../../../config/appConstants';

export const LaporanPersediaan = () => {
  const stockRows = [
    { no: '1', code: '8992345678901', name: 'Beras Pandan Wangi 5kg', qty: 45, unit: 'KARUNG', hpp: 65000, subtotal: 2925000 },
    { no: '2', code: '8991234567892', name: 'Minyak Goreng Bimoli 2L', qty: 120, unit: 'POUCH', hpp: 31000, subtotal: 3720000 },
    { no: '3', code: '8993456789012', name: 'Gula Pasir Gulaku 1kg', qty: 80, unit: 'BKS', hpp: 14500, subtotal: 1160000 },
  ];

  const totalValuasi = stockRows.reduce((a, b) => a + b.subtotal, 0);

  return (
    <div className="space-y-4">
      <div className="border-b-2 border-[#ddd3c2] pb-3 text-center">
        <h2 className="font-extrabold text-base uppercase text-[#1b1a17]">{APP_CONFIG.STORE_NAME}</h2>
        <h3 className="text-sm font-bold text-[#1a827a] mt-1 uppercase">Laporan Valuasi Nilai Persediaan Stok Toko</h3>
      </div>
      <table className="w-full text-left border-collapse text-xs">
        <thead className="bg-[#f4eee4] text-[#4a453f] border-y border-[#ddd3c2]">
          <tr>
            <th className="p-2">No</th>
            <th className="p-2">Barcode</th>
            <th className="p-2">Nama Barang</th>
            <th className="p-2 text-center">Sisa Stok</th>
            <th className="p-2">Satuan</th>
            <th className="p-2 text-right">HPP Modal</th>
            <th className="p-2 text-right">Nilai Aset</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#ece4d6] text-[#2f2c28]">
          {stockRows.map((r) => (
            <tr key={r.no}>
              <td className="p-2 text-[#738876]">{r.no}</td>
              <td className="p-2 font-mono text-[#6d675d]">{r.code}</td>
              <td className="p-2 font-semibold text-[#1b1a17]">{r.name}</td>
              <td className="p-2 text-center font-bold text-[#21aa9d]">{r.qty}</td>
              <td className="p-2">{r.unit}</td>
              <td className="p-2 text-right">{formatRupiah(r.hpp)}</td>
              <td className="p-2 text-right font-bold text-[#2d884c]">{formatRupiah(r.subtotal)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="border-t-2 border-[#ddd3c2] font-bold text-[#1b1a17] bg-[#f4eee4]">
          <tr>
            <td colSpan={6} className="p-2.5 text-right uppercase">Total Valuasi Nilai Aset Stok:</td>
            <td className="p-2.5 text-right text-[#1a827a]">{formatRupiah(totalValuasi)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
