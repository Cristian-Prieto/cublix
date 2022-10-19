import { BASE_URL, API_KEY } from "../../utils/requests";
import requests from "../../utils/requests";
import { useEffect, useState } from "react";
import Back from "../../components/Back";

export default function TvDetail({ tvDetail }) {
  const [videoData, setVideoData] = useState(null);
  useEffect(() => {
    console.log({ tvDetail });
    fetch(
      `${BASE_URL}/tv/${tvDetail.id}/videos?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((jsonData) => {
        setVideoData(jsonData);
      })
      .catch((err) => console.error(err));
  }, [tvDetail]);

  return (
    <div className="h-screen w-screen bg-black">
      <Back section="/tv" />
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
    fetch(requests.fetchPopular).then((res) => res.json()),
    fetch(requests.fetchTvNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchAnimation).then((res) => res.json()),
    fetch(requests.fetchDrama).then((res) => res.json()),
    fetch(requests.fetchTvDocumentaries).then((res) => res.json()),
    fetch(requests.fetchWestern).then((res) => res.json()),
    fetch(requests.fetchKids).then((res) => res.json()),
    fetch(requests.fetchReality).then((res) => res.json()),
  ]);
  const allTvIds = res.map((shows) => shows.results.map((show) => show.id));

  const uniqueIds = [...new Set(allTvIds.flat())];

  const paths = uniqueIds.map((tvId) => ({
    params: { id: tvId.toString() },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${BASE_URL}/tv/${params.id}?api_key=${API_KEY}&language=en-US`
  );
  const tvDetail = await res.json();
  return {
    props: { tvDetail },
  };
}
