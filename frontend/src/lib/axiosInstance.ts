import axios from "axios";
import toast from "react-hot-toast";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// NOTE: the Authorization header is attached via the `useAxiosAuth` hook
// (see ../hooks/useAxiosAuth.ts), which uses Clerk's `useAuth().getToken()`
// instead of reaching for `window.Clerk` directly. That avoids a race
// condition where requests fire before Clerk has finished restoring the
// session on initial page load.

export const handleApiError = (error: unknown) => {
    console.error("API ERROR:", error);

    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.error;

        if (typeof message === "string") {
            toast.error(message);
            return;
        }

        if (error.message) {
            toast.error(error.message);
            return;
        }
    }

    if (error instanceof Error) {
        toast.error(error.message);
        return;
    }

    toast.error("Something went wrong");
};
