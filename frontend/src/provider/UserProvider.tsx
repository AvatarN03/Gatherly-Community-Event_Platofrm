import { useEffect, type ReactNode } from "react";
import { useAuth } from "@clerk/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { UserContext } from "../context/userContext";
import userApi from "../services/userApi";
import { useAxiosAuth } from "../hooks/useAxiosAuth";

const ME_QUERY_KEY = ["me"] as const;

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Attaches a fresh Clerk token to every request made through `api`.
  useAxiosAuth();

  const { isLoaded: isAuthLoaded, isSignedIn } = useAuth();
  const queryClient = useQueryClient();

  // Only sync with the backend once Clerk has actually finished loading
  // and confirmed the user is signed in — this is what fixes the race
  // condition where requests fired before the session was ready.
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ME_QUERY_KEY,
    queryFn: userApi.getMe,
    enabled: isAuthLoaded && !!isSignedIn,
    staleTime: 60 * 1000,
    retry: 1,
  });

  // On logout, drop any cached "me" data so a subsequent sign-in
  // (possibly as a different user) never shows stale plan/counts.
  useEffect(() => {
    if (isAuthLoaded && !isSignedIn) {
      queryClient.removeQueries({ queryKey: ME_QUERY_KEY });
    }
  }, [isAuthLoaded, isSignedIn, queryClient]);

  return (
    <UserContext.Provider
      value={{
        me: data?.user ?? null,
        stats: data?.stats ?? null,
        isAuthLoaded,
        isSignedIn: !!isSignedIn,
        isLoading: isAuthLoaded && !!isSignedIn && isLoading,
        isError,
        refetch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
