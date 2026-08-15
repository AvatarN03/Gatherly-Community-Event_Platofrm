import {
  CheckCircle,
  Clock,
  Loader2,
  LogIn,
  LogOut,
  ShieldCheck,
  X,
} from "lucide-react";
import { useCommunityContext } from "../../context/communityContext";
import { SignInButton } from "@clerk/react";
import { ROLE_CONFIG } from "../../constant";

/**

 *
 *  0. Guest         — not signed in yet          → "Sign in to join"
 *  1. Member         — already joined             → role badge + "Leave community"
 *  2. Pending        — join request awaiting review → "Pending approval" + "Withdraw request"
 *  3. Rejected       — a past request was denied  → "Request rejected" + "Request again"
 *  4. Default        — no membership, no request  → "Join community"

**/



interface CommunityActionsProps {
  onJoin: () => void;
  onWithdraw: () => void;
  onLeave: () => void;
  isJoining?: boolean;
  isWithdrawing?: boolean;
  isLeaving?: boolean;
}

export const CommunityActions = ({
  onJoin,
  onWithdraw,
  onLeave,
  isJoining = false,
  isWithdrawing = false,
  isLeaving = false,
}: CommunityActionsProps) => {
  const { isAuthenticated, userMembership, isCreator } = useCommunityContext();

  const role = userMembership ?? "MEMBER";
  const roleConfig = ROLE_CONFIG[role];

  const requestStatus = null;

  // ── 0. Guest — not signed in at all ───────────────────────
  if (!isAuthenticated) {
    return (
      <div>
        <SignInButton mode="modal">
          <button className="flex items-center gap-2 bg-teal-400  text-teal-900 font-semibold text-sm px-5 py-2.5 rounded-md shadow-sm shadow-teal-600/10 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            <LogIn className="w-4 h-4" />
            Sign in to join
          </button>
        </SignInButton>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          You'll need an account to join this community.
        </p>
      </div>
    );
  }

  // ── 1. Already a member ────────────────────────────────────
  if (userMembership) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2.5 flex-wrap">
          {!isCreator && (role === "MEMBER" || role === "ADMIN") && (
            <button
              onClick={onLeave}
              disabled={isLeaving}
              className="flex items-center gap-2 bg-blue-300  border  hover:border-teal-600 text-teal-700 font-semibold text-sm px-4 py-2 rounded-sm  cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLeaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Leaving...
                </>
              ) : (
                <>
                  <LogOut className="w-4 h-4" /> Leave community
                </>
              )}
            </button>
          )}

          <span className={`flex items-center gap-1.5 text-xs font-semibold border px-3 py-1.5 rounded-md w-fit ${roleConfig.className}`}>
            {role === "OWNER" || role === "ADMIN" ? (
              <ShieldCheck className="w-3.5 h-3.5" />
            ) : (
              <CheckCircle className="w-3.5 h-3.5" />
            )}
            {roleConfig.label}
          </span>
        </div>
        <p className="text-xs text-yellow-700  mt-1">
          {isCreator
            ? "You created this community."
            : role === "ADMIN"
              ? "You help manage this community."
              : "You're a member of this community."}
        </p>
      </div>
    );
  }

  // ── 2. Request pending ────────────────────────────────────
  if (requestStatus === "PENDING") {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={onWithdraw}
            disabled={isWithdrawing}
            className="flex items-center gap-2 bg-teal-300/60 hover:bg-teal-400/60 border  hover:border-teal-600 text-teal-700  font-semibold text-sm px-4 py-2 rounded-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isWithdrawing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Withdrawing...
              </>
            ) : (
              <>
                <X className="w-4 h-4" /> Withdraw request
              </>
            )}
          </button>

          <span
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md w-fit bg-slate-200`}
          >
            <Clock className="w-3.5 h-3.5" />
            Pending approval
          </span>
        </div>
        <p className="text-xs text-yellow-700  mt-1">
          Your request is awaiting review by a community admin. You can withdraw
          it anytime.
        </p>
      </div>
    );
  }

  // ── 3. Request rejected ───────────────────────────────────
  if (requestStatus === "REJECTED") {
    return (
      <div className="flex flex-col gap-2">
        
          <button onClick={onJoin} disabled={isJoining} className="flex items-center gap-2 bg-red-200 w-fit  border  hover:border-red-600 text-red-700 font-semibold text-sm px-4 py-2 rounded-sm  cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            {isJoining ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Requesting...
              </>
            ) : (
              "Request again"
            )}
          </button>

          <span
            className={`flex items-center gap-1.5 text-xs font-semibold border px-3 py-1.5 rounded-md w-fit text-rose-600 bg-rose-50/60 border-rose-200/70 `}
          >
            <X className="w-3.5 h-3.5" />
            Request rejected
          </span>
       
        <p className="text-xs text-yellow-700  mt-1">
          Your last request wasn't approved. You're welcome to send a new one.
        </p>
      </div>
    );
  }

  // ── 4. No membership, no request → can join ───────────────
  return (
    <div>
      <button onClick={onJoin} disabled={isJoining} className="flex items-center gap-2 bg-teal-600 text-white font-semibold text-sm px-5 py-2.5 rounded-md shadow-sm shadow-teal-600/10 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
        {isJoining ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Requesting...
          </>
        ) : (
          "Join community"
        )}
      </button>
      <p className="text-xs text-yellow-700  mt-1">
        Join to post, comment, and connect with other members.
      </p>
    </div>
  );
};
