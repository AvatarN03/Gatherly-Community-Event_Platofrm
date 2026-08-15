import { Calendar, MapPin, Users } from "lucide-react";
import { useCommunityContext } from "../../context/communityContext";
import { formatDate } from "../../lib/date";
import { getSlateText } from "../../lib/validation";
import { CommunityActions } from "./CommunityActions";
import SlateDescription from "../shared/SlateDescription";

export const CommunityInfo = ({
  onJoin,
  onWithdraw,
  onLeave,
}: {
  onJoin: () => void;
  onWithdraw: () => void;
  onLeave: () => void;
}) => {
  const { community } = useCommunityContext();

  if (!community) return null;

  const tags = community?.tags ?? [];

  return (
    <div className="px-5 py-5">
      <div className="grid grid-cols-3 items-start gap-4">
        {/*Left part*/}
        <div className="col-span-2 space-y-8 ">
          <h1 className="text-2xl font-semibold">{community.name}</h1>

          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <p className="text-sm text-gray-500 max-w-md">
              {community.location}
            </p>
          </div>

          <div className="flex justify-start gap-20 items-center">
            <p className="flex items-center gap-2 text-sm text-teal-600">
              <Users size={16} className="text-teal-500" />
              {community.membersCount} members
            </p>

            <p className="text-sm text-gray-500 flex items-center">
              <Calendar /> {formatDate(community.createdAt)}
            </p>
          </div>

          {tags.length > 0 && (
            <div className="my-4 space-y-2">
              <h4>Tags:</h4>
              <div className="flex gap-2 flex-wrap items-center">
                {tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-teal-200 rounded-full text-sm text-teal-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="max-w-3xl">
            <h4> Description: </h4>
            <SlateDescription value={community.description} />
          </div>
        </div>

        {/*Right part */}
        <div className="col-span-1 p-2 space-y-10">
          
          <div className="p-4 rounded-md bg-teal-50 border border-teal-600 shadow-sm space-y-3">
            <h4 className="text-base font-semibold text-gray-800">
              Community Actions
            </h4>
            <p className="text-sm text-gray-500">
              Join, withdraw your request, or leave this community below.
            </p>
            <CommunityActions
              onJoin={onJoin}
              onWithdraw={onWithdraw}
              onLeave={onLeave}
            />
          </div>

          {/*//TODO: Fetch the community roles (owner and admin only)*/}
          <div className=" h-120 bg-slate-300"/>

        </div>
      </div>
    </div>
  );
};
