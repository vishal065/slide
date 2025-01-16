"use client";
import { Button } from "@/components/ui/button";
import Loader from "../loader";
import { AutomationDuoToneWhite } from "@/icons";
import { useCreateAutomation } from "@/hooks/use-automations";

type Props = {};

const CreateAutomationButton = (props: Props) => {
  // WIP : Create an automation in the database using mutate
  const { isPending, mutate } = useCreateAutomation();
  return (
    <Button
      className="lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full font-medium from-[#3352CC] to-[#1C2D70]"
      onClick={mutate}
    >
      <Loader state={isPending}>
        <AutomationDuoToneWhite />
        <p className="lg:inline hidden">Create An Automation</p>
      </Loader>
    </Button>
  );
};

export default CreateAutomationButton;
