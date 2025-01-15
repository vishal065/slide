import { Button } from "@/components/ui/button";
import Loader from "../loader";
import { AutomationDuoToneWhite } from "@/icons";

type Props = {};

const CreateAutomationButton = (props: Props) => {
  // WIP : Create an automation in the database using mutate
  return (
    <Button className="lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full font-medium from-[#3352CC] to-[#1C2D70]">
      <Loader state={false}>
        <AutomationDuoToneWhite />
        <p className="lg:inline hidden">Create An Automation</p>
      </Loader>
    </Button>
  );
};

export default CreateAutomationButton;
