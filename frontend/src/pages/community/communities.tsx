import {useCallback, useMemo, useState} from 'react'

import toast from 'react-hot-toast'

import { useCommunitiesInfiniteQuery } from '../../hooks/useCommunityQueries'

import type { SortBy } from '../../constant'
import CommunityHeader, {type CommunityTab} from "../../components/community/CommunityHeader.tsx";
import {useDebounce} from "../../hooks/useDebounce.ts";
import {useIntersectionObserver} from "../../hooks/useIntersectionObserver.ts";
import CommunityGrid from "../../components/community/CommunityGrid.tsx";
import { useUser} from "@clerk/react";
import Tabs from "../../components/Tabs.tsx"

const Communities = () => {

    const { isSignedIn } = useUser()

    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('All')
    const [sortBy, setSortBy] = useState<SortBy>('latest')
    const [tab, setTab] = useState<CommunityTab>('all')
    const debouncedSearch = useDebounce(search, 500)

    const {
        data,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        isRefetching,
        refetch,
        isError,
    } = useCommunitiesInfiniteQuery(debouncedSearch, category, sortBy)

    const handleLoadMore = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage()
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

    const handleSearchChange = useCallback((value: string) => {
        setSearch(value)
    }, [])

    const handleCategoryChange = useCallback((value: string) => {
        setCategory(value)
    }, [])

    const handleSortByChange = useCallback((value: SortBy) => {
        setSortBy(value)
    }, [])

    const handleTabChange = useCallback((value: CommunityTab) => {
        setTab(value)
    }, [])


    const sentinelRef = useIntersectionObserver(handleLoadMore, {
        rootMargin: '200px',
    })

    const allCommunities = useMemo(
        () => data?.pages.flatMap((page) => page.communities) ?? [],
        [data]
    )

    // Client-side filter for the non-"all" tabs.
    // TODO: swap isOwner / isManager / isMember for your real Community fields.
    const communities = useMemo(() => {
        switch (tab) {
            case 'my':
                return allCommunities.filter((c) => c.isOwner)
            case 'managed':
                return allCommunities.filter((c) => c.isManager)
            case 'joined':
                return allCommunities.filter((c) => c.isMember)
            default:
                return allCommunities
        }
    }, [allCommunities, tab])


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
        <div className="min-h-screen  relative">
            {
                isSignedIn  && (
                    <Tabs
                    tab={tab}
                    onTabChange={handleTabChange}
                    />
                )
            }
            <CommunityHeader
                title="Communities"
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