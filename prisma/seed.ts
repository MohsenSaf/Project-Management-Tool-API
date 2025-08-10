import { PERMISSIONS } from "../src/constants/permission"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seed...")

  // 1️⃣ Create default STAFF role
  let userRole = await prisma.role.findFirst({
    where: { title: "STAFF" },
  })

  if (!userRole) {
    userRole = await prisma.role.create({
      data: {
        title: "STAFF",
      },
    })
    console.log("✅ Created default role: STAFF")
  } else {
    console.log('ℹ️ Default role "STAFF" already exists')
  }

  let adminRole = await prisma.role.findFirst({
    where: { title: "SUPER_ADMIN" },
  })

  if (!adminRole) {
    adminRole = await prisma.role.create({
      data: {
        title: "SUPER_ADMIN",
      },
    })
    console.log("✅ Created default role: SUPER_ADMIN")
  } else {
    console.log('ℹ️ Default role "SUPER_ADMIN" already exists')
  }

  const hashedPassword = await bcrypt.hash("SUPER_ADMIN", 10)

  // Create SUPER_ADMIN user if it doesn't exist
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      username: "admin",
      password: hashedPassword,
      roleId: adminRole.id,
    },
  })

  for (const perm of PERMISSIONS) {
    await prisma.permission.upsert({
      where: { title: perm.title },
      update: { description: perm.description },
      create: {
        title: perm.title,
        description: perm.description,
        roles: {
          connect: { id: adminRole.id },
        },
      },
    })
  }

  console.log("🌱 Database seed complete!")
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
