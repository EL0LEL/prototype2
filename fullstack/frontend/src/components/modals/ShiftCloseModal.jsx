/**
 * ShiftCloseModal.jsx
 * Pop-up rekap tutup shift kasir & rekonsiliasi selisih laci uang fisik.
 */

import React, { useState } from 'react';
import { X, Lock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { formatRupiah } from '../../utils/currencyFormatter';
import { formatDateIndo } from '../../utils/dateFormatter';
import { useAuth } from '../../contexts/AuthContext';

export const ShiftCloseModal = ({ isOpen, onClose, shiftSummary = {}, onConfirmCloseShift }) => {
  const { currentUser } = useAuth();
  const [cashDrawerPhysical, setCashDrawerPhysical] = useState('');
  const [closingNotes, setClosingNotes] = useState('');

  if (!isOpen) return null;

  const modalAwal = shiftSummary.modalAwal || 200000;
  const totalSalesCash = shiftSummary.totalCash || 1850000;
  const totalExpectedInDrawer = modalAwal + totalSalesCash;

  const physicalNum = Number(cashDrawerPhysical) || 0;
  const difference = physicalNum - totalExpectedInDrawer;

  const handleProcessClose = () => {
    onConfirmCloseShift({
      cashier: currentUser?.name || 'Kasir',
      closedAt: new Date().toISOString(),
      modalAwal,
      totalSalesCash,
      totalExpectedInDrawer,
      cashDrawerPhysical: physicalNum,
      difference,
      notes: closingNotes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#161512]/45 backdrop-blur-sm p-4">
      <div className="bg-[#fbf8f2] border border-[#ddd3c2] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden text-[#24221e] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#ece4d6] bg-[#ffffff]">
          <div className="flex items-center gap-2">
            <Lock className="text-[#996f21]" size={18} />
            <h3 className="font-bold text-sm tracking-wide">Tutup Shift Kasir</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-[#6d675d] hover:text-[#1b1a17] hover:bg-[#ece4d6]">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          <div className="bg-[#f1eadf]/70 border border-[#ece4d6] rounded-lg p-3 space-y-2">
            <div className="flex justify-between text-[#6d675d]">
              <span>Kasir Bertugas:</span>
              <span className="font-semibold text-[#2f2c28]">{currentUser?.name || 'Kasir'}</span>
            </div>
            <div className="flex justify-between text-[#6d675d]">
              <span>Waktu Penutupan:</span>
              <span className="text-[#2f2c28]">{formatDateIndo(new Date(), true, true)}</span>
            </div>
          </div>

          {/* Rincian Kas Sistem */}
          <div className="space-y-2 border border-[#ece4d6] rounded-lg p-3 bg-[#ffffff]">
            <div className="flex justify-between text-[#4a453f]">
              <span>Modal Kas Awal Laci:</span>
              <span className="font-medium">{formatRupiah(modalAwal)}</span>
            </div>
            <div className="flex justify-between text-[#4a453f]">
              <span>Penjualan Tunai Shift Ini:</span>
              <span className="font-medium text-[#2d884c]">{formatRupiah(totalSalesCash)}</span>
            </div>
            <div className="flex justify-between border-t border-[#ece4d6] pt-2 font-bold text-[#1b1a17] text-sm">
              <span>Total Uang Kas Seharusnya:</span>
              <span className="text-[#1a827a]">{formatRupiah(totalExpectedInDrawer)}</span>
            </div>
          </div>

          {/* Input Hitung Fisik */}
          <div>
            <label className="font-semibold text-[#4a453f] block mb-1">
              Hitungan Uang Fisik di Laci (Rp)
            </label>
            <input
              type="number"
              value={cashDrawerPhysical}
              onChange={(e) => setCashDrawerPhysical(e.target.value)}
              placeholder="Masukkan jumlah uang fisik di laci..."
              className="w-full bg-[#ffffff] border border-[#ddd3c2] rounded-lg px-3 py-2 text-base font-bold text-[#1b1a17] focus:outline-none focus:border-[#cf9a3a]"
            />
          </div>

          {/* Box Selisih */}
          {cashDrawerPhysical !== '' && (
            <div
              className={`p-3 rounded-lg border flex items-center justify-between font-semibold ${
                difference === 0
                  ? 'bg-[#d7f4e2]/30 border-[#b5e3c8] text-[#2d884c]'
                  : difference < 0
                  ? 'bg-[#f4dcd7]/30 border-[#e3bcb5] text-[#9e3d25]'
                  : 'bg-[#f4e8d7]/30 border-[#e3d2b5] text-[#996f21]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {difference === 0 ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                <span>
                  {difference === 0 ? 'Kas Pas (Sesuai)' : difference < 0 ? 'Selisih Kurang' : 'Selisih Lebih'}
                </span>
              </div>
              <span className="text-sm font-bold">{formatRupiah(Math.abs(difference))}</span>
            </div>
          )}

          <div>
            <label className="font-semibold text-[#4a453f] block mb-1">Catatan Shift (Opsional)</label>
            <textarea
              rows={2}
              value={closingNotes}
              onChange={(e) => setClosingNotes(e.target.value)}
              placeholder="Catatan kendala atau serah terima..."
              className="w-full bg-[#ffffff] border border-[#ddd3c2] rounded-lg p-2 text-xs text-[#1b1a17] focus:outline-none focus:border-[#b5e3df]"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-3.5 border-t border-[#ece4d6] bg-[#ffffff]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#ddd3c2] text-[#4a453f] hover:bg-[#ece4d6] text-xs font-medium"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleProcessClose}
            className="px-5 py-2 rounded-lg bg-[#b27f26] hover:bg-[#cf9a3a] text-[#1b1a17] font-semibold text-xs shadow-lg transition"
          >
            Tutup Shift & Kunci Kasir
          </button>
        </div>
      </div>
    </div>
  );
};
