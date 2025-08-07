import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PERMISSIONS } from "@/constants/permission"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seed...")

  // 1️⃣ Create default USER role
  let userRole = await prisma.role.findFirst({
    where: { title: "User" },
  })

  if (!userRole) {
    userRole = await prisma.role.create({
      data: {
        title: "User",
      },
    })
    console.log("✅ Created default role: user")
  } else {
    console.log('ℹ️ Default role "user" already exists')
  }

  let adminRole = await prisma.role.findFirst({
    where: { title: "Admin" },
  })

  if (!adminRole) {
    adminRole = await prisma.role.create({
      data: {
        title: "Admin",
      },
    })
    console.log("✅ Created default role: admin")
  } else {
    console.log('ℹ️ Default role "admin" already exists')
  }

  const hashedPassword = await bcrypt.hash("admin", 10)

  // Create admin user if it doesn't exist
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "admin",
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
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
