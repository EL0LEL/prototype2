/**
 * BayarHutangUsaha.jsx
 * Form pembayaran pelunasan hutang usaha jatuh tempo ke distributor.
 */

import React, { useState } from 'react';
import { DataTableGrid } from '../../../../components/common/DataTableGrid';
import { formatRupiah } from '../../../../utils/currencyFormatter';
import { CheckCircle } from 'lucide-react';

export const BayarHutangUsaha = () => {
  const [hutangList, setHutangList] = useState([
    { id: 'HTG-01', supplier: 'PT Indofood Sukses Makmur', noFaktur: '#FB-20261118-001', totalHutang: 3960000, dueDate: '02 Des 2026' },
    { id: 'HTG-02', supplier: 'Distributor Beras Cianjur Jaya', noFaktur: '#FB-20261115-002', totalHutang: 12500000, dueDate: '22 Nov 2026' },
  ]);

  const handlePay = (row) => {
    alert(`Pembayaran hutang untuk ${row.supplier} sebesar ${formatRupiah(row.totalHutang)} berhasil dicatat!`);
    setHutangList(hutangList.filter((h) => h.id !== row.id));
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nama Supplier', accessor: 'supplier', render: (row) => <span className="font-bold text-[#1b1a17]">{row.supplier}</span> },
    { header: 'No. Faktur Beli', accessor: 'noFaktur', render: (row) => <span className="font-mono text-[#4c4841]">{row.noFaktur}</span> },
    { header: 'Jatuh Tempo', accessor: 'dueDate', render: (row) => <span className="text-[#996f21] font-semibold">{row.dueDate}</span> },
    { header: 'Sisa Hutang Usaha', accessor: 'totalHutang', align: 'right', render: (row) => <span className="font-bold text-[#9e3d25]">{formatRupiah(row.totalHutang)}</span> },
    { header: 'Aksi Pelunasan', accessor: 'action', align: 'center', render: (row) => (
      <button
        onClick={() => handlePay(row)}
        className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#161512] hover:bg-[#161512] text-[#ffffff] font-semibold text-xs transition"
      >
        <CheckCircle size={12} /> Lunasi Hutang
      </button>
    )},
  ];

  return (
    <div className="space-y-3">
      <div className="bg-[#ffffff] p-3 rounded-lg border border-[#ece4d6]">
        <h3 className="font-bold text-sm text-[#1b1a17]">Daftar Hutang Dagang Jatuh Tempo</h3>
        <p className="text-xs text-[#6d675d]">Pelunasan hutang supplier via kas tunai atau transfer rekening toko.</p>
      </div>
      <DataTableGrid columns={columns} data={hutangList} emptyMessage="Tidak ada hutang usaha yang jatuh tempo." />
    </div>
  );
};
