import { createContext, useContext } from "react";
import type { SyncedUser, UserStats } from "../services/userApi";

type UserContextValue = {
  // Our own synced/backend copy of the user (plan, id, etc.) — null until
  // Clerk is loaded, the user is signed in, and the sync request resolves.
  me: SyncedUser | null;
  stats: UserStats | null;
  // Clerk auth state
  isAuthLoaded: boolean;
  isSignedIn: boolean;
  // Whether the /users/me sync request is in flight
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

export const UserContext = createContext<UserContextValue | null>(null);

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUserContext must be used inside UserProvider");
  return ctx;
};
