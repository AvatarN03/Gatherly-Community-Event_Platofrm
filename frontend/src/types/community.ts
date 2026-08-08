import type { COMMUNITY_CATEGORIES } from "../constant";

export interface CreateCommunity {
  name: string;
  description: string;
  imageUrl?: string;
  category: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
}

export interface CommunityView {
  id: string;
  name: string;
  imageUrl: string;
  location: string;
  description: string;
  category: string;
  createdAt: string;
  _count: {
    members: number;
  };
}

export interface PaginatedCommunities {
  communities: CommunityView[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

export type CommunityCategory = (typeof COMMUNITY_CATEGORIES)[number]["value"];
