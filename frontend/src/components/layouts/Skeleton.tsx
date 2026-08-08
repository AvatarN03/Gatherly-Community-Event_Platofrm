import {SKELETON_COUNT} from "../../constant.ts";

export const CardSkeleton = () => (
    <div className="bg-slate-500 border border-slate  overflow-hidden animate-pulse">
        <div className="p-4 space-y-2">
            <div className="h-6 bg-slate rounded"/>
            <div className="h-4 bg-slate rounded w-4/5"/>
            <div className={"flex items-center justify-end gap-4 mt-8"}>
            <div className="h-6 w-12 bg-slate rounded "/>
            <div className="h-6 w-12 bg-slate rounded "/>
            </div>
        </div>
        <div className="w-full h-48 bg-slate"/>
    </div>
)

export const CommunityCardsSkeleton = () => (
    <>
        {Array.from({length: SKELETON_COUNT}).map((_, i) => (
            <CardSkeleton key={i}/>
        ))}
    </>
)