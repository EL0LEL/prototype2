# Kontrak API

Backend adalah satu-satunya API aplikasi yang dipanggil browser. Layanan AI dipanggil oleh backend, bukan langsung oleh frontend.

Setelah dibahas, simpan OpenAPI backend pada `backend.openapi.yaml` dan OpenAPI layanan AI pada `ai.openapi.yaml`. Kedua file belum dibuat karena endpoint dan skemanya belum dibakukan.

Untuk setiap operasi, sepakati:

- Tujuan bisnis, metode HTTP, dan alamat endpoint.
- Request, response, field wajib, tipe, dan contoh yang aman.
- Hak akses, validasi, status HTTP, serta pesan gagal.
- Aturan retry, idempotency bila menyimpan pesanan, dan batas waktu layanan.
- Versi kontrak dan pihak yang memeriksa perubahan.

Arah nama dari plan adalah `/api/v1` untuk backend, serta `/predict-intent` dan `/generate-draft` pada layanan model. Itu usulan antarmuka, bukan endpoint yang sudah tersedia.

Frontend membaca hasil backend, sedangkan harga dan total tetap dihitung backend dari katalog yang disetujui.
