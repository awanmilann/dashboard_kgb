# Panduan Penggunaan — Dashboard Pemantauan KBG & TPKS

## Daftar Isi

1. [Sekilas Aplikasi](#1-sekilas-aplikasi)
2. [Login & Akses Masuk](#2-login--akses-masuk)
3. [Navigasi & Tata Letak](#3-navigasi--tata-letak)
4. [Dashboard](#4-dashboard)
5. [Data Kasus](#5-data-kasus)
6. [Verifikasi Kasus](#6-verifikasi-kasus)
7. [Rujukan & Layanan](#7-rujukan--layanan)
8. [Peta Persebaran](#8-peta-persebaran)
9. [Laporan](#9-laporan)
10. [Indikator Global](#10-indikator-global)
11. [Pengaturan](#11-pengaturan)
12. [Profil](#12-profil)
13. [UAT Feedback](#13-uat-feedback)
14. [Dashboard Publik](#14-dashboard-publik)
15. [Sistem Hak Akses](#15-sistem-hak-akses)

---

## 1. Sekilas Aplikasi

Dashboard Pemantauan KBG & TPKS adalah sistem informasi berbasis web untuk mencatat, memantau, dan melaporkan kasus **Kekerasan Berbasis Gender (KBG)** dan **Tindak Pidana Kekerasan Seksual (TPKS)**.

Aplikasi ini dibangun menggunakan:
- **Next.js 16** — Framework React dengan App Router
- **TypeScript** — Bahasa pemrograman
- **Tailwind CSS 4** — Styling
- **NextAuth.js** — Autentikasi
- **Prisma** — ORM database
- **Recharts** — Visualisasi grafik
- **Leaflet** — Peta interaktif
- **jsPDF / xlsx** — Ekspor laporan

---

## 2. Login & Akses Masuk

### Halaman Login
- **URL:** `/login`
- Pengguna memasukkan **Email** dan **Password**
- Klik tombol **Masuk** untuk login
- Jika login berhasil, akan diarahkan ke halaman **Dashboard**
- Jika gagal, akan muncul pesan error "Email atau password salah"

### Fitur Halaman Login
- Toggle **show/hide password** (ikon mata)
- Tombol **Kembali ke Beranda** untuk kembali ke halaman utama
- Loading state dengan animasi spinner saat proses login

### Logout
- Klik tombol **Keluar** di bagian bawah sidebar
- Atau klik profil di pojok kanan atas > **Keluar**
- Akan diarahkan kembali ke halaman login

---

## 3. Navigasi & Tata Letak

### Struktur Halaman
Setelah login, tampilan terdiri dari 3 bagian utama:
1. **Sidebar** (kiri) — Menu navigasi utama
2. **Topbar** (atas) — Breadcrumb, notifikasi, tema, profil
3. **Content** (tengah) — Konten halaman aktif

### Sidebar
Sidebar terdiri dari beberapa seksi menu:

**Utama**
- Dashboard

**Data**
- Data Kasus
- Verifikasi
- Rujukan & Layanan
- Peta Persebaran
- Laporan

**Referensi**
- Indikator Global VP

**Pengaturan** (akses terbatas)
- Pengguna
- Organisasi
- Master Data
- Role & Hak Akses
- Audit Log

**Akun**
- Profil
- UAT Feedback

### Fitur Sidebar
- **Collapse/Expand** — Klik ikon panah kiri (`<`) untuk mengecilkan sidebar, atau icon `Menu` (hamburger) di mobile untuk membuka
- **Mobile:** Sidebar otomatis tertutup saat memilih menu (di layar < 1024px)
- **Active state** — Menu yang sedang aktif ditandai dengan warna ungu dan garis tepi kiri
- **Ikon saja** — Saat sidebar dikecilkan, hanya ikon yang ditampilkan

### Topbar
- **Breadcrumb** — Menunjukkan posisi halaman saat ini
- **Notifikasi** — Ikon lonceng dengan jumlah notifikasi baru
- **Toggle tema** — Beralih antara mode terang dan gelap
- **Profil** — Nama pengguna, organisasi, dan dropdown menu (Profil, Pengaturan, Keluar)

---

## 4. Dashboard

- **URL:** `/dashboard`
- Menampilkan ringkasan data kasus secara real-time

### Komponen Dashboard

#### Filter Global
- **Periode** — Filter tahun (2024–2026)
- **Wilayah** — Filter berdasarkan provinsi
- **Organisasi** — Filter berdasarkan organisasi pelapor (dengan opsi "Lainnya" untuk input manual)
- **Jenis Kekerasan** — Filter jenis kekerasan

#### Kartu KPI (Key Performance Indicators)
Enam kartu metrik utama:
| Kartu | Warna | Keterangan |
|-------|-------|------------|
| Total Kasus | Ungu | Seluruh kasus tercatat |
| Terverifikasi | Hijau | Kasus sudah diverifikasi |
| Dalam Penanganan | Biru | Kasus sedang ditangani |
| Risiko Tinggi | Merah | Kasus dengan tingkat risiko tinggi/kritis |
| Belum Dirujuk | Kuning | Kasus belum mendapatkan rujukan layanan |
| Belum Diverifikasi | Kuning | Kasus menunggu verifikasi |

Setiap kartu bisa diklik untuk langsung menuju halaman terkait.

#### Grafik & Visualisasi
- **Tren Kasus per Bulan** — Grafik garis tren bulanan
- **Jenis Kekerasan** — Diagram lingkaran/donat
- **Status Penanganan** — Diagram batang status
- **Persebaran per Wilayah** — Diagram batang top 20 wilayah
- **Peta Persebaran** — Peta interaktif sebaran kasus per provinsi (Leaflet)

#### Tombol Aksi Cepat
- **Tambah Data Kasus** — Tombol di pojok kanan header untuk langsung menuju form tambah kasus

---

## 5. Data Kasus

### Daftar Kasus
- **URL:** `/kasus`
- Menampilkan tabel daftar seluruh kasus

#### Filter
- **Pencarian** — Cari berdasarkan nomor kasus atau penyintas
- **Periode** — Filter tahun
- **Wilayah** — Filter provinsi
- **Status** — Filter status kasus:
  - Draft, Terkirim, Menunggu Verifikasi, Terverifikasi, Dalam Penanganan, Ditutup
- **Organisasi** — Filter organisasi pelapor
- **Jenis Kekerasan** — Filter jenis kekerasan
- **Status Verifikasi** — Menunggu, Ditinjau, Disetujui, Ditolak, Perlu Perbaikan

#### Kolom Tabel
| Kolom | Keterangan |
|-------|------------|
| ID Kasus | Nomor unik kasus |
| Tanggal Lapor | Tanggal pelaporan |
| Wilayah | Provinsi/lokasi |
| Jenis Kekerasan | Kategori kekerasan |
| Status | Badge status kasus |
| Status Verifikasi | Badge status verifikasi |
| Risiko | Badge tingkat risiko (rendah/sedang/tinggi/kritis) |
| Aksi | Tombol Lihat Detail & Edit |

### Tambah Kasus Baru
- **URL:** `/kasus/tambah`
- Form multi-step (5 langkah) dengan navigasi wizard

**Langkah 1: Informasi Pelaporan**
- Organisasi Pelapor (dengan opsi "Lainnya")
- Tanggal Lapor
- Lokasi Pelaporan (provinsi)
- Kategori Kasus (KBG / TPKS)
- Sumber Informasi
- Tingkat Urgensi (Rendah / Sedang / Tinggi / Darurat)
- Catatan Pelaporan

**Langkah 2: Informasi Kejadian**
- Tanggal Kejadian
- Lokasi Kejadian
- Setting/Tempat Kejadian (Rumah, Sekolah, Tempat Kerja, Fasilitas Umum, Daring)
- Hubungan Pelaku (Pasangan, Mantan Pasangan, Keluarga, Atasan, dll)
- Jenis Kekerasan (Fisik, Psikis, Seksual, Ekonomi, Multi)
- Deskripsi Kejadian (textarea kronologis)

**Langkah 3: Profil Penyintas**
- Kode Penyintas (di-generate otomatis)
- Kelompok Usia (Anak, Remaja, Dewasa, Lansia)
- Jenis Kelamin
- Disabilitas
- Status Perkawinan
- Pekerjaan
- Pendidikan
- Kelompok Rentan
- Checkbox Penyintas Utama

**Langkah 4: Penanganan & Layanan**
- Tingkat Risiko (Rendah / Sedang / Tinggi / Kritis)
- Layanan yang Dibutuhkan
- Status Layanan (Baru / Dalam Proses / Selesai / Dirujuk)
- Penyedia Layanan
- Kebutuhan Rujukan
- Catatan Penanganan

**Langkah 5: Tinjau & Kirim**
- Ringkasan data yang diinput
- Checkbox persetujuan
- Tombol **Simpan sebagai Draft** atau **Kirim untuk Verifikasi**

### Detail Kasus
- **URL:** `/kasus/[id]`
- Menampilkan detail lengkap kasus dengan tab:
  - Ringkasan
  - Kejadian
  - Penyintas
  - Penanganan
  - Rujukan
  - Verifikasi
  - Riwayat

### Edit Kasus
- **URL:** `/kasus/[id]/edit`
- Form multi-step yang sama dengan tambah kasus, dengan data terisi
- Tombol Simpan Draft / Kirim Verifikasi

---

## 6. Verifikasi Kasus

### Daftar Verifikasi
- **URL:** `/verifikasi`
- Menampilkan tabel kasus yang perlu diverifikasi

#### Filter
- Pencarian nomor kasus
- Filter status verifikasi

#### Kolom Tabel
- ID Kasus, Tanggal Lapor, Wilayah, Status, Status Verifikasi, Aksi

### Detail Verifikasi
- **URL:** `/verifikasi/[id]`
- Ringkasan kasus
- Form **Tindakan Verifikasi**:
  - Catatan Verifikasi (textarea)
  - 3 tombol aksi:
    - **Minta Perbaikan** (kuning) — Kembalikan ke pelapor untuk revisi
    - **Tolak** (merah) — Tolak kasus
    - **Verifikasi** (hijau) — Setujui kasus

---

## 7. Rujukan & Layanan

- **URL:** `/rujukan`
- Mengelola rujukan layanan bagi penyintas

### Ringkasan KPI
| Kartu | Keterangan |
|-------|------------|
| Butuh Rujukan | Jumlah kasus yang membutuhkan rujukan |
| Rujukan Aktif | Jumlah rujukan yang sedang diproses |
| Belum Ditindaklanjuti | Rujukan yang masih menunggu tindakan |

### Filter
- Pencarian
- Status (Menunggu, Diproses, Selesai, Ditolak, Dibatalkan)
- Jenis Layanan

### Kolom Tabel
| Kolom | Keterangan |
|-------|------------|
| ID Kasus | Nomor kasus |
| Kode Penyintas | Kode unik penyintas |
| Jenis Layanan | Tipe layanan yang dirujuk |
| Penyedia Layanan | Institusi pemberi layanan |
| Status | Badge status rujukan |
| Tanggal Rujuk | Tanggal dirujuk |

---

## 8. Peta Persebaran

- **URL:** `/peta`
- Visualisasi geografis persebaran kasus per provinsi

### Fitur
- Peta interaktif menggunakan Leaflet
- **Filter:**
  - Periode
  - Jenis Kekerasan
  - Status Kasus (Draft, Dilaporkan, Dalam Penanganan, Selesai)
  - Level Wilayah (Provinsi)
- Data ditampilkan dalam bentuk marker/heatmap di peta

---

## 9. Laporan

- **URL:** `/laporan`
- Membuat dan mengekspor laporan data kasus

### Jenis Laporan
| Jenis | Keterangan |
|-------|------------|
| Ringkasan Bulanan | Agregat data per bulan |
| Ringkasan Kuartalan | Agregat data per 3 bulan |
| Laporan Wilayah | Data berdasarkan wilayah |
| Laporan Jenis Kekerasan | Data per jenis kekerasan |
| Laporan Status Penanganan | Data per status penanganan |

### Filter Laporan
- Periode (bulan)
- Wilayah
- Organisasi
- **Format Ekspor:**
  - **PDF** — Menggunakan jsPDF dengan tabel
  - **Excel** — Menggunakan xlsx (.xlsx)

### Alur Penggunaan
1. Pilih jenis laporan
2. Atur filter yang diinginkan
3. Klik **Preview** untuk melihat pratinjau
4. Klik **Download** untuk mengekspor file
- Histori generate laporan tercatat di database

---

## 10. Indikator Global

- **URL:** `/indikator-global`
- Halaman referensi yang berisi kerangka indikator global PBB untuk mengukur kekerasan terhadap perempuan

### Indikator yang Tercakup
| Indikator | Kategori | SDG Target |
|-----------|----------|------------|
| Kekerasan Pasangan Intim (IPV) | Kekerasan Langsung | 5.2.1 |
| Kekerasan Seksual Non-Pasangan | Kekerasan Langsung | 5.2.2 |
| Kekerasan Fisik | Kekerasan Langsung | — |
| Kekerasan Psikologis & Emosional | Kekerasan Tidak Langsung | — |
| Kekerasan Ekonomi | Kekerasan Tidak Langsung | — |
| Perkawinan Anak | Praktik Berbahaya | 5.3.1 |
| Female Genital Mutilation/Cutting | Praktik Berbahaya | 5.3.2 |
| Sikap terhadap Kekerasan | Norma Sosial | — |
| Perdagangan Manusia (Trafficking) | Kejahatan Transnasional | 16.2.2 |
| Femisida | Kekerasan Langsung | — |

Setiap indikator dilengkapi deskripsi dan link referensi ke UN Women, WHO, UNICEF, UNODS, dll.

---

## 11. Pengaturan

Halaman pengaturan hanya dapat diakses oleh pengguna dengan permission tertentu.

### 11.1 Pengelolaan Pengguna
- **URL:** `/pengaturan/pengguna`
- **Permission:** `user.manage`
- Menampilkan daftar pengguna terdaftar (tabel)
- **Tambah Pengguna:** Form modal dengan field:
  - Nama Lengkap
  - Email
  - Role (Admin, Verifikator, Pelapor, Viewer)
  - Organisasi

### 11.2 Pengelolaan Organisasi
- **URL:** `/pengaturan/organisasi`
- **Permission:** `user.manage`
- Menampilkan daftar organisasi terdaftar
- **Tambah Organisasi:** Form modal dengan field:
  - Nama Organisasi
  - Tipe (UPT P2TP2A, Dinas Sosial, Puskesmas, Polres, Rumah Sakit)
  - Provinsi
  - Kota/Kabupaten

### 11.3 Master Data
- **URL:** `/pengaturan/master-data`
- **Permission:** `user.manage`
- Mengelola data referensi dengan tab:
  - Jenis Kekerasan
  - Jenis Layanan
  - Lokasi
  - Status Kasus
  - Status Rujukan

### 11.4 Role & Hak Akses
- **URL:** `/pengaturan/role-akses`
- **Permission:** `user.manage`
- Menampilkan daftar role
- **Tambah Role:** Form modal dengan daftar permission checkbox:
  - Melihat Data Kasus
  - Membuat Kasus
  - Mengedit Kasus
  - Menghapus Kasus
  - Melihat Verifikasi
  - Melakukan Verifikasi
  - Melihat Laporan
  - Generate Laporan
  - Mengelola Pengguna
  - Melihat Audit Log

### 11.5 Audit Log
- **URL:** `/pengaturan/audit-log`
- **Permission:** `audit_log.view`
- Riwayat aktivitas pengguna
- **Filter:**
  - Pencarian
  - Aksi (Membuat, Mengubah, Menghapus, Verifikasi, Login, Logout)
  - Entitas (Kasus, Pengguna, Organisasi, Role, Master Data)
  - Filter tanggal
- **Kolom Tabel:** Waktu, User, Aksi, Entitas, Detail, IP Address

---

## 12. Profil

- **URL:** `/profil`
- Menampilkan informasi akun pengguna

### Informasi Akun
- Avatar inisial
- Nama lengkap
- Role
- Email
- Organisasi

### Ubah Password
- Form perubahan password dengan field:
  - Password Saat Ini
  - Password Baru
  - Konfirmasi Password Baru
- Validasi kecocokan password baru

---

## 13. UAT Feedback

- **URL:** `/uat`
- Form feedback untuk User Acceptance Test

### Fitur
- **Rating bintang** (1–5) dengan efek hover
- **Kategori** feedback:
  - Tampilan & UI
  - Fungsionalitas
  - Kinerja
  - Data & Informasi
  - Saran Fitur
  - Laporan Bug
  - Lainnya
- **Halaman** — Input manual URL halaman (opsional)
- **Textarea** — Masukan dan saran
- Data dikirim ke API `/api/uat-feedback`
- Tampilan sukses setelah submit

---

## 14. Dashboard Publik

- **URL:** `/dashboard-publik`
- Halaman publik yang bisa diakses tanpa login
- Data sensitif di-suppress (nilai < 3 ditampilkan sebagai "<3")

### Fitur
- Kartu KPI: Total Kasus, Terverifikasi, Dalam Penanganan, Risiko Tinggi
- Grafik: Tren Kasus per Bulan, Jenis Kekerasan
- Peringatan privasi di bagian atas halaman
- Data suppression untuk melindungi identitas korban

---

## 15. Sistem Hak Akses

Aplikasi menggunakan sistem role-based access control (RBAC).

### Role yang Tersedia
| Role | Keterangan |
|------|------------|
| super_admin | Akses penuh ke seluruh sistem |
| organization_admin | Admin tingkat organisasi |
| data_entry | Input data kasus |
| verifier | Verifikasi kasus |
| analyst | Akses laporan dan analisis |
| program_manager | Manajemen program |
| public_viewer | Akses dashboard publik |

### Permission Codes
| Permission | Keterangan |
|------------|------------|
| `case.create` | Membuat kasus baru |
| `case.view_own_organization` | Melihat kasus organisasi sendiri |
| `case.view_all` | Melihat seluruh kasus |
| `case.edit` | Mengedit kasus |
| `case.verify` | Melakukan verifikasi |
| `case.export_aggregate` | Ekspor data agregat |
| `case.export_sensitive` | Ekspor data sensitif |
| `user.manage` | Mengelola pengguna, organisasi, role |
| `report.view` | Melihat laporan |
| `report.generate` | Generate laporan |
| `audit_log.view` | Melihat audit log |

### Permission Guard
Komponen `PermissionGuard` digunakan di sidebar untuk menyembunyikan menu yang tidak sesuai dengan hak akses pengguna.

---

## Catatan Teknis

- Semua form yang ada saat ini masih menggunakan state lokal dan akan terintegrasi dengan database setelah backend selesai
- Data pada tabel masih menggunakan data dummy/placeholder
- Ekspor laporan sudah fungsional (PDF & Excel) menggunakan data dari API
- Peta interaktif menggunakan Leaflet
- Autentikasi menggunakan NextAuth.js dengan provider credentials
- Styling menggunakan Tailwind CSS 4 dengan tema purple/dark
