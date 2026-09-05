import { api } from "../lib/axiosInstance";

export type UserPlan = "FREE" | "PRO";

export interface SyncedUser {
  id: string;
  email: string;
  name: string;
  imageUrl: string;
  plan: UserPlan;
  createdAt: string;
}

export interface UserStats {
  communitiesCreated: number;
  communitiesLimit: number;
  memberships: number;
}

export interface MeResponse {
  user: SyncedUser;
  stats: UserStats;
}

const userApi = {
  getMe: async (): Promise<MeResponse> => {
    const { data } = await api.get("/users/me");
    return data;
  },
};

export default userApi;
