import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, Users } from "lucide-react";
import type { CommunityView } from "../../types/community.ts";
import { Card, CardContent } from "../ui/card";

const CommunityCard = ({ community }: { community: CommunityView }) => (
  <Card className="group min-h-[335px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
    <Link to={`/communities/${community.slug}`} className="flex h-full flex-col p-2.5">
    <div className="relative h-36 w-full overflow-hidden rounded-lg bg-accent">
      <img src={community.imageUrl || "/image_holder.jpg"} alt={community.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
      <div className="absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-black/10 to-transparent" />
    </div>
    <CardContent className="flex flex-1 flex-col px-1.5 pb-1 pt-2">
      <div className="mb-1 flex items-center justify-between gap-2"><span className="rounded-full bg-accent px-2 py-1 text-[9px] font-semibold text-accent-foreground">{community.category}</span><Users className="h-3.5 w-3.5 text-primary" /></div>
      <h2 className="line-clamp-1 text-sm font-semibold text-card-foreground transition-colors group-hover:text-primary">{community.name}</h2>
      <p className="mt-1 line-clamp-3 text-[10px] leading-4 text-muted-foreground">A welcoming community for people who share ideas, experiences, and meaningful connections.</p>
      <div className="mt-auto flex items-center justify-between gap-2 pt-3 text-[9px] text-muted-foreground"><span className="flex items-center gap-1"><Users className="h-3 w-3" /> {community.location || "Local community"}</span><span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> Active</span></div>
      <div className="mt-2 flex justify-end"><span className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-[10px] font-semibold text-primary-foreground transition group-hover:bg-primary/90">Join <ArrowRight className="h-3 w-3" /></span></div>
    </CardContent>
    </Link>
  </Card>
);

export default CommunityCard;
