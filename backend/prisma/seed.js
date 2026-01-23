"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🌱 Seeding database...");
        // Create Master Admin
        const hashedPassword = yield bcrypt_1.default.hash("Admin@2026", 10);
        const masterAdmin = yield prisma.user.upsert({
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
    });
}
main()
    .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
