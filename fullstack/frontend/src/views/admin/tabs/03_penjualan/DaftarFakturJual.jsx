/**
 * DaftarFakturJual.jsx
 * Riwayat bon faktur penjualan kasir & fitur cetak ulang struk.
 */

import React, { useState } from 'react';
import { DataTableGrid } from '../../../../components/common/DataTableGrid';
import { formatRupiah } from '../../../../utils/currencyFormatter';
import { ReceiptPreviewModal } from '../../../../components/modals/ReceiptPreviewModal';
import { Printer, Search } from 'lucide-react';

export const DaftarFakturJual = () => {
  const [selectedTx, setSelectedTx] = useState(null);
  const [fakturList] = useState([
    { id: '#JL-20261119-001', time: '09:15 WIB', customer: 'Pelanggan Umum', method: 'CASH', total: 126000, cashier: 'Budi Santoso' },
    { id: '#JL-20261119-002', time: '09:42 WIB', customer: 'Warung Bu Siti', method: 'TEMPO', total: 485000, cashier: 'Budi Santoso' },
    { id: '#JL-20261119-003', time: '10:05 WIB', customer: 'Pak Haji Rohim', method: 'QRIS', total: 210000, cashier: 'Ibu Rina (Owner)' },
  ]);

  const columns = [
    { header: 'No. Faktur (Bon)', accessor: 'id', render: (row) => <span className="font-mono text-[#2d884c] font-bold">{row.id}</span> },
    { header: 'Jam Transaksi', accessor: 'time' },
    { header: 'Pelanggan', accessor: 'customer', render: (row) => <span className="font-medium text-[#1b1a17]">{row.customer}</span> },
    { header: 'Metode Bayar', accessor: 'method', render: (row) => <span className="text-[10px] bg-[#ece4d6] text-[#4a453f] px-2 py-0.5 rounded font-mono">{row.method}</span> },
    { header: 'Kasir', accessor: 'cashier' },
    { header: 'Total Nilai Bon', accessor: 'total', align: 'right', render: (row) => <span className="font-bold text-[#1b1a17]">{formatRupiah(row.total)}</span> },
    { header: 'Cetak', accessor: 'print', align: 'center', render: (row) => (
      <button
        onClick={() => setSelectedTx(row)}
        className="p-1.5 rounded bg-[#ece4d6] hover:bg-[#0f9f94]/30 text-[#6d675d] hover:text-[#21aa9d] border border-[#ddd3c2]"
        title="Cetak Ulang Struk"
      >
        <Printer size={13} />
      </button>
    )},
  ];

  return (
    <div className="space-y-3">
      <div className="bg-[#ffffff] p-3 rounded-lg border border-[#ece4d6] flex items-center justify-between">
        <h3 className="font-bold text-sm text-[#1b1a17]">Riwayat Faktur Penjualan Kasir Hari Ini</h3>
        <span className="text-xs text-[#6d675d]">Total 3 Transaksi</span>
      </div>
      <DataTableGrid columns={columns} data={fakturList} />

      <ReceiptPreviewModal
        isOpen={!!selectedTx}
        onClose={() => setSelectedTx(null)}
        transactionData={selectedTx || {}}
      />
    </div>
  );
};
