import type { RequestStatus, User } from ".";
import type { ROLE_CONFIG } from "../constant";

export interface Membership {
  id: string;
  userId?: string;
  communityId: string;
  role: any;
  createdAt: string;
  user: User;
  community?: any;
  proofUrl?: string;
}

export interface MembershipRequest {
  id: string;
  userId: string;
  communityId: string;
  proofUrl: string;
  status: RequestStatus;
  createdAt: string;
  user?: User;
  community?: any;
}

export type Role = keyof typeof ROLE_CONFIG;

export type MemberRoleHandler = "ADMIN" | "MEMBER";

export type RequestHandelStatus = "APPROVED" | "REJECTED";