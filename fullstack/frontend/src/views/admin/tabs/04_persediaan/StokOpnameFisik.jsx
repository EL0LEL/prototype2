/**
 * StokOpnameFisik.jsx
 * Audit stok fisik vs stok sistem komputer & perhitungan selisih.
 */

import React, { useState } from 'react';
import { DataTableGrid } from '../../../../components/common/DataTableGrid';
import { ClipboardCheck, Save } from 'lucide-react';

export const StokOpnameFisik = () => {
  const [items, setItems] = useState([
    { id: '1', barcode: '8992345678901', name: 'Beras Pandan Wangi 5kg', systemStock: 45, physicalStock: 45 },
    { id: '2', barcode: '8991234567892', name: 'Minyak Goreng Bimoli 2L', systemStock: 120, physicalStock: 118 }, // Selisih -2
    { id: '3', barcode: '8993456789012', name: 'Gula Pasir Gulaku 1kg', systemStock: 80, physicalStock: 80 },
    { id: '4', barcode: '8994567890123', name: 'Indomie Goreng Original', systemStock: 35, physicalStock: 36 }, // Selisih +1
  ]);

  const handleUpdatePhysical = (id, val) => {
    setItems(items.map((i) => (i.id === id ? { ...i, physicalStock: Number(val) } : i)));
  };

  const handleSaveOpname = () => {
    alert('Hasil audit Stok Opname berhasil disimpan! Penyesuaian stok sistem telah dicatat.');
  };

  const columns = [
    { header: 'Kode Barcode', accessor: 'barcode', render: (row) => <span className="font-mono text-[#21aa9d]">{row.barcode}</span> },
    { header: 'Nama Barang', accessor: 'name', render: (row) => <span className="font-semibold text-[#1b1a17]">{row.name}</span> },
    { header: 'Stok Sistem', accessor: 'systemStock', align: 'center', render: (row) => <span className="font-medium text-[#4a453f]">{row.systemStock}</span> },
    { header: 'Hitung Fisik Toko', accessor: 'physicalStock', align: 'center', render: (row) => (
      <input
        type="number"
        value={row.physicalStock}
        onChange={(e) => handleUpdatePhysical(row.id, e.target.value)}
        className="w-16 text-center bg-[#fbf8f2] border border-[#ddd3c2] rounded py-1 text-[#1b1a17] font-bold"
      />
    )},
    { header: 'Selisih (Audit)', accessor: 'diff', align: 'center', render: (row) => {
      const diff = row.physicalStock - row.systemStock;
      return (
        <span className={`font-bold px-2 py-0.5 rounded text-xs ${
          diff === 0 ? 'text-[#2d884c]' : diff < 0 ? 'bg-[#f4dcd7] text-[#9e3d25] border border-[#e3bcb5]' : 'bg-[#f4e8d7] text-[#996f21] border border-[#e3d2b5]'
        }`}>
          {diff > 0 ? `+${diff}` : diff}
        </span>
      );
    }},
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between bg-[#ffffff] p-3 rounded-lg border border-[#ece4d6]">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="text-[#1a827a]" size={18} />
          <div>
            <h3 className="font-bold text-sm text-[#1b1a17]">Form Audit Stok Opname Fisik</h3>
            <p className="text-xs text-[#6d675d]">Koreksi perbedaan stok fisik rak gudang dengan stok tercatat sistem.</p>
          </div>
        </div>
        <button
          onClick={handleSaveOpname}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161512] hover:bg-[#161512] text-[#ffffff] font-semibold text-xs shadow"
        >
          <Save size={14} /> Simpan Penyesuaian Stok
        </button>
      </div>
      <DataTableGrid columns={columns} data={items} />
    </div>
  );
};
