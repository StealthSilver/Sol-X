import { PrismaClient } from "@prisma/client";

/**
 * Reuse one PrismaClient in development (nodemon reloads otherwise create many
 * clients and exhaust Neon pooler connections → P1017 / "Server has closed").
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["warn", "error"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
