/**
 * ProfilTokoPrinter.jsx
 * Sub-menu 2: Pengaturan metadata Toko Rina 2 dan koneksi printer thermal POS.
 */

import React, { useState } from 'react';
import { APP_CONFIG } from '../../../../config/appConstants';
import { Save, Printer, Bluetooth } from 'lucide-react';

export const ProfilTokoPrinter = () => {
  const [storeName, setStoreName] = useState(APP_CONFIG.STORE_NAME);
  const [phone, setPhone] = useState(APP_CONFIG.STORE_PHONE);
  const [address, setAddress] = useState(APP_CONFIG.STORE_ADDRESS);
  const [printerType, setPrinterType] = useState('BLUETOOTH_58MM');

  const handleSave = (e) => {
    e.preventDefault();
    alert('Pengaturan Profil Toko & Printer berhasil disimpan!');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <form onSubmit={handleSave} className="bg-[#ffffff] border border-[#ece4d6] p-5 rounded-2xl space-y-4">
        <h3 className="font-bold text-sm text-[#1b1a17] border-b border-[#ece4d6] pb-2">Informasi Toko Pada Struk</h3>
        <div className="space-y-3">
          <div>
            <label className="text-[#4a453f] block mb-1">Nama Toko</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full bg-[#fbf8f2] border border-[#ddd3c2] rounded-lg p-2 text-[#1b1a17] font-bold"
            />
          </div>
          <div>
            <label className="text-[#4a453f] block mb-1">No. Kontak / WhatsApp Toko</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#fbf8f2] border border-[#ddd3c2] rounded-lg p-2 text-[#1b1a17] font-mono"
            />
          </div>
          <div>
            <label className="text-[#4a453f] block mb-1">Alamat Toko</label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-[#fbf8f2] border border-[#ddd3c2] rounded-lg p-2 text-[#1b1a17]"
            />
          </div>
        </div>

        <h3 className="font-bold text-sm text-[#1b1a17] border-b border-[#ece4d6] pb-2 pt-2">Koneksi Printer Struk Kasir</h3>
        <div className="space-y-3">
          <div>
            <label className="text-[#4a453f] block mb-1">Tipe Printer Thermal</label>
            <select
              value={printerType}
              onChange={(e) => setPrinterType(e.target.value)}
              className="w-full bg-[#fbf8f2] border border-[#ddd3c2] rounded-lg p-2 text-[#1b1a17] font-semibold"
            >
              <option value="BLUETOOTH_58MM">Printer Bluetooth Thermal 58mm (Portable Android)</option>
              <option value="USB_80MM">Printer USB Thermal 80mm (Auto-Cutter Desktop)</option>
              <option value="BROWSER_PRINT">Browser Direct Print (ESC/POS Generic)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-2 bg-[#161512] hover:bg-[#161512] text-[#ffffff] font-semibold rounded-lg shadow"
          >
            <Save size={14} /> Simpan Pengaturan
          </button>
        </div>
      </form>
    </div>
  );
};
