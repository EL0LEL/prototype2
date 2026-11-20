/**
 * AutocompleteSearch.jsx
 * Input pencarian cepat barang dengan live dropdown auto-suggest ala iPOS 5.
 */

import React, { useState, useRef, useEffect } from 'react';
import { Search, Barcode, X } from 'lucide-react';
import { formatRupiah } from '../../utils/currencyFormatter';

export const AutocompleteSearch = ({ items = [], onSelectItem, placeholder = 'Ketik Nama Barang / Barcode (F1)...', autoFocus = false }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Filter items berdasarkan nama atau barcode
  const filteredItems = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return items
      .filter((item) => {
        const nameMatch = (item.name || item.namaBarang || '').toLowerCase().includes(q);
        const barcodeMatch = (item.barcode || '').toLowerCase().includes(q);
        return nameMatch || barcodeMatch;
      })
      .slice(0, 8); // Maksimal tampil 8 rekomendasi
  }, [items, query]);

  useEffect(() => {
    if (filteredItems.length > 0) {
      setIsOpen(true);
      setSelectedIndex(0);
    } else {
      setIsOpen(false);
    }
  }, [filteredItems]);

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handlePick(filteredItems[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handlePick = (item) => {
    onSelectItem(item);
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-[#6d675d]" size={16} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-[#ffffff] text-[#24221e] placeholder-[#738876] text-sm pl-9 pr-8 py-2 rounded-lg border border-[#ddd3c2] focus:outline-none focus:border-[#b5e3df] focus:ring-1 focus:ring-[#b5e3df] transition"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-2.5 text-[#6d675d] hover:text-[#1b1a17]"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Floating Dropdown Suggestion */}
      {isOpen && filteredItems.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 left-0 right-0 mt-1 bg-[#fbf8f2] border border-[#ddd3c2] rounded-lg shadow-2xl overflow-hidden max-h-72 overflow-y-auto"
        >
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handlePick(item)}
              onMouseEnter={() => setSelectedIndex(idx)}
              className={`px-3 py-2.5 flex items-center justify-between cursor-pointer border-b border-[#ece4d6]/60 transition ${
                selectedIndex === idx ? 'bg-[#0f9f94]/30 text-[#1b1a17]' : 'text-[#4a453f] hover:bg-[#ece4d6]/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Barcode size={16} className="text-[#6d675d]" />
                <div>
                  <div className="font-medium text-xs sm:text-sm">{item.name || item.namaBarang}</div>
                  <div className="text-[11px] text-[#6d675d] font-mono">
                    {item.barcode} • Stok: <span className="text-[#996f21] font-semibold">{item.stok || item.stock || 0}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs sm:text-sm font-semibold text-[#2d884c]">
                  {formatRupiah(item.hargaJual || item.price || 0)}
                </div>
                <div className="text-[10px] text-[#6d675d]">/{item.satuan || 'PCS'}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
