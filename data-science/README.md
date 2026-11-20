# Data Science

Pemilik awal: Muhammad Raddya Fakhreza dan Ray Siraj.

Raddya menyiapkan pipeline, katalog, label, kamus data, dan pembagian dataset. Ray menangani analisis proses, pemeriksaan independen, serta evaluasi pengguna. Pembagian rinci mengikuti kesepakatan kapasitas tim.

## Dua keluaran yang berbeda

1. Data katalog dan teks berlabel untuk pengembangan serta evaluasi model intent.
2. Data pengukuran proses untuk membandingkan pencatatan lama dengan alur satu kali input pada tugas yang setara.

Data simulasi tidak menjadi bukti penghematan waktu nyata di toko. Setiap laporan harus menjelaskan asal data dan keterbatasannya.

## Area kerja

- [data](data/README.md): kebijakan penyimpanan dan akses.
- [notebooks](notebooks/README.md): eksplorasi yang dapat ditelusuri.
- [reports](reports/README.md): temuan, evaluasi, dan visual yang telah diperiksa.

Ketika kode pengolahan mulai dibuat, tempatkan fungsi yang dipakai ulang di `src`, bukan menyalinnya ke banyak notebook. Tambahkan tes untuk transformasi dan pemeriksaan kualitas.

Target awal dataset adalah 250 contoh teks untuk lima kelas, bukan klaim bahwa data itu sudah tersedia. Pembagian sekitar 60/20/20 mengikuti grup sumber/template. Preprocessing yang belajar dari data hanya di-fit pada train; validation dipakai untuk memilih konfigurasi; test disimpan untuk evaluasi final.

Format yang diserahkan ke divisi lain harus dicatat di [contracts/data](../contracts/data/README.md), beserta versi dan petunjuk penggunaannya.
