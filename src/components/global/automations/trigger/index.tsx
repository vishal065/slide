"use client";
import { useQueryAutomation } from "@/hooks/use-query";
import ActiveTrigger from "./active";
import { Separator } from "@/components/ui/separator";
import ThenAction from "../then/then-action";

type Props = {
  id: string;
};

const Trigger = ({ id }: Props) => {
  const { data } = useQueryAutomation(id);
  console.log("trigger data is", data.data);

  if (data?.data && data?.data?.trigger?.length > 0) {
    return (
      <div className="flex flex-col gap-y-6 items-center">
        <ActiveTrigger
          type={data.data.trigger[0].type}
          keywords={data.data?.Keywords}
        />
        {/* {data.data?.trigger?.length > 1 && <></>} */}
        <>
          <div className=" relative w-6/12 mt-4">
            <p className=" absolute transform bg-background-90 px-2 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2">
              or
            </p>
            <Separator
              orientation="horizontal"
              className="border-muted border-[1px]"
            />
          </div>
          <ActiveTrigger
            type={data.data.trigger[1].type}
            keywords={data.data?.Keywords}
          />
        </>
        <ThenAction />
      </div>
    );
  }
};

export default Trigger;
