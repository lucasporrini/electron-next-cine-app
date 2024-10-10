"use client";
import { CompassIcon, HeartIcon, HouseIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useProfile } from "../providers/profile-provider";
import { Separator } from "../ui/separator";

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [currentPath, setCurrentPath] = useState("");
  const { profile } = useProfile();

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, [currentPath, setCurrentPath]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  return (
    <div className="fixed p-4 space-y-6 rounded-3xl bg-primary-foreground w-52 h-[calc(100vh-30px)]">
      <Link href="/">
        <img
          src="/logo.png"
          width="100px"
          height="40px"
          className="mt-2 mb-4"
          alt="logo"
        />
      </Link>
      <nav className="flex flex-col items-start gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 transition-all hover:text-secondary"
        >
          <HouseIcon size={18} />
          <span>Home</span>
        </Link>
        <Link
          href="/explore"
          className="flex items-center gap-2 transition-all hover:text-secondary"
        >
          <CompassIcon size={18} />
          <span>Explore</span>
        </Link>
        <Link
          href="/favorites"
          className="flex items-center gap-2 transition-all hover:text-secondary"
        >
          <HeartIcon size={18} />
          <span>Favorites</span>
        </Link>
        <Separator className="opacity-10" />
        <Link
          href={profile ? "/profile" : "/login"}
          className="flex items-center gap-2 transition-all hover:text-secondary"
        >
          <UserIcon size={18} />
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
