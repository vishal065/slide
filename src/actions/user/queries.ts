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

export const createUser = async (
  clerkId: string,
  firstname: string,
  lastname: string,
  email: string
) => {
  return await client.user.create({
    data: {
      clerkId,
      firstname,
      lastname,
      email,
      Subscription: {
        create: {},
      },
    },
    select: {
      firstname: true,
      lastname: true,
    },
  });
};
