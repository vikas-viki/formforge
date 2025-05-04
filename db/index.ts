import { PrismaClient } from ".prisma/client"

const globalForPrisma = global as unknown as { Prisma?: PrismaClient };

export const prisma = globalForPrisma.Prisma ?? new PrismaClient();

if (!globalForPrisma.Prisma) globalForPrisma.Prisma = prisma;
