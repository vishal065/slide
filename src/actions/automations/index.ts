"use server";

import { onCurrentUser } from "../user";
import { createAutomation, getAutomations } from "./queries";

export const createAutomations = async () => {
  const user = await onCurrentUser();
  try {
    const create = await createAutomation(user.id);
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
