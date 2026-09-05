import { SKELETON_COUNT } from "../../constant.ts";

export const CardSkeleton = () => (
  <div className=" rounded-md  overflow-hidden animate-pulse p-3">
    <div className="w-full h-48 bg-teal-200 rounded-md" />
    <div className="mt-2 space-y-2">
      <div className="h-6 bg-teal-200 rounded" />
      <div className="h-4 bg-teal-200 rounded w-4/5" />
      <div className="h-6  bg-teal-200 rounded " />
    </div>
  </div>
);

export const CommunityCardsSkeleton = () => (
  <>
    {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </>
);

export const CommunityDetailSkeleton = () => (
  <div className="min-h-screen space-y-10 px-4 py-8 animate-pulse">
    <div className="h-64 bg-slate-300 rounded-md " />
    <div className="flex items-start gap-10">
      <div className="space-y-4 w-2/3">
        <div className="h-10 bg-slate-300 rounded" />
        <div className="h-6 w-2/3 bg-slate-300 rounded" />
        <div className="h-60 bg-slate-300 rounded" />
      </div>
      <div className="space-y-12 w-1/3">
        <div className="h-30 bg-slate-300 rounded" />
        <div className="h-60 bg-slate-300 rounded" />
      </div>

      <div className="h-64 bg-slate rounded-xl" />
    </div>

    <div className="flex items-start gap-10">
      <div className="h-40 bg-slate-300 w-3/7"/>
      <div className="h-40 bg-slate-300 w-4/7"/>
    </div>
  </div>
);
