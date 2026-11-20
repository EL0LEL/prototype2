/**
 * AntreanNotaSales.jsx
 * Antrean pesanan masuk dari HP Salesman yang ditransmisikan via Wi-Fi Direct.
 */

import React from 'react';
import { useSync } from '../../../../contexts/SyncContext';
import { useCart } from '../../../../contexts/CartContext';
import { formatRupiah } from '../../../../utils/currencyFormatter';
import { Smartphone, CheckCircle, Clock, CheckCheck } from 'lucide-react';

export const AntreanNotaSales = ({ onProcessToCart }) => {
  const { incomingSalesOrders, acceptOrderIntoCashier } = useSync();
  const { addToCart } = useCart();

  const handlePullOrder = (order) => {
    acceptOrderIntoCashier(order.id);
    // Tambahkan item dari salesman ke keranjang kasir
    order.items?.forEach((item) => {
      addToCart({ id: item.id || Math.random(), name: item.name, hargaJual: item.price, satuan: item.uom }, item.uom, item.qty);
    });
    if (onProcessToCart) onProcessToCart();
  };

  const timeOf = (ts) => {
    try {
      return new Date(ts).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Header chat: avatar + status online ala Telegram */}
      <div className="bg-[#bfe6d3] p-4 rounded-[26px] flex items-center gap-3">
        <div className="relative w-11 h-11 rounded-full bg-[#161512] flex items-center justify-center">
          <Smartphone className="text-white" size={20} />
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#30d5c8] border-2 border-[#ece4d6]" />
        </div>
        <div>
          <h3 className="font-bold text-sm text-[#1b1a17]">Antrean Nota Masuk dari HP Salesman</h3>
          <p className="text-[#6d675d]">Wi-Fi Direct · pesanan luar toko siap ditarik kasir untuk pembayaran & cetak struk.</p>
        </div>
      </div>

      {/* Pesanan sebagai bubble pesan masuk ala WhatsApp */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {incomingSalesOrders.map((order) => (
          <div key={order.id} className="rounded-[28px] bg-[#f8d9b4] p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono font-bold text-[#1a827a]">{order.id}</span>
              <span className="text-[10px] bg-white/80 text-[#161512] px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold">
                <Clock size={11} /> {order.status}
              </span>
            </div>
            <div>
              <div className="font-bold text-[#1b1a17] text-[13px]">{order.customer}</div>
              <div className="text-[#6d675d] text-[11px]">Sales: {order.salesman}</div>
            </div>
            <div className="bg-white/70 p-3 rounded-2xl space-y-1.5">
              {order.items?.map((item, idx) => (
                <div key={idx} className="flex justify-between gap-2 text-[#4a453f]">
                  <span>{item.qty} {item.uom} x {item.name}</span>
                  <span className="font-semibold text-[#24221e]">{formatRupiah(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[#6d675d]">Total Nilai Order:</span>
              <span className="font-extrabold text-[#1a827a] text-sm">{formatRupiah(order.totalAmount)}</span>
            </div>
            <button
              onClick={() => handlePullOrder(order)}
              className="w-full py-3 bg-[#161512] hover:bg-[#2c2a26] text-white font-medium rounded-full flex items-center justify-center gap-1.5 transition"
            >
              <CheckCircle size={14} /> Tarik ke Kasir & Proses Pembayaran
            </button>
            <div className="flex items-center justify-end gap-1 text-[10px] text-[#738876]">
              {timeOf(order.timestamp)} <CheckCheck size={13} className="text-[#1a827a]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
