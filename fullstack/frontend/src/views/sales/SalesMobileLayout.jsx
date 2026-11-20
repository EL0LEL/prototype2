/**
 * SalesMobileLayout.jsx
 * Tampilan khusus smartphone portrait (Pencatat / Salesman HP).
 * Menampilkan katalog barang (tanpa harga beli) & keranjang pesanan yang ditransmisikan ke tablet kasir.
 */

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSync } from '../../contexts/SyncContext';
import { formatRupiah } from '../../utils/currencyFormatter';
import { Search, ShoppingCart, Send, LogOut, CheckCircle2, Plus, Store, Wheat, Droplets, Candy, Soup } from 'lucide-react';

export const SalesMobileLayout = () => {
  const { currentUser, logout } = useAuth();
  const { sendOrderToCashier, syncStatus } = useSync();
  const [customerName, setCustomerName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isSentSuccess, setIsSentSuccess] = useState(false);

  // Katalog barang tanpa harga modal beli untuk salesman
  const catalog = [
    { id: '1', name: 'Beras Pandan Wangi 5kg', price: 75000, uom: 'KARUNG' },
    { id: '2', name: 'Minyak Goreng Bimoli 2L', price: 36000, uom: 'POUCH' },
    { id: '3', name: 'Gula Pasir Gulaku 1kg', price: 17500, uom: 'BKS' },
    { id: '4', name: 'Indomie Goreng Original', price: 122000, uom: 'DUS' },
  ];

  const filteredCatalog = catalog.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToMobileCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === product.id);
      if (exist) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleSendOrder = () => {
    if (!customerName.trim() || cart.length === 0) {
      alert('Nama pelanggan dan item barang wajib diisi!');
      return;
    }

    const totalAmount = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
    sendOrderToCashier({
      salesman: currentUser?.name || 'Salesman HP',
      customer: customerName,
      itemsCount: cart.length,
      totalAmount,
      items: cart,
    });

    setIsSentSuccess(true);
    setCart([]);
    setCustomerName('');
    setTimeout(() => setIsSentSuccess(false), 3000);
  };

  const totalAmount = cart.reduce((acc, i) => acc + i.price * i.qty, 0);

  const ICONS = { '1': Wheat, '2': Droplets, '3': Candy, '4': Soup };
  const PASTEL = ['#f2c4c0', '#f8d9b4', '#d4cdf6', '#bfe6d3'];
  const CATS = ['Semua', 'Beras', 'Minyak', 'Gula', 'Mie'];
  const qtyOf = (id) => cart.find((i) => i.id === id)?.qty || 0;

  return (
    <div className="h-screen w-screen bg-[#fbf7f0] text-[#161512] flex flex-col text-xs overflow-hidden">
      <div className="px-5 pt-5 pb-3 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#161512] text-white font-medium flex items-center justify-center">{(currentUser?.name || 'S')[0]}</div>
            <div className="leading-tight">
              <div className="text-[11px] text-[#7a746a]">Pencatat · Wi-Fi Direct {syncStatus === 'LISTENING' || syncStatus === 'CONNECTED' ? 'aktif' : 'mati'}</div>
              <div className="font-medium text-sm">{currentUser?.name || 'Salesman HP'}</div>
            </div>
          </div>
          <button onClick={logout} aria-label="Keluar akun" className="w-10 h-10 rounded-full bg-[#efe7dc] flex items-center justify-center text-[#4a463f]"><LogOut size={16} /></button>
        </div>
        <h1 className="mt-5 text-[32px] leading-[1.05] tracking-[-0.025em] font-medium">Catat pesanan<br />warung langganan</h1>
        <div className="relative mt-4">
          <Search size={15} className="absolute left-4 top-3.5 text-[#7a746a]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari barang sembako"
            className="w-full bg-white border border-[#ece4d6] rounded-full pl-10 pr-4 py-3 text-[13px] placeholder-[#a39c8f] focus:outline-none focus:border-[#161512] focus:ring-4 focus:ring-[#30d5c8]/30"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-5 space-y-4">
        {isSentSuccess && (
          <div role="status" className="p-3 bg-[#bfe6d3] rounded-2xl flex items-center gap-2 font-medium">
            <CheckCircle2 size={16} /> Pesanan terkirim ke antrean kasir tablet.
          </div>
        )}
        <label className="block bg-[#efe7dc] rounded-3xl p-3.5">
          <span className="flex items-center gap-1.5 text-[#4a463f] text-[11px] font-medium mb-1.5"><Store size={12} /> Nama toko pelanggan</span>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Contoh: Warung Bu Siti"
            className="w-full bg-white rounded-full px-4 py-2.5 text-[13px] placeholder-[#a39c8f] focus:outline-none focus:ring-4 focus:ring-[#30d5c8]/30"
          />
        </label>

        <div className="flex gap-2 overflow-x-auto">
          {CATS.map((c, i) => (
            <span key={c} className={`shrink-0 px-4 py-2 rounded-full font-medium ${i === 0 ? 'bg-[#161512] text-white' : 'bg-white border border-[#ece4d6] text-[#4a463f]'}`}>{c}</span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filteredCatalog.map((item, i) => {
            const Icon = ICONS[item.id] || Store;
            const q = qtyOf(item.id);
            return (
              <button
                key={item.id}
                onClick={() => addToMobileCart(item)}
                style={{ background: PASTEL[i % 4] }}
                className="rounded-[26px] p-3.5 min-h-[178px] text-left flex flex-col justify-between active:scale-[0.98] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#161512]"
              >
                <div className="flex items-start justify-between">
                  <span className="w-9 h-9 rounded-xl bg-white/80 flex items-center justify-center"><Icon size={17} /></span>
                  {q > 0 && <span className="min-w-[24px] h-6 px-1.5 rounded-full bg-[#161512] text-white text-[11px] font-medium flex items-center justify-center">{q}</span>}
                </div>
                <div>
                  <div className="text-[15px] font-medium leading-tight">{item.name}</div>
                  <div className="text-[11px] text-[#161512]/65 mt-1">per {item.uom}</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[13px]">{formatRupiah(item.price)}</span>
                  <span className="w-7 h-7 rounded-full bg-[#161512] text-white flex items-center justify-center"><Plus size={14} /></span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {cart.length > 0 && (
        <div className="shrink-0 m-3 mt-0 rounded-[28px] bg-[#161512] text-white p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-medium"><ShoppingCart size={16} className="text-[#30d5c8]" />{cart.length} jenis barang</span>
            <span className="text-base font-medium">{formatRupiah(totalAmount)}</span>
          </div>
          <button onClick={handleSendOrder} className="w-full py-3 rounded-full bg-[#30d5c8] hover:bg-[#6fe3d8] text-[#07322f] font-medium flex items-center justify-center gap-2">
            <Send size={15} /> Kirim ke kasir tablet
          </button>
        </div>
      )}
    </div>
  );
};
