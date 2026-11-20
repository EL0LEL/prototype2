/**
 * DaftarFakturBeli.jsx
 * Riwayat faktur pembelian barang masuk distributor.
 */

import React, { useState } from 'react';
import { DataTableGrid } from '../../../../components/common/DataTableGrid';
import { formatRupiah } from '../../../../utils/currencyFormatter';
import { Plus } from 'lucide-react';

export const DaftarFakturBeli = ({ onOpenInput }) => {
  const [fakturList] = useState([
    { id: '#FB-20261118-001', date: '18 Nov 2026', supplier: 'PT Indofood Sukses Makmur', total: 3960000, status: 'TEMPO', dueDate: '02 Des 2026' },
    { id: '#FB-20261115-002', date: '15 Nov 2026', supplier: 'Distributor Beras Cianjur Jaya', total: 12500000, status: 'TEMPO', dueDate: '22 Nov 2026' },
    { id: '#FB-20261110-003', date: '10 Nov 2026', supplier: 'Agen Minyak Goreng Curah & Pouch', total: 4200000, status: 'LUNAS', dueDate: '-' },
  ]);

  const columns = [
    { header: 'No. Faktur Beli', accessor: 'id', render: (row) => <span className="font-mono text-[#4c4841] font-bold">{row.id}</span> },
    { header: 'Tanggal', accessor: 'date' },
    { header: 'Supplier', accessor: 'supplier', render: (row) => <span className="font-medium text-[#1b1a17]">{row.supplier}</span> },
    { header: 'Total Nilai', accessor: 'total', align: 'right', render: (row) => <span className="font-semibold text-[#1b1a17]">{formatRupiah(row.total)}</span> },
    { header: 'Status Pembayaran', accessor: 'status', render: (row) => (
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${row.status === 'LUNAS' ? 'bg-[#d7f4e2] text-[#2d884c] border border-[#b5e3c8]' : 'bg-[#f4e8d7] text-[#996f21] border border-[#e3d2b5]'}`}>
        {row.status}
      </span>
    )},
    { header: 'Jatuh Tempo', accessor: 'dueDate', render: (row) => <span className="text-[#6d675d]">{row.dueDate}</span> },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between bg-[#ffffff] p-3 rounded-lg border border-[#ece4d6]">
        <h3 className="font-bold text-sm text-[#1b1a17]">Riwayat Faktur Pembelian Pemasok</h3>
        <button onClick={onOpenInput} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#688a63] hover:bg-[#7ea078] text-[#1b1a17] font-semibold text-xs">
          <Plus size={14} /> Buat Faktur Beli Baru
        </button>
      </div>
      <DataTableGrid columns={columns} data={fakturList} />
    </div>
  );
};
