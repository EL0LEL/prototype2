/**
 * HeaderBar.jsx
 * Bar atas layar kasir iPOS 5 Toko Rina 2: pil krem dengan status sinkronisasi dan akun.
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSync } from '../../contexts/SyncContext';
import { formatDateIndo } from '../../utils/dateFormatter';
import { APP_CONFIG } from '../../config/appConstants';
import { Wifi, WifiOff, LogOut } from 'lucide-react';

export const HeaderBar = ({ onOpenShiftModal }) => {
  const { currentUser, logout, isAdmin, isKasir } = useAuth();
  const { syncStatus, pendingOrderCount } = useSync();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const roleLabel = isAdmin ? 'Admin' : isKasir ? 'Kasir' : 'Pencatat';
  const initials = (currentUser?.name || 'K').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  const isOnline = syncStatus === 'LISTENING' || syncStatus === 'CONNECTED';

  return (
    <header className="h-16 shrink-0 rounded-[26px] bg-[#fbf7f0] flex items-center justify-between pl-3 pr-4 select-none">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-[#161512] text-[#30d5c8] font-black text-sm flex items-center justify-center">R2</div>
        <div>
          <div className="text-[15px] font-medium leading-tight">{APP_CONFIG.STORE_NAME}</div>
          <div className="text-[11px] text-[#7a746a] leading-tight">{APP_CONFIG.STORE_TAGLINE}</div>
        </div>
      </div>

      <div className="hidden md:block text-[13px] text-[#7a746a]">{formatDateIndo(currentTime, true, true)}</div>

      <div className="flex items-center gap-2">
        <span className="flex items-center gap-2 bg-white border border-[#ece4d6] rounded-full px-3.5 py-1.5 text-xs font-medium">
          {isOnline ? <Wifi size={13} className="text-[#0a7d73]" /> : <WifiOff size={13} className="text-[#b04a33]" />}
          <span className="hidden sm:inline">{isOnline ? 'Wi-Fi Direct aktif' : 'Offline standalone'}</span>
          {pendingOrderCount > 0 && (
            <span className="bg-[#30d5c8] text-[#07322f] text-[10px] font-bold min-w-[18px] text-center px-1.5 rounded-full">{pendingOrderCount}</span>
          )}
        </span>
        {onOpenShiftModal && (
          <button onClick={onOpenShiftModal} className="bg-[#161512] text-white rounded-full px-4 py-1.5 text-xs font-medium hover:bg-[#2c2a26]">Tutup shift</button>
        )}
        <div className="flex items-center gap-2 bg-[#efe7dc] rounded-full pl-1 pr-3 py-1">
          <span className="w-8 h-8 rounded-full bg-[#161512] text-white text-[11px] font-medium flex items-center justify-center">{initials}</span>
          <span className="hidden sm:block leading-tight">
            <span className="block text-xs font-medium">{currentUser?.name || 'Kasir'}</span>
            <span className="block text-[10px] text-[#7a746a]">{roleLabel}</span>
          </span>
        </div>
        <button onClick={logout} title="Keluar akun" aria-label="Keluar akun" className="w-9 h-9 rounded-full flex items-center justify-center text-[#6f685d] hover:bg-[#efe7dc]">
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
};
