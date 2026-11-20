# Cara mengerjakan perubahan

## Sebelum coding

Ambil satu pekerjaan kecil dari jadwal yang telah disepakati. Nyatakan hasil yang harus jadi, prasyarat, pemilik, dan pemeriksanya. Jika format lintas divisi berubah, bahas kontrak lebih dahulu.

Menurut jadwal awal, coding aplikasi dimulai 20 November 2026. Commit fondasi pada 16 November ini hanya menyiapkan area kerja dan dokumentasi, bukan memulai fitur produksi.

## Branch dan review

Setelah commit awal tersedia pada remote bersama, ambil riwayat yang sama sebelum membuat branch. Contoh penamaan adalah `feat/andika-draft-validation` atau `docs/data-handoff`. Nama branch mengikuti pekerjaan, bukan seluruh divisi untuk selamanya.

Hindari mengubah file yang sama bersamaan tanpa koordinasi. Perubahan `contracts` atau arsitektur memerlukan pemeriksaan pengirim dan penerima data. Gunakan Pull Request setelah pekerjaan memiliki bukti yang dapat diperiksa.

Jangan melakukan force push, mengubah riwayat anggota, atau menggabungkan pekerjaan ke branch utama tanpa kesepakatan.

## Saat menambahkan implementasi

Tiap aplikasi menambahkan manifest dan lockfile dependensinya sendiri, contoh environment tanpa secret, langkah instalasi, perintah menjalankan, serta perintah tes. Jangan mengiklankan perintah yang belum dicoba.

Mulai dengan satu alur kecil yang terhubung. Tambahkan tes sesuai perilaku, termasuk input salah, gagal jaringan, dan retry. Tidak perlu membuat semua modul dari diagram sekaligus.

## Sebelum commit

Periksa daftar dan isi perubahan. Sertakan tes yang relevan, perintah yang dijalankan, serta keterbatasan yang belum terselesaikan. Jangan menyebut pemeriksaan struktur sebagai pengujian aplikasi.

Commit tidak memuat secret, data pelanggan, environment, dependency cache, atau konfigurasi pribadi yang tidak menjadi bagian produk. Atribusi dan lisensi yang memang diwajibkan tetap dipertahankan. Gunakan identitas kontribusi yang benar dan deskripsi perubahan yang akurat.

## Target integrasi

Alur utama ditargetkan terhubung pada 6 Desember. Tanggal 7 sampai 13 Desember dipakai untuk tes, koreksi, dan dokumentasi. Demo 14 Desember masih perlu kesediaan PIC; 15 Desember adalah target serah internal, bukan perubahan tenggat resmi program.
