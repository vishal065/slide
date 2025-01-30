import { client } from "@/lib/prisma";

export const matchKeyword = async (keyword: string) => {
  return await client.keyword.findFirst({
    where: {
      word: {
        equals: keyword,
        mode: "insensitive",
      },
    },
  });
};

export const getKeywordAutomation = async (
  automationId: string,
  dm: boolean
) => {
  return await client.automation.findUnique({
    where: {
      id: automationId,
    },
    include: {
      Dms: dm,
      trigger: {
        where: {
          type: dm ? "DM" : "COMMENT",
        },
      },
      listner: true,
      User: {
        select: {
          Subscription: {
            select: {
              plan: true,
            },
          },
          Integrations: {
            select: {
              token: true,
            },
          },
        },
      },
    },
  });
};

export const trackResponses = async (
  automationId: string,
  type: "COMMENT" | "DM"
) => {
  if (type === "COMMENT") {
    return await client.listner.update({
      where: {
        automationId,
      },
      data: {
        commentCount: {
          increment: 1,
        },
      },
    });
  }
  if (type === "DM") {
    return await client.listner.update({
      where: {
        automationId,
      },
      data: {
        dmCount: {
          increment: 1,
        },
      },
    });
  }
};

export const createChatHistory = (
  automationId: string,
  sender: string,
  reciever: string,
  message: string
) => {
  return client.automation.update({
    where: {
      id: automationId,
    },
    data: {
      Dms: {
        create: {
          reciever,
          senderId: sender,
          message,
        },
      },
    },
  });
};

export const getKeywordPost = async (postId: string, automationId: string) => {
  return await client.post.findFirst({
    where: {
      AND: [{ postid: postId }, { automationId }],
    },
    select: {
      automationId: true,
    },
  });
};

export const getChatHistory = async (sender: string, reciever: string) => {
  const history = await client.dms.findMany({
    where: {
      AND: [{ senderId: sender }, { reciever }],
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // If history is empty, return a default response
  if (history.length === 0) {
    return {
      history: [],
      automationId: null, // or some default value
    };
  }

  const chatSession: { role: "assistant" | "user",content: string }[] = history?.map((chat) => {
    return {
      role: chat.reciever ? "assistant" : "user",
      content: chat.message!,
    };
  });
  return {
    history: chatSession,
    automationId: history[history.length - 1].automationId,
  };
};
