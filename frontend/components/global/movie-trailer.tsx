import { fetchMovieVideos } from "@/actions/fetchMovies";
import { useQuery } from "@tanstack/react-query";

export const MovieTrailer = ({ movieId }: { movieId: number }) => {
  const {
    data: movieVideos,
    error: movieVideosError,
    isLoading: movieVideosIsLoading,
  } = useQuery({
    queryKey: [`videos${movieId}`],
    queryFn: async () => {
      return await fetchMovieVideos(movieId);
    },
  });

  return (
    <div>
      {movieVideosIsLoading && <p>Loading...</p>}
      {movieVideosError && (
        <p className="text-red-500">{movieVideosError.message}</p>
      )}
      {movieVideos && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${movieVideos.results[0].key}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};
