import { Link } from "react-router-dom";
import { MapPin, Tag } from "lucide-react";
import type { CommunityView } from "../../types/community.ts";

const Card = ({ community }: { community: CommunityView }) => {
  const tags = community.tags ?? [];

  return (
    <Link
      to={`/communities/${community.slug}`}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-teal-600/50 bg-teal-200 p-3 text-teal-900 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-600 hover:shadow-lg hover:shadow-teal-100"
    >
      <img
        src="/card-back.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute h-full w-full object-fill scale-150 -right-14 -bottom-14 opacity-75"
      />

      {/* Image — inset from the card edge, own rounded border */}
      <div className="relative z-10 h-48 w-full overflow-hidden rounded-xl bg-teal-50 ring-1 ring-inset ring-black/5">
        <img
          src={community.imageUrl || "/image_holder.jpg"}
          alt={community.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
        {/* soft base shadow so the photo settles into the card instead of cutting off sharply */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      {/* Content — separated from the image by real spacing (gap-4 above) */}
      <div className="relative flex flex-col gap-3 px-1 pb-1">
        <h2 className="relative line-clamp-2 text-xl font-semibold leading-tight text-teal-950 transition-colors group-hover:text-teal-900">
          {community.name}
        </h2>

        <div className="relative flex items-center justify-between gap-3">
          <p className="flex min-w-0 items-center gap-1.5 text-sm text-teal-700">
            <MapPin className="h-4 w-4 shrink-0 text-teal-500" />
            <span className="truncate">{community.location}</span>
          </p>

          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-teal-600 px-2.5 py-1 text-xs font-medium text-white shadow-sm">
            <Tag className="h-3.5 w-3.5" />
            <span className="max-w-[7rem] truncate">{community.category}</span>
          </span>
        </div>

        {tags.length > 0 && (
          <div className="relative flex flex-wrap gap-2 pt-3">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-teal-100 bg-teal-50/80 px-2.5 py-1 text-xs font-medium text-teal-700"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default Card;
