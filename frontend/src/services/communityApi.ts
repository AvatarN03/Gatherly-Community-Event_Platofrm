import { api } from "../lib/axiosInstance";
import type { MutateObjectResponse } from "../types";
import type { PaginatedCommunities } from "../types/community";

const communityApi = {
  createCommunity: async (formData: FormData): Promise<any> => {
    const result = await api.post("/communities", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(result);
    return result.data;
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

  getCommunityBySlug: async (slug: string): any => {
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
