"use client";
import { getGenres, getMovieByName } from "@/actions/fetchMovies";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MovieTrailer } from "./movie-trailer";
import { Notifications } from "./notifications";

const Header = () => {
  const [user, setUser] = useState(null);
  const { profile } = useProfile();
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [filterByGenre, setFilterByGenre] = useState(null);
  const [filterByYear, setFilterByYear] = useState(null);
  const input = useRef(null);

  useEffect(() => {
    if (profile) setUser(profile);
    else setUser(null);
  }, [profile]);

  useEffect(() => {
    getGenres().then((genres) => setAllGenres(genres.genres));
  }, []);

  const filteredGenres = useMemo(
    () =>
      [...new Set(result.flatMap((movie) => movie.genre_ids))].map((id) =>
        allGenres.find((genre) => genre.id === id)
      ),
    [result]
  );

  const filteredYears = useMemo(
    () =>
      [...new Set(result.map((movie) => movie.release_date))]
        .map((date) => date.slice(0, 4))
        .sort((a, b) => b - a)
        .filter((value, index, self) => self.indexOf(value) === index)
        .filter((year) => year !== ""),
    [result]
  );

  const handleSearch = async (event) => {
    // @ts-ignore - window global
    clearTimeout(window.searchTimeout);
    // @ts-ignore - window global
    window.searchTimeout = setTimeout(async () => {
      setSearch(event.target.value);
      if (event.target.value !== null) {
        // @ts-ignore - document global
        document.body.children[1].style.overflow = "hidden";
        const movies = await getMovieByName(event.target.value);
        setResult(movies.results);
      }
    }, 500);
  };

  return (
    <header className="flex items-center gap-4">
      <Input
        type="search"
        placeholder="Search"
        onInput={handleSearch}
        ref={input}
      />

      {search && (
        <div className="fixed z-50 flex flex-col gap-6 px-6 py-4 top-1/2 left-1/2 bg-[#9d9d9d] rounded-xl w-[800px] min-h-[300px] -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Find your movie now 🍿</h3>

            {/* Filter section */}
            <div className="flex items-center gap-2">
              <Button
                variant="link"
                className="text-white"
                onClick={() => {
                  setFilterByGenre(null);
                  setFilterByYear(null);
                }}
              >
                Clean filters
              </Button>
              {/* Genre Filter */}
              <Select
                onValueChange={setFilterByGenre}
                value={filterByGenre || ""}
              >
                <SelectTrigger className="w-[180px] border-white bg-[#9d9d9d]">
                  <SelectValue placeholder="Select a genre" />
                </SelectTrigger>
                <SelectContent className="border-white bg-[#9d9d9d]">
                  {filteredGenres.map(
                    (genre, index) =>
                      genre !== null && (
                        <SelectItem key={index} value={genre.id}>
                          {genre.name}
                        </SelectItem>
                      )
                  )}
                </SelectContent>
              </Select>

              {/* Year Filter */}
              <Select
                onValueChange={setFilterByYear}
                value={filterByYear || ""}
              >
                <SelectTrigger className="w-[180px] border-white bg-[#9d9d9d]">
                  <SelectValue placeholder="Select a year" />
                </SelectTrigger>
                <SelectContent className="border-white bg-[#9d9d9d]">
                  {filteredYears.map(
                    (year, index) =>
                      year !== null && (
                        <SelectItem key={index} value={year}>
                          {year}
                        </SelectItem>
                      )
                  )}
                </SelectContent>
              </Select>
              <Button
                onClick={() => {
                  // @ts-ignore - document global
                  document.body.children[1].style.overflow = "auto";
                  setSearch("");
                  setResult([]);
                  setFilterByGenre(null);
                  setFilterByYear(null);
                  input.current.value = "";
                }}
                className="p-0 rounded-full cursor-pointer aspect-square bg-[#9d9d9d] shadow-none"
              >
                <XIcon />
              </Button>
            </div>
          </div>

          {/* Carousel */}
          <Carousel className="cursor-grab">
            <CarouselContent>
              {result
                .filter((movie) =>
                  filterByGenre ? movie.genre_ids.includes(filterByGenre) : true
                )
                .filter((movie) =>
                  filterByYear
                    ? movie.release_date.includes(filterByYear)
                    : true
                ).length === 0 && (
                <span className="ml-4">
                  We can't find a movie with your current filters, retry by
                  changing filters 🎬
                </span>
              )}
              {result
                .filter((movie) =>
                  filterByGenre ? movie.genre_ids.includes(filterByGenre) : true
                )
                .filter((movie) =>
                  filterByYear
                    ? movie.release_date.includes(filterByYear)
                    : true
                )
                .map((movie, index) => (
                  <CarouselItem
                    key={movie.id}
                    className="relative w-full pl-0 ml-4 overflow-hidden md:basis-1/4 lg:basis-1/5 group"
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
                          <span className="w-full h-[250px] rounded-2xl bg-primary-foreground flex items-center justify-center">
                            Oh! An error appeared while fetching the movie
                            poster 😢
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
                          <DialogDescription>
                            {movie.overview}
                          </DialogDescription>
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
            <span className="px-1 py-0.5 w-32 truncate">
              {profile?.name.charAt(0).toUpperCase()}
              {profile?.name.slice(1, 10)}
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
