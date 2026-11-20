/**
 * FormFakturBeli.jsx
 * Form input faktur pembelian barang masuk dari pemasok (menambah stok otomatis).
 */

import React, { useState } from 'react';
import { generateInvoiceNumber, INVOICE_PREFIXES } from '../../../../utils/invoiceGenerator';
import { formatRupiah } from '../../../../utils/currencyFormatter';
import { Save, Plus, Trash2 } from 'lucide-react';

export const FormFakturBeli = ({ onSaved }) => {
  const [invoiceNo] = useState(generateInvoiceNumber(INVOICE_PREFIXES.PEMBELIAN));
  const [supplier, setSupplier] = useState('PT Indofood Sukses Makmur');
  const [paymentType, setPaymentType] = useState('TEMPO'); // 'TUNAI' | 'TEMPO'
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState([
    { name: 'Indomie Goreng Dus', uom: 'DUS', qty: 20, price: 108000, subtotal: 2160000 },
    { name: 'Minyak Bimoli 2L Dus', uom: 'DUS', qty: 10, price: 180000, subtotal: 1800000 },
  ]);

  const totalTagihan = items.reduce((acc, i) => acc + i.subtotal, 0);

  const handleAddItemRow = () => {
    setItems([...items, { name: 'Gula Pasir 50kg Karung', uom: 'KARUNG', qty: 5, price: 650000, subtotal: 3250000 }]);
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert(`Faktur Pembelian ${invoiceNo} berhasil disimpan! Stok barang otomatis bertambah.`);
    if (onSaved) onSaved();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-[#ece4d6] pb-2">
        <h2 className="font-bold text-sm text-[#1b1a17]">Input Faktur Pembelian Supplier ({invoiceNo})</h2>
        <span className="text-[11px] bg-[#eae4da] text-[#4c4841] border border-[#e6ddcf] px-2.5 py-0.5 rounded">
          Stok Otomatis Masuk
        </span>
      </div>

      <form onSubmit={handleSave} className="space-y-4 bg-[#ffffff] border border-[#ece4d6] p-4 rounded-2xl">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-[#6d675d] block mb-1">Pilih Supplier</label>
            <select
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="w-full bg-[#fbf8f2] border border-[#ddd3c2] rounded-lg p-2 text-[#1b1a17]"
            >
              <option>PT Indofood Sukses Makmur</option>
              <option>Distributor Beras Cianjur Jaya</option>
              <option>Agen Minyak Goreng Curah & Pouch</option>
            </select>
          </div>
          <div>
            <label className="text-[#6d675d] block mb-1">Jenis Pembayaran</label>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              className="w-full bg-[#fbf8f2] border border-[#ddd3c2] rounded-lg p-2 text-[#1b1a17]"
            >
              <option value="TEMPO">Tempo / Hutang Dagang</option>
              <option value="TUNAI">Tunai (Lunas Langsung)</option>
            </select>
          </div>
          {paymentType === 'TEMPO' && (
            <div>
              <label className="text-[#6d675d] block mb-1">Jatuh Tempo Pembayaran</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-[#fbf8f2] border border-[#ddd3c2] rounded-lg p-2 text-[#1b1a17]"
              />
            </div>
          )}
        </div>

        {/* Tabel Input Barang */}
        <div className="border border-[#ece4d6] rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#fbf8f2] text-[#6d675d] border-b border-[#ece4d6]">
              <tr>
                <th className="p-2">Nama Barang Beli</th>
                <th className="p-2">Satuan</th>
                <th className="p-2 w-20">Qty</th>
                <th className="p-2 text-right">Harga Modal Beli</th>
                <th className="p-2 text-right">Subtotal</th>
                <th className="p-2 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ece4d6] text-[#2f2c28]">
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2 font-mono text-[#21aa9d]">{item.uom}</td>
                  <td className="p-2 font-bold">{item.qty}</td>
                  <td className="p-2 text-right">{formatRupiah(item.price)}</td>
                  <td className="p-2 text-right font-semibold text-[#4c4841]">{formatRupiah(item.subtotal)}</td>
                  <td className="p-2 text-center">
                    <button
                      type="button"
                      onClick={() => setItems(items.filter((_, i) => i !== idx))}
                      className="text-[#738876] hover:text-[#9e3d25]"
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="button"
          onClick={handleAddItemRow}
          className="text-xs text-[#1a827a] hover:text-[#21aa9d] flex items-center gap-1 font-semibold"
        >
          <Plus size={13} /> Tambah Baris Barang Masuk
        </button>

        {/* Total & Submit */}
        <div className="flex items-center justify-between border-t border-[#ece4d6] pt-3">
          <div className="text-[#6d675d]">
            Total Tagihan Faktur: <span className="text-base font-bold text-[#645e55] ml-1">{formatRupiah(totalTagihan)}</span>
          </div>
          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#688a63] hover:bg-[#7ea078] text-[#1b1a17] font-semibold shadow"
          >
            <Save size={14} /> Simpan Faktur Masuk (F12)
          </button>
        </div>
      </form>
    </div>
  );
};
