import AutomationList from "@/components/global/automation-list";
import CreateAutomationButton from "@/components/global/create-automation-button";
import { Check } from "lucide-react";

type Props = {};

const page = (props: Props) => {
  //WIP : connect real automation list
  return (
    <div className="grid grid-cols-1 lg:grid-col-6 gap-5 ">
      <div className="lg:col-span-4">
        <AutomationList />
      </div>
      <div className="lg:col-span-2">
        <div className="flex flex-col rounded-xl  bg-background-80 gap-y-6 p-5 border-[1px] overflow-hidden border-in-active">
          <div className="">
            <h2 className="text-xl">Automation</h2>
            <p className="text-text-secondary">
              ALl the live automation will show here
            </p>
          </div>
          <div className="flex flex-col gap-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start justify-between">
                <div className="flex flex-col">
                  <h3 className="font-medium">
                    Direct traffic towward website
                  </h3>
                  <p className="text-text-secondary text-sm">Oct 5th 2024</p>
                </div>
                <Check />
              </div>
            ))}
          </div>
          <CreateAutomationButton />
        </div>
      </div>
    </div>
  );
};

export default page;
