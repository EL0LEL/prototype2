/**
 * ReceiptPreviewModal.jsx
 * Pratinjau cetak struk thermal kasir ala iPOS 5 (58mm / 80mm).
 */

import React from 'react';
import { X, Printer, CheckCircle } from 'lucide-react';
import { formatRupiah } from '../../utils/currencyFormatter';
import { formatDateIndo } from '../../utils/dateFormatter';
import { APP_CONFIG } from '../../config/appConstants';

export const ReceiptPreviewModal = ({ isOpen, onClose, transactionData = {} }) => {
  if (!isOpen) return null;

  const {
    invoiceNo = '#JL-20261119-001',
    date = new Date(),
    cashier = 'Kasir',
    customer = 'Pelanggan Umum',
    items = [],
    subtotal = 0,
    discountAmount = 0,
    grandTotal = 0,
    paymentMethod = 'CASH',
    cashGiven = 0,
    changeAmount = 0,
  } = transactionData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#161512]/45 backdrop-blur-sm p-4">
      <div className="bg-[#fbf8f2] border border-[#ddd3c2] w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden text-[#24221e] flex flex-col">
        {/* Header Modal */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#ece4d6] bg-[#ffffff]">
          <div className="flex items-center gap-1.5 text-sm font-bold text-[#2f2c28]">
            <Printer size={16} className="text-[#1a827a]" />
            <span>Pratinjau Struk Kasir</span>
          </div>
          <button onClick={onClose} className="p-1 rounded text-[#6d675d] hover:text-[#1b1a17]">
            <X size={16} />
          </button>
        </div>

        {/* Simulasi Kertas Thermal Putih */}
        <div className="p-4 bg-[#f4eee4] flex justify-center overflow-y-auto max-h-[70vh]">
          <div className="w-full bg-white text-black p-4 rounded font-mono text-[11px] leading-tight shadow-md select-all">
            {/* Header Struk */}
            <div className="text-center border-b border-dashed border-[#93a595] pb-2 mb-2">
              <div className="font-bold text-xs uppercase">{APP_CONFIG.STORE_NAME}</div>
              <div className="text-[10px] text-[#3a4e40]">{APP_CONFIG.STORE_TAGLINE}</div>
              <div className="text-[9px] text-[#566a5b] mt-0.5">{APP_CONFIG.STORE_ADDRESS}</div>
              <div className="text-[9px] text-[#566a5b]">Telp: {APP_CONFIG.STORE_PHONE}</div>
            </div>

            {/* Info Faktur */}
            <div className="space-y-0.5 border-b border-dashed border-[#93a595] pb-2 mb-2 text-[10px]">
              <div className="flex justify-between">
                <span>No. Faktur:</span>
                <span className="font-bold">{invoiceNo}</span>
              </div>
              <div className="flex justify-between">
                <span>Tanggal:</span>
                <span>{formatDateIndo(date, true, true)}</span>
              </div>
              <div className="flex justify-between">
                <span>Kasir:</span>
                <span>{cashier}</span>
              </div>
              <div className="flex justify-between">
                <span>Pelanggan:</span>
                <span>{customer}</span>
              </div>
            </div>

            {/* Daftar Item */}
            <div className="space-y-1.5 border-b border-dashed border-[#93a595] pb-2 mb-2">
              {items.map((item, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="font-semibold text-[#182519]">{item.name}</div>
                  <div className="flex justify-between text-[#3a4e40] text-[10px]">
                    <span>
                      {item.qty} {item.uom || 'PCS'} x {formatRupiah(item.price, false)}
                    </span>
                    <span className="font-medium">{formatRupiah(item.subtotal || item.qty * item.price, false)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Ringkasan Total */}
            <div className="space-y-1 border-b border-dashed border-[#93a595] pb-2 mb-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatRupiah(subtotal, false)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#3a4e40]">
                  <span>Diskon:</span>
                  <span>-{formatRupiah(discountAmount, false)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-xs pt-0.5">
                <span>TOTAL:</span>
                <span>{formatRupiah(grandTotal, false)}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span>Bayar ({paymentMethod}):</span>
                <span>{formatRupiah(cashGiven, false)}</span>
              </div>
              <div className="flex justify-between">
                <span>Kembali:</span>
                <span>{formatRupiah(changeAmount, false)}</span>
              </div>
            </div>

            {/* Footer Ucapan */}
            <div className="text-center text-[9px] text-[#566a5b] space-y-0.5 pt-1">
              <p>Terima Kasih Atas Kunjungan Anda!</p>
              <p>Barang yang sudah dibeli tidak dapat ditukar</p>
            </div>
          </div>
        </div>

        {/* Footer Tombol Cetak */}
        <div className="px-4 py-3 border-t border-[#ece4d6] bg-[#ffffff] flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg border border-[#ddd3c2] text-[#4a453f] hover:bg-[#ece4d6] text-xs"
          >
            Tutup
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#161512] hover:bg-[#161512] text-[#ffffff] font-semibold text-xs shadow transition"
          >
            <Printer size={15} /> Cetak Struk
          </button>
        </div>
      </div>
    </div>
  );
};
