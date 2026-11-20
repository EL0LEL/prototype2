/**
 * TabPengaturanSistem.jsx
 * Pintu masuk Tab 7: Pengaturan Sistem: Akun & Approval, Profil Toko & Printer, dan Backup Data.
 */

import React, { useState } from 'react';
import { UserDanApproval } from './UserDanApproval';
import { ProfilTokoPrinter } from './ProfilTokoPrinter';
import { BackupRestoreData } from './BackupRestoreData';
import { Users, Store, Database } from 'lucide-react';
import { useAuth } from '../../../../contexts/AuthContext';

export const TabPengaturanSistem = ({ onOpenApproval }) => {
  const [subTab, setSubTab] = useState('users');
  const { pendingUsers } = useAuth();

  const SUB_MENUS = [
    { id: 'users', label: 'Manajemen Akun & Approval Gateway', icon: Users, badge: pendingUsers.length },
    { id: 'toko', label: 'Profil Toko & Printer Thermal', icon: Store },
    { id: 'backup', label: 'Backup & Restore Database SQLite', icon: Database },
  ];

  return (
    <div className="h-full w-full flex flex-col text-xs">
      <div className="px-8 pt-1 pb-4 flex items-center gap-2 shrink-0 overflow-x-auto">
        {SUB_MENUS.map((menu) => {
          const Icon = menu.icon;
          const isCurrent = subTab === menu.id;
          return (
            <button
              key={menu.id}
              onClick={() => setSubTab(menu.id)}
              className={`flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full text-[13px] font-medium transition shrink-0 ${
                isCurrent
                  ? 'bg-[#161512] text-white'
                  : 'bg-white text-[#4a463f] border border-[#ece4d6] hover:border-[#161512]'
              }`}
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center ${isCurrent ? 'bg-white/15' : 'bg-[#f4eee4]'}`}><Icon size={14} /></span>
              <span>{menu.label}</span>
              {menu.badge > 0 && (
                <span className="bg-[#30d5c8] text-[#07322f] text-[10px] font-bold px-1.5 rounded-full">
                  {menu.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-auto px-8 pb-6 pt-1">
        {subTab === 'users' && <UserDanApproval onOpenApprovalModal={onOpenApproval} />}
        {subTab === 'toko' && <ProfilTokoPrinter />}
        {subTab === 'backup' && <BackupRestoreData />}
      </div>
    </div>
  );
};
