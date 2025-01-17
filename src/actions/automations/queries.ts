"use server";

import { client } from "@/lib/prisma";

export const createAutomation = async (clerkId: string, id?: string) => {
  return await client.user.update({
    where: {
      clerkId,
    },
    data: {
      automations: {
        create: {
          ...(id && { id }),
        },
      },
    },
  });
};

export const getAutomations = async (clerkId: string) => {
  return await client.user.findUnique({
    where: { clerkId },
    select: {
      automations: {
        orderBy: {
          createdAt: "asc",
        },
        include: {
          Keywords: true,
          listner: true,
        },
      },
    },
  });
};

export const findAutomation = async (id: string) => {
  return await client.automation.findUnique({
    where: { id },
    include: {
      Keywords: true,
      trigger: true,
      Posts: true,
      listner: true,
      User: { select: { Subscription: true, Integrations: true } },
    },
  });
};

export const updateAutomation = async (
  id: string,
  update: {
    name?: string;
    active?: boolean;
    automation?: string;
  }
) => {
  return await client.automation.update({
    where: { id },
    data: { name: update.name, active: update.active },
  });
};
