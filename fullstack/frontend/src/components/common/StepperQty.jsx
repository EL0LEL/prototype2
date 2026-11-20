/**
 * StepperQty.jsx
 * Tombol pengatur kuantitas kasir [-] [ 5 ] [+] dengan input langsung.
 */

import React from 'react';
import { Minus, Plus } from 'lucide-react';

export const StepperQty = ({ value = 1, min = 1, max = 9999, onChange }) => {
  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  const handleChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      onChange(Math.max(min, Math.min(val, max)));
    }
  };

  return (
    <div className="inline-flex items-center rounded border border-[#ddd3c2] bg-[#fbf8f2] overflow-hidden">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        className="px-2 py-1 text-[#6d675d] hover:text-[#1b1a17] hover:bg-[#ece4d6] disabled:opacity-30 disabled:hover:bg-transparent transition"
      >
        <Minus size={12} />
      </button>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        className="w-10 text-center text-xs bg-transparent text-[#1b1a17] font-semibold focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        className="px-2 py-1 text-[#6d675d] hover:text-[#1b1a17] hover:bg-[#ece4d6] disabled:opacity-30 disabled:hover:bg-transparent transition"
      >
        <Plus size={12} />
      </button>
    </div>
  );
};
