/**
 * BayarPiutangUsaha.jsx
 * Form pencatatan pelunasan piutang pelanggan grosir/warung langganan.
 */

import React, { useState } from 'react';
import { DataTableGrid } from '../../../../components/common/DataTableGrid';
import { formatRupiah } from '../../../../utils/currencyFormatter';
import { HandCoins, CheckCircle } from 'lucide-react';

export const BayarPiutangUsaha = () => {
  const [piutangList, setPiutangList] = useState([
    { id: 'PTG-01', customer: 'Warung Bu Siti', invoice: '#JL-20261115-081', amount: 485000, date: '15 Nov 2026' },
    { id: 'PTG-02', customer: 'Toko Berkah Jaya', invoice: '#JL-20261110-044', amount: 1850000, date: '10 Nov 2026' },
  ]);

  const handlePay = (row) => {
    alert(`Pelunasan piutang ${row.customer} sebesar ${formatRupiah(row.amount)} berhasil diterima dan masuk kas tunai!`);
    setPiutangList(piutangList.filter((p) => p.id !== row.id));
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nama Pelanggan', accessor: 'customer', render: (row) => <span className="font-bold text-[#1b1a17]">{row.customer}</span> },
    { header: 'No. Faktur Jual Asal', accessor: 'invoice', render: (row) => <span className="font-mono text-[#2d884c]">{row.invoice}</span> },
    { header: 'Tanggal Bon', accessor: 'date' },
    { header: 'Sisa Piutang Berjalan', accessor: 'amount', align: 'right', render: (row) => <span className="font-bold text-[#996f21]">{formatRupiah(row.amount)}</span> },
    { header: 'Aksi Bayar', accessor: 'action', align: 'center', render: (row) => (
      <button
        onClick={() => handlePay(row)}
        className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#161512] hover:bg-[#161512] text-[#ffffff] font-semibold text-xs transition"
      >
        <CheckCircle size={12} /> Terima Pelunasan
      </button>
    )},
  ];

  return (
    <div className="space-y-3">
      <div className="bg-[#ffffff] p-3 rounded-lg border border-[#ece4d6]">
        <h3 className="font-bold text-sm text-[#1b1a17]">Daftar Piutang Usaha Pelanggan Toko</h3>
        <p className="text-xs text-[#6d675d]">Pencatatan setoran cicilan atau pelunasan bon gantung pelanggan grosir.</p>
      </div>
      <DataTableGrid columns={columns} data={piutangList} emptyMessage="Semua piutang pelanggan sudah lunas." />
    </div>
  );
};
