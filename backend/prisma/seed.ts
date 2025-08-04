import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1️⃣ Create default USER role
  let userRole = await prisma.role.findFirst({
    where: { title: 'User' },
  });

  if (!userRole) {
    userRole = await prisma.role.create({
      data: {
        title: 'User',
        permissions: [],
      },
    });
    console.log('✅ Created default role: user');
  } else {
    console.log('ℹ️ Default role "user" already exists');
  }

  console.log('🌱 Database seed complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
