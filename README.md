# Toko Rina 2

Capstone tim A26-CS212, Asah 2026 led by Dicoding supported by GoTo.

Proyek ini berfokus pada satu masalah: petugas mencatat pesanan sekali, kasir menerima rincian yang sama, lalu membuat nota tanpa mengetik ulang.

## Status repository

Commit awal hanya berisi struktur kerja dan dokumentasi. Aplikasi, API, model, dataset, serta deployment belum diimplementasikan. Pemisahan online dan lokal masih perlu diselaraskan dengan PIC serta mentor.

## Mulai dari mana?

| Area | Tanggung jawab | Pemilik awal |
| --- | --- | --- |
| [fullstack/frontend](fullstack/frontend/README.md) | Antarmuka petugas, kasir, dan nota | Azriel |
| [fullstack/backend](fullstack/backend/README.md) | API, pesanan, akses, dan penyimpanan | Fajral |
| [ai-engineering](ai-engineering/README.md) | Model intent, layanan model, dan bantuan draf | Andika dan Boni |
| [data-science](data-science/README.md) | Katalog, dataset, analisis, dan evaluasi | Raddya dan Ray |
| [contracts](contracts/README.md) | Kesepakatan API dan format data antarbagian | Pemilik yang mengirim dan menerima data |
| [docs](docs/README.md) | Arsitektur, cara kerja, dan keputusan tim | Seluruh tim |

Pemisahan folder mengikuti area kerja, bukan membatasi siapa yang boleh membantu. Lihat [pembagian dan pemeriksaan](docs/team.md) sebelum mengambil pekerjaan.

## Hubungan antarbagian

```text
frontend -- HTTP API --> backend -- HTTP API --> layanan model
                           |
                           +--> database

data-science -- data dan artefak berversi --> layanan model / backend
```

Frontend tidak membaca database, memuat model, atau memanggil API proprietary secara langsung. Perubahan format data dibahas melalui folder `contracts` sebelum dipakai lintas divisi.

## Bacaan awal

1. [Arsitektur dan batas sistem](docs/architecture.md).
2. [Aliran data dan serah terima](docs/data-flow.md).
3. [Cara mengerjakan perubahan](docs/development.md).
4. [Keputusan struktur repository](docs/decisions/0001-repository-layout.md).

Struktur yang dapat dibaca mesin dicatat dalam [repository-layout.json](repository-layout.json). Itu peta area dan hubungan yang direncanakan, bukan bukti integrasi sudah berjalan.

## Batas commit awal

Belum ada perintah untuk menjalankan aplikasi karena implementasinya belum dimulai. Setiap area menambahkan manifest dependensi, konfigurasi, kode, dan tes saat mulai dikerjakan. Jangan membuat folder atau modul baru hanya untuk mengisi struktur.

Secret, data pelanggan, catatan pribadi, hasil eksperimen besar, dan konfigurasi alat pribadi tidak termasuk isi produk. Tidak ada klaim bahwa prototype sudah siap menggantikan POS toko.
