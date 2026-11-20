# Data kerja

Folder ini bukan tempat mengunggah data toko tanpa pemeriksaan.

Saat pengolahan dimulai, gunakan tiga lokasi lokal yang tidak dilacak Git:

- `raw`: salinan sumber asli, tidak ditimpa oleh proses pembersihan.
- `interim`: keluaran antara yang masih perlu diperiksa.
- `processed`: keluaran pipeline yang sudah divalidasi.

Ketiga folder dibuat saat ada data yang diizinkan untuk disimpan. `.gitignore` sudah mengecualikannya.

Catat sumber, izin, periode, versi, arti kolom, dan ketentuan penggunaan sebelum data dipakai. Jangan memasukkan identitas pelanggan atau kredensial ke repository.

Contoh kecil yang memang aman untuk dibagikan ditempatkan di [contracts/examples](../../contracts/examples/README.md). Metadata dan hasil evaluasi tanpa data sensitif dapat ditinjau untuk masuk ke [reports](../reports/README.md).
