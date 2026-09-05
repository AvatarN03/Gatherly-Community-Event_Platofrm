import { useState } from "react";
import { useCommunityContext } from "../../context/communityContext";
import { CommunityInfo } from "../../components/community/CommunityInfo";
import CommunityActivity from "../../components/community/CommunityActivity";
import NoticePreview from "../../components/community/NoticePreview";

const CommunityId = () => {
  const { pinnedNotice, recentNotice } = useCommunityContext();
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <CommunityInfo
        onJoin={() => setIsJoinModalOpen(true)}
        onLeave={() => setIsLeaveModalOpen(true)}
        onWithdraw={() => setIsWithdrawModalOpen(true)}
      />

      {/* Notices Section */}
      <div className="px-5 max-w-7xl mx-auto">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Notices</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <NoticePreview notice={pinnedNotice} title="Pinned" />
          <NoticePreview notice={recentNotice} title="Recent" />
        </div>
      </div>

      <CommunityActivity />
    </div>
  );
};

export default CommunityId;
