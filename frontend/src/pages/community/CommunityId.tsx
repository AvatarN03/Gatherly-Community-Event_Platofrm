import { useState } from "react";
import { CommunityInfo } from "../../components/community/CommunityInfo";
import CommunityActivity from "../../components/community/CommunityActivity";

const CommunityId = () => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  return (
    <div>
      <CommunityInfo
        onJoin={() => setIsJoinModalOpen(true)}
        onLeave={() => setIsLeaveModalOpen(true)}
        onWithdraw={() => setIsWithdrawModalOpen(true)}
      />

      <CommunityActivity />
    </div>
  );
};

export default CommunityId;
