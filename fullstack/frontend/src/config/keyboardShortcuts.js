/**
 * keyboardShortcuts.js
 * Pemetaan tombol fisik keyboard ala kasir iPOS 5 desktop.
 * Mempermudah kasir mengoperasikan POS di tablet/PC tanpa mouse.
 */

export const KEYBOARD_SHORTCUTS = {
  SEARCH_BARCODE: { key: 'F1', code: 'F1', label: 'F1: Fokus Barcode/Pencarian' },
  TAMBAH_ITEM:    { key: 'F2', code: 'F2', label: 'F2: Tambah Item Baru' },
  PENDING_ORDER:  { key: 'F8', code: 'F8', label: 'F8: Pending / Tahan Nota' },
  RECALL_ORDER:   { key: 'F9', code: 'F9', label: 'F9: Buka Antrean Nota' },
  BAYAR_MODAL:    { key: 'F7', code: 'F7', label: 'F7: Buka Modal Pembayaran' },
  CETAK_STRUK:    { key: 'F12', code: 'F12', label: 'F12: Simpan & Cetak Struk' },
  BATAL_ESCAPE:   { key: 'Escape', code: 'Escape', label: 'Esc: Tutup Pop-up / Batal' },
};

/**
 * Hook atau event handler pembantu untuk menangkap shortcut
 * @param {KeyboardEvent} event 
 * @param {Object} actions - callback fungsi untuk masing-masing shortcut
 */
export const handleGlobalKeyboardShortcut = (event, actions = {}) => {
  // Abaikan jika user sedang mengetik di input text biasa kecuali tombol F1-F12 atau Escape
  const isFunctionKey = event.key.startsWith('F') || event.key === 'Escape';
  if (!isFunctionKey) return;

  switch (event.key) {
    case KEYBOARD_SHORTCUTS.SEARCH_BARCODE.key:
      event.preventDefault();
      if (typeof actions.onFocusSearch === 'function') actions.onFocusSearch();
      break;

    case KEYBOARD_SHORTCUTS.TAMBAH_ITEM.key:
      event.preventDefault();
      if (typeof actions.onAddItem === 'function') actions.onAddItem();
      break;

    case KEYBOARD_SHORTCUTS.BAYAR_MODAL.key:
      event.preventDefault();
      if (typeof actions.onOpenPayment === 'function') actions.onOpenPayment();
      break;

    case KEYBOARD_SHORTCUTS.PENDING_ORDER.key:
      event.preventDefault();
      if (typeof actions.onPendingOrder === 'function') actions.onPendingOrder();
      break;

    case KEYBOARD_SHORTCUTS.RECALL_ORDER.key:
      event.preventDefault();
      if (typeof actions.onRecallOrder === 'function') actions.onRecallOrder();
      break;

    case KEYBOARD_SHORTCUTS.CETAK_STRUK.key:
      event.preventDefault();
      if (typeof actions.onPrintReceipt === 'function') actions.onPrintReceipt();
      break;

    case KEYBOARD_SHORTCUTS.BATAL_ESCAPE.key:
      if (typeof actions.onEscape === 'function') actions.onEscape();
      break;

    default:
      break;
  }
};
