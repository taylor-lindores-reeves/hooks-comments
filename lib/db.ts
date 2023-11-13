import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const globalForPrisma = global as unknown as {
	prisma: PrismaClient;
};

export const db = globalForPrisma.prisma || client;

if (process.env.APP_ENV !== "production") globalForPrisma.prisma = db;

export default db;
