"use server";

import { client } from "@/lib/prisma";
import { TRIGGER_TYPE } from "@prisma/client";

export const createAutomation = async (clerkId: string, data) => {
  try {
    console.log("before insrted in db", data);

    const abc = await client.user.update({
      where: {
        clerkId,
      },
      data: {
        automations: {
          create: {
            name: data.name,
            Keywords: {
              create: data.Keywords.map((word: string) => ({
                word: word,
              })),
            },
          },
        },
      },
    });
    console.log("before retrurn from db", abc);

    return abc;
  } catch (error) {
    console.log("databaseError", error);
  }
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

export const addListner = async (
  automationId: string,
  listener: "SMARTAI" | "MESSAGE",
  prompt: string,
  reply?: string
) => {
  return await client.automation.update({
    where: {
      id: automationId,
    },
    data: {
      listner: {
        create: {
          listener,
          prompt,
          commentReply: reply,
        },
      },
    },
  });
};

export const addTrigger = async (automationId: string, trigger: string[]) => {
  if (trigger.length === 2) {
    return await client.automation.update({
      where: {
        id: automationId,
      },
      data: {
        trigger: {
          createMany: {
            data: [
              { type: trigger[0] as "COMMENT" | "DM" },
              { type: trigger[1] as "COMMENT" | "DM" },
            ],
          },
        },
      },
    });
  }
  return await client.automation.update({
    where: {
      id: automationId,
    },
    data: {
      trigger: {
        create: {
          type: trigger[0] as "COMMENT" | "DM",
        },
      },
    },
  });
};
