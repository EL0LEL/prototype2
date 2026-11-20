/**
 * MultiUomSelector.jsx
 * Dropdown pemilihan satuan Multi-UOM (DUS, RENCENG, PCS) dengan harga otomatis.
 */

import React from 'react';
import { formatRupiah } from '../../utils/currencyFormatter';

export const MultiUomSelector = ({ uomList = [], currentUom, onChangeUom, disabled = false }) => {
  if (!uomList || uomList.length <= 1) {
    return (
      <span className="text-xs font-semibold px-2 py-1 rounded bg-[#ece4d6] border border-[#ddd3c2] text-[#4a453f]">
        {currentUom || 'PCS'}
      </span>
    );
  }

  return (
    <select
      value={currentUom}
      disabled={disabled}
      onChange={(e) => onChangeUom(e.target.value)}
      className="text-xs bg-[#fbf8f2] text-[#2f2c28] border border-[#ddd3c2] rounded px-2 py-1 focus:outline-none focus:border-[#b5e3df] font-medium cursor-pointer"
    >
      {uomList.map((u) => (
        <option key={u.code} value={u.code}>
          {u.code} ({formatRupiah(u.price, false)})
        </option>
      ))}
    </select>
  );
};
