"use client";
import { useProfile } from "@/components/providers/profile-provider";
import { Button } from "@/components/ui/button";
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
    <div>
      <div className="flex items-center gap-2">
        <img
          className="rounded-full size-8"
          src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1728172800&semt=ais_hybrid"
          alt="User avatar"
        />
        <h3 className="text-lg">
          {user?.username.charAt(0).toUpperCase()}
          {user?.username.slice(1)}
        </h3>
      </div>
      <Button
        onClick={() => {
          localStorage.removeItem("user");
          setUser(null);
          setProfile(null);
        }}
        className="rounded-full"
      >
        Logout
      </Button>
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
