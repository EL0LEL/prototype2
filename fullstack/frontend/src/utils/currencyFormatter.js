/**
 * currencyFormatter.js
 * Utilitas pemformatan mata uang Rupiah dan kalkulasi diskon kasir.
 */

/**
 * Format angka numerik ke format Rupiah standar Indonesia
 * Contoh: 126000 -> "Rp 126.000" atau "126.000"
 * @param {number|string} amount
 * @param {boolean} withPrefix - Menampilkan "Rp " di awal
 * @returns {string}
 */
export const formatRupiah = (amount, withPrefix = true) => {
  const numeric = Number(amount) || 0;
  const formatted = new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
  }).format(numeric);

  return withPrefix ? `Rp ${formatted}` : formatted;
};

/**
 * Parsing string format Rupiah kembali menjadi angka murni
 * Contoh: "Rp 126.000" -> 126000
 * @param {string} rupiahString
 * @returns {number}
 */
export const parseRupiah = (rupiahString) => {
  if (typeof rupiahString === 'number') return rupiahString;
  if (!rupiahString) return 0;
  const cleaned = rupiahString.replace(/[^0-9]/g, '');
  return parseInt(cleaned, 10) || 0;
};

/**
 * Format angka ringkas untuk metrik kartu dashboard
 * Contoh: 15500000 -> "15.5 Jt"
 * @param {number} amount
 * @returns {string}
 */
export const formatRingkasDashboard = (amount) => {
  const num = Number(amount) || 0;
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1)} M`;
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)} Jt`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(0)} Rb`;
  }
  return num.toString();
};

/**
 * Hitung diskon bertingkat atau persentase
 * @param {number} price - Harga awal
 * @param {number} discountPercent - Persentase diskon (0 - 100)
 * @returns {{ discountAmount: number, finalPrice: number }}
 */
export const calculateDiscount = (price, discountPercent = 0) => {
  const base = Number(price) || 0;
  const pct = Math.min(Math.max(Number(discountPercent) || 0, 0), 100);
  const discountAmount = Math.round((base * pct) / 100);
  const finalPrice = Math.max(0, base - discountAmount);

  return { discountAmount, finalPrice };
};
