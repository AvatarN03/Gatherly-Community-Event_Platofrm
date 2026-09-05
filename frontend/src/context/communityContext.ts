import { createContext, useContext } from 'react'



import type { CommunityNotice } from "../types/community";

type CommunityContextValue = {
    community: any
    userMembership: any
    userRequest?: any
    pinnedNotice: CommunityNotice | null
    recentNotice: CommunityNotice | null
    isCreator: boolean
    isAdmin: boolean
    isMember: boolean
    isAuthenticated: boolean
    currentUserId: string | null
}

export const CommunityContext = createContext<CommunityContextValue | null>(null)

export const useCommunityContext = () => {
    const ctx = useContext(CommunityContext)
    if (!ctx) throw new Error('useCommunityContext must be used inside CommunityWrapper')
    return ctx
}