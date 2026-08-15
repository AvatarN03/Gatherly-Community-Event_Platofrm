import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import communityApi from "../services/communityApi";
import type { SortBy } from "../types";
import type { CommunityCategory } from "../types/community";

export const useCommunitiesInfiniteQuery = (
  search: string,
  category: CommunityCategory | "",
  sortBy: SortBy,
) => {
  return useInfiniteQuery({
    queryKey: ["communities", "infinite", search, category, sortBy],

    queryFn: ({ pageParam = 1 }) =>
      communityApi.getAllCommunities(
        search,
        category,
        sortBy,
        pageParam,
        9,
      ),

    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasMore
        ? lastPage.pagination.page + 1
        : undefined,

    initialPageParam: 1,

    retry: 2,
    retryDelay: 1000,
  });
};


export const useCommunityBySlugQuery = (slug?: string, isAuthLoaded = true) => {
  return useQuery({
    queryKey: ["community", slug],
    queryFn: () => communityApi.getCommunityBySlug(slug!),
    enabled: !!slug && isAuthLoaded,
  });
};