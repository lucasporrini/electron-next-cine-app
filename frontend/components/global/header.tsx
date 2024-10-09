"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useProfile } from "../providers/profile-provider";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Notifications } from "./notifications";

const Header = () => {
  const [user, setUser] = useState(null);
  const { profile } = useProfile();
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (profile) setUser(profile);
    else setUser(null);
  }, [profile]);

  useEffect(() => {
    // TODO: search for movies
    setResult([
      {
        title: "Movie 1",
        description: "Description 1",
        date: "2021-09-01",
      },
      {
        title: "Movie 2",
        description: "Description 2",
        date: "2021-09-02",
      },
    ]);
  }, [search]);

  return (
    <header className="flex items-center gap-4">
      <Input
        type="search"
        placeholder="Search"
        onInput={(event) => {
          // attendre 500ms avant de lancer la recherche et annuler le setTimeout si l'utilisateur continue de taper
          clearTimeout(window.searchTimeout);
          window.searchTimeout = setTimeout(() => {
            setSearch(event.target.value);
            console.log("Search for:", event.target.value);
          }, 500);
        }}
      />
      {search && (
        <div className="fixed z-50 px-4 py-2 top-1/2 left-1/2 bg-primary rounded-xl">
          {result.map((movie, index) => (
            <div key={index} className="flex items-center gap-2">
              <span>{movie.title}</span>
              <span>{movie.description}</span>
              <span>{movie.date}</span>
            </div>
          ))}
        </div>
      )}
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
