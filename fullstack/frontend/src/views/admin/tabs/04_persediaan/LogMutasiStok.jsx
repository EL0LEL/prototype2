/**
 * LogMutasiStok.jsx
 * Kartu riwayat pergerakan stok (Penjualan, Pembelian, Pecah Satuan, Opname).
 */

import React, { useState } from 'react';
import { DataTableGrid } from '../../../../components/common/DataTableGrid';
import { History } from 'lucide-react';

export const LogMutasiStok = () => {
  const [logs] = useState([
    { id: '1', time: '19 Nov 10:05', name: 'Beras Pandan Wangi 5kg', type: 'PENJUALAN', qty: -2, sisa: 45, note: 'Nota Kasir #JL-20261119-003' },
    { id: '2', time: '19 Nov 09:30', name: 'Indomie Goreng Original', type: 'PECAH_DUS', qty: +40, sisa: 120, note: 'Pecah 1 Dus ke Bks Ecer' },
    { id: '3', time: '18 Nov 14:20', name: 'Minyak Goreng Bimoli 2L', type: 'PEMBELIAN', qty: +10, sisa: 120, note: 'Faktur Beli #FB-20261118-001' },
    { id: '4', time: '17 Nov 16:00', name: 'Gula Pasir Gulaku 1kg', type: 'OPNAME_ADJUST', qty: -1, sisa: 80, note: 'Koreksi Selisih Opname' },
  ]);

  const columns = [
    { header: 'Waktu', accessor: 'time' },
    { header: 'Nama Barang', accessor: 'name', render: (row) => <span className="font-semibold text-[#1b1a17]">{row.name}</span> },
    { header: 'Jenis Mutasi', accessor: 'type', render: (row) => <span className="text-[10px] bg-[#ece4d6] text-[#4a453f] px-2 py-0.5 rounded font-mono">{row.type}</span> },
    { header: 'Masuk / Keluar', accessor: 'qty', align: 'center', render: (row) => (
      <span className={`font-bold ${row.qty > 0 ? 'text-[#2d884c]' : 'text-[#9e3d25]'}`}>
        {row.qty > 0 ? `+${row.qty}` : row.qty}
      </span>
    )},
    { header: 'Sisa Akhir', accessor: 'sisa', align: 'right', render: (row) => <span className="font-bold text-[#1b1a17]">{row.sisa}</span> },
    { header: 'Keterangan Referensi', accessor: 'note', render: (row) => <span className="text-[#6d675d] text-xs">{row.note}</span> },
  ];

  return (
    <div className="space-y-3">
      <div className="bg-[#ffffff] p-3 rounded-lg border border-[#ece4d6] flex items-center gap-2">
        <History className="text-[#1a827a]" size={18} />
        <h3 className="font-bold text-sm text-[#1b1a17]">Log Kartu Mutasi Pergerakan Stok</h3>
      </div>
      <DataTableGrid columns={columns} data={logs} />
    </div>
  );
};
