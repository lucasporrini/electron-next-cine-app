"use client";
import { getMovieByName } from "@/actions/fetchMovies";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useProfile } from "../providers/profile-provider";
import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { MovieTrailer } from "./movie-trailer";
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

  return (
    <header className="flex items-center gap-4">
      <Input
        type="search"
        placeholder="Search"
        onInput={(event) => {
          // @ts-ignore - window global
          clearTimeout(window.searchTimeout);
          // @ts-ignore - window global
          window.searchTimeout = setTimeout(async () => {
            // @ts-ignore - target defined
            setSearch(event.target.value);
            // @ts-ignore - target defined
            console.log("Search for:", event.target.value);
            // @ts-ignore - target defined
            const fetchedMovies = await getMovieByName(event.target.value);
            setResult(fetchedMovies.results);
            console.log("fetchedMovies", fetchedMovies);
          }, 500);
        }}
      />
      {search && (
        <div className="fixed z-50 flex flex-col gap-3 px-6 py-4 top-1/2 left-1/2 bg-primary rounded-xl w-[500px] -translate-x-1/2 -translate-y-1/2">
          <h3 className="font-bold">Find your movie now 🍿</h3>
          <Carousel className="cursor-grab">
            <CarouselContent>
              {result.map((movie, index) => (
                <CarouselItem
                  key={movie.id}
                  className="relative w-full pl-0 ml-4 overflow-hidden md:basis-1/3 lg:basis-1/3 group"
                >
                  <Dialog>
                    <DialogTrigger>
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          className="w-full h-[250px] rounded-2xl"
                        />
                      ) : (
                        <span className="flex items-center justify-center my-auto">
                          Oh! An error appeared while fetching the movie poster
                          😢
                        </span>
                      )}
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="p-0 m-0"></DialogTitle>
                        <MovieTrailer
                          movieTitle={movie.title}
                          movieId={movie.id}
                          movieOverview={movie.overview}
                          moviePosterPath={movie.poster_path}
                        />
                        <DialogDescription>{movie.overview}</DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
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
