/**
 * AuthContext.jsx
 * State management autentikasi, sesi login, registrasi, dan approval admin.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ROLES, USER_STATUS, DEFAULT_ADMIN } from '../config/appConstants';

const AuthContext = createContext();

const STORAGE_KEYS = {
  CURRENT_USER: 'tokorina_current_user',
  ALL_USERS: 'tokorina_registered_users',
};

export const AuthProvider = ({ children }) => {
  // Inisialisasi daftar pengguna lokal (disimpan di localStorage untuk offline-first)
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ALL_USERS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored users', e);
      }
    }
    // Default ada 1 Admin & beberapa dummy untuk tes approval
    return [
      DEFAULT_ADMIN,
      {
        id: 'usr_kasir_01',
        name: 'Budi Santoso',
        username: 'budi',
        pin: '1111',
        role: ROLES.KASIR,
        status: USER_STATUS.ACTIVE,
        registeredAt: new Date().toISOString(),
      },
      {
        id: 'usr_pending_01',
        name: 'Doni Saputra',
        username: 'doni',
        pin: '2222',
        role: ROLES.PENCATAT,
        status: USER_STATUS.PENDING,
        registeredAt: new Date().toISOString(),
      },
    ];
  });

  // User yang sedang aktif login
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing current user', e);
      }
    }
    // Belum ada sesi tersimpan: tampilkan layar login (pengguna harus masuk dulu)
    return null;
  });

  // Sinkronisasi data ke localStorage setiap ada perubahan
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }, [currentUser]);

  /**
   * Proses login menggunakan username & PIN
   */
  const login = (username, pin) => {
    const foundUser = users.find(
      (u) => u.username.toLowerCase() === username.toLowerCase().trim() && u.pin === pin.trim()
    );

    if (!foundUser) {
      return { success: false, message: 'Username atau PIN salah!' };
    }

    if (foundUser.status === USER_STATUS.PENDING) {
      return {
        success: false,
        message: 'Akun Anda masih berstatus PENDING. Silakan hubungi Admin/Ibu Rina untuk persetujuan.',
      };
    }

    if (foundUser.status === USER_STATUS.BLOCKED) {
      return { success: false, message: 'Akun dinonaktifkan oleh Admin.' };
    }

    setCurrentUser(foundUser);
    return { success: true, user: foundUser };
  };

  /**
   * Pendaftaran akun karyawan baru (otomatis berstatus PENDING)
   */
  const register = ({ name, username, pin, role = ROLES.KASIR }) => {
    const exists = users.some(
      (u) => u.username.toLowerCase() === username.toLowerCase().trim()
    );

    if (exists) {
      return { success: false, message: 'Username sudah digunakan, pilih username lain.' };
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      username: username.toLowerCase().trim(),
      pin: pin.trim(),
      role,
      status: USER_STATUS.PENDING,
      registeredAt: new Date().toISOString(),
    };

    setUsers((prev) => [...prev, newUser]);
    return {
      success: true,
      message: 'Pendaftaran berhasil! Akun Anda sedang menunggu persetujuan (approval) Admin.',
      user: newUser,
    };
  };

  /**
   * Setujui akun karyawan oleh Admin
   */
  const approveUser = (userId) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: USER_STATUS.ACTIVE } : u))
    );
  };

  /**
   * Tolak / Hapus akun karyawan oleh Admin
   */
  const rejectUser = (userId) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  /**
   * Ganti Role User (Admin / Kasir / Pencatat)
   */
  const changeUserRole = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    if (currentUser?.id === userId) {
      setCurrentUser((prev) => ({ ...prev, role: newRole }));
    }
  };

  /**
   * Logout
   */
  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        pendingUsers: users.filter((u) => u.status === USER_STATUS.PENDING),
        login,
        register,
        approveUser,
        rejectUser,
        changeUserRole,
        logout,
        isAdmin: currentUser?.role === ROLES.ADMIN,
        isKasir: currentUser?.role === ROLES.KASIR,
        isPencatat: currentUser?.role === ROLES.PENCATAT,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
