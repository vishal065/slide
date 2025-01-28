import { Button } from "@/components/ui/button";
import { useQueryAutomation } from "@/hooks/use-query";
import { useMutationData } from "@/hooks/use-mutation-data";
import { activateAutomation } from "@/actions/automations";
import { Loader2 } from "lucide-react";
import { ActiveAutomation } from "@/icons/active-automation";

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
      disabled={isPending}
      onClick={() => mutate({ state: !data?.data?.active })}
      className="lg:px-10 hover:opacity-80 text-white rounded-full bg-gradient-to-br from-[#3352CC] to-[#1C2D70] font-medium ml-4"
    >
      {isPending ? <Loader2 className="animate-spin" /> : <ActiveAutomation />}
      <p className="lg:inline hidden">
        {data?.data?.active ? "Disable" : "Activate"}
      </p>
    </Button>
  );
};

export default ActivateAutomationButton;
