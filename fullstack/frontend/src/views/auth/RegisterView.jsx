/**
 * RegisterView.jsx
 * Form registrasi karyawan baru yang otomatis berstatus PENDING hingga disetujui Admin.
 */

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ROLES } from '../../config/appConstants';
import { UserPlus, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export const RegisterView = ({ onSwitchToLogin }) => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [role, setRole] = useState(ROLES.KASIR);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!name.trim() || !username.trim() || !pin.trim()) {
      setErrorMessage('Semua bidang wajib diisi!');
      return;
    }

    if (pin.length < 4) {
      setErrorMessage('PIN minimal 4 digit angka.');
      return;
    }

    const result = register({ name, username, pin, role });
    if (result.success) {
      setSuccessMessage(result.message);
      setName('');
      setUsername('');
      setPin('');
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#c3ece0] text-[#24221e] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#fbf8f2] border border-[#ece4d6] rounded-[32px] shadow-[0_30px_80px_-30px_rgba(22,21,18,0.35)] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#ece4d6]/80 bg-[#efe7dc]">
          <button
            onClick={onSwitchToLogin}
            className="inline-flex items-center gap-1.5 text-xs text-[#6d675d] hover:text-[#1b1a17] mb-3"
          >
            <ArrowLeft size={14} /> Kembali ke Login
          </button>
          <div className="flex items-center gap-2">
            <UserPlus className="text-[#1a827a]" size={22} />
            <h1 className="text-lg font-bold text-[#1b1a17]">Registrasi Karyawan Baru</h1>
          </div>
          <p className="text-xs text-[#6d675d] mt-1">
            Akun yang didaftarkan akan berstatus <span className="text-[#996f21] font-semibold">PENDING</span> dan memerlukan persetujuan Admin/Ibu Rina.
          </p>
        </div>

        {/* Form Register */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {successMessage && (
            <div className="p-3 rounded-lg bg-[#d7f4e2]/50 border border-[#b5e3c8] text-[#37a658] text-xs flex items-start gap-2">
              <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 rounded-lg bg-[#f4dcd7]/50 border border-[#e3bcb5] text-[#bc4529] text-xs flex items-start gap-2">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-[#4a453f] block mb-1">Nama Lengkap Karyawan</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Doni Saputra"
              className="w-full bg-[#f4eee4] border border-[#ddd3c2] rounded-lg px-3 py-2 text-sm text-[#1b1a17] focus:outline-none focus:border-[#b5e3df]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#4a453f] block mb-1">Username Unik</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Contoh: doni_sales"
              className="w-full bg-[#f4eee4] border border-[#ddd3c2] rounded-lg px-3 py-2 text-sm text-[#1b1a17] focus:outline-none focus:border-[#b5e3df]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#4a453f] block mb-1">PIN Masuk (4-6 Digit Angka)</label>
            <input
              type="password"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Contoh: 2222"
              className="w-full bg-[#f4eee4] border border-[#ddd3c2] rounded-lg px-3 py-2 text-sm text-[#1b1a17] tracking-widest focus:outline-none focus:border-[#b5e3df]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#4a453f] block mb-1">Peran / Tugas (Role)</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#f4eee4] border border-[#ddd3c2] rounded-lg px-3 py-2 text-sm text-[#1b1a17] focus:outline-none focus:border-[#b5e3df]"
            >
              <option value={ROLES.KASIR}>Kasir Toko (Tablet POS Kasir)</option>
              <option value={ROLES.PENCATAT}>Pencatat / Salesman (Smartphone HP)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-[#161512] hover:bg-[#161512] text-[#ffffff] font-semibold text-sm shadow-lg transition"
          >
            Kirim Pendaftaran
          </button>
        </form>
      </div>
    </div>
  );
};
