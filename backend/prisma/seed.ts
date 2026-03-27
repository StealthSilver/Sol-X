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

  // Demo account (used for app testing; production DB must run `prisma db seed` once)
  const demoHash = await bcrypt.hash("rajat123", 10);
  const demoUser = await prisma.user.upsert({
    where: { email: "rajat@gmail.com" },
    update: {
      passwordHash: demoHash,
      isActive: true,
    },
    create: {
      name: "Rajat",
      email: "rajat@gmail.com",
      passwordHash: demoHash,
      role: "ADMIN",
      isActive: true,
    },
  });

  console.log("✅ Demo user:", demoUser.email);
  console.log("📧 Email: rajat@gmail.com");
  console.log("🔑 Password: rajat123");
  console.log("\n⚠️  Please change these passwords in production!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
