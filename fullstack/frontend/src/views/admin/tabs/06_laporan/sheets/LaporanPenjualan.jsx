/**
 * sheets/LaporanPenjualan.jsx
 * Lembar dokumen cetak Laporan Penjualan Toko Rina 2.
 */

import React from 'react';
import { formatRupiah } from '../../../../../utils/currencyFormatter';
import { APP_CONFIG } from '../../../../../config/appConstants';

export const LaporanPenjualan = ({ subReport }) => {
  const dummyRows = [
    { no: '1', doc: '#JL-20261119-001', time: '09:15', cust: 'Pelanggan Umum', method: 'CASH', total: 126000, margin: 25000 },
    { no: '2', doc: '#JL-20261119-002', time: '09:42', cust: 'Warung Bu Siti', method: 'TEMPO', total: 485000, margin: 95000 },
    { no: '3', doc: '#JL-20261119-003', time: '10:05', cust: 'Pak Haji Rohim', method: 'QRIS', total: 210000, margin: 42000 },
  ];

  const totalOmset = dummyRows.reduce((a, b) => a + b.total, 0);
  const totalMargin = dummyRows.reduce((a, b) => a + b.margin, 0);

  return (
    <div className="space-y-4">
      {/* Header Dokumen Laporan Resmi */}
      <div className="border-b-2 border-[#ddd3c2] pb-3 text-center">
        <h2 className="font-extrabold text-base uppercase text-[#1b1a17] tracking-wider">{APP_CONFIG.STORE_NAME}</h2>
        <p className="text-[11px] text-[#6d675d]">{APP_CONFIG.STORE_ADDRESS}</p>
        <h3 className="text-sm font-bold text-[#1a827a] mt-2 uppercase">Laporan Rekapitulasi Penjualan</h3>
        <p className="text-[10px] text-[#6d675d]">Periode: 19 November 2026 • Dicetak oleh: Administrator</p>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead className="bg-[#f4eee4] text-[#4a453f] border-y border-[#ddd3c2]">
          <tr>
            <th className="p-2">No</th>
            <th className="p-2">No. Bon Faktur</th>
            <th className="p-2">Waktu</th>
            <th className="p-2">Pelanggan</th>
            <th className="p-2">Metode</th>
            <th className="p-2 text-right">Nilai Transaksi</th>
            <th className="p-2 text-right">Estimasi Laba</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#ece4d6] text-[#2f2c28]">
          {dummyRows.map((r) => (
            <tr key={r.no}>
              <td className="p-2 text-[#738876]">{r.no}</td>
              <td className="p-2 font-mono text-[#2d884c] font-semibold">{r.doc}</td>
              <td className="p-2">{r.time}</td>
              <td className="p-2">{r.cust}</td>
              <td className="p-2 font-mono text-[10px]">{r.method}</td>
              <td className="p-2 text-right font-medium">{formatRupiah(r.total)}</td>
              <td className="p-2 text-right text-[#2d884c] font-semibold">{formatRupiah(r.margin)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="border-t-2 border-[#ddd3c2] font-bold text-[#1b1a17] bg-[#f4eee4]">
          <tr>
            <td colSpan={5} className="p-2.5 text-right uppercase">Total Penjualan:</td>
            <td className="p-2.5 text-right text-[#1a827a]">{formatRupiah(totalOmset)}</td>
            <td className="p-2.5 text-right text-[#2d884c]">{formatRupiah(totalMargin)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
