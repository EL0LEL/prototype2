/**
 * CashierTabletLayout.jsx
 * Tampilan khusus Kasir POS Tablet (Landscape): fokus pada kasir dan transaksi.
 */

import React from 'react';
import { LayarKasirPos } from '../admin/tabs/03_penjualan/LayarKasirPos';
import { HeaderBar } from '../../components/common/HeaderBar';

export const CashierTabletLayout = () => {
  return (
    <div className="h-screen w-screen flex flex-col gap-3 p-3 bg-[#c3ece0] text-[#161512] overflow-hidden select-none">
      <HeaderBar />
      <div className="flex-1 overflow-hidden rounded-[30px] bg-[#fbf7f0] p-4">
        <LayarKasirPos isCashierOnly={true} />
      </div>
    </div>
  );
};
