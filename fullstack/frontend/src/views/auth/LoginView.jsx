/**
 * LoginView.jsx
 * Layar login kasir & admin POS Toko Rina 2 bergaya editorial bento terang.
 */

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { APP_CONFIG, ROLES } from '../../config/appConstants';
import { User, ArrowRight, ShieldAlert, KeyRound, Smartphone, ShoppingCart, ShieldCheck } from 'lucide-react';

export const LoginView = ({ onSwitchToRegister }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('admin');
  const [pin, setPin] = useState('1234');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim() || !pin.trim()) {
      setErrorMessage('Username dan PIN wajib diisi!');
      return;
    }

    const result = login(username, pin);
    if (!result.success) {
      setErrorMessage(result.message);
    }
  };

  // Helper cepat untuk tim/evaluator saat demo presentasi
  const quickFill = (u, p) => {
    setUsername(u);
    setPin(p);
    setErrorMessage('');
  };

  const DEMO_ACCOUNTS = [
    { u: 'admin', p: '1234', name: 'Ibu Rina', role: 'Admin', sub: 'Akses penuh ke 7 tab', icon: ShieldCheck, bg: '#f8d9b4' },
    { u: 'budi', p: '1111', name: 'Budi Santoso', role: 'Kasir', sub: 'Tablet kasir POS', icon: ShoppingCart, bg: '#d4cdf6' },
    { u: 'doni', p: '2222', name: 'Doni Saputra', role: 'Pencatat', sub: 'HP salesman', icon: Smartphone, bg: '#bfe6d3' },
  ];

  return (
    <div className="min-h-screen bg-[#c3ece0] text-[#161512] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl rounded-[36px] bg-[#fbf7f0] p-6 md:p-10 grid md:grid-cols-[1.25fr_1fr] gap-8 shadow-[0_30px_80px_-30px_rgba(22,21,18,0.35)]">
        {/* Kiri: headline + akun cepat */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-2xl bg-[#161512] text-[#30d5c8] font-black flex items-center justify-center">R2</div>
            <div className="leading-tight">
              <div className="font-medium">{APP_CONFIG.STORE_NAME}</div>
              <div className="text-xs text-[#7a746a]">{APP_CONFIG.STORE_TAGLINE}</div>
            </div>
          </div>
          <h1 className="text-[44px] md:text-[56px] leading-[1.02] tracking-[-0.03em] font-medium">
            Masuk dan mulai<br />melayani toko.
          </h1>
          <p className="mt-4 text-[15px] text-[#7a746a] max-w-sm">Kasir dan pencatat tetap bekerja tanpa internet. Pesanan berpindah lewat Wi-Fi Direct.</p>

          <div className="mt-auto pt-8">
            <div className="text-[13px] font-medium text-[#7a746a] mb-2.5">Akun cepat untuk demo</div>
            <div className="grid grid-cols-3 gap-3">
              {DEMO_ACCOUNTS.map((acc) => {
                const Icon = acc.icon;
                const picked = username === acc.u;
                return (
                  <button
                    key={acc.u}
                    type="button"
                    onClick={() => quickFill(acc.u, acc.p)}
                    style={{ background: acc.bg }}
                    className={`rounded-3xl p-3.5 text-left min-h-[132px] flex flex-col justify-between transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#161512] ${picked ? 'ring-2 ring-[#161512]' : ''}`}
                  >
                    <span className="inline-flex items-center gap-1.5 self-start bg-white/80 rounded-xl pl-1 pr-2.5 py-1 text-[11px] font-medium">
                      <span className="w-5 h-5 rounded-lg bg-white flex items-center justify-center"><Icon size={12} /></span>{acc.role}
                    </span>
                    <span>
                      <span className="block text-[15px] font-medium leading-tight">{acc.name}</span>
                      <span className="block text-[11px] text-[#161512]/65 mt-0.5">{acc.sub}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Kanan: form */}
        <form onSubmit={handleSubmit} className="rounded-[30px] bg-[#efe7dc] p-6 flex flex-col gap-4 self-center">
          <div className="text-xl font-medium leading-tight">Selamat datang kembali</div>
          {errorMessage && (
            <div role="alert" className="p-3 rounded-2xl bg-[#f2c4c0] text-[#6f2e22] text-xs flex items-start gap-2">
              <ShieldAlert size={16} className="shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}
          <label className="block">
            <span className="text-xs font-medium text-[#4a463f] block mb-1.5">Username atau ID karyawan</span>
            <span className="relative flex items-center">
              <User size={16} className="absolute left-4 text-[#7a746a]" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full bg-white border border-transparent rounded-full pl-11 pr-4 py-3 text-sm placeholder-[#a39c8f] focus:outline-none focus:border-[#161512] focus:ring-4 focus:ring-[#30d5c8]/30"
              />
            </span>
          </label>
          <label className="block">
            <span className="text-xs font-medium text-[#4a463f] block mb-1.5">PIN keamanan (4 sampai 6 digit)</span>
            <span className="relative flex items-center">
              <KeyRound size={16} className="absolute left-4 text-[#7a746a]" />
              <input
                type="password"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Contoh: 1234"
                className="w-full bg-white border border-transparent rounded-full pl-11 pr-4 py-3 text-sm tracking-widest placeholder-[#a39c8f] focus:outline-none focus:border-[#161512] focus:ring-4 focus:ring-[#30d5c8]/30"
              />
            </span>
          </label>
          <button type="submit" className="w-full py-3.5 rounded-full bg-[#161512] hover:bg-[#2c2a26] text-white font-medium text-sm flex items-center justify-center gap-2 transition">
            Masuk ke sistem POS <ArrowRight size={16} />
          </button>
          <div className="text-center text-xs text-[#7a746a]">
            Belum punya akun?{' '}
            <button type="button" onClick={onSwitchToRegister} className="text-[#161512] font-medium underline underline-offset-2">Daftar sebagai karyawan baru</button>
          </div>
        </form>
      </div>
    </div>
  );
};
