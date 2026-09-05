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

// update a community
export const useUpdateCommunityMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: FormData }) =>
      communityApi.updateCommunity(slug, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      queryClient.invalidateQueries({ queryKey: ["community", variables.slug] });
    },
  });
};

// delete a community
export const useDeleteCommunityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => communityApi.deleteCommunity(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
    },
  });
};
