import {SKELETON_COUNT} from "../constant.ts";

export const CardSkeleton = () => (
    <div className="bg-deep-ocean border border-slate rounded-xl overflow-hidden animate-pulse">
        <div className="w-full h-42 bg-slate" />
        <div className="p-4 space-y-2">
            <div className="h-4 bg-slate rounded w-2/3" />
            <div className="h-3 bg-slate rounded w-full" />
            <div className="h-3 bg-slate rounded w-4/5" />
            <div className="h-3 bg-slate rounded w-1/3 mt-3" />
        </div>
    </div>
)

export const CardsSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({length: SKELETON_COUNT }).map((_, i) => (
            <CardSkeleton key={i} />
        ))}
    </div>
)