import { incrementInLocalStorage } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { MovieTrailer } from "./movie-trailer";

export const MovieModal = ({
  title,
  poster_path,
  overview,
  id,
}: {
  title: string;
  poster_path: string;
  overview: string;
  id: number;
}) => {
  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (isOpen) incrementInLocalStorage();
      }}
    >
      <DialogTrigger>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className="w-full h-auto rounded-2xl"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="p-0 m-0"></DialogTitle>
          <MovieTrailer
            movieTitle={title}
            movieId={id}
            movieOverview={overview}
            moviePosterPath={poster_path}
          />
          <DialogDescription>{overview}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
