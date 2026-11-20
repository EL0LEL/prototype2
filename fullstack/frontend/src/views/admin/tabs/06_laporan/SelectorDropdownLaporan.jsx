/**
 * SelectorDropdownLaporan.jsx
 * Menu pilihan 4 kategori & 19 varian laporan iPOS 5.
 */

import React from 'react';
import { FileSpreadsheet } from 'lucide-react';

export const SelectorDropdownLaporan = ({ category, subReport, onSelectReport }) => {
  const REPORTS_MENU = {
    PENJUALAN: [
      { id: 'rekap_harian', label: '1. Rekap Penjualan Harian' },
      { id: 'rekap_bulanan', label: '2. Rekap Penjualan Bulanan' },
      { id: 'per_item', label: '3. Penjualan Per Item Barang' },
      { id: 'piutang_pelanggan', label: '4. Rekap Piutang Pelanggan' },
      { id: 'laba_kotor_sales', label: '5. Analisa Margin Laba Penjualan' },
    ],
    PEMBELIAN: [
      { id: 'rekap_beli_harian', label: '1. Rekap Faktur Beli Harian' },
      { id: 'rekap_beli_supplier', label: '2. Pembelian Per Distributor/Supplier' },
      { id: 'rekap_hutang_supplier', label: '3. Rekap Hutang Dagang Supplier' },
      { id: 'rekap_retur_beli', label: '4. Rekap Retur Pembelian Barang' },
      { id: 'jatuh_tempo_hutang', label: '5. Jadwal Jatuh Tempo Hutang' },
    ],
    PERSEDIAAN: [
      { id: 'stok_opname', label: '1. Laporan Hasil Audit Stok Opname' },
      { id: 'stok_awal_hari', label: '2. Posisi Stok Awal Hari' },
      { id: 'kartu_mutasi', label: '3. Kartu Mutasi Masuk/Keluar' },
      { id: 'valuasi_aset_stok', label: '4. Valuasi Nilai Rupiah Aset Stok Toko' },
    ],
    KAS_BANK: [
      { id: 'ringkasan_kas', label: '1. Rekap Arus Kas Masuk & Keluar' },
      { id: 'kas_laci_tunai', label: '2. Buku Kas Tunai Laci Toko' },
      { id: 'rekening_bank', label: '3. Buku Rekening Bank BCA' },
      { id: 'mutasi_qris', label: '4. Rekap Transaksi QRIS Toko' },
      { id: 'selisih_shift_kasir', label: '5. Rekap Selisih Kas Tutup Shift' },
    ],
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5 text-[#8e722f] font-bold">
        <FileSpreadsheet size={18} />
        <span>Pusat Laporan:</span>
      </div>

      {/* Dropdown Kategori Utama */}
      <select
        value={category}
        onChange={(e) => onSelectReport(e.target.value, REPORTS_MENU[e.target.value][0].id)}
        className="bg-[#fbf8f2] border border-[#ddd3c2] text-[#1b1a17] rounded-lg px-2.5 py-1.5 text-xs font-semibold"
      >
        <option value="PENJUALAN">Kategori 1: Penjualan (5 Laporan)</option>
        <option value="PEMBELIAN">Kategori 2: Pembelian (5 Laporan)</option>
        <option value="PERSEDIAAN">Kategori 3: Persediaan Stok (4 Laporan)</option>
        <option value="KAS_BANK">Kategori 4: Kas & Bank (5 Laporan)</option>
      </select>

      {/* Dropdown Sub-Laporan */}
      <select
        value={subReport}
        onChange={(e) => onSelectReport(category, e.target.value)}
        className="bg-[#fbf8f2] border border-[#ddd3c2] text-[#a88738] rounded-lg px-2.5 py-1.5 text-xs font-medium"
      >
        {REPORTS_MENU[category].map((rep) => (
          <option key={rep.id} value={rep.id}>
            {rep.label}
          </option>
        ))}
      </select>
    </div>
  );
};
