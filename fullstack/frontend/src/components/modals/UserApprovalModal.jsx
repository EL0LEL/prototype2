/**
 * UserApprovalModal.jsx
 * Pop-up admin untuk persetujuan (approval) akun karyawan baru yang masih pending.
 */

import React from 'react';
import { X, UserCheck, UserX, Clock, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { formatDateIndo } from '../../utils/dateFormatter';

export const UserApprovalModal = ({ isOpen, onClose }) => {
  const { pendingUsers, approveUser, rejectUser, changeUserRole } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#161512]/45 backdrop-blur-sm p-4">
      <div className="bg-[#fbf8f2] border border-[#ddd3c2] w-full max-w-xl rounded-[32px] shadow-2xl overflow-hidden text-[#24221e] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#ece4d6] bg-[#ffffff]">
          <div className="flex items-center gap-2">
            <Shield className="text-[#1a827a]" size={18} />
            <h3 className="font-bold text-sm tracking-wide">Persetujuan Akun Karyawan (Approval Gateway)</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-[#6d675d] hover:text-[#1b1a17] hover:bg-[#ece4d6]">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3 max-h-96 overflow-y-auto">
          {pendingUsers.length === 0 ? (
            <div className="text-center py-8 text-[#6d675d] space-y-1">
              <Clock size={32} className="mx-auto text-[#738876] mb-2" />
              <p className="font-semibold text-sm">Tidak ada permohonan akun baru</p>
              <p className="text-xs text-[#738876]">Semua karyawan yang terdaftar telah disetujui atau diproses.</p>
            </div>
          ) : (
            pendingUsers.map((u) => (
              <div
                key={u.id}
                className="bg-[#f2c4c0] rounded-[24px] p-4 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#1b1a17]">{u.name}</span>
                    <span className="text-[10px] bg-white/80 text-[#161512] px-2 py-0.5 rounded-full font-mono">
                      @{u.username}
                    </span>
                  </div>
                  <div className="text-xs text-[#6d675d] mt-1">
                    Daftar: {formatDateIndo(u.registeredAt || new Date(), true, true)}
                  </div>

                  {/* Pilihan Role sebelum disetujui */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-[#6d675d]">Role:</span>
                    <select
                      value={u.role}
                      onChange={(e) => changeUserRole(u.id, e.target.value)}
                      className="bg-white/80 text-xs rounded-full px-3 py-1 text-[#21aa9d]"
                    >
                      <option value="kasir">Kasir (Tablet POS)</option>
                      <option value="pencatat">Pencatat (HP Salesman)</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>

                {/* Aksi Setuju / Tolak */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => rejectUser(u.id)}
                    className="p-2.5 rounded-full bg-white/80 text-[#8f3b2a] hover:bg-white transition"
                    title="Tolak Pendaftaran"
                  >
                    <UserX size={16} />
                  </button>
                  <button
                    onClick={() => approveUser(u.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#161512] hover:bg-[#161512] text-[#ffffff] font-semibold text-xs shadow transition"
                    title="Setujui Akun"
                  >
                    <UserCheck size={16} /> Setujui
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#ece4d6] bg-[#ffffff] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#ece4d6] hover:bg-[#ddd3c2] text-[#2f2c28] text-xs font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
