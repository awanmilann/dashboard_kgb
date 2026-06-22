# Dashboard Pemantauan KBG & TPKS

Aplikasi web full-stack untuk pemantauan Kekerasan Berbasis Gender (KBG) dan Tindak Pidana Kekerasan Seksual (TPKS).

## Tech Stack

- **Frontend:** Next.js 16, TypeScript, Tailwind CSS, shadcn/ui, Lucide Icons, Recharts, TanStack Table
- **Backend:** Next.js API Routes, NextAuth.js (Auth.js), Prisma ORM
- **Database:** PostgreSQL 16 dengan pgcrypto
- **Autentikasi:** JWT dengan bcrypt, Role-Based Access Control (RBAC)

## Persyaratan Sistem

- Node.js 18+
- Docker Desktop (untuk PostgreSQL lokal)
- npm

## Panduan Instalasi

### 1. Clone Repository

```bash
git clone <repository-url>
cd dashborad_pemantauan
```

### 2. Copy Environment Variables

```bash
cp .env.example .env
```

Edit `.env` jika diperlukan. Untuk development lokal, nilai default sudah sesuai.

### 3. Jalankan PostgreSQL dengan Docker

```bash
docker compose up -d
```

Ini akan menjalankan PostgreSQL 16 di port 5432.

### 4. Generate Prisma Client

```bash
npm run db:generate
```

### 5. Jalankan Migration

```bash
npm run db:migrate
```

### 6. Seed Data Master

```bash
npm run db:seed
```

### 7. Install Dependencies (jika belum)

```bash
npm install
```

### 8. Jalankan Development Server

```bash
npm run dev
```

Akses aplikasi di **http://localhost:3000**

## Akun Development

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@kapalperempuan.local | Admin123! |

**⚠️ PERINGATAN:** Ganti password segera sebelum menggunakan aplikasi di production!

## Role dan Hak Akses

| Role | Deskripsi |
|------|-----------|
| Super Admin | Akses penuh ke seluruh sistem, kelola pengguna, organisasi, role, dan audit log |
| Organization Admin | Kelola pengguna dan data dalam organisasinya |
| Data Entry | Membuat dan mengedit draft kasus |
| Verifier | Memverifikasi kasus yang diajukan |
| Analyst | Melihat dashboard dan membuat laporan agregat |
| Program Manager | Melihat dashboard, laporan, dan tren data |
| Public Viewer | Melihat dashboard publik (tidak perlu login) |

## Struktur Proyek

```
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed data
├── src/
│   ├── app/
│   │   ├── (auth)/login       # Halaman login
│   │   ├── (internal)/        # Halaman internal (butuh login)
│   │   │   ├── dashboard/
│   │   │   ├── kasus/
│   │   │   ├── verifikasi/
│   │   │   ├── rujukan/
│   │   │   ├── peta/
│   │   │   ├── laporan/
│   │   │   ├── pengaturan/
│   │   │   └── profil/
│   │   ├── (public)/          # Halaman publik
│   │   ├── api/               # API Routes
│   │   └── layout.tsx
│   ├── components/
│   │   ├── charts/
│   │   ├── forms/
│   │   ├── layout/            # Sidebar, Topbar
│   │   ├── shared/            # Reusable components
│   │   ├── tables/
│   │   └── ui/               # Base UI components
│   ├── hooks/
│   ├── lib/
│   │   ├── auth/             # Autentikasi
│   │   ├── db/               # Database client
│   │   ├── utils/            # Utility functions
│   │   └── validations/
│   ├── providers/            # React providers
│   ├── types/                # TypeScript types
│   └── middleware.ts
├── docker-compose.yml
├── .env.example
└── README.md
```

## Halaman Aplikasi

### Publik (Tidak Perlu Login)
- `/` - Landing page
- `/login` - Halaman login
- `/dashboard-publik` - Dashboard agregat publik

### Internal (Perlu Login)
- `/dashboard` - Dashboard internal
- `/kasus` - Data kasus
- `/kasus/tambah` - Form tambah kasus
- `/kasus/[id]` - Detail kasus
- `/kasus/[id]/edit` - Edit kasus
- `/verifikasi` - Verifikasi kasus
- `/rujukan` - Rujukan dan layanan
- `/peta` - Peta persebaran
- `/laporan` - Laporan
- `/pengaturan/pengguna` - Manajemen pengguna
- `/pengaturan/organisasi` - Manajemen organisasi
- `/pengaturan/master-data` - Master data
- `/pengaturan/role-akses` - Role dan hak akses
- `/pengaturan/audit-log` - Audit log
- `/profil` - Profil pengguna

## API Endpoints

### Autentikasi
- `POST /api/auth/login` - Login
- `GET /api/auth/session` - Get session

### Users
- `GET /api/users` - Daftar pengguna
- `POST /api/users` - Tambah pengguna
- `PATCH /api/users/[id]` - Edit pengguna
- `DELETE /api/users/[id]` - Nonaktifkan pengguna

### Organisasi
- `GET /api/organizations` - Daftar organisasi
- `POST /api/organizations` - Tambah organisasi
- `PATCH /api/organizations/[id]` - Edit organisasi

### Kasus
- `GET /api/cases` - Daftar kasus
- `POST /api/cases` - Tambah kasus
- `GET /api/cases/[id]` - Detail kasus
- `PATCH /api/cases/[id]` - Edit kasus
- `POST /api/cases/[id]?action=submit` - Kirim untuk verifikasi
- `POST /api/cases/[id]?action=archive` - Arsipkan kasus

### Verifikasi
- `GET /api/verifications` - Daftar verifikasi

### Laporan
- `GET /api/reports/summary` - Ringkasan laporan
- `POST /api/reports/generate` - Generate laporan

### Master Data
- `GET /api/master/violence-types` - Jenis kekerasan
- `GET /api/master/service-types` - Jenis layanan
- `GET /api/master/locations` - Wilayah

### Audit
- `GET /api/audit-logs` - Log aktivitas

## Catatan Keamanan

1. **Password**: Ganti password default `Admin123!` sebelum production
2. **JWT Secret**: Generate `AUTH_SECRET` baru untuk production:
   ```bash
   openssl rand -base64 32
   ```
3. **Encryption Key**: Generate `ENCRYPTION_KEY` baru untuk production:
   ```bash
   openssl rand -hex 32
   ```
4. **Database**: Gunakan password database yang kuat untuk production
5. **HTTPS**: Pastikan aplikasi dijalankan dengan HTTPS di production
6. **Environment Variables**: Jangan commit `.env` ke repository
7. **Data Sensitif**: Data identitas penyintas dienkripsi dan dipisahkan dari data kasus umum
8. **Audit Log**: Semua aktivitas penting tercatat dalam audit log

## Demo Mode

Set `NEXT_PUBLIC_DEMO_MODE=true` di `.env` untuk mengaktifkan mode demo dengan data dummy agregat.

## Lisensi

Hak cipta dilindungi. Dibangun untuk organisasi masyarakat sipil.
