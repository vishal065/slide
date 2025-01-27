"use client";
import { Separator } from "@/components/ui/separator";
import { useQueryAutomation } from "@/hooks/use-query";
import { PlaneBlue, SmartAi, Warning } from "@/icons";
import PostButton from "../post";

type Props = {
  id: string;
};

const ThenNode = ({ id }: Props) => {
  const { data } = useQueryAutomation(id);

  const commentTrigger = data?.data?.trigger.find((t) => t.type === "COMMENT");

  return !data?.data?.listner ? (
    <></>
  ) : (
    <div className="w-full lg:w-10/12 relative xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
      <div className=" absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
        <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
        <Separator
          orientation="vertical"
          className=" bottom-full flex-1 border-[1px] border-connector/10"
        />
        <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
      </div>
      <div className="flex gap-x-2">
        <Warning />
        Then...
      </div>
      <div className="bg-background-80 p-3 rounded-xl flex flex-col gap-y-2">
        <div className="flex gap-x-2 items-center">
          {data.data.listner.listener === `MESSAGE` ? (
            <PlaneBlue />
          ) : (
            <SmartAi />
          )}
          <p className="text-lg">
            {data.data.listner.listener === "MESSAGE"
              ? `${data.data.listner.listener}`
              : "Let SmartAI takeover"}
          </p>
        </div>
        <p className="font-light text-text-secondary">
          {data.data.listner.prompt}
        </p>
      </div>
      {data.data.Posts.length > 0 ? (
        <></>
      ) : commentTrigger ? (
        <PostButton id={id} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ThenNode;
