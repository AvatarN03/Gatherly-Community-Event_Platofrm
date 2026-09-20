import {useCallback, useState} from 'react'

import toast from 'react-hot-toast'

import { useCommunitiesInfiniteQuery } from '../../hooks/useCommunityQueries'

import {useDebounce} from "../../hooks/useDebounce.ts";
import {useIntersectionObserver} from "../../hooks/useIntersectionObserver.ts";
import CommunityGrid from "../../components/community/CommunityGrid.tsx";

import type {CommunityCategory} from "../../types/community.ts";
import type {SortBy} from "../../types";
import CommunityHeader from "../../components/community/CommunityHeader.tsx";

const Communities = () => {

    const [search, setSearch] = useState('')
    const [category, setCategory] = useState<CommunityCategory | "">("");
    const [sortBy, setSortBy] = useState<SortBy>('latest')
    const debouncedSearch = useDebounce(search, 1000)

    const {
        data,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        isRefetching,
        refetch,
        isError,
    } = useCommunitiesInfiniteQuery(debouncedSearch, category, sortBy);

    const handleLoadMore = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage()
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

    const handleSearchChange = useCallback((value: string) => {
        setSearch(value)
    }, [])

    const handleCategoryChange = useCallback(
        (value: CommunityCategory | "") => {
            setCategory(value);
        },
        []
    );

    const handleSortByChange = useCallback((value: SortBy) => {
        setSortBy(value)
    }, [])

    const sentinelRef = useIntersectionObserver(handleLoadMore, {
        rootMargin: '200px',
    })

    const communities = data?.pages.flatMap((page) => page.communities) ?? []


    const handleRetry = async () => {
        await toast.promise(
            refetch(),
            {
                loading: 'Reloading communities...',
                success: 'Communities loaded successfully',
                error: 'Failed to load communities',
            }
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground">

            <CommunityHeader
                title="Community"
                eyebrow="EXPLORE & CONNECT"
                description="Discover like-minded people, join communities, and be part of something bigger."
                search={search}
                onChange={handleSearchChange}
                category={category}
                onCategoryChange={handleCategoryChange}
                sortBy={sortBy}
                onSortByChange={handleSortByChange}
            />


            <CommunityGrid
                communities={communities}
                isLoading={isLoading}
                isFetchingNextPage={isFetchingNextPage}
                hasNextPage={!!hasNextPage}
                search={search}
                sentinelRef={sentinelRef}
                isError={isError}
                handleRetry={handleRetry}
                isRefetching={isRefetching}
            />
        </div>
    )
}

export default Communities
