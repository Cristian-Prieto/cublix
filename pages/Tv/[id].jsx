import { useRouter } from "next/router";
import { BASE_URL, API_KEY } from "../../utils/requests";
import requests from "../../utils/requests";

export default function tvDetail({ movieDetail }) {
  // const router = useRouter();

  return <div>{movieDetail.title}</div>;
}

export async function getStaticPaths() {
  const res = await fetch(requests.fetchTrending);
  const trending = await res.json();
  const trendingList = trending.results;

  const paths = trendingList.map((movie) => ({
    params: { id: movie.id.toString() },
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
