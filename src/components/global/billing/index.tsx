import React from "react";
import PaymentCard from "./payment-card";
import { useQueryUser } from "@/hooks/use-query";

type Props = {};

const Billing = (props: Props) => {
  // WIP : Fetch billing information for the customer
  const { data } = useQueryUser();

  return (
    <div className="flex lg:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 container">
      <PaymentCard
        current={data?.data?.Subscription?.plan as "PRO" | "FREE"}
        label="FREE"
      />
      <PaymentCard
        current={data?.data?.Subscription?.plan as "PRO" | "FREE"}
        label="PRO"
      />
    </div>
  );
};

export default Billing;
