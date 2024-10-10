"use server";

export const fetchMovies = async () => {
  try {
    const response = await fetch(
      `${process.env.API_URL}trending/all/day?api_key=${process.env.API_KEY}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMoviesByGenre = async (genreId: number, pageId: number) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}discover/movie?api_key=${process.env.API_KEY}&with_genres=${genreId}&language=en-US&page=${pageId}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getGenres = async () => {
  try {
    const response = await fetch(
      `${process.env.API_URL}genre/movie/list?api_key=${process.env.API_KEY}&language=en-US`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getPopularMovies = async () => {
  try {
    const response = await fetch(
      `${process.env.API_URL}movie/popular?api_key=${process.env.API_KEY}&language=en-US`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getBestMovies = async () => {
  try {
    const response = await fetch(
      `${process.env.API_URL}movie/top_rated?api_key=${process.env.API_KEY}&language=en-US`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMovieVideos = async (movieId: number) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}movie/${movieId}/videos?api_key=${process.env.API_KEY}&language=en-US`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getMovieByName = async (movieName: string) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}search/movie?api_key=${process.env.API_KEY}&query=${movieName}&language=en-US`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
