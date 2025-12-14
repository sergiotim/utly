import { neonConfig} from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import ws from "ws";

dotenv.config();

neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL!;

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function prismaClientSingleton(): PrismaClient {
  const adapter = new PrismaNeon({
    connectionString,
  });

  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
