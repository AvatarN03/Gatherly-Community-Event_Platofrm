import axios from "axios";
import toast from "react-hot-toast";

interface ClerkWindow {
  session?: {
    getToken?: () => Promise<string | null>;
  };
}

declare global {
  interface Window {
    Clerk?: ClerkWindow;
  }
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const token = await window.Clerk?.session?.getToken?.();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// ----



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