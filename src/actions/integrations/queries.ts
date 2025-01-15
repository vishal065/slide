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
