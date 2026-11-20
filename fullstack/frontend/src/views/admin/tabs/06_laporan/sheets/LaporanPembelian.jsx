/**
 * sheets/LaporanPembelian.jsx
 * Lembar dokumen cetak Laporan Pembelian & Hutang Dagang.
 */

import React from 'react';
import { formatRupiah } from '../../../../../utils/currencyFormatter';
import { APP_CONFIG } from '../../../../../config/appConstants';

export const LaporanPembelian = () => {
  const rows = [
    { no: '1', doc: '#FB-20261118-001', supplier: 'PT Indofood Sukses Makmur', status: 'TEMPO', total: 3960000, due: '02 Des 2026' },
    { no: '2', doc: '#FB-20261115-002', supplier: 'Distributor Beras Cianjur Jaya', status: 'TEMPO', total: 12500000, due: '22 Nov 2026' },
  ];

  return (
    <div className="space-y-4">
      <div className="border-b-2 border-[#ddd3c2] pb-3 text-center">
        <h2 className="font-extrabold text-base uppercase text-[#1b1a17]">{APP_CONFIG.STORE_NAME}</h2>
        <h3 className="text-sm font-bold text-[#645e55] mt-1 uppercase">Laporan Pembelian & Hutang Dagang</h3>
      </div>
      <table className="w-full text-left border-collapse text-xs">
        <thead className="bg-[#f4eee4] text-[#4a453f] border-y border-[#ddd3c2]">
          <tr>
            <th className="p-2">No</th>
            <th className="p-2">No. Faktur Beli</th>
            <th className="p-2">Nama Supplier Distributor</th>
            <th className="p-2">Status</th>
            <th className="p-2">Jatuh Tempo</th>
            <th className="p-2 text-right">Total Pembelian</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#ece4d6] text-[#2f2c28]">
          {rows.map((r) => (
            <tr key={r.no}>
              <td className="p-2 text-[#738876]">{r.no}</td>
              <td className="p-2 font-mono text-[#4c4841] font-semibold">{r.doc}</td>
              <td className="p-2 font-medium">{r.supplier}</td>
              <td className="p-2 font-bold text-[#996f21]">{r.status}</td>
              <td className="p-2">{r.due}</td>
              <td className="p-2 text-right font-bold">{formatRupiah(r.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
