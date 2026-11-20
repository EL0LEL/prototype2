/**
 * sheets/LaporanKasBank.jsx
 * Lembar dokumen cetak Laporan Buku Kas & Mutasi Bank Toko.
 */

import React from 'react';
import { formatRupiah } from '../../../../../utils/currencyFormatter';
import { APP_CONFIG } from '../../../../../config/appConstants';

export const LaporanKasBank = () => {
  const cashRows = [
    { no: '1', desc: 'Saldo Awal Kas Laci Pagi Hari', in: 200000, out: 0, balance: 200000 },
    { no: '2', desc: 'Penerimaan Penjualan Tunai Kasir POS', in: 1850000, out: 0, balance: 2050000 },
    { no: '3', desc: 'Pembayaran Uang Bensin & Parkir Bongkar Muat', in: 0, out: 50000, balance: 2000000 },
  ];

  return (
    <div className="space-y-4">
      <div className="border-b-2 border-[#ddd3c2] pb-3 text-center">
        <h2 className="font-extrabold text-base uppercase text-[#1b1a17]">{APP_CONFIG.STORE_NAME}</h2>
        <h3 className="text-sm font-bold text-[#2d884c] mt-1 uppercase">Laporan Buku Kas Laci Toko</h3>
      </div>
      <table className="w-full text-left border-collapse text-xs">
        <thead className="bg-[#f4eee4] text-[#4a453f] border-y border-[#ddd3c2]">
          <tr>
            <th className="p-2">No</th>
            <th className="p-2">Keterangan Transaksi Kas</th>
            <th className="p-2 text-right">Kas Masuk (Rp)</th>
            <th className="p-2 text-right">Kas Keluar (Rp)</th>
            <th className="p-2 text-right">Saldo Kas Berjalan</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#ece4d6] text-[#2f2c28]">
          {cashRows.map((r) => (
            <tr key={r.no}>
              <td className="p-2 text-[#738876]">{r.no}</td>
              <td className="p-2 font-medium">{r.desc}</td>
              <td className="p-2 text-right text-[#2d884c] font-semibold">{r.in > 0 ? formatRupiah(r.in) : '-'}</td>
              <td className="p-2 text-right text-[#9e3d25] font-semibold">{r.out > 0 ? formatRupiah(r.out) : '-'}</td>
              <td className="p-2 text-right font-bold text-[#1b1a17]">{formatRupiah(r.balance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
