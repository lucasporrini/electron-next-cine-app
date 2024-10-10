import { fetchMovies } from "@/actions/fetchMovies";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircleIcon } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { MovieModal } from "./movie-modal";

export const TrendyMovies = () => {
  const {
    data: trending,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["trending"],
    queryFn: async () => {
      return await fetchMovies();
    },
  });

  return (
    <div className="flex flex-col items-start gap-2 mt-6">
      <h2 className="text-lg font-bold">You might like</h2>
      {isLoading && (
        <div className="flex items-center justify-center w-full">
          <LoaderCircleIcon className="animate-spin" />
        </div>
      )}
      {error && <p className="text-red-500">{error.message}</p>}
      <Carousel className="cursor-grab">
        <CarouselContent>
          {trending &&
            trending.results.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="relative w-full pl-0 ml-4 overflow-hidden md:basis-1/4 lg:basis-1/5 group"
              >
                <MovieModal {...movie} />
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
