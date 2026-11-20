# Next-Gen AI Engineering

Pemilik awal: Andika Putra Perdana dan Boni Steven.

Andika memimpin bantuan generatif dan koordinasi integrasi. Boni menangani model intent serta serving. Keduanya memeriksa hasil satu sama lain dan memakai data yang diserahkan DS.

## Keluaran yang direncanakan

- Pipeline preprocessing dan model intent.
- Perbandingan TF-IDF + Logistic Regression dengan TF-IDF + LinearSVC pada split dan metrik yang sama.
- Layanan FastAPI yang dipanggil backend, baik untuk lingkungan uji lokal maupun demo online.
- Bantuan draf pesanan melalui API proprietary, dengan validasi dan persetujuan pengguna.

Empat intent layanan yang diusulkan adalah `buat_pesanan`, `tanya_barang`, `panduan_penggunaan`, dan `cek_status_pesanan`. Kelas `di_luar_scope` menangani penolakan. Daftar ini perlu dikonfirmasi bersama tim sebelum dataset dikunci.

## Batas keselamatan dan data

AI tidak boleh menetapkan harga, menebak status pesanan, atau menyimpan transaksi. Nama, alamat, serta nomor pelanggan tidak dikirim ke model proprietary. Ketika layanan generatif gagal, formulir manual tetap tersedia.

Test akhir tidak dipakai untuk tuning. Perubahan model setelah evaluasi final memerlukan versi baru dan evaluasi pada data yang belum disentuh.

## Susunan ketika implementasi dimulai

Tempatkan paket Python pada `src/tokorina_ai`, dengan modul `intent`, `drafts`, dan `api` sesuai kebutuhan. Tes ada di `tests`. Simpan keluaran model pada `artifacts` lokal; metadata versi, sumber, evaluasi, dan cara memuat model tetap harus terdokumentasi serta ditinjau sebelum publikasi.

Belum ada model terlatih, fitur generatif, dependensi Python, atau endpoint AI yang berjalan. RAG, model tambahan, kanal pesan, dan SLM lokal bukan syarat untuk menyelesaikan struktur awal.

Acuan: [data DS](../data-science/README.md), [kontrak](../contracts/README.md), dan [aliran data](../docs/data-flow.md).
