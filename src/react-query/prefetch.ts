import { getAllAutomations } from "@/actions/automations";
import { onUserInfo } from "@/actions/user";
import { QueryClient, QueryFunction } from "@tanstack/react-query";

const preFetch = async (
  client: QueryClient,
  action: QueryFunction,
  key: string
) => {
  return await client.prefetchQuery({
    queryKey: [key],
    queryFn: action,
    staleTime: 60000,
  });
};

export const preFetchUserProfile = async (client: QueryClient) => {
  return await preFetch(client, onUserInfo, "user-profile");
};


export const preFetchUserAutomation = async(client :QueryClient)=>{
    return await preFetch(client,getAllAutomations,'user-automations')
}
