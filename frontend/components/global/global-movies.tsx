"use client";
import { getBestMovies, getPopularMovies } from "@/actions/fetchMovies";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";
import { MovieTrailer } from "./movie-trailer";

export const GlobalMovies = ({ type }: { type: "popular" | "best" }) => {
  const {
    data: moviesByType,
    error: errorByType,
    isLoading: isLoadingByType,
  } = useQuery({
    queryKey: [`movies${type}`],
    queryFn: async () => {
      switch (type) {
        case "popular":
          return await getPopularMovies();
        case "best":
          return await getBestMovies();
      }
    },
  });

  return (
    <div className="flex flex-col items-start gap-2 mt-6">
      <h3 className="text-lg font-bold">
        {type
          ? `${type.charAt(0).toUpperCase()}${type.slice(1)}`
          : "Loading..."}
      </h3>
      {isLoadingByType && (
        <Carousel>
          <CarouselContent>
            <Carousel>
              <CarouselContent>
                {[...Array(8)].map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="relative w-full pl-0 ml-4 overflow-hidden md:basis-1/4 lg:basis-1/6"
                  >
                    <GlobalMovies.Skeleton className="min-w-full min-h-full rounded-2xl" />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </CarouselContent>
        </Carousel>
      )}
      {errorByType && <p className="text-red-500">{errorByType.message}</p>}
      <Carousel className="cursor-grab">
        <CarouselContent>
          {moviesByType &&
            moviesByType.results.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="relative w-full pl-0 ml-4 overflow-hidden md:basis-1/4 lg:basis-1/6 group"
              >
                <Dialog>
                  <DialogTrigger>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-auto rounded-2xl"
                    />
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
  );
};

GlobalMovies.Skeleton = function GlobalMoviesSkeleton({
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
