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
    setCurrentLikedMovies(
      JSON.parse(localStorage.getItem("likedMovies") || "[]")
    );
  }, []);

  const toggleFavorite = () => {
    const localMovies = JSON.parse(localStorage.getItem("likedMovies") || "[]");

    const isFavorite = localMovies.some((movie: Movie) => movie.id === movieId);

    if (isFavorite) {
      const updatedMovies = localMovies.filter(
        (movie: Movie) => movie.id !== movieId
      );
      localStorage.setItem("likedMovies", JSON.stringify(updatedMovies));
      setCurrentLikedMovies(updatedMovies);

      localStorage.setItem(
        "notifications",
        JSON.stringify([
          {
            title: "Suppression des favoris",
            description: `Le film ${movieTitle} a été supprimé des favoris`,
            isRead: false,
            date: new Date(),
          },
          ...JSON.parse(localStorage.getItem("notifications") || "[]"),
        ])
      );
    } else {
      const newMovie = {
        id: movieId,
        title: movieTitle,
        poster_path: moviePosterPath,
        overview: movieOverview,
      };
      const updatedMovies = [...localMovies, newMovie];
      localStorage.setItem("likedMovies", JSON.stringify(updatedMovies));
      setCurrentLikedMovies(updatedMovies);

      localStorage.setItem(
        "notifications",
        JSON.stringify([
          {
            title: "Nouvel ajout aux favoris",
            description: `Le film ${movieTitle} a été ajouté à vos favoris`,
            isRead: false,
            date: new Date(),
          },
          ...JSON.parse(localStorage.getItem("notifications") || "[]"),
        ])
      );
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
