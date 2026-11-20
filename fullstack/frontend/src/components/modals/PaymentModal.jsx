/**
 * PaymentModal.jsx
 * Pop-up modal pembayaran POS iPOS 5 (Tunai, QRIS, BCA, Tempo/Piutang).
 */

import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Banknote, QrCode, CreditCard, CalendarClock } from 'lucide-react';
import { formatRupiah, parseRupiah } from '../../utils/currencyFormatter';
import { QuickCashPills } from '../common/QuickCashPills';

export const PaymentModal = ({ isOpen, onClose, grandTotal, onConfirmPayment }) => {
  const [method, setMethod] = useState('CASH'); // CASH, QRIS, BCA, TEMPO
  const [cashGiven, setCashGiven] = useState(grandTotal);
  const [customerName, setCustomerName] = useState('Pelanggan Umum');
  const [tempoDueDate, setTempoDueDate] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCashGiven(grandTotal);
      setMethod('CASH');
    }
  }, [isOpen, grandTotal]);

  if (!isOpen) return null;

  const changeAmount = Math.max(0, (Number(cashGiven) || 0) - grandTotal);
  const isCashInsufficient = method === 'CASH' && (Number(cashGiven) || 0) < grandTotal;

  const handleFinish = () => {
    if (isCashInsufficient) return;

    onConfirmPayment({
      method,
      grandTotal,
      cashGiven: method === 'CASH' ? Number(cashGiven) : grandTotal,
      changeAmount: method === 'CASH' ? changeAmount : 0,
      customerName,
      tempoDueDate: method === 'TEMPO' ? tempoDueDate : null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#161512]/45 backdrop-blur-sm p-4">
      <div className="bg-[#fbf8f2] border border-[#ddd3c2] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden text-[#24221e] flex flex-col">
        {/* Header Modal */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#ece4d6] bg-[#ffffff]">
          <div className="flex items-center gap-2">
            <Banknote className="text-[#2d884c]" size={20} />
            <h3 className="font-bold text-base tracking-wide">Pembayaran Transaksi</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-[#6d675d] hover:text-[#1b1a17] hover:bg-[#ece4d6]">
            <X size={18} />
          </button>
        </div>

        {/* Isi Modal */}
        <div className="p-5 space-y-4">
          {/* Box Total Tagihan */}
          <div className="bg-[#d7f4f2]/40 border border-[#b5e3e0]/60 rounded-2xl p-4 text-center">
            <div className="text-xs uppercase tracking-wider text-[#21aa9d] font-medium">Total Yang Harus Dibayar</div>
            <div className="text-3xl font-extrabold text-[#1a827a] mt-1">{formatRupiah(grandTotal)}</div>
          </div>

          {/* Tab Pilihan Metode Pembayaran */}
          <div>
            <label className="text-xs font-semibold text-[#6d675d] uppercase tracking-wider mb-2 block">
              Metode Pembayaran
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'CASH', label: 'Tunai', icon: Banknote },
                { id: 'QRIS', label: 'QRIS', icon: QrCode },
                { id: 'BCA', label: 'Transfer', icon: CreditCard },
                { id: 'TEMPO', label: 'Tempo', icon: CalendarClock },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = method === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    className={`flex flex-col items-center justify-center gap-1 py-2.5 px-2 rounded-lg border text-xs font-semibold transition ${
                      isSelected
                        ? 'bg-[#0f9f94]/30 border-[#b5e3df] text-[#21aa9d] shadow'
                        : 'bg-[#f1eadf]/60 border-[#ece4d6] text-[#6d675d] hover:bg-[#ece4d6] hover:text-[#2f2c28]'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Dinamis Berdasarkan Metode */}
          {method === 'CASH' && (
            <div className="space-y-3 bg-[#ffffff] border border-[#ece4d6] p-4 rounded-2xl">
              <div>
                <label className="text-xs font-semibold text-[#4a453f] block mb-1">Uang Diterima (Rp)</label>
                <input
                  type="number"
                  value={cashGiven}
                  onChange={(e) => setCashGiven(e.target.value)}
                  autoFocus
                  className="w-full bg-[#fbf8f2] border border-[#ddd3c2] rounded-lg px-3 py-2 text-xl font-bold text-[#1b1a17] focus:outline-none focus:border-[#b5e3df]"
                />
              </div>

              {/* Quick Cash Pills */}
              <div>
                <QuickCashPills grandTotal={grandTotal} onSelectCashAmount={(amt) => setCashGiven(amt)} />
              </div>

              {/* Kembalian */}
              <div className="flex items-center justify-between pt-2 border-t border-[#ece4d6]">
                <span className="text-xs font-semibold text-[#6d675d]">Kembalian:</span>
                <span className={`text-lg font-bold ${isCashInsufficient ? 'text-[#9e3d25]' : 'text-[#2d884c]'}`}>
                  {isCashInsufficient ? 'Uang Kurang!' : formatRupiah(changeAmount)}
                </span>
              </div>
            </div>
          )}

          {method === 'QRIS' && (
            <div className="bg-[#ffffff] border border-[#ece4d6] p-4 rounded-2xl text-center space-y-2">
              <div className="w-32 h-32 mx-auto bg-white p-2 rounded-lg flex items-center justify-center">
                <QrCode size={110} className="text-[#182519]" />
              </div>
              <div className="text-xs font-semibold text-[#2f2c28]">Scan QRIS Toko Rina 2 (NMID: ID1020304050)</div>
              <p className="text-[11px] text-[#6d675d]">Pastikan notifikasi dana masuk telah diterima sebelum memproses.</p>
            </div>
          )}

          {method === 'BCA' && (
            <div className="bg-[#ffffff] border border-[#ece4d6] p-4 rounded-2xl space-y-2 text-xs">
              <div className="font-semibold text-[#2f2c28]">Rekening Tujuan Toko:</div>
              <div className="bg-[#fbf8f2] p-3 rounded-lg border border-[#ddd3c2] font-mono text-[#21aa9d] flex justify-between items-center">
                <span>BCA: 5410-8899-22</span>
                <span className="text-xs font-sans text-[#6d675d]">a/n Rina Wati</span>
              </div>
            </div>
          )}

          {method === 'TEMPO' && (
            <div className="bg-[#ffffff] border border-[#ece4d6] p-4 rounded-2xl space-y-3 text-xs">
              <div>
                <label className="font-semibold text-[#4a453f] block mb-1">Nama Pelanggan Berhutang</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Contoh: Toko Berkah / Pak Haji"
                  className="w-full bg-[#fbf8f2] border border-[#ddd3c2] rounded-lg px-3 py-2 text-[#1b1a17] focus:outline-none focus:border-[#b5e3df]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#4a453f] block mb-1">Tanggal Jatuh Tempo</label>
                <input
                  type="date"
                  value={tempoDueDate}
                  onChange={(e) => setTempoDueDate(e.target.value)}
                  className="w-full bg-[#fbf8f2] border border-[#ddd3c2] rounded-lg px-3 py-2 text-[#1b1a17] focus:outline-none focus:border-[#b5e3df]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Tombol Bayar */}
        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-[#ece4d6] bg-[#ffffff]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#ddd3c2] text-[#4a453f] hover:bg-[#ece4d6] text-xs font-medium"
          >
            Batal (Esc)
          </button>
          <button
            type="button"
            disabled={isCashInsufficient}
            onClick={handleFinish}
            className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#161512] hover:bg-[#161512] disabled:opacity-40 disabled:hover:bg-[#161512] text-[#ffffff] font-semibold text-xs shadow-lg transition"
          >
            <CheckCircle size={15} /> Selesaikan Transaksi (F12)
          </button>
        </div>
      </div>
    </div>
  );
};
