/**
 * AdminRibbonLayout.jsx
 * Layout utama Admin Tablet Landscape: 7 tab, gaya editorial bento.
 * Kiri: rail ikon. Tengah: headline + isi tab. Kanan (layar lebar): profil, perangkat, dan approval cepat.
 */

import React, { useState } from 'react';
import { ShiftCloseModal } from '../../components/modals/ShiftCloseModal';
import { UserApprovalModal } from '../../components/modals/UserApprovalModal';
import { useAuth } from '../../contexts/AuthContext';
import { useSync } from '../../contexts/SyncContext';
import { formatDateIndo } from '../../utils/dateFormatter';
import { APP_CONFIG } from '../../config/appConstants';
import {
  Package, ShoppingCart, Truck, RefreshCw, BarChart3, FileSpreadsheet,
  Settings, LogOut, Bell, Wifi, WifiOff, Check, X,
} from 'lucide-react';

import { TabMasterData } from './tabs/01_master/TabMasterData';
import { TabPembelian } from './tabs/02_pembelian/TabPembelian';
import { TabPenjualan } from './tabs/03_penjualan/TabPenjualan';
import { TabPersediaan } from './tabs/04_persediaan/TabPersediaan';
import { TabDashboardLaba } from './tabs/05_dashboard/TabDashboardLaba';
import { TabLaporan } from './tabs/06_laporan/TabLaporan';
import { TabPengaturanSistem } from './tabs/07_pengaturan/TabPengaturanSistem';

const TABS = [
  { id: 'master', label: '1. Master Data', icon: Package, headline: ['Atur barang, satuan,', 'dan relasi toko'] },
  { id: 'pembelian', label: '2. Pembelian', icon: Truck, headline: ['Catat barang masuk', 'dan hutang usaha'] },
  { id: 'penjualan', label: '3. Penjualan', icon: ShoppingCart, headline: ['Layani pembeli', 'lebih cepat'] },
  { id: 'persediaan', label: '4. Persediaan', icon: RefreshCw, headline: ['Jaga stok tetap', 'sama dengan rak'] },
  { id: 'dashboard', label: '5. Dashboard Laba', icon: BarChart3, headline: ['Pantau laba toko', 'dari hari ke hari'] },
  { id: 'laporan', label: '6. Pusat Laporan', icon: FileSpreadsheet, headline: ['Laporan siap cetak', 'untuk pembukuan'] },
  { id: 'pengaturan', label: '7. Pengaturan', icon: Settings, headline: ['Kelola akun dan', 'akses karyawan'] },
];

const ROLE_COLOR = { admin: '#f8d9b4', kasir: '#d4cdf6', pencatat: '#bfe6d3' };
const ROLE_LABEL = { admin: 'Admin', kasir: 'Kasir', pencatat: 'Pencatat' };
const initialsOf = (name = '') => name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

export const AdminRibbonLayout = () => {
  const [activeTab, setActiveTab] = useState('penjualan');
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const { currentUser, users, pendingUsers, approveUser, rejectUser, logout } = useAuth();
  const { syncStatus, connectedPeers, pendingOrderCount } = useSync();

  const isOnline = syncStatus === 'LISTENING' || syncStatus === 'CONNECTED';
  const current = TABS.find((t) => t.id === activeTab) || TABS[2];
  const approved = users.filter((u) => u.status !== 'pending');

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'master': return <TabMasterData />;
      case 'pembelian': return <TabPembelian />;
      case 'penjualan': return <TabPenjualan />;
      case 'persediaan': return <TabPersediaan />;
      case 'dashboard': return <TabDashboardLaba />;
      case 'laporan': return <TabLaporan />;
      case 'pengaturan': return <TabPengaturanSistem onOpenApproval={() => setIsApprovalModalOpen(true)} />;
      default: return <TabPenjualan />;
    }
  };

  const segments = [
    ...['admin', 'kasir', 'pencatat'].map((r) => ({ key: r, label: ROLE_LABEL[r], color: ROLE_COLOR[r], n: approved.filter((u) => u.role === r).length })),
    { key: 'pending', label: 'Menunggu', color: '#f2c4c0', n: pendingUsers.length },
  ];

  return (
    <div className="h-screen w-screen flex gap-3 p-3 bg-[#c3ece0] text-[#161512] overflow-hidden select-none">
      {/* Rail ikon kiri */}
      <aside className="w-[76px] shrink-0 rounded-[30px] bg-[#efe7dc] flex flex-col items-center py-5 gap-2">
        <div className="w-11 h-11 rounded-2xl bg-[#161512] text-[#30d5c8] font-black text-sm flex items-center justify-center mb-4" title={APP_CONFIG.STORE_NAME}>
          R2
        </div>
        <nav className="flex-1 flex flex-col items-center gap-2 overflow-y-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                title={tab.label}
                aria-label={tab.label}
                className={`relative w-12 h-12 shrink-0 rounded-full flex items-center justify-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#30d5c8] ${
                  isActive ? 'bg-[#161512] text-white' : 'text-[#6f685d] hover:bg-white'
                }`}
              >
                <Icon size={19} />
                {tab.id === 'pengaturan' && pendingUsers.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#30d5c8] ring-2 ring-[#efe7dc]" />
                )}
                {tab.id === 'penjualan' && pendingOrderCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#30d5c8] ring-2 ring-[#efe7dc]" />
                )}
              </button>
            );
          })}
        </nav>
        <button onClick={logout} title="Keluar akun" aria-label="Keluar akun" className="w-11 h-11 rounded-full flex items-center justify-center text-[#6f685d] hover:bg-white">
          <LogOut size={18} />
        </button>
        <div className="w-11 h-11 rounded-full bg-[#161512] text-white text-xs font-medium flex items-center justify-center ring-2 ring-white">
          {initialsOf(currentUser?.name)}
        </div>
      </aside>

      {/* Kanvas utama */}
      <main className="flex-1 min-w-0 rounded-[30px] bg-[#fbf7f0] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-8 pt-6">
          <span className="text-[13px] text-[#7a746a]">{formatDateIndo(new Date(), true, true)}</span>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 bg-white border border-[#ece4d6] rounded-full px-3.5 py-1.5 text-xs font-medium">
              {isOnline ? <Wifi size={13} className="text-[#0a7d73]" /> : <WifiOff size={13} className="text-[#b04a33]" />}
              {isOnline ? 'Wi-Fi Direct aktif' : 'Offline standalone'}
            </span>
            <button onClick={() => setIsShiftModalOpen(true)} className="bg-[#161512] text-white rounded-full px-4 py-1.5 text-xs font-medium hover:bg-[#2c2a26]">
              Tutup shift
            </button>
          </div>
        </div>
        <h1 className="px-8 mt-3 mb-5 text-[38px] leading-[1.04] tracking-[-0.025em] font-medium">
          {current.headline[0]}<br />{current.headline[1]}
        </h1>
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">{renderActiveTabContent()}</div>
      </main>

      {/* Panel kanan: profil, perangkat, komposisi akun, approval cepat */}
      <aside className="hidden min-[1400px]:flex w-[300px] shrink-0 flex-col gap-3 rounded-[30px] bg-[#efe7dc] p-5 overflow-y-auto">
        <div className="flex items-center justify-between text-[#4a463f]">
          <span className="relative">
            <Bell size={19} />
            {pendingUsers.length > 0 && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#30d5c8] ring-2 ring-[#efe7dc]" />}
          </span>
          <button onClick={() => setActiveTab('pengaturan')} title="Pengaturan" aria-label="Pengaturan"><Settings size={19} /></button>
        </div>
        <div className="text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-[#161512] text-white text-2xl font-medium flex items-center justify-center ring-4 ring-white">
            {initialsOf(currentUser?.name)}
          </div>
          <div className="mt-3 text-lg font-medium leading-tight">{currentUser?.name}</div>
          <div className="text-xs text-[#7a746a]">{ROLE_LABEL[currentUser?.role] || 'Pengguna'} · {APP_CONFIG.STORE_NAME}</div>
        </div>

        <div className="bg-white rounded-2xl p-3 flex items-center justify-between">
          <span className="flex items-center gap-2 text-[13px] font-medium"><Wifi size={15} className="text-[#0a7d73]" />{connectedPeers?.length || 0} perangkat terhubung</span>
          <span className="flex -space-x-2">
            {(connectedPeers || []).slice(0, 3).map((p) => (
              <span key={p.id} title={p.name} className="w-7 h-7 rounded-full bg-[#bfe6d3] ring-2 ring-white text-[10px] font-medium flex items-center justify-center">{initialsOf(p.name.replace('HP Salesman ', ''))}</span>
            ))}
          </span>
        </div>

        <div className="bg-white rounded-3xl p-4">
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-[13px] font-medium">Komposisi akun</span>
            <span className="text-xs text-[#7a746a]">{users.length} akun</span>
          </div>
          <div className="flex h-3.5 rounded-full overflow-hidden gap-0.5">
            {segments.filter((s) => s.n > 0).map((s) => (
              <span key={s.key} style={{ background: s.color, flexGrow: s.n }} />
            ))}
          </div>
          <ul className="mt-3 space-y-1.5">
            {segments.map((s) => (
              <li key={s.key} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />{s.label}</span>
                <span className="font-medium">{s.n}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[13px] font-medium mb-2 px-1">Menunggu persetujuan</div>
          {pendingUsers.length === 0 ? (
            <div className="rounded-2xl bg-[#bfe6d3] p-3.5 text-xs leading-relaxed">Semua pendaftaran sudah ditinjau. Akun baru akan muncul di sini.</div>
          ) : (
            <div className="space-y-2">
              {pendingUsers.map((u) => (
                <div key={u.id} className="rounded-2xl bg-[#f2c4c0] p-3 flex items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium truncate">{u.name}</div>
                    <div className="text-[11px] text-[#161512]/65">{ROLE_LABEL[u.role]} · @{u.username}</div>
                  </div>
                  <button onClick={() => rejectUser(u.id)} title="Tolak" aria-label={`Tolak ${u.name}`} className="w-8 h-8 rounded-full bg-white/70 hover:bg-white flex items-center justify-center"><X size={14} /></button>
                  <button onClick={() => approveUser(u.id)} title="Setujui" aria-label={`Setujui ${u.name}`} className="w-8 h-8 rounded-full bg-[#161512] text-white flex items-center justify-center"><Check size={14} /></button>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>

      <ShiftCloseModal
        isOpen={isShiftModalOpen}
        onClose={() => setIsShiftModalOpen(false)}
        onConfirmCloseShift={(data) => console.log('Shift ditutup:', data)}
      />
      <UserApprovalModal isOpen={isApprovalModalOpen} onClose={() => setIsApprovalModalOpen(false)} />
    </div>
  );
};
