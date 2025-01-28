import { Button } from "@/components/ui/button";
import useSubscription from "@/hooks/use-subscription";
import { CreditCard } from "@/icons";
import { Loader2 } from "lucide-react";
import React from "react";

type Props = {};

const PaymentButton = (props: Props) => {
  //WIP : get there subscription details
  //WIP : Loading state
  const { isProcessing, onSubscribe } = useSubscription();
  return (
    <Button
      disabled={isProcessing}
      onClick={onSubscribe}
      className="bg-gradient-to-br text-white rounded-full from-[#9685DB] via-[#9434E6] font-bold to-[#CC3BD4]"
    >
      {isProcessing ? <Loader2 className="animate-spin" /> : <CreditCard />}
      Upgrade
    </Button>
  );
};

export default PaymentButton;
