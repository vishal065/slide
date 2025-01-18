import { PrismaClient } from "@prisma/client";
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const client =
  globalThis.prisma ||
  new PrismaClient({
    log: [
      { level: "query", emit: "event" },
      { level: "info", emit: "event" },
      { level: "warn", emit: "event" },
      { level: "error", emit: "event" },
    ],
  });

if (process.env.NODE_ENV != "production") globalThis.prisma = client;
