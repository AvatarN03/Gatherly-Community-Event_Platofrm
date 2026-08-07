import { api } from "../lib/axiosInstance";
import type { PaginatedCommunities } from "../types/community";


const communityApi = {
  createCommunity: async (formData: FormData) : Promise<any> => {
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
}


export default communityApi;
