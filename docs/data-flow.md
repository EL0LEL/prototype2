# Aliran data yang direncanakan

## Pesanan

1. Petugas mengisi atau memeriksa draf pada frontend.
2. Frontend mengirim request ke backend melalui API yang disepakati.
3. Backend memvalidasi data, hak akses, dan permintaan ulang, lalu menyimpan pesanan.
4. Kasir membaca pesanan dari backend dengan ID dan rincian yang sama.
5. Nota dibuat dari data tersimpan, bukan input ulang atau harga yang dibuat model.

## Bantuan AI

Backend meneruskan teks yang telah dibersihkan ke layanan AI. Model intent memilih jalur bantuan. Jika pengguna meminta draf generatif dan layanan online tersedia, hasilnya dikembalikan sebagai saran untuk diperiksa, bukan transaksi sah.

Barang, jumlah, satuan, dan harga tetap harus diperiksa sesuai kontrak. Pengecekan status membaca backend dengan ID dan otorisasi. Model tidak menebak keadaan pesanan. Nama, alamat, nomor pelanggan, dan kredensial tidak diteruskan ke provider generatif.

## Serah terima DS ke AE dan FS

DS menyiapkan versi data, data dictionary, aturan split, sumber/izin, serta quality checks. AE memakai versi tersebut untuk training dan evaluasi; FS memakai keluaran yang telah disepakati untuk katalog atau analisis.

Setiap artefak harus memiliki catatan versi dan cara digunakan. CSV/JSON untuk integrasi tidak bergantung pada notebook yang sedang terbuka. Lokasi artefak runtime ditentukan saat implementasi, lalu didokumentasikan pada layanan yang memuatnya.

Rincian field belum final. Gunakan [kontrak data](../contracts/data/README.md) dan [kontrak API](../contracts/api/README.md) untuk menyepakatinya, bukan menebak format dari diagram ini.
