/**
 * SyncContext.jsx
 * State management sinkronisasi socket Wi-Fi Direct antara HP Salesman dan Tablet Kasir.
 * Beroperasi offline tanpa butuh koneksi internet publik.
 */

import React, { createContext, useContext, useState } from 'react';
import { SYNC_STATUS } from '../config/appConstants';

const SyncContext = createContext();

export const SyncProvider = ({ children }) => {
  const [syncStatus, setSyncStatus] = useState(SYNC_STATUS.LISTENING);
  const [connectedPeers, setConnectedPeers] = useState([
    { id: 'peer_hp_01', name: 'HP Salesman Doni', ip: '192.168.43.102', role: 'pencatat', status: 'online' },
  ]);
  const [incomingSalesOrders, setIncomingSalesOrders] = useState([
    {
      id: 'ORD-20261119-001',
      salesman: 'Doni Saputra',
      customer: 'Warung Bu Siti',
      itemsCount: 3,
      totalAmount: 485000,
      timestamp: new Date().toISOString(),
      status: 'pending_kasir',
      items: [
        { name: 'Minyak Goreng Bimoli 2L', uom: 'DUS', qty: 2, price: 180000 },
        { name: 'Gula Pasir Gulaku 1kg', uom: 'DUS', qty: 1, price: 125000 },
      ],
    },
  ]);

  /**
   * Kirim pesanan dari HP Salesman ke Tablet Kasir
   */
  const sendOrderToCashier = (orderPayload) => {
    const newOrder = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString(),
      status: 'pending_kasir',
      ...orderPayload,
    };
    setIncomingSalesOrders((prev) => [newOrder, ...prev]);
    return { success: true, orderId: newOrder.id };
  };

  /**
   * Kasir menerima & menarik order masuk ke keranjang kasir
   */
  const acceptOrderIntoCashier = (orderId) => {
    const order = incomingSalesOrders.find((o) => o.id === orderId);
    if (!order) return null;

    setIncomingSalesOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'processed' } : o))
    );
    return order;
  };

  return (
    <SyncContext.Provider
      value={{
        syncStatus,
        setSyncStatus,
        connectedPeers,
        incomingSalesOrders,
        pendingOrderCount: incomingSalesOrders.filter((o) => o.status === 'pending_kasir').length,
        sendOrderToCashier,
        acceptOrderIntoCashier,
      }}
    >
      {children}
    </SyncContext.Provider>
  );
};

export const useSync = () => useContext(SyncContext);
