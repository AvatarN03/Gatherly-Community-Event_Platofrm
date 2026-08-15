import { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useUser } from "@clerk/react";
import { CommunityContext } from "../context/communityContext";
import { AlertTriangle } from "lucide-react";
import CommunityTopbar from "../components/community/CommunityTopbar.tsx";
import { IsEmpty } from "../components/IsEmpty.tsx";
import { useCommunityBySlugQuery } from "../hooks/useCommunityQueries.ts";
import { CommunityDetailSkeleton } from "../components/layouts/Skeleton.tsx";

const CommunityProvider = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user: clerkUser, isLoaded: isAuthLoaded } = useUser();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data, isLoading, isError } = useCommunityBySlugQuery(slug, isAuthLoaded);

  const community = data?.community;
  const userMembership = data?.userMembership ?? null;

  const currentUserId = clerkUser?.id ?? null;
  const isAuthenticated = !!clerkUser;
  const isMember = !!userMembership;
  const isCreator = userMembership === "OWNER";
  const isAdmin = userMembership === "ADMIN" || isCreator;

  const shouldFetchUserRequest = !!clerkUser && !!community && !isMember;

  // const { data: userRequest } = useUserRequestQuery(id, {
  //     enabled: shouldFetchUserRequest,
  // })

  // const deleteMutation = useDeleteCommunityMutation()

  // Also wait on `isAuthLoaded`: the query stays disabled until Clerk
  // finishes loading, so `isLoading` alone would briefly read `false`
  // (with no data yet) and incorrectly fall through to the "not found" state.
  if (!isAuthLoaded || isLoading) return <CommunityDetailSkeleton />;

  if (!community || isError)
    return (
      <IsEmpty
        text="Community not found"
        href="/communities"
        link="Back to Communities"
        Icon={AlertTriangle}
      />
    );
  return (
    <CommunityContext.Provider
      value={{
        community,
        userMembership,
        // userRequest,
        isCreator,
        isAdmin,
        isMember,
        isAuthenticated,
        currentUserId,
      }}
    >
      <div className="bg-night/40 min-h-screen">
        <CommunityTopbar />

        <Outlet />

        {/*{clerkUser && isCreator && (*/}
        {/*    <DeleteCommunityModal*/}
        {/*        communityName={community.name}*/}
        {/*        open={showDeleteModal}*/}
        {/*        isPending={deleteMutation.isPending}*/}
        {/*        onCancel={() => setShowDeleteModal(false)}*/}
        {/*        onConfirm={() =>*/}
        {/*            deleteMutation.mutate(id!, {*/}
        {/*                onSuccess: () => navigate('/communities'),*/}
        {/*            })*/}
        {/*        }*/}
        {/*    />*/}
        {/*)}*/}
      </div>
    </CommunityContext.Provider>
  );
};

export default CommunityProvider;
