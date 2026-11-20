/**
 * App.jsx
 * Router utama aplikasi Toko Rina 2 POS & Role Guard.
 */

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { SyncProvider } from './contexts/SyncContext';
import { LoginView } from './views/auth/LoginView';
import { RegisterView } from './views/auth/RegisterView';
import { AdminRibbonLayout } from './views/admin/AdminRibbonLayout';
import { CashierTabletLayout } from './views/cashier/CashierTabletLayout';
import { SalesMobileLayout } from './views/sales/SalesMobileLayout';

const AppContent = () => {
  const { currentUser } = useAuth();
  const [authView, setAuthView] = useState('login'); // 'login' | 'register'

  // Jika belum login, tampilkan Login atau Register
  if (!currentUser) {
    if (authView === 'register') {
      return <RegisterView onSwitchToLogin={() => setAuthView('login')} />;
    }
    return <LoginView onSwitchToRegister={() => setAuthView('register')} />;
  }

  // 1. Tampilan Khusus Smartphone Portrait (Pencatat / Salesman HP)
  if (currentUser.role === 'pencatat') {
    return <SalesMobileLayout />;
  }

  // 2. Tampilan Admin (Tablet Landscape - 7 Tab Ribbon Lengkap)
  if (currentUser.role === 'admin') {
    return <AdminRibbonLayout />;
  }

  // 3. Tampilan Kasir Murni (Tablet Landscape - POS)
  return <CashierTabletLayout />;
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SyncProvider>
          <AppContent />
        </SyncProvider>
      </CartProvider>
    </AuthProvider>
  );
}
