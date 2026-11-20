/**
 * dateFormatter.js
 * Utilitas pemformatan tanggal faktur, laporan, dan jam shift kasir Indonesia.
 */

const BULAN_INDO = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const BULAN_INDO_PENDEK = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
  'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
];

/**
 * Format tanggal Indonesia lengkap dengan opsi jam WIB
 * Contoh: "19 November 2026, 09:30 WIB"
 * @param {Date|string|number} dateInput
 * @param {boolean} includeTime
 * @param {boolean} shortMonth
 * @returns {string}
 */
export const formatDateIndo = (dateInput = new Date(), includeTime = false, shortMonth = true) => {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '-';

  const day = String(date.getDate()).padStart(2, '0');
  const monthName = shortMonth ? BULAN_INDO_PENDEK[date.getMonth()] : BULAN_INDO[date.getMonth()];
  const year = date.getFullYear();

  let result = `${day} ${monthName} ${year}`;

  if (includeTime) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    result += `, ${hours}:${minutes} WIB`;
  }

  return result;
};

/**
 * Format tanggal untuk HTML input `<input type="date" />` (YYYY-MM-DD)
 * @param {Date|string|number} dateInput
 * @returns {string}
 */
export const formatDateForInput = (dateInput = new Date()) => {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/**
 * Format jam menit untuk transaksi kasir (HH:mm:ss)
 * @param {Date|string|number} dateInput
 * @returns {string}
 */
export const formatTimeOnly = (dateInput = new Date()) => {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '--:--:--';

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};
