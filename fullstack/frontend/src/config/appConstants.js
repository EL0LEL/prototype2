/**
 * appConstants.js
 * Konfigurasi konstan & metadata default aplikasi Toko Rina 2 POS (iPOS 5 Style).
 * Sesuai arsitektur Capstone Tim A26-CS212.
 */

export const APP_CONFIG = {
  APP_NAME: 'Toko Rina 2 POS',
  APP_VERSION: '1.0.0',
  TEAM_ID: 'A26-CS212',
  STORE_NAME: 'Toko Rina 2',
  STORE_TAGLINE: 'Grosir & Eceran Sembako',
  STORE_ADDRESS: 'Pasar Induk Kramat Jati, Kios Blok B No. 14-16, Jakarta Timur',
  STORE_PHONE: '0812-3456-7890',
  FOOTER_RECEIPT: 'Terima Kasih Atas Kunjungan Anda!\nBarang yang sudah dibeli tidak dapat ditukar/dikembalikan.',
};

export const ROLES = {
  ADMIN: 'admin',       // Akses penuh 7 Tab Ribbon (Tablet Landscape)
  KASIR: 'kasir',       // Akses Tab 1-6 (Kasir POS, Master non-edit modal, tanpa Tab 7 Pengaturan)
  PENCATAT: 'pencatat', // Akses khusus Smartphone Portrait (Pencatat/Salesman + Sinkronisasi Socket Wi-Fi Direct)
};

export const USER_STATUS = {
  PENDING: 'pending',   // Terdaftar tapi belum disetujui Admin
  ACTIVE: 'active',     // Disetujui, bisa login
  BLOCKED: 'blocked',   // Dibekukan / dinonaktifkan
};

// Akun Admin Default (Bisa langsung login saat pertama kali instalasi offline)
export const DEFAULT_ADMIN = {
  id: 'usr_admin_01',
  name: 'Ibu Rina (Owner)',
  username: 'admin',
  pin: '1234',
  role: ROLES.ADMIN,
  status: USER_STATUS.ACTIVE,
};

export const PAYMENT_METHODS = {
  CASH: { id: 'CASH', label: 'Tunai (Cash)', icon: 'Banknote' },
  QRIS: { id: 'QRIS', label: 'QRIS Statis/Dinamis', icon: 'QrCode' },
  BCA: { id: 'BCA', label: 'Transfer Bank (BCA)', icon: 'CreditCard' },
  TEMPO: { id: 'TEMPO', label: 'Piutang / Hutang Usaha (Tempo)', icon: 'CalendarClock' },
};

export const UOM_LIST = [
  { code: 'PCS', label: 'Pcs / Satuan Dasar', level: 1 },
  { code: 'BKS', label: 'Bungkus', level: 1 },
  { code: 'RCG', label: 'Renceng (isi 10-12 pcs)', level: 2 },
  { code: 'PAK', label: 'Pak (isi 10-20 pcs)', level: 2 },
  { code: 'BAL', label: 'Bal (isi grosir menengah)', level: 3 },
  { code: 'DUS', label: 'Dus / Karton Induk', level: 4 },
];

export const SYNC_STATUS = {
  OFFLINE: 'OFFLINE',
  LISTENING: 'LISTENING',
  CONNECTED: 'CONNECTED',
  SYNCING: 'SYNCING',
  ERROR: 'ERROR',
};
