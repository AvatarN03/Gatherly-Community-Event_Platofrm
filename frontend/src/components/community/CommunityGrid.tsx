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
    <div className="relative px-2 md:px-6 pt-6 pb-10 max-w-7xl mx-auto overflow-hidden">
      {/* Background banner image */}
      <div
        className="absolute inset-0 -z-10 bg-no-repeat bg-center bg-contain opacity-70 pointer-events-none"
        style={{
          backgroundImage: 'url("/list-banner.svg")',
        }}
      />

      {/* Section label */}
      <div className="flex items-center gap-3 mb-4">
        <p className="text-slate text-xs uppercase tracking-widest font-medium underline decoration-wavy decoration-teal-600 decoration-2 underline-offset-4">
          {search ? `Results for "${search}"` : "All Communities"}
        </p>
        {!isLoading && communities.length > 0 && (
          <span className="text-forest text-sm bg-slate-300 border border-teal-800 px-2 py-0.5 rounded-md">
            {communities.length}
            {hasNextPage ? "+" : ""} communities
          </span>
        )}
      </div>

      {/* Grid — skeletons on initial load, cards otherwise */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 xl:gap-x-12">
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
        <div className="text-center py-6 text-stone text-xs tracking-wide">
          — you've seen all communities —
        </div>
      )}
    </div>
  );
};

export default CommunityGrid;
