import { api } from "../lib/axiosInstance";
import type { CommunityNotice, CreateCommunityNotice, UpdateCommunityNotice } from "../types/community";

const communityNoticeApi = {
  // Get all notices for a community
  getCommunityNotices: async (communityId: string): Promise<CommunityNotice[]> => {
    const { data } = await api.get(`/community-notices/${communityId}/notices`);
    return data;
  },

  // Get a single notice
  getCommunityNotice: async (communityId: string, noticeId: string): Promise<CommunityNotice> => {
    const { data } = await api.get(`/community-notices/${communityId}/notices/${noticeId}`);
    return data;
  },

  // Create a new notice
  createCommunityNotice: async (
    communityId: string,
    noticeData: CreateCommunityNotice,
  ): Promise<CommunityNotice> => {
    const { data } = await api.post(`/community-notices/${communityId}/notices`, noticeData);
    return data;
  },

  // Update a notice
  updateCommunityNotice: async (
    communityId: string,
    noticeId: string,
    noticeData: UpdateCommunityNotice,
  ): Promise<CommunityNotice> => {
    const { data } = await api.patch(
      `/community-notices/${communityId}/notices/${noticeId}`,
      noticeData,
    );
    return data;
  },

  // Delete a notice
  deleteCommunityNotice: async (communityId: string, noticeId: string): Promise<{ message: string }> => {
    const { data } = await api.delete(`/community-notices/${communityId}/notices/${noticeId}`);
    return data;
  },

  // Toggle pin on a notice
  togglePinCommunityNotice: async (communityId: string, noticeId: string): Promise<{
    id: string;
    title: string;
    pinned: boolean;
  }> => {
    const { data } = await api.patch(`/community-notices/${communityId}/notices/${noticeId}/pin`);
    return data;
  },
};

export default communityNoticeApi;
