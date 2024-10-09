"use client";
import { HeartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export const LikeButton = ({
  movieId,
  movieTitle,
  moviePosterPath,
  movieOverview,
}: {
  movieId: number;
  movieTitle: string;
  moviePosterPath: string;
  movieOverview: string;
}) => {
  const [currentLikedMovies, setCurrentLikedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Charger les films aimés depuis localStorage
    setCurrentLikedMovies(
      JSON.parse(localStorage.getItem("likedMovies") || "[]")
    );
  }, []);

  const toggleFavorite = () => {
    const localMovies = JSON.parse(localStorage.getItem("likedMovies") || "[]");

    // Vérifier si le film est déjà dans les favoris
    const isFavorite = localMovies.some((movie: Movie) => movie.id === movieId);

    if (isFavorite) {
      // Supprimer le film des favoris
      const updatedMovies = localMovies.filter(
        (movie: Movie) => movie.id !== movieId
      );
      localStorage.setItem("likedMovies", JSON.stringify(updatedMovies));
      setCurrentLikedMovies(updatedMovies);
    } else {
      // Ajouter le film aux favoris
      const newMovie = {
        id: movieId,
        title: movieTitle,
        poster_path: moviePosterPath,
        overview: movieOverview,
      };
      const updatedMovies = [...localMovies, newMovie];
      localStorage.setItem("likedMovies", JSON.stringify(updatedMovies));
      setCurrentLikedMovies(updatedMovies);
    }
  };

  return (
    <Button
      className="flex p-0 rounded-full bg-primary top-4 right-4 aspect-square"
      onClick={toggleFavorite}
    >
      <HeartIcon
        size={18}
        color={
          currentLikedMovies.some((movie: Movie) => movie.id === movieId)
            ? "red"
            : "white"
        }
        fill={
          currentLikedMovies.some((movie: Movie) => movie.id === movieId)
            ? "red"
            : "transparent"
        }
      />
    </Button>
  );
};
