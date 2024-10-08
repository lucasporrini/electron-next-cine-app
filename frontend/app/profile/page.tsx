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
      <h1>{user?.username}</h1>
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
