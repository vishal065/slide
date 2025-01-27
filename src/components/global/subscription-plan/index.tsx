import { useQueryUser } from "@/hooks/use-query";

type Props = {
  children: React.ReactNode;
  type: "FREE" | "PRO";
};
export const SubscriptionPlan = ({ children, type }: Props) => {
  //WIP: Return subscription of user
  const { data } = useQueryUser();

  return data?.data?.Subscription?.plan === type && children;
};
