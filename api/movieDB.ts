import axios from 'axios';

const apiKey = process.env.MOVIE_API_KEY;
const apiBaseUrl = 'https://api.themoviedb.org/3';
const baseImageUrl = 'https://image.tmdb.org/t/p/';

// Endpoints
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;

// dynamic endpoints
export const movieDetailsEndpoint = (id: number): string =>
  `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;

export const movieCreditsEndpoint = (id: number): string =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;

export const similarMoviesEndpoint = (id: number): string =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

export const personDetailsEndpoint = (id: number): string =>
  `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;

export const personMovieCreditsEndpoint = (id: number): string =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

export const searchMoviesEndpoint = (query: string): string =>
  `${apiBaseUrl}/search/movie?api_key=${apiKey}&query=${query}`;

// Image URL
export const image500 = (path: string | null | undefined): string => {
  return path ? `${baseImageUrl}/w500${path}` : '';
};

export const image342 = (path: string | null | undefined): string => {
  return path ? `${baseImageUrl}/w342${path}` : '';
};

export const image185 = (path: string | null | undefined): string => {
  return path ? `${baseImageUrl}/w185${path}` : '';
};

export const image128 = (path: string | null | undefined): string => {
  return path ? `${baseImageUrl}/w128${path}` : '';
};

// fallback function for API calls

export const fallbackImage =
  'https://www.movienewz.com/img/films/poster-holder.jpg';

export const fallbackProfileImage =
  'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png';

// API call
async function apiCall(endpoint: string, params: any) {
  const options = {
    method: 'GET',
    params: params ? params : {},
    url: endpoint,
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// API calls for trending, upcoming and top rated movies
export async function getTrendingMovies() {
  return apiCall(trendingMoviesEndpoint, null);
}

export async function getUpcomingMovies() {
  return apiCall(upcomingMoviesEndpoint, null);
}

export async function getTopRatedMovies() {
  return apiCall(topRatedMoviesEndpoint, null);
}

// API calls for movie details, credits and similar movies

export async function getMovieDetails(id: any) {
  return apiCall(movieDetailsEndpoint(id), null);
}

export async function getMovieCredits(id: number) {
  return apiCall(movieCreditsEndpoint(id), null);
}

export async function getSimilarMovies(id: number) {
  return apiCall(similarMoviesEndpoint(id), null);
}

export async function getPersonDetails(id: number) {
  return apiCall(personDetailsEndpoint(id), null);
}

export async function getPersonMovieCredits(id: number) {
  return apiCall(personMovieCreditsEndpoint(id), null);
}

export async function searchMovies(query: any) {
  return apiCall(searchMoviesEndpoint(query), null);
}
