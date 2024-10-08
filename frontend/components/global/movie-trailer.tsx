import { fetchMovieVideos } from "@/actions/fetchMovies";
import { useQuery } from "@tanstack/react-query";
import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export const MovieTrailer = ({
  movieTitle,
  movieId,
}: {
  movieTitle: string;
  movieId: number;
}) => {
  const {
    data: movieVideos,
    error: movieVideosError,
    isLoading: movieVideosIsLoading,
  } = useQuery({
    queryKey: ["trailer", movieId],
    queryFn: async () => {
      return await fetchMovieVideos(movieId);
    },
  });

  const [mute, setMute] = useState(false);

  return (
    <div className="relative w-full h-72">
      {movieVideosIsLoading && (
        <Skeleton className="w-full h-full overflow-hidden bg-primary-foreground group rounded-xl" />
      )}
      {movieVideosError && (
        <p className="text-red-500">{movieVideosError.message}</p>
      )}
      {movieVideos && (
        <>
          <div className="relative w-full h-full overflow-hidden group rounded-xl">
            {movieVideos.results && movieVideos.results.length > 0 ? (
              <iframe
                className="absolute inset-0 w-full h-full pointer-events-none"
                src={`https://www.youtube.com/embed/${movieVideos.results[0].key}?autoplay=1&controls=0&mute=${mute ? "0" : "1"}&loop=1&playlist=${movieVideos.results[0].key}`}
                title="Movie Trailer"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <p className="absolute text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                No trailer available 😓
              </p>
            )}
            <div className="absolute top-0 left-0 flex items-center justify-between w-full h-12 px-4 bg-primary"></div>
            <div className="absolute bottom-0 left-0 flex items-center justify-between w-full h-12 bg-primary">
              <h3 className="text-xl font-semibold leading-none tracking-tight">
                {movieTitle}
              </h3>
              <div className="flex items-center gap-2">
                <Button
                  className="flex p-0 rounded-full bg-primary top-4 right-4 aspect-square"
                  onClick={() => setMute(!mute)}
                >
                  {mute ? (
                    <Volume2 size={20} className="text-white" />
                  ) : (
                    <VolumeX size={20} className="text-white" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
