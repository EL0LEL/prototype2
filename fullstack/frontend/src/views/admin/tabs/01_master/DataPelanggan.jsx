/**
 * DataPelanggan.jsx
 * Sub-menu 4: Master data pelanggan, tipe eceran/grosir, dan batas plafon piutang.
 */

import React, { useState } from 'react';
import { DataTableGrid } from '../../../../components/common/DataTableGrid';
import { formatRupiah } from '../../../../utils/currencyFormatter';
import { Users, Plus, Search } from 'lucide-react';

export const DataPelanggan = () => {
  const [customers] = useState([
    { id: 'CUST-001', name: 'Pelanggan Umum (Cash)', type: 'ECERAN', phone: '-', limitPiutang: 0, sisaPiutang: 0 },
    { id: 'CUST-002', name: 'Warung Bu Siti', type: 'GROSIR', phone: '0812-9988-7711', limitPiutang: 5000000, sisaPiutang: 485000 },
    { id: 'CUST-003', name: 'Toko Berkah Jaya', type: 'GROSIR', phone: '0813-1122-3344', limitPiutang: 10000000, sisaPiutang: 1850000 },
    { id: 'CUST-004', name: 'Pak Haji Rohim (Langganan)', type: 'SEMI_GROSIR', phone: '0857-4455-6677', limitPiutang: 3000000, sisaPiutang: 0 },
  ]);

  const columns = [
    { header: 'ID', accessor: 'id', render: (row) => <span className="font-mono text-[#6d675d]">{row.id}</span> },
    { header: 'Nama Pelanggan', accessor: 'name', render: (row) => <span className="font-bold text-[#1b1a17]">{row.name}</span> },
    { header: 'Tipe Harga', accessor: 'type', render: (row) => <span className="text-[10px] bg-[#d7f4f2]/40 text-[#21aa9d] border border-[#b5e3df] px-2 py-0.5 rounded">{row.type}</span> },
    { header: 'No. Handphone', accessor: 'phone' },
    { header: 'Batas Plafon Piutang', accessor: 'limitPiutang', align: 'right', render: (row) => formatRupiah(row.limitPiutang) },
    { header: 'Hutang Berjalan', accessor: 'sisaPiutang', align: 'right', render: (row) => <span className={`font-semibold ${row.sisaPiutang > 0 ? 'text-[#996f21]' : 'text-[#2d884c]'}`}>{formatRupiah(row.sisaPiutang)}</span> },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between bg-[#ffffff] p-3 rounded-lg border border-[#ece4d6]">
        <div className="flex items-center gap-2">
          <Users className="text-[#2d884c]" size={18} />
          <div>
            <h3 className="font-bold text-sm text-[#1b1a17]">Data Master Pelanggan</h3>
            <p className="text-xs text-[#6d675d]">Plafon piutang dan klasifikasi harga grosir / eceran.</p>
          </div>
        </div>
      </div>
      <DataTableGrid columns={columns} data={customers} />
    </div>
  );
};
