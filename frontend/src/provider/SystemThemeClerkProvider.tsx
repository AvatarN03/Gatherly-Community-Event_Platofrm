import { useEffect, useState, type ReactNode } from "react";
import { ClerkProvider } from "@clerk/react";
import { dark, light } from "@clerk/themes";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

const SystemThemeClerkProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (event: MediaQueryListEvent) => setIsDark(event.matches);

    mediaQuery.addEventListener("change", handleThemeChange);
    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      afterSignOutUrl="/"
      appearance={{ theme: isDark ? dark : light }}
    >
      {children}
    </ClerkProvider>
  );
};

export default SystemThemeClerkProvider;
