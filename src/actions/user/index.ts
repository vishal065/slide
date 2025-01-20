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
    // console.log("user is ", user);
    console.log("user id is ", user.id);

    const existingUser = await findUser(user?.id);
    console.log("existingUser is ", existingUser);
    if (existingUser) {
      //when we integrating the user insta account there something call refresh access token and this token will always refresh based on certain span of time for this case we do for 5 days
      if (existingUser?.Integrations?.length > 0) {
        const today = new Date();
        const time_left =
          (existingUser?.Integrations[0].expireAt?.getTime() as number) -
          today.getTime();
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
            new Date(expireAt)
          );
          if (!update_token) {
            console.error("update token failed");
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
    const created = await createUser(
      user.id,
      user.firstName as string,
      user.lastName as string,
      user.emailAddresses[0].emailAddress
    );
    return { status: 201, data: created };
  } catch (error) {
    console.error("error is", error);
    return { status: 500 };
  }
};

export const onUserInfo = async () => {
  const user = await onCurrentUser();
  try {
    const profile = await findUser(user.id);
    if (profile) return { status: 200, data: profile };
    return { status: 404 };
  } catch (error) {
    console.error(error);
    return { status: 500 };
  }
};
