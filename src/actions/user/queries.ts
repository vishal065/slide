"use server";

import { client } from "@/lib/prisma";

export const findUser = async (clerkId: string) => {
  return await client.user.findUnique({
    where: {
      clerkId,
    },
    include: {
      Subscription: true,
      Integrations: {
        select: {
          id: true,
          name: true,
          token: true,
          expireAt: true,
        },
      },
    },
  });
};

export const createUser = async () => {};
