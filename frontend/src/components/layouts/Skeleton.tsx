import {SKELETON_COUNT} from "../../constant.ts";

export const CardSkeleton = () => (
    <div className=" rounded-md  overflow-hidden animate-pulse p-3">
        <div className="w-full h-48 bg-teal-200 rounded-md"/>
        <div className="mt-2 space-y-2">
            <div className="h-6 bg-teal-200 rounded"/>
            <div className="h-4 bg-teal-200 rounded w-4/5"/>
            <div className="h-6  bg-teal-200 rounded "/>
            
        </div>
    </div>
)

export const CommunityCardsSkeleton = () => (
    <>
        {Array.from({length: SKELETON_COUNT}).map((_, i) => (
            <CardSkeleton key={i}/>
        ))}
    </>
)