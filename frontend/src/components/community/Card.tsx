import { Link } from "react-router-dom";
import { MapPin, Users } from "lucide-react";
import type { CommunityView } from "../../types/community.ts";
import { Card } from "../ui/card";

const CommunityCard = ({ community }: { community: CommunityView }) => (
  <Card className="group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
    <Link
      to={`/communities/${community.slug}`}
      className="flex h-full flex-col"
    >
      {/* Image section */}
      <div className="relative h-44 w-full overflow-hidden bg-accent">
        <img
          src={community.imageUrl || "/image_holder.jpg"}
          alt={community.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Subtle gradient overlay at bottom of image */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Category badge — bottom-left of image */}
        <span className="absolute bottom-2.5 left-2.5 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold text-primary-foreground shadow-sm">
          {community.category}
        </span>

        {/* Community icon — bottom-right of image */}
        <span className="absolute bottom-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-card/80 shadow-sm backdrop-blur-sm">
          <Users className="h-3.5 w-3.5 text-primary" />
        </span>
      </div>

      {/* Content section */}
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        {/* Title */}
        <h3 className="line-clamp-1 text-sm font-semibold text-card-foreground transition-colors group-hover:text-primary">
          {community.name}
        </h3>

        {/* Description */}
        <p className="mt-1.5 line-clamp-3 text-xs leading-[1.6] text-muted-foreground">
          A welcoming community for people who share ideas, experiences, and
          meaningful connections.
        </p>

        {/* Footer: stats + join button */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              Members
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {community.location || "Local"}
            </span>
          </div>

          <span className="inline-flex items-center rounded-md bg-primary px-3.5 py-1.5 text-[10px] font-semibold text-primary-foreground shadow-sm transition-colors group-hover:bg-primary/90">
            Join
          </span>
        </div>
      </div>
    </Link>
  </Card>
);

export default CommunityCard;
