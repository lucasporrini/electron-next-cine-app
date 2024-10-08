"use client";
import { fetchMoviesByGenre, getGenres } from "@/actions/fetchMovies";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";

export const GenreMovies = ({
  genreId,
  pageId,
}: {
  genreId: number;
  pageId: number;
}) => {
  const [currentGenre, setCurrentGenre] = useState(null);

  const {
    data: genres,
    error: genresError,
    isLoading: genresIsLoading,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      return await getGenres();
    },
  });

  const {
    data: moviesByGenre,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`movies${currentGenre}`],
    queryFn: async () => {
      return await fetchMoviesByGenre(genreId, pageId);
    },
  });

  useEffect(() => {
    if (!genresIsLoading) {
      setCurrentGenre(genres.genres.find((genre) => genre.id === genreId).name);
    }
    console.log(genres);
  }, [genres, genreId, currentGenre, genresIsLoading]);

  return (
    <div className="flex flex-col items-start gap-2 mt-6">
      <h3 className="text-lg font-bold">
        {currentGenre ? currentGenre : "Loading..."}
      </h3>
      {isLoading && (
        <Carousel>
          <CarouselContent>
            {[...Array(8)].map((_, index) => (
              <CarouselItem
                key={index}
                className="relative w-full pl-0 ml-4 overflow-hidden md:basis-1/4 lg:basis-1/6"
              >
                <GenreMovies.Skeleton className="min-w-full min-h-full rounded-2xl" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
      {error && <p className="text-red-500">{error.message}</p>}
      <Carousel className="cursor-grab">
        <CarouselContent>
          {moviesByGenre &&
            moviesByGenre.results.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="relative w-full pl-0 ml-4 overflow-hidden md:basis-1/4 lg:basis-1/6 group"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto rounded-2xl"
                />
                <div className="absolute bottom-0 left-0 right-0 flex-col items-start hidden gap-2 p-1 text-white transition-all duration-300 bg-black bg-opacity-70 group-hover:flex">
                  <h3 className="text-sm font-semibold">{movie.title}</h3>
                  <p className="text-sm line-clamp-6">{movie.overview}</p>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

GenreMovies.Skeleton = function GenreMoviesSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <Skeleton
      className={cn(
        "w-36 h-64 rounded-2xl bg-primary-foreground animate-pulse",
        className
      )}
    />
  );
};
