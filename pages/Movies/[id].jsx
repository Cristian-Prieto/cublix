import { BASE_URL, API_KEY } from "../../utils/requests";
import requests from "../../utils/requests";

export default function MovieDetail({ movieDetail }) {
  return <div>{movieDetail.title}</div>;
}

export async function getStaticPaths() {
  const res = await Promise.all([
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);
  const allMovieIds = res.map((movies) =>
    movies.results.map((movie) => movie.id)
  );

  const uniqueIds = [...new Set(allMovieIds.flat())];

  const paths = uniqueIds.map((movieId) => ({
    params: { id: movieId.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${BASE_URL}/movie/${params.id}?api_key=${API_KEY}&language=en-US`
  );
  const movieDetail = await res.json();
  return {
    props: { movieDetail },
  };
}
