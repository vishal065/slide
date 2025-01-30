"use server";

import { client } from "@/lib/prisma";

export const upateIntegration = async (
  id: string,
  token: string,
  expire: Date
) => {
  return await client.integrations.update({
    where: {
      id,
    },
    data: {
      token,
      expireAt: expire,
    },
  });
};

export const getIntegration = async (clerkId: string) => {
  return await client.user.findUnique({
    where: {
      clerkId,
    },
    select: {
      Integrations: {
        where: {
          name: "INSTAGRAM",
        },
      },
    },
  });
};

export const createIntegration = async (
  clerkId: string,
  token: string,
  expire: Date,
  igId?: string
) => {
  return await client.user.update({
    where: {
      clerkId,
    },
    data: {
      Integrations: {
        create: {
          token,
          expireAt: expire,
          instagramId: igId,
        },
      },
    },
    select: {
      firstname: true,
      lastname: true,
    },
    
  });
};
