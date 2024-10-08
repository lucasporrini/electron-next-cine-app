import Header from "@/components/global/header";
import Sidebar from "@/components/global/sidebar";
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "NextJS + Electron Boilerplate",
  description:
    "A neat boilerplate for building Electron apps, with NextJS at the frontend and pre-configured with a bunch of handy development tools.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen !p-4 overflow-hidden text-white bg-primary">
        <Providers>
          <Sidebar />
          <div className="relative flex-1 ml-56 overflow-x-hidden">
            <Header />
            <div className="w-full py-4">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
