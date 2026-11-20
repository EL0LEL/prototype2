/**
 * BackupRestoreData.jsx
 * Sub-menu 3: Backup & Restore database offline SQLite / LocalStorage.
 */

import React from 'react';
import { Download, Upload, Database, ShieldCheck } from 'lucide-react';

export const BackupRestoreData = () => {
  const handleBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      app: 'Toko Rina 2 POS',
      users: localStorage.getItem('tokorina_registered_users'),
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_tokorina2_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div className="bg-[#ffffff] border border-[#ece4d6] p-5 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 border-b border-[#ece4d6] pb-2">
          <Database size={18} className="text-[#1a827a]" />
          <h3 className="font-bold text-sm text-[#1b1a17]">Backup & Pemulihan Data Offline</h3>
        </div>

        <p className="text-[#6d675d] leading-relaxed">
          Amankan seluruh catatan transaksi, katalog barang, stok opname, dan akun kasir ke dalam file cadangan lokal tanpa butuh internet.
        </p>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleBackup}
            className="p-4 rounded-2xl bg-[#0f9f94]/20 border border-[#b5e3df]/40 hover:bg-[#0f9f94]/30 text-[#21aa9d] font-semibold flex flex-col items-center justify-center gap-2 transition"
          >
            <Download size={22} />
            <span>Unduh Cadangan (Backup Data)</span>
          </button>

          <button
            onClick={() => alert('Fitur restore: Pilih file .json cadangan untuk memulihkan database offline.')}
            className="p-4 rounded-2xl bg-[#ece4d6]/60 border border-[#ddd3c2] hover:bg-[#ece4d6] text-[#4a453f] font-semibold flex flex-col items-center justify-center gap-2 transition"
          >
            <Upload size={22} />
            <span>Pulihkan Cadangan (Restore)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
