import { fetchMovies } from "@/actions/fetchMovies";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircleIcon } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

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
