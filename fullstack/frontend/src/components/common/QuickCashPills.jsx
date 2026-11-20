/**
 * QuickCashPills.jsx
 * Tombol nominal cepat pembayaran tunai kasir (Uang Pas, 50rb, 100rb, dll).
 */

import React from 'react';
import { formatRupiah } from '../../utils/currencyFormatter';

export const QuickCashPills = ({ grandTotal = 0, onSelectCashAmount }) => {
  const quickAmounts = [
    { label: 'Uang Pas', amount: grandTotal },
    { label: '50.000', amount: 50000 },
    { label: '100.000', amount: 100000 },
    { label: '200.000', amount: 200000 },
    { label: '500.000', amount: 500000 },
  ];

  return (
    <div className="flex flex-wrap gap-1.5">
      {quickAmounts.map((pill, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onSelectCashAmount(pill.amount)}
          className="text-xs bg-[#ece4d6] hover:bg-[#0f9f94]/30 text-[#2f2c28] hover:text-[#21aa9d] border border-[#ddd3c2] hover:border-[#b5e3df] px-2.5 py-1.5 rounded transition font-medium"
        >
          {pill.label}
        </button>
      ))}
    </div>
  );
};
