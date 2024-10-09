"use client";

import { NotificationsProvider } from "@/components/providers/notifications-provider";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationsProvider>
        {children}
        <Toaster />
      </NotificationsProvider>
    </QueryClientProvider>
  );
};
