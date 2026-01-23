import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create Master Admin
  const hashedPassword = await bcrypt.hash("Admin@2026", 10);

  const masterAdmin = await prisma.user.upsert({
    where: { email: "rajat.saraswat.0409@gmail.com" },
    update: {},
    create: {
      name: "Master Admin",
      email: "rajat.saraswat.0409@gmail.com",
      passwordHash: hashedPassword,
      role: "MASTER_ADMIN",
      isActive: true,
    },
  });

  console.log("✅ Master Admin created:", masterAdmin.email);
  console.log("📧 Email: rajat.saraswat.0409@gmail.com");
  console.log("🔑 Password: Admin@2026");
  console.log("\n⚠️  Please change this password in production!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
