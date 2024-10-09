"use client";
import { useNotifications } from "@/components/providers/notifications-provider";
import { Button } from "@/components/ui/button";
import { HeartIcon, HeartOffIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

const FavoritesPage = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const { notifications, setNotifications } = useNotifications();

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

    // Ajouter une notification
    const newNotification = {
      title: "Suppression des favoris",
      description: `Le film ${
        favoriteMovies.find((movie) => movie.id === movieId)?.title
      } a été supprimé des favoris`,
      isRead: false,
      date: new Date().toString(),
    };

    localStorage.setItem(
      "notifications",
      JSON.stringify([newNotification, ...notifications])
    );

    setNotifications([newNotification, ...notifications]);
  };

  return (
    <div className="space-y-2">
      <h3 className="font-bold ext-lg">Favorites</h3>

      {favoriteMovies.length > 0 ? (
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {favoriteMovies.map((movie: Movie) => (
            <div key={movie.id} className="relative">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
                <Button
                  className="p-0 bg-red-500 rounded-full aspect-square group"
                  onClick={() => removeFavorite(movie.id)}
                >
                  <HeartIcon
                    size={20}
                    color="white"
                    fill="white"
                    className="group-hover:hidden"
                  />
                  <HeartOffIcon
                    size={20}
                    color="white"
                    fill="white"
                    className="hidden group-hover:block"
                  />
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
          Aucun film n&apos;a été ajouté en favoris.
        </p>
      )}
    </div>
  );
};

export default FavoritesPage;
