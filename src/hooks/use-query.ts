import {
  getAllAutomations,
  getAutomationInfo,
  getProfiePosts,
} from "@/actions/automations";
import { onCurrentUser, onUserInfo } from "@/actions/user";
import { useQuery } from "@tanstack/react-query";

export const useQueryAutomations = () => {
  return useQuery({
    queryKey: ["user-automations"],
    queryFn: getAllAutomations,
  });
};

export const useQueryAutomation = (id: string) => {
  return useQuery({
    queryKey: ["automation-info"],
    queryFn: () => getAutomationInfo(id),
  });
};

export const useQueryUser = () => {
  return useQuery({ queryKey: ["user-profile"], queryFn: onUserInfo });
};

export const useQueryAutomationPosts = () => {
  const fetchPosts = async () => await getProfiePosts();
  return useQuery({
    queryKey: ["instagram-media"],
    queryFn: fetchPosts,
  });
};
