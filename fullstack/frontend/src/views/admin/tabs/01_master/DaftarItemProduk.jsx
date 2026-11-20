/**
 * DaftarItemProduk.jsx
 * Tabel katalog master barang dengan pencarian, filter kategori, dan tombol F2.
 */

import React, { useState } from 'react';
import { DataTableGrid } from '../../../../components/common/DataTableGrid';
import { formatRupiah } from '../../../../utils/currencyFormatter';
import { Search, Plus, Filter, RefreshCw, Barcode } from 'lucide-react';

export const DaftarItemProduk = ({ onOpenTambahItem }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Dummy Master Items Toko Rina 2 Sembako
  const [items, setItems] = useState([
    { id: 'ITM-001', barcode: '8992345678901', name: 'Beras Pandan Wangi 5kg', category: 'BERAS', satuan: 'KARUNG', stok: 45, hargaBeli: 65000, hargaJual: 75000 },
    { id: 'ITM-002', barcode: '8991234567892', name: 'Minyak Goreng Bimoli 2L', category: 'MINYAK', satuan: 'POUCH', stok: 120, hargaBeli: 31000, hargaJual: 36000 },
    { id: 'ITM-003', barcode: '8993456789012', name: 'Gula Pasir Gulaku 1kg', category: 'GULA', satuan: 'BKS', stok: 80, hargaBeli: 14500, hargaJual: 17500 },
    { id: 'ITM-004', barcode: '8994567890123', name: 'Indomie Goreng Original', category: 'MIE', satuan: 'DUS', stok: 35, hargaBeli: 108000, hargaJual: 122000 },
    { id: 'ITM-005', barcode: '8995678901234', name: 'Telur Ayam Negeri 1kg', category: 'TELUR', satuan: 'KG', stok: 60, hargaBeli: 25000, hargaJual: 29000 },
    { id: 'ITM-006', barcode: '8996789012345', name: 'Tepung Terigu Segitiga Biru 1kg', category: 'TEPUNG', satuan: 'BKS', stok: 95, hargaBeli: 11000, hargaJual: 13500 },
  ]);

  const filtered = items.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.barcode.includes(searchQuery);
    const matchCat = categoryFilter === 'ALL' || item.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const columns = [
    { header: 'No', accessor: 'no', render: (_, idx) => <span className="text-[#6d675d]">{idx + 1}</span> },
    { header: 'Kode / Barcode', accessor: 'barcode', render: (row) => <span className="font-mono text-[#21aa9d]">{row.barcode}</span> },
    { header: 'Nama Barang', accessor: 'name', render: (row) => <span className="font-medium text-[#1b1a17]">{row.name}</span> },
    { header: 'Kategori', accessor: 'category', render: (row) => <span className="text-[10px] bg-[#ece4d6] text-[#4a453f] px-2 py-0.5 rounded">{row.category}</span> },
    { header: 'Satuan', accessor: 'satuan' },
    { header: 'Sisa Stok', accessor: 'stok', align: 'right', render: (row) => <span className={`font-bold ${row.stok < 20 ? 'text-[#9e3d25]' : 'text-[#2d884c]'}`}>{row.stok}</span> },
    { header: 'Harga Beli (Modal)', accessor: 'hargaBeli', align: 'right', render: (row) => <span className="text-[#6d675d]">{formatRupiah(row.hargaBeli)}</span> },
    { header: 'Harga Jual', accessor: 'hargaJual', align: 'right', render: (row) => <span className="font-semibold text-[#2d884c]">{formatRupiah(row.hargaJual)}</span> },
  ];

  return (
    <div className="space-y-3">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#ffffff] p-3 rounded-lg border border-[#ece4d6]">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 text-[#6d675d]" size={15} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari item produk / barcode..."
              className="w-full bg-[#fbf8f2] border border-[#ddd3c2] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#1b1a17] focus:outline-none focus:border-[#b5e3df]"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#fbf8f2] border border-[#ddd3c2] text-xs text-[#4a453f] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#b5e3df]"
          >
            <option value="ALL">Semua Kategori</option>
            <option value="BERAS">Beras</option>
            <option value="MINYAK">Minyak</option>
            <option value="GULA">Gula</option>
            <option value="MIE">Mie Instan</option>
            <option value="TELUR">Telur</option>
            <option value="TEPUNG">Tepung</option>
          </select>
        </div>

        <button
          onClick={onOpenTambahItem}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161512] hover:bg-[#161512] text-[#ffffff] font-semibold text-xs shadow transition"
        >
          <Plus size={15} /> Tambah Item Baru (F2)
        </button>
      </div>

      {/* Grid Table */}
      <DataTableGrid columns={columns} data={filtered} emptyMessage="Tidak ada barang sesuai filter" />
    </div>
  );
};
