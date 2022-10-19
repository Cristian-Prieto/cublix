import { BASE_URL, API_KEY } from "../../utils/requests";
import requests from "../../utils/requests";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Back from "../../components/Back";

export default function MovieDetail({ movieDetail }) {
  const [videoData, setVideoData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch(
      `${BASE_URL}/movie/${movieDetail.id}/videos?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((jsonData) => {
        setVideoData(jsonData);
      })
      .catch((err) => console.error(err));
  }, [movieDetail]);

  return (
    <div className="h-screen w-screen bg-black">
      <Back section="/movies" />
      <div className="container flex flex-col justify-center items-center m-auto p-4 w-full h-full">
        {videoData && videoData.results.length > 0 && (
          <iframe
            className="w-full h-full object-cover"
            src={`https://www.youtube.com/embed/${videoData.results[0].key}`}
            title={videoData.results[0].name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await Promise.all([
    fetch(requests.fetchTrending)
      .then((res) => res.json())
      .then((jsonData) => {
        return jsonData.results.map((result) => result.id);
      }),
    fetch(requests.fetchNetflixOriginals)
      .then((res) => res.json())
      .then((jsonData) => {
        return jsonData.results.map((result) => result.id);
      }),
    fetch(requests.fetchTopRated)
      .then((res) => res.json())
      .then((jsonData) => {
        return jsonData.results.map((result) => result.id);
      }),
    fetch(requests.fetchActionMovies)
      .then((res) => res.json())
      .then((jsonData) => {
        return jsonData.results.map((result) => result.id);
      }),
    fetch(requests.fetchComedyMovies)
      .then((res) => res.json())
      .then((jsonData) => {
        return jsonData.results.map((result) => result.id);
      }),
    fetch(requests.fetchHorrorMovies)
      .then((res) => res.json())
      .then((jsonData) => {
        return jsonData.results.map((result) => result.id);
      }),
    fetch(requests.fetchRomanceMovies)
      .then((res) => res.json())
      .then((jsonData) => {
        return jsonData.results.map((result) => result.id);
      }),
    fetch(requests.fetchDocumentaries)
      .then((res) => res.json())
      .then((jsonData) => {
        return jsonData.results.map((result) => result.id);
      }),
  ]);
  const allMovieIds = res.map((movies) => movies.map((id) => id));

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
