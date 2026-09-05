import { useQuery } from "@tanstack/react-query";
import communityNoticeApi from "../services/communityNoticeApi";
import type { CommunityNotice } from "../types/community";

// Get all notices for a community
export const useCommunityNoticesQuery = (
  communityId?: string,
  options?: { enabled?: boolean },
) => {
  return useQuery<CommunityNotice[]>({
    queryKey: ["community-notices", communityId],
    queryFn: () => communityNoticeApi.getCommunityNotices(communityId!),
    enabled: !!communityId && (options?.enabled ?? true),
  });
};

// Get a single notice
export const useCommunityNoticeQuery = (
  communityId?: string,
  noticeId?: string,
  options?: { enabled?: boolean },
) => {
  return useQuery<CommunityNotice>({
    queryKey: ["community-notice", communityId, noticeId],
    queryFn: () => communityNoticeApi.getCommunityNotice(communityId!, noticeId!),
    enabled: !!communityId && !!noticeId && (options?.enabled ?? true),
  });
};
