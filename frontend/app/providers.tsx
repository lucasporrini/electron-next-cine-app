"use client";

import { NotificationsProvider } from "@/components/providers/notifications-provider";
import { ProfileProvider } from "@/components/providers/profile-provider";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    // Providers are nested the way they are to ensure that the query client and the profile are available to all components
    <QueryClientProvider client={queryClient}>
      <ProfileProvider>
        <NotificationsProvider>
          {children}
          <Toaster />
        </NotificationsProvider>
      </ProfileProvider>
    </QueryClientProvider>
  );
};
