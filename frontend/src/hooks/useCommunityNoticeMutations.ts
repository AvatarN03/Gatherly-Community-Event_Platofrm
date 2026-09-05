import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import communityNoticeApi from "../services/communityNoticeApi";
import type { CreateCommunityNotice, UpdateCommunityNotice } from "../types/community";

// Create a new notice
export const useCreateCommunityNoticeMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ communityId, noticeData }: { communityId: string; noticeData: CreateCommunityNotice }) =>
      communityNoticeApi.createCommunityNotice(communityId, noticeData),
    onSuccess: (_, { communityId }) => {
      queryClient.invalidateQueries({ queryKey: ["community-notices", communityId] });
      toast.success("Notice created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error ?? "Failed to create notice");
    },
  });
};

// Update a notice
export const useUpdateCommunityNoticeMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({
      communityId,
      noticeId,
      noticeData,
    }: {
      communityId: string;
      noticeId: string;
      noticeData: UpdateCommunityNotice;
    }) => communityNoticeApi.updateCommunityNotice(communityId, noticeId, noticeData),
    onSuccess: (_, { communityId }) => {
      queryClient.invalidateQueries({ queryKey: ["community-notices", communityId] });
      queryClient.invalidateQueries({ queryKey: ["community-notice", communityId] });
      toast.success("Notice updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error ?? "Failed to update notice");
    },
  });
};

// Delete a notice
export const useDeleteCommunityNoticeMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ communityId, noticeId }: { communityId: string; noticeId: string }) =>
      communityNoticeApi.deleteCommunityNotice(communityId, noticeId),
    onSuccess: (_, { communityId }) => {
      queryClient.invalidateQueries({ queryKey: ["community-notices", communityId] });
      toast.success("Notice deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error ?? "Failed to delete notice");
    },
  });
};

// Toggle pin on a notice
export const useTogglePinCommunityNoticeMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ communityId, noticeId }: { communityId: string; noticeId: string }) =>
      communityNoticeApi.togglePinCommunityNotice(communityId, noticeId),
    onSuccess: (_, { communityId }) => {
      queryClient.invalidateQueries({ queryKey: ["community-notices", communityId] });
      toast.success("Notice pin status updated");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error ?? "Failed to update pin status");
    },
  });
};
