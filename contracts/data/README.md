# Kontrak data

Raddya, Ray, dan penerima data menyepakati format sebelum pipeline atau model menggunakannya.

Katalog memerlukan identitas barang yang stabil, nama, satuan, harga referensi yang diizinkan, serta versi sumber. Rincian dan aturan pembulatannya belum final.

Pesanan harus dapat ditelusuri dari satu input petugas sampai nota kasir. Aturan ID, jumlah/satuan, pengantaran, status, dan permintaan ulang perlu diperiksa bersama FS. Contoh untuk repository tidak memakai identitas pelanggan asli.

Dataset intent memerlukan ID contoh, teks, label, asal data, grup sumber/template, status review, dan split. Hasil pengukuran proses memerlukan identitas skenario, metode, durasi, input ulang, kecocokan field, dan kesalahan tanpa mengungkap data pribadi.

Saat skema ditulis, sertakan tipe, field wajib, satuan, nilai yang diizinkan, contoh aman, versi, dan cara memeriksa kesesuaiannya. JSON Schema dan data dictionary belum tersedia dalam commit awal.

Satu perubahan format harus ditinjau divisi penerima. Jangan membuat salinan skema yang berbeda di tiap aplikasi tanpa sumber acuan yang jelas.
