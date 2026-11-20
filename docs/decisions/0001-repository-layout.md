# 0001: Satu repository, batas aplikasi terpisah

Tanggal: 16 November 2026.
Status: struktur awal mengikuti kesepakatan Andika dan Boni; rincian implementasi serta kontrak masih dibahas tim.

## Kebutuhan

Frontend dan backend harus terpisah serta terhubung lewat API. Tim juga perlu area yang jelas untuk Next-Gen AI Engineering dan Data Science tanpa menyalin data atau kontrak ke banyak tempat.

## Keputusan

Gunakan `fullstack/frontend`, `fullstack/backend`, `ai-engineering`, dan `data-science` sebagai batas area. Gunakan `contracts` untuk kesepakatan antarbagian dan `docs` untuk penjelasan serta keputusan.

Frontend, backend, dan layanan AI tetap dapat memiliki dependensi serta proses terpisah meskipun berada dalam satu repository. Folder tidak disamakan dengan microservice yang harus dideploy sendiri sejak awal.

## Alasan

Jalur ini mudah dicari berdasarkan divisi, tetap membedakan dua aplikasi Full-Stack, dan membuat satu sumber kontrak. Nama file menjelaskan isinya; link relatif serta peta area membantu pembaca menelusuri hubungan tanpa bergantung pada path laptop tertentu.

## Konsekuensi

Perubahan kontrak perlu review lintas divisi. Tidak ada import langsung dari frontend ke kode backend atau akses database browser. Kode pengolahan DS tidak dijalankan sebagai notebook dalam request aplikasi.

Jangan menambah folder kosong untuk seluruh kemungkinan fitur. Struktur internal dibuat bersama implementasi yang memerlukannya. Jika pemisahan ini berubah, tulis keputusan berikutnya dan jelaskan dampak ke pihak lain.
