"use server";

import { client } from "@/lib/prisma";

export const findUser = async (clerkId: string) => {
  try {
    const existingUser = await client?.user?.findUnique({
      where: {
        clerkId: clerkId,
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
    return existingUser;
  } catch (error) {
    console.error("error in findUser", error);
  }
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
