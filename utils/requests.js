export const API_KEY = "f5fbd818716db14a9ad63b667d984f29";
export const BASE_URL = "https://api.themoviedb.org/3";

const requests = {
  //Movies
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
  //Shows
  fetchPopular: `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
  fetchTvNetflixOriginals: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTvTopRated: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchTvAction: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10759`,
  fetchTvComedy: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchAnimation: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=16`,
  fetchDrama: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=18`,
  fetchTvDocumentaries: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=99`,
  fetchWestern: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=37`,
  fetchKids: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10762`,
  fetchReality: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10764`,
};

export default requests;
