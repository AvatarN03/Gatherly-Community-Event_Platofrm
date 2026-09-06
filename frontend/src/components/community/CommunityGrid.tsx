import { CommunityCardsSkeleton } from "../layouts/Skeleton.tsx";

import Card from "./Card.tsx";
import { Error } from "../Error.tsx";
import type { RefObject } from "react";
import type { CommunityView } from "../../types/community.ts";

export interface CommunityGridType {
  communities: CommunityView[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  search: string;
  sentinelRef: RefObject<HTMLDivElement | null>;
  isRefetching: boolean;
  handleRetry: () => void;
  isError: boolean;
}

const CommunityGrid = ({
  communities,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  search,
  sentinelRef,
  isRefetching,
  handleRetry,
  isError,
}: CommunityGridType) => {
  if (isError)
    return (
      <Error
        isRefetching={isRefetching}
        handleRetry={handleRetry}
        text={"Failed to load communities"}
      />
    );
  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-8 pt-2 sm:px-10">

      {/* Grid — skeletons on initial load, cards otherwise */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          <CommunityCardsSkeleton />
        ) : (
          communities.map((community) => (
            <Card key={community.id} community={community} />
          ))
        )}

        {/* Append skeletons at the end of existing cards while fetching next page */}
        {isFetchingNextPage && <CommunityCardsSkeleton />}
      </div>

      {/* Empty state */}
      {!isLoading && communities.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lavender text-4xl mb-1">No communities found</p>
          <p className="text-fog text-2xl my-4 font-light">
            {search
              ? "Try a different search term"
              : "Be the first to create one"}
          </p>
        </div>
      )}

      {/* Sentinel */}
      <div ref={sentinelRef} className="h-4" />

      {!hasNextPage && communities.length > 0 && (
        <div className="py-5 text-xs tracking-wide text-slate-400">
          Showing {communities.length} communities
        </div>
      )}
    </div>
  );
};

export default CommunityGrid;
