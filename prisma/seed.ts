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

  const provinces = await Promise.all([
    prisma.location.create({
      data: {
        parent_id: indonesia.id,
        location_level: 1,
        location_code: "ID-JB",
        name: "Jawa Barat",
        latitude: -6.9147,
        longitude: 107.6098,
        is_active: true,
      },
    }),
    prisma.location.create({
      data: {
        parent_id: indonesia.id,
        location_level: 1,
        location_code: "ID-JK",
        name: "DKI Jakarta",
        latitude: -6.2088,
        longitude: 106.8456,
        is_active: true,
      },
    }),
    prisma.location.create({
      data: {
        parent_id: indonesia.id,
        location_level: 1,
        location_code: "ID-JT",
        name: "Jawa Tengah",
        latitude: -7.1509,
        longitude: 110.1403,
        is_active: true,
      },
    }),
    prisma.location.create({
      data: {
        parent_id: indonesia.id,
        location_level: 1,
        location_code: "ID-JI",
        name: "Jawa Timur",
        latitude: -7.5361,
        longitude: 112.2384,
        is_active: true,
      },
    }),
  ])

  // Some sample cities/districts
  await Promise.all([
    prisma.location.create({
      data: {
        parent_id: provinces[0].id,
        location_level: 2,
        location_code: "ID-KB",
        name: "Kota Bandung",
        latitude: -6.9175,
        longitude: 107.6191,
        is_active: true,
      },
    }),
    prisma.location.create({
      data: {
        parent_id: provinces[0].id,
        location_level: 2,
        location_code: "ID-BE",
        name: "Kabupaten Bekasi",
        latitude: -6.2383,
        longitude: 106.9916,
        is_active: true,
      },
    }),
    prisma.location.create({
      data: {
        parent_id: provinces[1].id,
        location_level: 2,
        location_code: "ID-JS",
        name: "Jakarta Selatan",
        latitude: -6.2615,
        longitude: 106.8101,
        is_active: true,
      },
    }),
    prisma.location.create({
      data: {
        parent_id: provinces[1].id,
        location_level: 2,
        location_code: "ID-JU",
        name: "Jakarta Utara",
        latitude: -6.1377,
        longitude: 106.8263,
        is_active: true,
      },
    }),
    prisma.location.create({
      data: {
        parent_id: provinces[2].id,
        location_level: 2,
        location_code: "ID-SM",
        name: "Kota Semarang",
        latitude: -6.9932,
        longitude: 110.4203,
        is_active: true,
      },
    }),
    prisma.location.create({
      data: {
        parent_id: provinces[3].id,
        location_level: 2,
        location_code: "ID-SB",
        name: "Kota Surabaya",
        latitude: -7.2575,
        longitude: 112.7521,
        is_active: true,
      },
    }),
  ])

  console.log("Created locations (Indonesia, provinces, cities)")

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
