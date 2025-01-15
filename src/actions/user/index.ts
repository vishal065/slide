"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createUser, findUser } from "./queries";
import { refreshToken } from "@/lib/fetch";
import { upateIntegration } from "../integrations/queries";

export const onCurrentUser = async () => {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  return user;
};

export const onBoardUser = async () => {
  const user = await onCurrentUser();
  try {
    const existingUser = await findUser(user.id);
    if (existingUser) {
      //when we integrating the user insta account there something call refresh access token and this token will always refresh based on certain span of time for this case we do for 5 days
      if (existingUser.Integrations.length > 0) {
        const today = new Date();
        const time_left =
          existingUser.Integrations[0]?.expireAt?.getTime()! - today.getTime();
        const days = Math.round(time_left / (1000 * 3600 * 24));
        if (days < 5) {
          const refresh = await refreshToken(
            existingUser.Integrations[0].token
          );
          const today = new Date();
          const expireAt = today.setDate(today.getDate() + 60);
          const update_token = await upateIntegration(
            existingUser.Integrations[0].id,
            refresh.access_token,
            new Date()
          );
          if (!update_token) {
            console.log("update token failed");
          }
        }
      }
      return {
        status: 200,
        data: {
          firstname: existingUser.firstname,
          lastname: existingUser.lastname,
        },
      };
    }
    const created = await createUser();
  } catch (error) {
    console.error(error);
  }
};
