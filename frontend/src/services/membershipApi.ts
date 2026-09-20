import { api } from "../lib/axiosInstance";
import type { MemberRoleHandler, Membership, MembershipRequest, RequestHandelStatus, Role } from "../types/membership";



const membershipApi = {
  createJoinRequest: async (
    communityId: string,
    proofImage: File,
  ): Promise<MembershipRequest> => {
    const formData = new FormData();
    formData.append("proofImage", proofImage);

    const { data } = await api.post(
      `/membership/${communityId}/join`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return data;
  },

  leaveCommunity: async (communityId: string): Promise<{ message: string }> => {
    const { data } = await api.delete(`/membership/${communityId}/leave`);
    return data;
  },

  withdrawRequest: async (
    communityId: string,
  ): Promise<{ message: string }> => {
    const { data } = await api.delete(`/membership/${communityId}/withdraw`);
    return data;
  },

  getMembers: async (
    communityId: string,
    search?: string,
    role?: Role | "ALL",
  ): Promise<Membership[]> => {
    const { data } = await api.get(`/membership/${communityId}/members`, {
      params: {
        search,
        role: role === "ALL" ? undefined : role,
      },
    });
    console.log("data from getMembers:", data);
    return data;
  },

  getUserRequest: async (
    communityId: string,
  ): Promise<MembershipRequest | undefined> => {
    const { data } = await api.get(`/membership/${communityId}/my-request`);
    console.log("data from getUserRequest:", data);
    return data;
  },

  getCommunityRequests: async (
    communityId: string,
  ): Promise<MembershipRequest[]> => {
    const { data } = await api.get(`/membership/${communityId}/requests`);
    console.log("data from getCommunityRequests:", data);
    return data;
  },

  handleRequest: async (
    communityId: string,
    requestId: string,
    status: RequestHandelStatus,
  ): Promise<MembershipRequest> => {
    const { data } = await api.patch(
      `/membership/${communityId}/requests/${requestId}`,
      {
        status,
      },
    );
    return data;
  },

  updateMemberRole: async (
    communityId: string,
    memberId: string,
    role: MemberRoleHandler,
  ): Promise<Membership> => {
    const { data } = await api.patch(
      `/membership/${communityId}/members/${memberId}`,
      { role },
    );
    return data;
  },

  removeMember: async (
    communityId: string,
    memberId: string,
  ): Promise<{ message: string }> => {
    const { data } = await api.delete(
      `/membership/${communityId}/members/${memberId}`,
    );
    return data;
  },


  getCommunitiesRequests: async (): Promise<Partial<any>[]> => {
    const { data } = await api.get("/membership/requests");
    console.log("Communities Requests:", data);
    return data;
  },

  getEventAssignedMembers: async (eventId: string): Promise<Membership[]> => {
    const { data } = await api.get(`/events/${eventId}/members`);
    console.log("data from getEventAssignedMembers:", data);
    return data;
  }
};

export default membershipApi;