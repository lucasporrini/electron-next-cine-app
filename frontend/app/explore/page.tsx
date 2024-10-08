import { GenreMovies } from "@/components/global/genre-movies";
import { GlobalMovies } from "@/components/global/global-movies";

const ExplorePage = () => {
  return (
    <>
      <GlobalMovies type="popular" />
      <GlobalMovies type="best" />
      <h2 className="mt-10 text-2xl font-bold">
        Here you can find few movies by genres
      </h2>
      <GenreMovies genreId={28} pageId={1} />
      <GenreMovies genreId={18} pageId={1} />
      <GenreMovies genreId={10749} pageId={1} />
      <GenreMovies genreId={878} pageId={1} />
      <GenreMovies genreId={16} pageId={1} />
      <GenreMovies genreId={35} pageId={1} />
    </>
  );
};

export default ExplorePage;
