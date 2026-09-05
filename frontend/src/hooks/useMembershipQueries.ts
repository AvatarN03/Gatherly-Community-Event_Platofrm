import { useQuery } from "@tanstack/react-query";
import type { Role } from "../types/membership";
import membershipApi from "../services/membershipApi";


// Get members query
export const useMembersQuery = (
  communityId?: string,
  search = "",
  role: Role | "ALL" = "ALL",
  options?: {
    enabled?: boolean;
  },
) => {
  return useQuery({
    queryKey: ["memberships", communityId, "members", search, role],

    queryFn: () => membershipApi.getMembers(communityId!, search, role),

    enabled: !!communityId && (options?.enabled ?? true),
  });
};

// Get community requests query
export const useCommunityRequestsQuery = (
  communityId?: string,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: ["memberships", communityId, "requests"],
    queryFn: () => membershipApi.getCommunityRequests(communityId!),
    enabled: !!communityId && enabled,
  });
};

export const useUserRequestQuery = (
  communityId?: string,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: ["memberships", communityId, "my-request"],
    queryFn: () => membershipApi.getUserRequest(communityId!),
    enabled: !!communityId && (options?.enabled ?? true),
  });
};

export const useCommunitiesRequestsQuery = () =>
  useQuery({
    queryKey: ["communities-requests"],
    queryFn: membershipApi.getCommunitiesRequests,
  });

  
  
  export const useEventAssignedMembersQuery = (
    eventId: string,
    options: { enabled?: boolean } = {},
  ) =>
    useQuery({
      queryKey: ["event-assigned-members", eventId],
      queryFn: () => membershipApi.getEventAssignedMembers(eventId),
      enabled: options.enabled ?? true,
    });
  