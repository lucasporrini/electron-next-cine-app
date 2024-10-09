"use client";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

const FavoritesPage = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Récupérer les films favoris à partir du localStorage
    const storedFavorites = JSON.parse(
      localStorage.getItem("likedMovies") || "[]"
    );
    setFavoriteMovies(storedFavorites);
  }, []);

  const removeFavorite = (movieId: number) => {
    const updatedFavorites = favoriteMovies.filter(
      (movie) => movie.id !== movieId
    );
    setFavoriteMovies(updatedFavorites);
    // Mettre à jour le localStorage
    localStorage.setItem("likedMovies", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="space-y-2">
      <h3 className="font-bold ext-lg">Favorites</h3>

      {favoriteMovies.length > 0 ? (
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {favoriteMovies.map((movie: Movie) => (
            <div key={movie.id} className="relative group">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
                <Button
                  className="p-0 bg-red-500 rounded-full aspect-square"
                  onClick={() => removeFavorite(movie.id)}
                >
                  <HeartIcon size={20} color="white" fill="white" />
                </Button>
              </div>
              <div className="mt-2 text-center">
                <h3 className="font-medium">{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-500">
          Aucun film n'a été ajouté en favoris.
        </p>
      )}
    </div>
  );
};

export default FavoritesPage;
