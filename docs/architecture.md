# Arsitektur awal

Status: rencana struktur, belum implementasi.

## Batas aplikasi

| Komponen | Lokasi | Akses yang direncanakan |
| --- | --- | --- |
| Frontend | `fullstack/frontend` | HTTP ke backend |
| Backend | `fullstack/backend` | Database dan HTTP ke layanan AI |
| Layanan AI | `ai-engineering` | Artefak model, katalog yang diizinkan, dan provider generatif bila online |
| Pengolahan data | `data-science` | Sumber berizin dan keluaran berversi untuk komponen lain |

Satu repository tidak berarti satu proses. Frontend, backend, dan layanan AI memiliki environment, dependensi, serta proses yang terpisah ketika diimplementasikan.

Frontend tidak mengakses database atau mengimpor modul server. Backend tidak menjalankan notebook. Layanan model tidak langsung menyimpan transaksi bisnis. Semua lintasan lintas aplikasi perlu kontrak.

## Lokal dan online

Alur inti direncanakan berjalan pada satu LAN: petugas, kasir, backend lokal, dan penyimpanan lokal. Tanpa internet tidak berarti tanpa jaringan.

Demo publik direncanakan sebagai lingkungan terpisah dengan data buatan dan penyimpanan terpisah. Tidak ada sinkronisasi otomatis antara kedua database. Penyesuaian ini masih memerlukan konfirmasi PIC/mentor terhadap scope yang sebelumnya menekankan operasi lokal.

Bantuan generatif proprietary memerlukan internet. Ketika tidak tersedia, pengguna tetap dapat memakai formulir manual. Ini bukan alasan untuk menganggap kewajiban demo AI online sudah terpenuhi.

## Yang tidak ditambahkan pada tahap ini

Tidak ada microservice tambahan, message broker, orchestration platform, paket bersama lintas bahasa, Docker Compose, atau CI deployment sebelum ada kebutuhan dan perintah nyata yang dapat diuji. Ketergantungan awal sengaja dibatasi agar waktu tim dipakai untuk alur pesanan.

Peta ringkas berada di [repository-layout.json](../repository-layout.json). Hubungan di peta berstatus `planned`, bukan hasil analisis kode runtime.
