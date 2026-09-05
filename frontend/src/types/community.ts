import type { COMMUNITY_CATEGORIES } from "../constant";
import type {User} from "./index.ts";

export interface CreateCommunity {
  name: string;
  description: string;
  tags?: string[];
  imageUrl?: string;
  category: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
}

export interface CommunityView {
  id: string;
  slug:string;
  name: string;
  imageUrl: string;
  location: string;
  category: string;
  tags: string[];
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

export interface CommunityNotice {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    imageUrl: string;
  };
}

export interface CreateCommunityNotice {
  title: string;
  content: string;
  pinned?: boolean;
}

export interface UpdateCommunityNotice {
  title?: string;
  content?: string;
  pinned?: boolean;
}
