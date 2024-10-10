"use client";
import { fetchMoviesByGenre, getGenres } from "@/actions/fetchMovies";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";
import { MovieModal } from "./movie-modal";

export const GenreMovies = ({
  genreId,
  pageId,
}: {
  genreId: number;
  pageId: number;
}) => {
  const [currentGenre, setCurrentGenre] = useState(null);
  const [currentPage, setCurrentPage] = useState(pageId);
  const observerRef = useRef<IntersectionObserver | null>(null);

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
    queryKey: [`movies${currentGenre}-${currentPage}`],
    queryFn: async () => {
      return await fetchMoviesByGenre(genreId, currentPage);
    },
  });

  useEffect(() => {
    if (!genresIsLoading) {
      setCurrentGenre(
        genres.genres.find((genre) => genre.id === genreId)?.name
      );
    }
  }, [genres, genreId, genresIsLoading]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        setCurrentPage((prev) => prev + 1); // Charger plus de films
      }
    };

    observerRef.current = new IntersectionObserver(callback);
    const observerElement = document.getElementById(
      `load-more-trigger-${genreId}`
    );
    if (observerElement) {
      observerRef.current.observe(observerElement);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [genreId]);

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
                <MovieModal {...movie} />
              </CarouselItem>
            ))}
          <div id={`load-more-trigger-${genreId}`} className="w-full h-0"></div>
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
