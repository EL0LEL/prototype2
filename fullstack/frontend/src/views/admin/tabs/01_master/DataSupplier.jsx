/**
 * DataSupplier.jsx
 * Sub-menu 5: Master distributor dan pemasok grosir Toko Rina 2.
 */

import React, { useState } from 'react';
import { DataTableGrid } from '../../../../components/common/DataTableGrid';
import { formatRupiah } from '../../../../utils/currencyFormatter';
import { Truck, Plus } from 'lucide-react';

export const DataSupplier = () => {
  const [suppliers] = useState([
    { id: 'SUPP-001', name: 'PT Indofood Sukses Makmur', contact: 'Bpk Hendra (Sales)', phone: '0811-2345-6789', termTempo: '14 Hari', sisaHutang: 4200000 },
    { id: 'SUPP-002', name: 'Distributor Beras Cianjur Jaya', contact: 'Haji Mansur', phone: '0812-7788-9900', termTempo: '7 Hari', sisaHutang: 12500000 },
    { id: 'SUPP-003', name: 'Agen Minyak Goreng Curah & Pouch', contact: 'Ko Ahok', phone: '0813-8877-6655', termTempo: 'Tunai (COD)', sisaHutang: 0 },
    { id: 'SUPP-004', name: 'Grosir Telur Ayam Blitar', contact: 'Pak Widodo', phone: '0856-1122-4433', termTempo: '3 Hari', sisaHutang: 1500000 },
  ]);

  const columns = [
    { header: 'ID Supplier', accessor: 'id', render: (row) => <span className="font-mono text-[#6d675d]">{row.id}</span> },
    { header: 'Nama Distributor / Pemasok', accessor: 'name', render: (row) => <span className="font-bold text-[#1b1a17]">{row.name}</span> },
    { header: 'Kontak Sales', accessor: 'contact' },
    { header: 'No. Telp / WA', accessor: 'phone' },
    { header: 'Termin Tempo', accessor: 'termTempo', render: (row) => <span className="text-[#21aa9d] font-medium">{row.termTempo}</span> },
    { header: 'Hutang Usaha Toko', accessor: 'sisaHutang', align: 'right', render: (row) => <span className={`font-semibold ${row.sisaHutang > 0 ? 'text-[#9e3d25]' : 'text-[#2d884c]'}`}>{formatRupiah(row.sisaHutang)}</span> },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between bg-[#ffffff] p-3 rounded-lg border border-[#ece4d6]">
        <div className="flex items-center gap-2">
          <Truck className="text-[#645e55]" size={18} />
          <div>
            <h3 className="font-bold text-sm text-[#1b1a17]">Daftar Pemasok Distributor</h3>
            <p className="text-xs text-[#6d675d]">Kontrak supplier, termin tempo pembayaran, dan catatan hutang usaha.</p>
          </div>
        </div>
      </div>
      <DataTableGrid columns={columns} data={suppliers} />
    </div>
  );
};
