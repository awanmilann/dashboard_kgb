import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // 1. Create Roles
  const roles = await Promise.all([
    prisma.role.create({
      data: {
        role_name: "super_admin",
        description: "Memiliki akses penuh ke seluruh sistem",
      },
    }),
    prisma.role.create({
      data: {
        role_name: "organization_admin",
        description: "Mengelola pengguna dan data dalam organisasi",
      },
    }),
    prisma.role.create({
      data: {
        role_name: "data_entry",
        description: "Membuat dan mengedit draft kasus",
      },
    }),
    prisma.role.create({
      data: {
        role_name: "verifier",
        description: "Memverifikasi kasus yang diajukan",
      },
    }),
    prisma.role.create({
      data: {
        role_name: "analyst",
        description: "Melihat dashboard dan membuat laporan agregat",
      },
    }),
    prisma.role.create({
      data: {
        role_name: "program_manager",
        description: "Melihat dashboard, laporan, dan tren data",
      },
    }),
    prisma.role.create({
      data: {
        role_name: "public_viewer",
        description: "Melihat dashboard publik dengan data agregat",
      },
    }),
  ])

  console.log(`Created ${roles.length} roles`)

  // 2. Create Permissions
  const permissions = await Promise.all([
    prisma.permission.create({ data: { permission_code: "case.create", description: "Membuat kasus baru" } }),
    prisma.permission.create({ data: { permission_code: "case.view_own_organization", description: "Melihat kasus organisasi sendiri" } }),
    prisma.permission.create({ data: { permission_code: "case.view_all", description: "Melihat seluruh kasus" } }),
    prisma.permission.create({ data: { permission_code: "case.edit", description: "Mengedit kasus" } }),
    prisma.permission.create({ data: { permission_code: "case.verify", description: "Memverifikasi kasus" } }),
    prisma.permission.create({ data: { permission_code: "case.export_aggregate", description: "Mengekspor data agregat" } }),
    prisma.permission.create({ data: { permission_code: "case.export_sensitive", description: "Mengekspor data sensitif" } }),
    prisma.permission.create({ data: { permission_code: "user.manage", description: "Mengelola pengguna" } }),
    prisma.permission.create({ data: { permission_code: "report.view", description: "Melihat laporan" } }),
    prisma.permission.create({ data: { permission_code: "report.generate", description: "Membuat laporan" } }),
    prisma.permission.create({ data: { permission_code: "audit_log.view", description: "Melihat audit log" } }),
  ])

  console.log(`Created ${permissions.length} permissions`)

  // 3. Assign permissions to roles
  const permissionMap = Object.fromEntries(
    permissions.map((p) => [p.permission_code, p.id])
  )
  const roleMap = Object.fromEntries(
    roles.map((r) => [r.role_name, r.id])
  )

  // Super Admin gets all permissions
  for (const p of permissions) {
    await prisma.rolePermission.create({
      data: { role_id: roleMap.super_admin, permission_id: p.id },
    })
  }

  // Organization Admin
  const orgAdminPermissions = [
    "case.create", "case.view_own_organization", "case.edit",
    "case.export_aggregate", "report.view", "report.generate", "user.manage",
  ]
  for (const code of orgAdminPermissions) {
    await prisma.rolePermission.create({
      data: { role_id: roleMap.organization_admin, permission_id: permissionMap[code] },
    })
  }

  // Data Entry
  const dataEntryPermissions = ["case.create", "case.view_own_organization", "case.edit"]
  for (const code of dataEntryPermissions) {
    await prisma.rolePermission.create({
      data: { role_id: roleMap.data_entry, permission_id: permissionMap[code] },
    })
  }

  // Verifier
  const verifierPermissions = ["case.view_all", "case.verify", "case.export_aggregate"]
  for (const code of verifierPermissions) {
    await prisma.rolePermission.create({
      data: { role_id: roleMap.verifier, permission_id: permissionMap[code] },
    })
  }

  // Analyst
  const analystPermissions = ["case.view_all", "case.export_aggregate", "report.view", "report.generate"]
  for (const code of analystPermissions) {
    await prisma.rolePermission.create({
      data: { role_id: roleMap.analyst, permission_id: permissionMap[code] },
    })
  }

  // Program Manager
  const pmPermissions = ["case.view_all", "case.export_aggregate", "report.view"]
  for (const code of pmPermissions) {
    await prisma.rolePermission.create({
      data: { role_id: roleMap.program_manager, permission_id: permissionMap[code] },
    })
  }

  console.log("Assigned permissions to roles")

  // 4. Create Organization
  const organization = await prisma.organization.create({
    data: {
      name: "KAPAL Perempuan",
      organization_type: "LSM",
      email: "info@kapalperempuan.local",
      phone: "021-12345678",
      address: "Jakarta, Indonesia",
      is_active: true,
    },
  })

  console.log(`Created organization: ${organization.name}`)

  // 5. Create Super Admin User
  const passwordHash = await bcrypt.hash("Admin123!", 12)
  const adminUser = await prisma.user.create({
    data: {
      organization_id: organization.id,
      full_name: "Administrator Sistem",
      email: "admin@kapalperempuan.local",
      password_hash: passwordHash,
      phone: "081234567890",
      is_active: true,
    },
  })

  await prisma.userRole.create({
    data: { user_id: adminUser.id, role_id: roleMap.super_admin },
  })

  console.log(`Created super admin: ${adminUser.email}`)

  // 6. Create Violence Types
  const violenceTypes = await Promise.all([
    prisma.violenceType.create({ data: { code: "FISIK", name: "Kekerasan Fisik", description: "Kekerasan yang mengakibatkan cedera fisik" } }),
    prisma.violenceType.create({ data: { code: "PSIKIS", name: "Kekerasan Psikis", description: "Kekerasan yang mengakibatkan trauma psikologis" } }),
    prisma.violenceType.create({ data: { code: "SEKSUAL", name: "Kekerasan Seksual", description: "Tindak pidana kekerasan seksual" } }),
    prisma.violenceType.create({ data: { code: "EKONOMI", name: "Kekerasan Ekonomi", description: "Kekerasan yang berkaitan dengan ekonomi" } }),
    prisma.violenceType.create({ data: { code: "DIGITAL", name: "Kekerasan Digital", description: "Kekerasan melalui media digital" } }),
    prisma.violenceType.create({ data: { code: "PENELANTARAN", name: "Penelantaran", description: "Penelantaran oleh pihak yang bertanggung jawab" } }),
    prisma.violenceType.create({ data: { code: "TPPO", name: "Perdagangan Orang", description: "Tindak pidana perdagangan orang" } }),
    prisma.violenceType.create({ data: { code: "LAINNYA", name: "Lainnya", description: "Jenis kekerasan lainnya" } }),
  ])

  console.log(`Created ${violenceTypes.length} violence types`)

  // 7. Create Service Types
  const serviceTypes = await Promise.all([
    prisma.serviceType.create({ data: { code: "KESEHATAN", name: "Layanan Kesehatan", description: "Layanan medis dan kesehatan" } }),
    prisma.serviceType.create({ data: { code: "PSIKOSOSIAL", name: "Dukungan Psikososial", description: "Dukungan psikologis dan sosial" } }),
    prisma.serviceType.create({ data: { code: "HUKUM", name: "Bantuan Hukum", description: "Pendampingan dan bantuan hukum" } }),
    prisma.serviceType.create({ data: { code: "RUMAH_AMAN", name: "Rumah Aman", description: "Tempat perlindungan sementara" } }),
    prisma.serviceType.create({ data: { code: "POLISI", name: "Pendampingan Kepolisian", description: "Pendampingan proses kepolisian" } }),
    prisma.serviceType.create({ data: { code: "MANAJEMEN_KASUS", name: "Manajemen Kasus", description: "Manajemen kasus terpadu" } }),
    prisma.serviceType.create({ data: { code: "EKONOMI", name: "Dukungan Ekonomi", description: "Bantuan dan pemberdayaan ekonomi" } }),
    prisma.serviceType.create({ data: { code: "LAINNYA", name: "Lainnya", description: "Layanan lainnya" } }),
  ])

  console.log(`Created ${serviceTypes.length} service types`)

  // 8. Create Locations (Indonesia administrative divisions)
  const indonesia = await prisma.location.create({
    data: {
      location_level: 0,
      location_code: "ID",
      name: "Indonesia",
      latitude: -0.7893,
      longitude: 113.9213,
      is_active: true,
    },
  })

  const allProvinces = [
    { code: "ID-AC", name: "Aceh", lat: 4.6951, lng: 96.7494 },
    { code: "ID-SU", name: "Sumatera Utara", lat: 2.1154, lng: 99.5451 },
    { code: "ID-SB", name: "Sumatera Barat", lat: -0.7399, lng: 100.8000 },
    { code: "ID-RI", name: "Riau", lat: 0.2933, lng: 101.7068 },
    { code: "ID-KR", name: "Kepulauan Riau", lat: 0.8700, lng: 104.4200 },
    { code: "ID-JA", name: "Jambi", lat: -1.4852, lng: 102.4381 },
    { code: "ID-SS", name: "Sumatera Selatan", lat: -3.3194, lng: 103.9144 },
    { code: "ID-BB", name: "Bangka Belitung", lat: -2.7411, lng: 106.4406 },
    { code: "ID-BE", name: "Bengkulu", lat: -3.7928, lng: 102.2608 },
    { code: "ID-LA", name: "Lampung", lat: -4.5586, lng: 105.4068 },
    { code: "ID-BT", name: "Banten", lat: -6.4058, lng: 106.0640 },
    { code: "ID-JK", name: "DKI Jakarta", lat: -6.2088, lng: 106.8456 },
    { code: "ID-JB", name: "Jawa Barat", lat: -6.9147, lng: 107.6098 },
    { code: "ID-JT", name: "Jawa Tengah", lat: -7.1509, lng: 110.1403 },
    { code: "ID-YO", name: "DI Yogyakarta", lat: -7.7956, lng: 110.3695 },
    { code: "ID-JI", name: "Jawa Timur", lat: -7.5361, lng: 112.2384 },
    { code: "ID-BA", name: "Bali", lat: -8.4095, lng: 115.1889 },
    { code: "ID-NB", name: "Nusa Tenggara Barat", lat: -8.6529, lng: 117.3616 },
    { code: "ID-NT", name: "Nusa Tenggara Timur", lat: -8.6539, lng: 121.0755 },
    { code: "ID-KB", name: "Kalimantan Barat", lat: -0.2788, lng: 111.4753 },
    { code: "ID-KT", name: "Kalimantan Tengah", lat: -1.6815, lng: 113.3824 },
    { code: "ID-KS", name: "Kalimantan Selatan", lat: -3.0926, lng: 115.2838 },
    { code: "ID-KI", name: "Kalimantan Timur", lat: 1.6406, lng: 116.4194 },
    { code: "ID-KU", name: "Kalimantan Utara", lat: 2.7259, lng: 116.9110 },
    { code: "ID-SA", name: "Sulawesi Utara", lat: 1.4888, lng: 124.8401 },
    { code: "ID-ST", name: "Sulawesi Tengah", lat: -1.4300, lng: 121.4456 },
    { code: "ID-SR", name: "Sulawesi Barat", lat: -2.8441, lng: 119.2321 },
    { code: "ID-SN", name: "Sulawesi Selatan", lat: -4.3105, lng: 120.2092 },
    { code: "ID-SG", name: "Sulawesi Tenggara", lat: -4.1449, lng: 122.1746 },
    { code: "ID-GO", name: "Gorontalo", lat: 0.5435, lng: 123.0568 },
    { code: "ID-MA", name: "Maluku", lat: -3.2385, lng: 130.1453 },
    { code: "ID-MU", name: "Maluku Utara", lat: 1.5700, lng: 127.8088 },
    { code: "ID-PB", name: "Papua Barat", lat: -1.3361, lng: 133.1747 },
    { code: "ID-PD", name: "Papua Barat Daya", lat: -0.8700, lng: 131.2500 },
    { code: "ID-PA", name: "Papua", lat: -4.2699, lng: 138.0804 },
    { code: "ID-PT", name: "Papua Tengah", lat: -3.6000, lng: 136.0000 },
    { code: "ID-PE", name: "Papua Pegunungan", lat: -4.0000, lng: 139.0000 },
    { code: "ID-PS", name: "Papua Selatan", lat: -6.5000, lng: 140.3000 },
  ]

  const provinces = await Promise.all(
    allProvinces.map((p) =>
      prisma.location.create({
        data: {
          parent_id: indonesia.id,
          location_level: 1,
          location_code: p.code,
          name: p.name,
          latitude: p.lat,
          longitude: p.lng,
          is_active: true,
        },
      })
    )
  )

  console.log(`Created ${provinces.length} provinces`)

  console.log("")
  console.log("=== SEED COMPLETED ===")
  console.log("Super Admin: admin@kapalperempuan.local / Admin123!")
  console.log("")
  console.log("⚠️  PERINGATAN: Ganti password sebelum production!")
}

main()
  .catch((e) => {
    console.error("Seed error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
