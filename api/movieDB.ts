import axios from 'axios';

const apiKey = process.env.MOVIE_DB_API_KEY;
const apiBaseUrl = process.env.apiBaseUrl;
const baseImageUrl = process.env.baseImageUrl;

// Endpoints
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;

// Image URL
export const image500 = (path: string | null | undefined): string => {
  return path ? `${baseImageUrl}/w500${path}` : '';
};

export const imageOriginal = (path: string | null | undefined): string => {
  return path ? `${baseImageUrl}/original${path}` : '';
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
  'https://www.movienewz.com/img/films/poster-holder.jpg';

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
