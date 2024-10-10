"use client";
import { getBestMovies, getPopularMovies } from "@/actions/fetchMovies";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";
import { MovieModal } from "./movie-modal";

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
                <MovieModal {...movie} />
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
