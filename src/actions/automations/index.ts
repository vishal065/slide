"use server";

import { onCurrentUser } from "../user";
import { findUser } from "../user/queries";
import {
  addKeyWord,
  addListner,
  addPost,
  addTrigger,
  createAutomation,
  deleteKeywordQuery,
  findAutomation,
  getAutomations,
  updateAutomation,
} from "./queries";

export const createAutomations = async (data) => {
  const user = await onCurrentUser();
  try {
    const create = await createAutomation(user.id, data);
    if (create) return { status: 200, data: "Automation Created" };
    return { status: 404, data: "Oops! Something went wrong" };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Server Error" };
  }
};
export const getAllAutomations = async () => {
  const user = await onCurrentUser();
  try {
    const automations = await getAutomations(user.id);

    if (automations) return { status: 200, data: automations.automations };
    return { status: 404, data: [] };
  } catch (error) {
    console.error(error);
    return { status: 500, data: [] };
  }
};

export const getAutomationInfo = async (id: string) => {
  //for metaData
  await onCurrentUser();
  try {
    const automation = await findAutomation(id);
    if (automation) return { status: 200, data: automation };
    return { status: 404 };
  } catch (error) {
    console.error(error);
    return { status: 500 };
  }
};

export const updateAutomationName = async (
  automationId: string,
  data: {
    name?: string;
    active?: boolean;
    automation?: string;
  }
) => {
  await onCurrentUser();
  try {
    const update = await updateAutomation(automationId, data);
    if (update) {
      return { status: 200, data: "Automation updated Successfully" };
    }
    return { status: 404, data: "Oops! could not find automation" };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "something went wrong" };
  }
};

export const saveListner = async (
  automationId: string,
  listener: "SMARTAI" | "MESSAGE",
  prompt: string,
  reply: string
) => {
  await onCurrentUser();
  try {
    const create = await addListner(automationId, listener, prompt, reply);
    if (create) return { status: 200, data: "Listener Created" };
    return { status: 200, data: "Failed to create listner" };
  } catch (error) {
    console.error(error);
    return { status: 200, data: "Something went wrong" };
  }
};

export const saveTrigger = async (automationId: string, trigger: string[]) => {
  await onCurrentUser();
  try {
    const create = await addTrigger(automationId, trigger);
    if (create) return { status: 200, data: "Trigger saved" };
    return { status: 404, data: "something went wrong" };
  } catch (error) {
    console.error(error);

    return { status: 500, data: "something went wrong" };
  }
};

export const saveKeyword = async (automationId: string, keyword: string) => {
  await onCurrentUser();
  try {
    const create = await addKeyWord(automationId, keyword);
    if (create) return { status: 200, data: "Keyword added successfully" };
    return { status: 404, data: "Cannot add keyword" };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Something went wrong" };
  }
};

export const deleteKeyword = async (id: string) => {
  await onCurrentUser();
  try {
    const deleted = await deleteKeywordQuery(id);
    if (deleted) return { status: 200, data: "Keyword deleted" };
    return { status: 404, data: "Keyword not deleted" };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Something went wrong" };
  }
};

export const getProfiePosts = async () => {
  const user = await onCurrentUser();
  try {
    const profile = await findUser(user.id);
    const posts = await fetch(
      `${process.env.INSTAGRAM_BASE_URL}/me/media?fields=id,caption,media_url,media_type,timestamp&limit=10&access_token=${profile?.Integrations[0].token}`
    );

    const parsed = await posts.json();
    if (parsed) return { status: 200, data: parsed };
    return { status: 404 };
  } catch (error) {
    console.error(error, "Server side error in getting post");
    return { status: 500 };
  }
};

export const savePosts = async (
  automationId: string,
  posts: {
    postid: string;
    caption?: string;
    media: string;
    mediaType: "IMAGE" | "VIDEO" | "CAROSEL_ALBUM";
  }
) => {
  await onCurrentUser();
  try {
    const create = await addPost(automationId, posts);
    if (create) return { status: 200, data: "posts attached" };
    return { status: 404, data: "Automation not found" };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Something went wrong" };
  }
};

export const activateAutomation = async (id: string, state: boolean) => {
  await onCurrentUser();
  try {
    const update = await updateAutomation(id, { active: state });
    if (update)
      return {
        status: 200,
        data: `Automation ${state ? "activated" : "disabled"}`,
      };
    return { status: 404, data: "Automation not found" };
  } catch (error) {
    console.error(error);

    return { status: 500, data: "Something went wrong" };
  }
};
