"use client";
import { useProfile } from "@/components/providers/profile-provider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ClapperboardIcon, HeartIcon } from "lucide-react";
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
          <h3 className="text-2xl font-semibold">
            {user?.username.charAt(0).toUpperCase()}
            {user?.username.slice(1)}
          </h3>
          <span className="flex items-center justify-center px-3 py-0.5 rounded-full cursor-default bg-primary w-fit">
            {user?.name.toLowerCase()}
          </span>
        </div>
      </div>
      <Button
        onClick={() => {
          localStorage.removeItem("user");
          setUser(null);
          setProfile(null);
        }}
        className="absolute rounded-full top-3 right-5 bg-primary"
      >
        Logout
      </Button>
      <Separator className="opacity-10" />
      <div className="flex gap-4">
        <div className="flex items-center justify-center gap-2">
          <ClapperboardIcon
            size={32}
            className="p-1.5 rounded-full bg-primary aspect-square"
          />
          <span>{JSON.parse(localStorage.getItem("count"))}</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <HeartIcon
            size={32}
            className="p-1.5 rounded-full bg-primary aspect-square"
          />
          <span>
            {JSON.parse(localStorage.getItem("likedMovies") || "[]").length}
          </span>
        </div>
      </div>
      <div>
        <h3 className="text-lg">Informations</h3>
        <p>
          <span className="font-bold">Username:</span> {user?.username}
        </p>
        <p>
          <span className="font-bold">Email:</span> {user?.email}
        </p>
      </div>
      <div>
        {/* Nombre de films en favoris */}
        <h3 className="text-lg">Favorites</h3>
        <p>
          Vous avez{" "}
          {JSON.parse(localStorage.getItem("likedMovies") || "[]").length} films
          en favoris
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
