import { useListner } from "@/hooks/use-automations";
import React from "react";
import TriggerButton from "../trigger-button";
import { AUTOMATION_LISTENERS } from "@/constants/automation";
import { SubscriptionPlan } from "../../subscription-plan";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "../../loader";

type Props = {
  id: string;
};

const ThenAction = ({ id }: Props) => {
  const {
    onSetListner,
    register,
    onFormSubmit,
    listener: Listener,
    isPending,
  } = useListner(id);
  return (
    <TriggerButton label="Then">
      <div className="flex flex-col gap-y-2">
        {AUTOMATION_LISTENERS.map((listener) =>
          listener.type === "SMARTAI" ? (
            <SubscriptionPlan key={listener.type} type="PRO">
              <div
                className={cn(
                  Listener === listener.type
                    ? "bg-gradient-to-br from-[#3352cc] to-[#1C2D70]"
                    : "bg-background-80",
                  "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100"
                )}
                onClick={() => onSetListner(listener.type)}
                key={listener.id}
              >
                <div className="flex gap-x-2 items-center">
                  {listener.icon}
                  <p>{listener.label}</p>
                </div>
                <p>{listener.description}</p>
              </div>
            </SubscriptionPlan>
          ) : (
            <div
              className={cn(
                Listener === listener.type
                  ? "bg-gradient-to-br from-[#3352cc] to-[#1C2D70]"
                  : "bg-background-80",
                "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100"
              )}
              onClick={() => onSetListner(listener.type)}
              key={listener.id}
            >
              <div className="flex gap-x-2 items-center">
                {listener.icon}
                <p>{listener.label}</p>
              </div>
              <p>{listener.description}</p>
            </div>
          )
        )}
        <form className="flex flex-col gap-y-2" onSubmit={onFormSubmit}>
          <Textarea
            placeholder={
              Listener === "SMARTAI"
                ? "Add a prompt that your smart ai can use..."
                : "Add a message you want send to your customers"
            }
            {...register("prompt")}
            className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
          />
          <Input
            {...register("reply")}
            placeholder="Add an reply for comments (optional)"
            className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
          />
          <Button className="w-full text-white font-medium bg-gradient-to-br from-[#3352CC] to-[#1C2D70]">
            <Loader state={isPending}>Add Listener</Loader>
          </Button>
        </form>
      </div>
    </TriggerButton>
  );
};

export default ThenAction;
