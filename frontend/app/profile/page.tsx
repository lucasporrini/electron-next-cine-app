"use client";
import { EditProfile } from "@/components/global/edit-profile";
import { useProfile } from "@/components/providers/profile-provider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ClapperboardIcon, HeartIcon, LogOutIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { profile, setProfile } = useProfile();

  if (profile === null) {
    redirect("/login");
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  return (
    <div className="relative p-4 space-y-3 bg-primary-foreground rounded-3xl">
      <div className="flex items-end gap-4">
        <img
          className="rounded-full size-24"
          src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1728172800&semt=ais_hybrid"
          alt="User avatar"
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">
            {profile?.name.charAt(0).toUpperCase()}
            {profile?.name.slice(1)}
          </h3>
          <span className="flex items-center justify-center px-3 py-0.5 rounded-full cursor-default bg-primary w-fit">
            {profile?.username.toLowerCase()}
          </span>
          <span className="text-xs">{profile?.email}</span>
        </div>
      </div>
      <div className="absolute flex flex-col gap-2 top-3 right-5">
        <EditProfile />
        <Button
          onClick={() => {
            localStorage.removeItem("user");
            setUser(null);
            setProfile(null);
          }}
          className="flex items-center gap-2 rounded-full"
          variant="destructive"
        >
          Logout <LogOutIcon size={16} />
        </Button>
      </div>
      <Separator className="opacity-10" />
      <div className="flex gap-4">
        <div className="flex items-center justify-center gap-2">
          <ClapperboardIcon
            size={32}
            className="p-1.5 rounded-full bg-primary aspect-square"
          />
          <span>
            {JSON.parse(localStorage.getItem("count"))} films consultés
          </span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <HeartIcon
            size={32}
            className="p-1.5 rounded-full bg-primary aspect-square"
          />
          <span>
            {JSON.parse(localStorage.getItem("likedMovies") || "[]").length}{" "}
            favoris
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
