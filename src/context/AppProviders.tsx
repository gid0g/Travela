import type { ReactNode } from "react";
import { LocationProvider } from "./locationContext";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function AppProviders({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <LocationProvider>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </CookiesProvider>
    </LocationProvider>
  );
}
