import { onBoardUser } from "@/actions/user";
import React from "react";

type Props = {};

const Page = async (props: Props) => {
  //Server action to onBoard the user
  const user = await onBoardUser()
  return <div>Page</div>;
};

export default Page;
