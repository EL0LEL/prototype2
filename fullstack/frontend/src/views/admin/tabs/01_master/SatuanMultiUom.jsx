/**
 * SatuanMultiUom.jsx
 * Sub-menu 3: Manajemen master satuan & standar konversi.
 */

import React, { useState } from 'react';
import { DataTableGrid } from '../../../../components/common/DataTableGrid';
import { Layers, Plus } from 'lucide-react';

export const SatuanMultiUom = () => {
  const [uoms] = useState([
    { id: '1', code: 'PCS', name: 'Pieces (Satuan Terkecil Eceran)', level: 'Level 1 (Dasar)', contoh: '1 Pcs Sabun' },
    { id: '2', code: 'BKS', name: 'Bungkus', level: 'Level 1 (Dasar)', contoh: '1 Bks Mie Instan' },
    { id: '3', code: 'RCG', name: 'Renceng', level: 'Level 2 (Grosir Kecil)', contoh: '1 Renceng = 12 Sachet' },
    { id: '4', code: 'PAK', name: 'Pak', level: 'Level 2 (Grosir Kecil)', contoh: '1 Pak = 20 Bks' },
    { id: '5', code: 'BAL', name: 'Bal', level: 'Level 3 (Grosir Menengah)', contoh: '1 Bal = 10 Pak' },
    { id: '6', code: 'DUS', name: 'Dus / Karton Induk', level: 'Level 4 (Distributor)', contoh: '1 Dus = 40 Bks Mie' },
  ]);

  const columns = [
    { header: 'Kode Satuan', accessor: 'code', render: (row) => <span className="font-mono font-bold text-[#996f21]">{row.code}</span> },
    { header: 'Keterangan', accessor: 'name' },
    { header: 'Tingkatan Satuan', accessor: 'level', render: (row) => <span className="text-[#21aa9d] font-semibold">{row.level}</span> },
    { header: 'Contoh Penggunaan', accessor: 'contoh', render: (row) => <span className="text-[#6d675d]">{row.contoh}</span> },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between bg-[#ffffff] p-3 rounded-lg border border-[#ece4d6]">
        <div className="flex items-center gap-2">
          <Layers className="text-[#1a827a]" size={18} />
          <div>
            <h3 className="font-bold text-sm text-[#1b1a17]">Daftar Standar Satuan (Multi-UOM)</h3>
            <p className="text-xs text-[#6d675d]">Pengaturan satuan dasar hingga induk dus untuk konversi otomatis kasir.</p>
          </div>
        </div>
      </div>
      <DataTableGrid columns={columns} data={uoms} />
    </div>
  );
};
