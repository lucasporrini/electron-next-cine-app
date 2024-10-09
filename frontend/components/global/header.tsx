"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useProfile } from "../providers/profile-provider";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Notifications } from "./notifications";

const Header = () => {
  const [user, setUser] = useState(null);
  const { profile } = useProfile();

  useEffect(() => {
    if (profile) setUser(profile);
    else setUser(null);
  }, [profile]);

  return (
    <header className="flex items-center gap-4">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="recent">Recent</SelectItem>
          <SelectItem value="viewed">Viewed</SelectItem>
        </SelectContent>
      </Select>
      <Input type="search" placeholder="Search" />
      <Notifications />
      <Link href={user ? "/profile" : "/login"}>
        {user ? (
          <div className="flex items-center gap-2 p-1 rounded-full bg-primary-foreground hover:bg-secondary min-w-[110px] w-fit">
            <img
              className="rounded-full size-8"
              src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1728172800&semt=ais_hybrid"
              alt="User avatar"
            />
            <span className="px-1 py-0.5 w-[50px]">
              {user?.username.charAt(0).toUpperCase()}
              {user?.username.slice(1, 10)}
            </span>
          </div>
        ) : (
          <Button className="rounded-full">Login</Button>
        )}
      </Link>
    </header>
  );
};

export default Header;
