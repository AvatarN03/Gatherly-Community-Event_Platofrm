import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";


import communityApi from "../services/communityApi";
import toast from "react-hot-toast";


export const useCreateCommunityMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) =>
      communityApi.createCommunity(formData),
    onSuccess: (message) => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      toast.success(message)
    },
  });
};
