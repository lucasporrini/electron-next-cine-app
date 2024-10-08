"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

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
        }}
        className="rounded-full"
      >
        Logout
      </Button>
    </div>
  );
};

export default ProfilePage;
