import { Bell } from "lucide-react";
import CommunityActivity from "../../components/community/CommunityActivity";
import { useCommunityContext } from "../../context/communityContext";

const CommunityNoticePage = () => {
  const { community } = useCommunityContext();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-6 rounded-2xl border border-teal-200 bg-white/90 p-5 shadow-sm shadow-teal-100">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <Bell className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Notice
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Notices for {community.name}
            </p>
          </div>
        </div>
      </div>

      <CommunityActivity />
    </div>
  );
};

export default CommunityNoticePage;
