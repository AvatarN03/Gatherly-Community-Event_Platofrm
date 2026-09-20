import {  useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import type { MemberRoleHandler } from "../types/membership";
import membershipApi from "../services/membershipApi";

export const useUpdateMemberRoleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      communityId,
      memberId,
      role,
    }: {
      communityId: string;
      memberId: string;
      role: MemberRoleHandler;
    }) => membershipApi.updateMemberRole(communityId, memberId, role),
    onSuccess: (_, { communityId }) => {
      queryClient.invalidateQueries({
        queryKey: ["memberships", communityId, "members"],
      });
      queryClient.invalidateQueries({ queryKey: ["community", communityId] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error ?? "Failed to update role.");
    },
  });
};

export const useRemoveMemberMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      communityId,
      memberId,
    }: {
      communityId: string;
      memberId: string;
    }) => membershipApi.removeMember(communityId, memberId),
    onSuccess: (_, { communityId }) => {
      queryClient.invalidateQueries({
        queryKey: ["memberships", communityId, "members"],
      });
      queryClient.invalidateQueries({ queryKey: ["community", communityId] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error ?? "Failed to remove member.");
    },
  });
};

export const useJoinCommunityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      communityId,
      proofImage,
    }: {
      communityId: string;
      proofImage: File;
    }) => membershipApi.createJoinRequest(communityId, proofImage),
    onSuccess: (_, { communityId }) => {
      queryClient.invalidateQueries({ queryKey: ["community", communityId] });
      queryClient.invalidateQueries({ queryKey: ["memberships", communityId] });
    },
  });
};

// Leave community mutation
export const useLeaveCommunityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (communityId: string) =>
      membershipApi.leaveCommunity(communityId),
    onSuccess: (_, communityId) => {
      queryClient.invalidateQueries({ queryKey: ["community", communityId] });
      queryClient.invalidateQueries({ queryKey: ["memberships", communityId] });
    },
  });
};

export const useWithdrawRequestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (communityId: string) =>
      membershipApi.withdrawRequest(communityId),
    onSuccess: (_, communityId) => {
      queryClient.invalidateQueries({ queryKey: ["community", communityId] });
      queryClient.invalidateQueries({ queryKey: ["memberships", communityId] });
    },
  });
};

export const useHandleRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      communityId,
      requestId,
      status,
    }: {
      communityId: string;
      requestId: string;
      status: "APPROVED" | "REJECTED";
    }) => membershipApi.handleRequest(communityId, requestId, status),
    onSuccess: (_, { communityId }) => {
      queryClient.invalidateQueries({
        queryKey: ["memberships", communityId, "requests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["memberships", communityId, "members"],
      });
      queryClient.invalidateQueries({ queryKey: ["community", communityId] });
    },
  });
};

