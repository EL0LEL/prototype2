/**
 * invoiceGenerator.js
 * Generator nomor faktur unik ala iPOS 5 dengan prefix terstruktur.
 * Format: #[PREFIX]-[YYYYMMDD]-[RANDOM/URUTAN]
 */

export const INVOICE_PREFIXES = {
  PENJUALAN: 'JL',        // Faktur Penjualan Kasir POS
  PEMBELIAN: 'FB',        // Faktur Pembelian Supplier
  ORDER_SALES: 'ORD',     // Pesanan Masuk Salesman HP
  RETUR_JUAL: 'RJ',       // Retur Penjualan
  RETUR_BELI: 'RB',       // Retur Pembelian
  STOK_OPNAME: 'SO',      // Audit Fisik Persediaan
  MUTASI_KAS: 'MK',       // Mutasi Kas Masuk/Keluar
};

/**
 * Menghasilkan nomor faktur unik berbasis tanggal & acak hex/angka
 * @param {string} prefix - Kode jenis faktur (default 'JL')
 * @returns {string} Contoh: "#JL-20261119-8921"
 */
export const generateInvoiceNumber = (prefix = INVOICE_PREFIXES.PENJUALAN) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  // 4 digit acak angka untuk mode offline tanpa database sequence lock
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);

  return `#${prefix}-${year}${month}${day}-${randomSuffix}`;
};
