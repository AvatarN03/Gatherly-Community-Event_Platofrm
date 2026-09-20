import { api } from "../lib/axiosInstance";
import type { MutateObjectResponse } from "../types";
import type { PaginatedCommunities } from "../types/community";

export interface CreateCommunityResponse {
  message: string;
  community: { id: string; name: string; slug: string };
}

interface CommunityDetailResponse {
  community: Record<string, unknown>;
  userMembership: string | null;
  pinnedNotice: Record<string, unknown> | null;
  recentNotice: Record<string, unknown> | null;
}

const communityApi = {
  createCommunity: async (formData: FormData): Promise<CreateCommunityResponse> => {
    const { data } = await api.post("/communities", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  getAllCommunities: async (
    search?: string,
    category?: string,
    sortBy?: string,
    page = 1,
    limit = 9,
  ): Promise<PaginatedCommunities> => {
    const { data } = await api.get("/communities", {
      params: { search, category, sortBy, page, limit },
    });
    return data;
  },

  getCommunityBySlug: async (slug: string): Promise<CommunityDetailResponse> => {
    const { data } = await api.get(`/communities/${slug}`);
    return data;
  },

  updateCommunity: async (
    slug: string,
    updates: FormData,
  ): Promise<MutateObjectResponse> => {
    const { data } = await api.put(`/communities/${slug}`, updates, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  deleteCommunity: async (slug: string): Promise<void> => {
    await api.delete(`/communities/${slug}`);
  },
};

export default communityApi;

