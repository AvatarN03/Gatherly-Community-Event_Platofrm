import { SKELETON_COUNT } from "../../constant.ts";

export const CardSkeleton = () => (
  <div className="overflow-hidden rounded-xl border border-border bg-card animate-pulse">
    {/* Image placeholder */}
    <div className="relative h-44 w-full bg-muted">
      {/* Category badge placeholder */}
      <div className="absolute bottom-2.5 left-2.5 h-5 w-16 rounded-full bg-muted-foreground/20" />
      {/* Icon placeholder */}
      <div className="absolute bottom-2.5 right-2.5 h-7 w-7 rounded-full bg-muted-foreground/20" />
    </div>
    {/* Content placeholder */}
    <div className="px-4 pb-4 pt-3 space-y-2.5">
      <div className="h-4 w-3/5 rounded bg-muted" />
      <div className="space-y-1.5">
        <div className="h-3 w-full rounded bg-muted" />
        <div className="h-3 w-4/5 rounded bg-muted" />
        <div className="h-3 w-3/5 rounded bg-muted" />
      </div>
      <div className="flex items-center justify-between pt-2">
        <div className="flex gap-3">
          <div className="h-3 w-14 rounded bg-muted" />
          <div className="h-3 w-12 rounded bg-muted" />
        </div>
        <div className="h-6 w-12 rounded-md bg-muted" />
      </div>
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
