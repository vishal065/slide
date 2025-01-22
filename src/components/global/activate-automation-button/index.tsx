import { Button } from "@/components/ui/button";
import React from "react";
import Loader from "../loader";
import { ActiveAutomation } from "@/icons/active-automation";
import { useQueryAutomation } from "@/hooks/use-query";
import { useMutationData } from "@/hooks/use-mutation-data";
import { activateAutomation } from "@/actions/automations";

type Props = {
  id: string;
};

const ActivateAutomationButton = ({ id }: Props) => {
  //WIP : fetch some automation data and Setup optimistic UI

  const { data } = useQueryAutomation(id);
  const { isPending, mutate } = useMutationData(
    ["activate"],
    (data: { state: boolean }) => activateAutomation(id, data.state),
    "automation-info"
  );

  return (
    <Button
      onClick={() => mutate({ state: !data?.data?.active })}
      className="lg:px-10 hover:opacity-80 text-white rounded-full bg-gradient-to-br from-[#3352CC] to-[#1C2D70] font-medium ml-4"
    >
      <Loader state={isPending}>
        <ActiveAutomation />
        <p className="lg:inline hidden">
          {data?.data?.active ? "Disable" : "Activate"}
        </p>
      </Loader>
    </Button>
  );
};

export default ActivateAutomationButton;
