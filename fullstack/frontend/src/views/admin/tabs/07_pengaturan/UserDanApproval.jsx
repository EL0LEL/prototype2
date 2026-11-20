/**
 * UserDanApproval.jsx
 * Manajemen Akun & Approval Gateway: permohonan akun baru dan seluruh akun toko dalam kartu bento.
 */

import React, { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { formatDateIndo } from '../../../../utils/dateFormatter';
import { ShieldCheck, ShoppingCart, Smartphone, Clock, Users, Check, X } from 'lucide-react';

const ROLE = {
  admin: { label: 'Admin', bg: '#f8d9b4', icon: ShieldCheck },
  kasir: { label: 'Kasir', bg: '#d4cdf6', icon: ShoppingCart },
  pencatat: { label: 'Pencatat', bg: '#bfe6d3', icon: Smartphone },
};
const STATUS = {
  active: { label: 'Aktif', dot: '#1f9d6b' },
  pending: { label: 'Menunggu', dot: '#cf9a3a' },
  blocked: { label: 'Diblokir', dot: '#b04a33' },
};
const initialsOf = (name = '') => name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

export const UserDanApproval = ({ onOpenApprovalModal }) => {
  const { users, pendingUsers, approveUser, rejectUser, changeUserRole } = useAuth();
  const [filter, setFilter] = useState('all');

  const accounts = users.filter((u) => u.status !== 'pending');
  const countRole = (r) => accounts.filter((u) => u.role === r).length;
  const FILTERS = [
    { id: 'all', label: 'Semua', icon: Users, count: users.length },
    { id: 'admin', label: 'Admin', icon: ShieldCheck, count: countRole('admin') },
    { id: 'kasir', label: 'Kasir', icon: ShoppingCart, count: countRole('kasir') },
    { id: 'pencatat', label: 'Pencatat', icon: Smartphone, count: countRole('pencatat') },
    { id: 'pending', label: 'Menunggu', icon: Clock, count: pendingUsers.length },
  ];

  const showPending = filter === 'all' || filter === 'pending';
  const visible = filter === 'pending' ? [] : accounts.filter((u) => filter === 'all' || u.role === filter);

  return (
    <div className="space-y-6">
      {/* Filter ala chip kategori */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => {
          const Icon = f.icon;
          const on = filter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-2xl text-[13px] font-medium shrink-0 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#30d5c8] ${
                on ? 'bg-[#161512] text-white' : 'bg-[#f1eadf] text-[#161512] hover:bg-[#ece4d6]'
              }`}
            >
              <span className={`w-8 h-8 rounded-xl flex items-center justify-center ${on ? 'bg-white/15' : 'bg-white'}`}><Icon size={15} /></span>
              {f.label}
              <span className={`text-xs ${on ? 'text-white/70' : 'text-[#7a746a]'}`}>{f.count}</span>
            </button>
          );
        })}
      </div>

      {/* Permohonan menunggu */}
      {showPending && (
        <section>
          <div className="flex items-baseline justify-between mb-2.5">
            <h2 className="text-[13px] font-medium text-[#7a746a]">Menunggu persetujuan</h2>
            {pendingUsers.length > 0 && (
              <button onClick={onOpenApprovalModal} className="text-xs font-medium text-[#0a7d73] hover:underline">Buka jendela persetujuan</button>
            )}
          </div>
          {pendingUsers.length === 0 ? (
            <div className="rounded-[26px] bg-[#bfe6d3] p-5 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center"><Check size={18} /></span>
              <div>
                <div className="text-[17px] font-medium leading-tight">Semua pendaftaran sudah ditinjau</div>
                <div className="text-xs text-[#161512]/65 mt-0.5">Karyawan yang mendaftar lewat layar login akan muncul di sini untuk disetujui.</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 min-[1100px]:grid-cols-2 gap-3">
              {pendingUsers.map((u) => (
                <div key={u.id} className="rounded-[26px] bg-[#f2c4c0] p-4 flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <span className="inline-flex items-center gap-2 bg-white/80 rounded-xl pl-1.5 pr-3 py-1 text-[11px] font-medium">
                      <span className="w-6 h-6 rounded-lg bg-white flex items-center justify-center"><Clock size={13} /></span>Menunggu
                    </span>
                    <span className="bg-white/80 rounded-full px-2.5 py-1 text-[11px]">{formatDateIndo(u.registeredAt || new Date(), true, true)}</span>
                  </div>
                  <div>
                    <div className="text-[21px] leading-tight font-medium">{u.name}</div>
                    <div className="text-xs text-[#161512]/65 mt-0.5">@{u.username}</div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <label className="flex items-center gap-2 text-xs">
                      <span className="sr-only">Peran untuk {u.name}</span>
                      <select
                        value={u.role}
                        onChange={(e) => changeUserRole(u.id, e.target.value)}
                        className="bg-white/80 rounded-full px-3 py-1.5 text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#30d5c8]"
                      >
                        <option value="kasir">Kasir (Tablet POS)</option>
                        <option value="pencatat">Pencatat (HP Salesman)</option>
                        <option value="admin">Admin</option>
                      </select>
                    </label>
                    <div className="flex items-center gap-2">
                      <button onClick={() => rejectUser(u.id)} className="flex items-center gap-1.5 bg-white/80 hover:bg-white rounded-full px-3.5 py-1.5 text-xs font-medium"><X size={13} />Tolak</button>
                      <button onClick={() => approveUser(u.id)} className="flex items-center gap-1.5 bg-[#161512] hover:bg-[#2c2a26] text-white rounded-full px-3.5 py-1.5 text-xs font-medium"><Check size={13} />Setujui</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Semua akun */}
      {filter !== 'pending' && (
        <section>
          <h2 className="text-[13px] font-medium text-[#7a746a] mb-2.5">Akun karyawan</h2>
          <div className="grid grid-cols-2 min-[1100px]:grid-cols-3 gap-3 grid-flow-dense">
            {visible.map((u, i) => {
              const r = ROLE[u.role] || ROLE.kasir;
              const s = STATUS[u.status] || STATUS.active;
              const Icon = r.icon;
              const wide = filter === 'all' && i === 0;
              return (
                <div key={u.id} style={{ background: r.bg }} className={`rounded-[26px] p-4 min-h-[168px] flex flex-col justify-between ${wide ? 'col-span-2' : ''}`}>
                  <div className="flex items-start justify-between">
                    <span className="inline-flex items-center gap-2 bg-white/80 rounded-xl pl-1.5 pr-3 py-1 text-[11px] font-medium">
                      <span className="w-6 h-6 rounded-lg bg-white flex items-center justify-center"><Icon size={13} /></span>{r.label}
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-white/80 rounded-full px-2.5 py-1 text-[11px] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />{s.label}
                    </span>
                  </div>
                  <div className={`${wide ? 'text-[26px]' : 'text-[20px]'} leading-tight font-medium my-4`}>{u.name}</div>
                  <div className="flex items-end justify-between">
                    <div className="text-xs text-[#161512]/65 leading-snug">
                      <div>@{u.username}</div>
                      <div className="font-mono text-[10px]">{u.id}</div>
                    </div>
                    <span className="w-10 h-10 rounded-full bg-[#161512] text-white text-xs font-medium flex items-center justify-center">{initialsOf(u.name)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
