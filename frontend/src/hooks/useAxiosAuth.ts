import { useEffect } from "react";
import { useAuth } from "@clerk/react";

import { api } from "../lib/axiosInstance";

/**
 * Attaches a fresh Clerk session token to every outgoing request.
 *
 * Using `useAuth().getToken()` (rather than polling `window.Clerk` directly)
 * avoids the race condition where a request fires before Clerk has finished
 * restoring the session on initial page load — `getToken()` resolves once
 * Clerk is actually ready instead of silently returning nothing.
 *
 * Mount this once near the root of the app (inside `ClerkProvider`).
 */
export const useAxiosAuth = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const interceptorId = api.interceptors.request.use(async (config) => {
      const token = await getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    return () => {
      api.interceptors.request.eject(interceptorId);
    };
  }, [getToken]);
};
