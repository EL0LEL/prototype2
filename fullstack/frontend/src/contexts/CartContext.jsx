/**
 * CartContext.jsx
 * State management keranjang belanja kasir POS, kalkulasi Multi-UOM,
 * dan fitur antrean Hold/Recall nota ala iPOS 5.
 */

import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [customer, setCustomer] = useState({ id: 'CUST_UMUM', name: 'Pelanggan Umum', type: 'ECERAN' });
  const [globalDiscount, setGlobalDiscount] = useState(0); // Diskon faktur dalam persen
  const [pendingOrders, setPendingOrders] = useState([]);   // Antrean nota tahan (Hold)

  /**
   * Tambah item ke keranjang atau tambah qty jika item & satuan sama
   */
  const addToCart = (product, uomCode = null, qty = 1) => {
    const selectedUom = uomCode 
      ? (product.uomList?.find((u) => u.code === uomCode) || product.uomList?.[0]) 
      : (product.uomList?.[0] || { code: product.satuan || 'PCS', price: product.hargaJual || 0, conversion: 1 });

    const price = selectedUom?.price ?? product.hargaJual ?? 0;
    const cartItemId = `${product.id}_${selectedUom?.code || 'PCS'}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        return prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, qty: item.qty + qty, subtotal: (item.qty + qty) * item.price }
            : item
        );
      }

      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          barcode: product.barcode,
          name: product.name || product.namaBarang,
          category: product.category,
          uom: selectedUom.code,
          uomList: product.uomList || [{ code: selectedUom.code, price, conversion: 1 }],
          price,
          qty,
          subtotal: price * qty,
          modalPrice: product.hargaBeli || 0,
        },
      ];
    });
  };

  /**
   * Update kuantitas item
   */
  const updateQty = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, qty: newQty, subtotal: newQty * item.price }
          : item
      )
    );
  };

  /**
   * Ganti satuan Multi-UOM pada baris keranjang
   */
  const changeItemUom = (cartItemId, newUomCode) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId !== cartItemId) return item;
        const targetUom = item.uomList?.find((u) => u.code === newUomCode);
        const newPrice = targetUom?.price ?? item.price;
        const newId = `${item.productId}_${newUomCode}`;

        return {
          ...item,
          cartItemId: newId,
          uom: newUomCode,
          price: newPrice,
          subtotal: item.qty * newPrice,
        };
      })
    );
  };

  /**
   * Hapus baris item dari keranjang
   */
  const removeFromCart = (cartItemId) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  /**
   * Kosongkan keranjang
   */
  const clearCart = () => {
    setCartItems([]);
    setGlobalDiscount(0);
  };

  /**
   * Fitur iPOS 5: Tahan Nota (Hold Order)
   */
  const holdCurrentOrder = (note = '') => {
    if (cartItems.length === 0) return false;

    const pendingOrder = {
      id: `HOLD_${Date.now()}`,
      savedAt: new Date(),
      customer,
      cartItems: [...cartItems],
      globalDiscount,
      note: note || `Antrean #${pendingOrders.length + 1}`,
      subtotal: summary.subtotal,
      grandTotal: summary.grandTotal,
    };

    setPendingOrders((prev) => [pendingOrder, ...prev]);
    clearCart();
    return true;
  };

  /**
   * Fitur iPOS 5: Buka Kembali Nota Tertahan (Recall Order)
   */
  const recallPendingOrder = (orderId) => {
    const targetOrder = pendingOrders.find((o) => o.id === orderId);
    if (!targetOrder) return false;

    setCartItems(targetOrder.cartItems);
    setCustomer(targetOrder.customer);
    setGlobalDiscount(targetOrder.globalDiscount);
    setPendingOrders((prev) => prev.filter((o) => o.id !== orderId));
    return true;
  };

  /**
   * Kalkulasi Subtotal, Diskon, dan Total Keseluruhan
   */
  const summary = useMemo(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const discountAmount = Math.round((subtotal * globalDiscount) / 100);
    const grandTotal = Math.max(0, subtotal - discountAmount);

    return {
      subtotal,
      totalItems,
      discountPercent: globalDiscount,
      discountAmount,
      grandTotal,
    };
  }, [cartItems, globalDiscount]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        customer,
        setCustomer,
        globalDiscount,
        setGlobalDiscount,
        pendingOrders,
        summary,
        addToCart,
        updateQty,
        changeItemUom,
        removeFromCart,
        clearCart,
        holdCurrentOrder,
        recallPendingOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
