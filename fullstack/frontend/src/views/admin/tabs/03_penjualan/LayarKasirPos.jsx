/**
 * LayarKasirPos.jsx
 * Jantung Layar Kasir POS Toko Rina 2 (Tablet Landscape).
 * Mendukung Multi-UOM, Autocomplete Search, Keyboard Shortcuts F1-F12, Hold/Recall, dan Modals.
 */

import React, { useState, useEffect } from 'react';
import { useCart } from '../../../../contexts/CartContext';
import { AutocompleteSearch } from '../../../../components/common/AutocompleteSearch';
import { MultiUomSelector } from '../../../../components/common/MultiUomSelector';
import { StepperQty } from '../../../../components/common/StepperQty';
import { PaymentModal } from '../../../../components/modals/PaymentModal';
import { ReceiptPreviewModal } from '../../../../components/modals/ReceiptPreviewModal';
import { formatRupiah } from '../../../../utils/currencyFormatter';
import { generateInvoiceNumber, INVOICE_PREFIXES } from '../../../../utils/invoiceGenerator';
import {
  Trash2, PauseCircle, PlayCircle, CreditCard,
  UserCheck, Percent, ShoppingBag, Receipt
} from 'lucide-react';

export const LayarKasirPos = ({ isCashierOnly = false }) => {
  const {
    cartItems, customer, setCustomer,
    summary, addToCart, updateQty, changeItemUom,
    removeFromCart, clearCart, holdCurrentOrder,
    recallPendingOrder, pendingOrders, globalDiscount, setGlobalDiscount
  } = useCart();

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [completedTransaction, setCompletedTransaction] = useState(null);

  // Katalog dummy untuk pencarian live
  const catalogProducts = [
    { id: '1', barcode: '8992345678901', name: 'Beras Pandan Wangi 5kg', price: 75000, satuan: 'KARUNG', uomList: [{ code: 'KARUNG', price: 75000 }, { code: 'BAL', price: 720000 }] },
    { id: '2', barcode: '8991234567892', name: 'Minyak Goreng Bimoli 2L', price: 36000, satuan: 'POUCH', uomList: [{ code: 'POUCH', price: 36000 }, { code: 'DUS', price: 210000 }] },
    { id: '3', barcode: '8993456789012', name: 'Gula Pasir Gulaku 1kg', price: 17500, satuan: 'BKS', uomList: [{ code: 'BKS', price: 17500 }, { code: 'DUS', price: 340000 }] },
    { id: '4', barcode: '8994567890123', name: 'Indomie Goreng Original', price: 3500, satuan: 'BKS', uomList: [{ code: 'BKS', price: 3500 }, { code: 'RCG', price: 34000 }, { code: 'DUS', price: 122000 }] },
    { id: '5', barcode: '8995678901234', name: 'Telur Ayam 1kg', price: 29000, satuan: 'KG', uomList: [{ code: 'KG', price: 29000 }, { code: 'TRAY', price: 85000 }] },
  ];

  // Shortcut Keyboard Kasir (F7 Bayar, F8 Hold, F9 Recall)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'F7' || e.key === 'F12') {
        e.preventDefault();
        if (cartItems.length > 0) setIsPaymentOpen(true);
      } else if (e.key === 'F8') {
        e.preventDefault();
        holdCurrentOrder();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [cartItems, holdCurrentOrder]);

  const handleFinishPayment = (paymentData) => {
    const invoiceNo = generateInvoiceNumber(INVOICE_PREFIXES.PENJUALAN);
    const tx = {
      invoiceNo,
      date: new Date(),
      customer: customer.name,
      items: cartItems,
      subtotal: summary.subtotal,
      discountAmount: summary.discountAmount,
      grandTotal: summary.grandTotal,
      paymentMethod: paymentData.method,
      cashGiven: paymentData.cashGiven,
      changeAmount: paymentData.changeAmount,
    };
    setCompletedTransaction(tx);
    setIsPaymentOpen(false);
    clearCart();
    setIsReceiptOpen(true);
  };

  return (
    <div className="h-full w-full flex gap-3 text-xs overflow-hidden">
      {/* Kolom Kiri: Input Search + Tabel Baris Belanja Kasir */}
      <div className="flex-1 flex flex-col bg-[#fbf8f2] rounded-2xl border border-[#ece4d6] overflow-hidden">
        {/* Atas: Search Barcode + Info Pelanggan */}
        <div className="p-3 border-b border-[#ece4d6] bg-[#ffffff] flex items-center gap-3">
          <div className="flex-1">
            <AutocompleteSearch
              items={catalogProducts}
              onSelectItem={(item) => addToCart(item)}
              placeholder="Scan Barcode / Ketik Nama Barang Sembako (F1)..."
              autoFocus
            />
          </div>
          <div className="flex items-center gap-1.5 bg-[#fbf8f2] border border-[#ddd3c2] px-3 py-1.5 rounded-lg text-[#4a453f]">
            <UserCheck size={14} className="text-[#1a827a]" />
            <span className="font-semibold">{customer.name}</span>
          </div>
        </div>

        {/* Tengah: Tabel Kasir Spreadsheet Style */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#fbf8f2] text-[#6d675d] border-b border-[#ece4d6] sticky top-0 text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Nama Barang</th>
                <th className="py-2.5 px-2">Satuan (UOM)</th>
                <th className="py-2.5 px-2 text-right">Harga Satuan</th>
                <th className="py-2.5 px-2 text-center w-28">Kuantitas</th>
                <th className="py-2.5 px-3 text-right">Subtotal</th>
                <th className="py-2.5 px-2 text-center w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ece4d6]/60 text-[#2f2c28]">
              {cartItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-20 text-[#738876]">
                    <ShoppingBag size={40} className="mx-auto mb-2 opacity-30" />
                    <p className="font-medium text-sm">Keranjang Masih Kosong</p>
                    <p className="text-[11px] text-[#566a5b]">Scan barcode atau gunakan autocomplete search di atas.</p>
                  </td>
                </tr>
              ) : (
                cartItems.map((item) => (
                  <tr key={item.cartItemId} className="hover:bg-[#d7f4f2]/10">
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-[#1b1a17]">{item.name}</div>
                      <div className="text-[10px] text-[#738876] font-mono">{item.barcode}</div>
                    </td>
                    <td className="py-2.5 px-2">
                      <MultiUomSelector
                        uomList={item.uomList}
                        currentUom={item.uom}
                        onChangeUom={(newUom) => changeItemUom(item.cartItemId, newUom)}
                      />
                    </td>
                    <td className="py-2.5 px-2 text-right font-medium">{formatRupiah(item.price)}</td>
                    <td className="py-2.5 px-2 text-center">
                      <StepperQty value={item.qty} onChange={(val) => updateQty(item.cartItemId, val)} />
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-[#2d884c]">
                      {formatRupiah(item.subtotal)}
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-[#738876] hover:text-[#9e3d25] p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Bawah: Tombol Antrean Hold & Recall Nota */}
        <div className="p-2.5 bg-[#ffffff] border-t border-[#ece4d6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => holdCurrentOrder()}
              disabled={cartItems.length === 0}
              className="flex items-center gap-1 px-3 py-1.5 rounded bg-[#ece4d6] hover:bg-[#ddd3c2] disabled:opacity-40 text-[#4a453f] font-medium"
            >
              <PauseCircle size={14} className="text-[#996f21]" /> Tahan Nota (F8)
            </button>
            {pendingOrders.length > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="text-[#6d675d] text-[11px]">Buka Nota (F9):</span>
                {pendingOrders.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => recallPendingOrder(o.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#b27f26]/20 border border-[#cf9a3a]/40 text-[#b68927] font-semibold"
                  >
                    <PlayCircle size={12} /> {o.note}
                  </button>
                ))}
              </div>
            )}
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="text-[#9e3d25] hover:text-[#bc4529] text-xs font-semibold px-2"
            >
              Kosongkan Keranjang
            </button>
          )}
        </div>
      </div>

      {/* Kolom Kanan: Panel Total Tagihan & Tombol Bayar */}
      <div className="w-80 flex flex-col justify-between bg-[#fbf8f2] rounded-2xl border border-[#ece4d6] p-4 shrink-0">
        <div className="space-y-4">
          {/* Big Total Display */}
          <div className="bg-[#d7f4f2]/40 border border-[#b5e3e0]/60 rounded-2xl p-4 text-right">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#21aa9d] block">Total Tagihan</span>
            <span className="text-3xl font-black text-[#1a827a] block mt-1">{formatRupiah(summary.grandTotal)}</span>
            <span className="text-[11px] text-[#6d675d] mt-1 block">Total Item: {summary.totalItems} barang</span>
          </div>

          {/* Rincian Subtotal & Diskon */}
          <div className="space-y-2.5 border-t border-[#ece4d6] pt-3">
            <div className="flex justify-between text-[#4a453f]">
              <span>Subtotal Barang:</span>
              <span className="font-semibold">{formatRupiah(summary.subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-[#4a453f]">
              <span className="flex items-center gap-1">
                <Percent size={12} className="text-[#996f21]" /> Diskon Faktur (%):
              </span>
              <input
                type="number"
                min={0}
                max={100}
                value={globalDiscount}
                onChange={(e) => setGlobalDiscount(Math.max(0, Math.min(100, Number(e.target.value))))}
                className="w-14 text-center bg-[#ffffff] border border-[#ddd3c2] rounded px-1.5 py-0.5 text-[#1b1a17] font-bold"
              />
            </div>
            {summary.discountAmount > 0 && (
              <div className="flex justify-between text-[#996f21]">
                <span>Potongan Diskon:</span>
                <span className="font-semibold">-{formatRupiah(summary.discountAmount)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tombol Aksi Bayar */}
        <div className="space-y-2 pt-4 border-t border-[#ece4d6]">
          <button
            onClick={() => setIsPaymentOpen(true)}
            disabled={cartItems.length === 0}
            className="w-full py-3.5 rounded-2xl bg-[#161512] hover:bg-[#161512] disabled:opacity-30 disabled:hover:bg-[#161512] text-[#ffffff] font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition"
          >
            <CreditCard size={18} />
            <span>BAYAR SEKARANG (F7 / F12)</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        grandTotal={summary.grandTotal}
        onConfirmPayment={handleFinishPayment}
      />
      <ReceiptPreviewModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        transactionData={completedTransaction}
      />
    </div>
  );
};
