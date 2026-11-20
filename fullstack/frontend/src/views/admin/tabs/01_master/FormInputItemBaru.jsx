/**
 * FormInputItemBaru.jsx
 * Form input barang baru (F2) dengan dukungan Multi-UOM ala iPOS 5.
 */

import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { formatRupiah } from '../../../../utils/currencyFormatter';

export const FormInputItemBaru = ({ onDone }) => {
  const [barcode, setBarcode] = useState('');
  const [namaBarang, setNamaBarang] = useState('');
  const [kategori, setKategori] = useState('SEMBAKO');
  const [stokAwal, setStokAwal] = useState(0);
  const [hargaBeli, setHargaBeli] = useState(0);
  const [satuanDasar, setSatuanDasar] = useState('PCS');

  // Konfigurasi Multi-UOM
  const [uomTiers, setUomTiers] = useState([
    { code: 'PCS', conversion: 1, price: 5000 },
    { code: 'DUS', conversion: 24, price: 110000 },
  ]);

  const handleAddTier = () => {
    setUomTiers([...uomTiers, { code: 'RENCENG', conversion: 12, price: 55000 }]);
  };

  const handleRemoveTier = (idx) => {
    if (uomTiers.length > 1) {
      setUomTiers(uomTiers.filter((_, i) => i !== idx));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert(`Barang "${namaBarang}" berhasil disimpan!`);
    onDone();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#ece4d6] pb-3">
        <button
          onClick={onDone}
          className="flex items-center gap-1.5 text-xs text-[#6d675d] hover:text-[#1b1a17]"
        >
          <ArrowLeft size={14} /> Kembali ke Daftar Katalog
        </button>
        <h2 className="text-sm font-bold text-[#1b1a17] uppercase tracking-wider">Form Tambah Item Baru (F2)</h2>
      </div>

      <form onSubmit={handleSave} className="space-y-4 bg-[#ffffff] border border-[#ece4d6] p-4 rounded-2xl text-xs">
        {/* Data Pokok */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-semibold text-[#4a453f] block mb-1">Kode Barcode</label>
            <input
              type="text"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              placeholder="Contoh: 8991234567890"
              className="w-full bg-[#fbf8f2] border border-[#ddd3c2] rounded-lg px-3 py-1.5 text-[#1b1a17] focus:outline-none focus:border-[#b5e3df] font-mono"
            />
          </div>
          <div>
            <label className="font-semibold text-[#4a453f] block mb-1">Kategori Barang</label>
            <input
              type="text"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="w-full bg-[#fbf8f2] border border-[#ddd3c2] rounded-lg px-3 py-1.5 text-[#1b1a17] focus:outline-none focus:border-[#b5e3df]"
            />
          </div>
          <div className="col-span-2">
            <label className="font-semibold text-[#4a453f] block mb-1">Nama Barang Lengkap</label>
            <input
              type="text"
              required
              value={namaBarang}
              onChange={(e) => setNamaBarang(e.target.value)}
              placeholder="Contoh: Sabun Cuci Ekonomi Siwalan 180ml"
              className="w-full bg-[#fbf8f2] border border-[#ddd3c2] rounded-lg px-3 py-1.5 text-[#1b1a17] focus:outline-none focus:border-[#b5e3df]"
            />
          </div>
          <div>
            <label className="font-semibold text-[#4a453f] block mb-1">Stok Awal Fisik</label>
            <input
              type="number"
              value={stokAwal}
              onChange={(e) => setStokAwal(e.target.value)}
              className="w-full bg-[#fbf8f2] border border-[#ddd3c2] rounded-lg px-3 py-1.5 text-[#1b1a17] focus:outline-none focus:border-[#b5e3df]"
            />
          </div>
          <div>
            <label className="font-semibold text-[#4a453f] block mb-1">Harga Beli Modal (HPP)</label>
            <input
              type="number"
              value={hargaBeli}
              onChange={(e) => setHargaBeli(e.target.value)}
              className="w-full bg-[#fbf8f2] border border-[#ddd3c2] rounded-lg px-3 py-1.5 text-[#1b1a17] focus:outline-none focus:border-[#b5e3df] font-semibold"
            />
          </div>
        </div>

        {/* Multi-UOM Tiers */}
        <div className="border-t border-[#ece4d6] pt-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#2f2c28] uppercase tracking-wide text-[11px]">
              Tingkat Satuan Jual Multi-UOM (Grosir / Eceran)
            </span>
            <button
              type="button"
              onClick={handleAddTier}
              className="text-[#1a827a] hover:text-[#21aa9d] flex items-center gap-1 font-semibold text-[11px]"
            >
              <Plus size={12} /> Tambah Satuan Lain
            </button>
          </div>

          <div className="space-y-2">
            {uomTiers.map((tier, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-[#fbf8f2] p-2 rounded-lg border border-[#ece4d6]">
                <div className="w-24">
                  <label className="text-[10px] text-[#6d675d] block">Kode Satuan</label>
                  <input
                    type="text"
                    value={tier.code}
                    onChange={(e) => {
                      const updated = [...uomTiers];
                      updated[idx].code = e.target.value.toUpperCase();
                      setUomTiers(updated);
                    }}
                    className="w-full bg-[#f1eadf] border border-[#ddd3c2] rounded px-2 py-1 text-[#1b1a17] font-mono text-xs"
                  />
                </div>
                <div className="w-28">
                  <label className="text-[10px] text-[#6d675d] block">Isi (Konversi Pcs)</label>
                  <input
                    type="number"
                    value={tier.conversion}
                    onChange={(e) => {
                      const updated = [...uomTiers];
                      updated[idx].conversion = Number(e.target.value);
                      setUomTiers(updated);
                    }}
                    className="w-full bg-[#f1eadf] border border-[#ddd3c2] rounded px-2 py-1 text-[#1b1a17] text-xs"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] text-[#6d675d] block">Harga Jual (Rp)</label>
                  <input
                    type="number"
                    value={tier.price}
                    onChange={(e) => {
                      const updated = [...uomTiers];
                      updated[idx].price = Number(e.target.value);
                      setUomTiers(updated);
                    }}
                    className="w-full bg-[#f1eadf] border border-[#ddd3c2] rounded px-2 py-1 text-[#2d884c] font-bold text-xs"
                  />
                </div>
                {uomTiers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTier(idx)}
                    className="p-1 text-[#738876] hover:text-[#9e3d25] mt-3"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Tombol Simpan */}
        <div className="flex justify-end gap-2 pt-2 border-t border-[#ece4d6]">
          <button
            type="button"
            onClick={onDone}
            className="px-4 py-1.5 rounded-lg border border-[#ddd3c2] text-[#4a453f] hover:bg-[#ece4d6]"
          >
            Batal
          </button>
          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-1.5 rounded-lg bg-[#161512] hover:bg-[#161512] text-[#ffffff] font-semibold shadow"
          >
            <Save size={14} /> Simpan Data Item (F12)
          </button>
        </div>
      </form>
    </div>
  );
};
