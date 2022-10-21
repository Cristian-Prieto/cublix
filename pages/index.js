import PageLayout from "../components/PageLayout";
import requests from "../utils/requests";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { BASE_URL, API_KEY } from "../utils/requests";
import { BASE_IMAGE_URL } from "../utils/images";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-modal";
import ModalLayout from "../components/ModalLayout";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoPlaySharp } from "react-icons/io5";
import RowSection from "../components/RowSection";

Modal.setAppElement("#__next");

export default function Home({
  genres,
  trending,
  tvNetflixOriginals,
  animation,
  drama,
  documentaries,
  western,
  kids,
  reality,
}) {
  const [modalInfo, setModalInfo] = useState("");
  const [randomTrend, setRandomTrend] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const randomResult =
      trending.results[Math.floor(Math.random() * trending.results.length)];

    setRandomTrend(randomResult);
  }, []);

  console.log(modalInfo);

  return (
    <>
      <PageLayout section="Home">
        {randomTrend && (
          <div className="h-96 relative">
            <div className="flex flex-col gap-4 z-10 bottom-0 left-0 absolute md:w-1/2 p-12 pt-4 text-white">
              <h1 className="text-3xl text-white">
                {randomTrend.title || randomTrend.name}
              </h1>
              <p>{randomTrend.overview}</p>
              {/* <div className="flex gap-4">
                <Link
                  href={`${randomTrend.first_air_date ? "tv" : "movies"}/${
                    randomTrend.id
                  }`}
                >
                  <a className="flex gap-2 font-semibold items-center justify-center rounded-md px-4 py-2 text-black bg-slate-100 bg-opacity-100 hover:bg-opacity-80">
                    <IoPlaySharp className="text-3xl" />
                    <span>Play</span>
                  </a>
                </Link>

                <Link
                  href={`${
                    randomTrend.media_type === "movie" ? "movies" : "tv"
                  }/?id=${randomTrend.id}`}
                  as={`${
                    randomTrend.media_type === "movie" ? "movies" : "tv"
                  }/${randomTrend.id}`}
                >
                  <a
                    onClick={() => setModalInfo(randomTrend)}
                    className="flex gap-2 font-semibold items-center justify-center rounded-md px-4 py-2 text-white bg-zinc-500 hover:bg-zinc-700 bg-opacity-50 hover:bg-opacity-50"
                  >
                    <IoMdInformationCircleOutline className="text-3xl" />
                    <span>Info</span>
                  </a>
                </Link>
              </div> */}
            </div>

            <Image
              src={`${BASE_IMAGE_URL}${
                randomTrend.backdrop_path ?? randomTrend.poster_path
              }`}
              alt={`image for ${randomTrend.title}`}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-zinc-900" />
          </div>
        )}

        {/* <RowSection
          title="Trending right now"
          setModalInfo={setModalInfo}
          listData={trending}
          section={`${modalInfo.media_type === "movie" ? "movies" : "tv"}`}
        />

        <RowSection
          title="Netflix originals"
          setModalInfo={setModalInfo}
          listData={tvNetflixOriginals}
          section="tv"
        /> */}

        {/* <RowSection
          title="Animation"
          setModalInfo={setModalInfo}
          listData={animation}
          // section="tv"
        />

        <RowSection
          title="Drama"
          setModalInfo={setModalInfo}
          listData={drama}
          // section="tv"
        />

        <RowSection
          title="Documentaries"
          setModalInfo={setModalInfo}
          listData={documentaries}
          // section="tv"
        />

        <RowSection
          title="Western"
          setModalInfo={setModalInfo}
          listData={western}
          // section="tv"
        />

        <RowSection
          title="Kids"
          setModalInfo={setModalInfo}
          listData={kids}
          // section="tv"
        />

        <RowSection
          title="Reality"
          setModalInfo={setModalInfo}
          listData={reality}
          // section="tv"
        /> */}

        {router.query.id && (
          <Modal
            className="scrollbar-none"
            //!! pasa a booleano
            isOpen={!!router.query.id}
            onRequestClose={() => router.back("/")}
            style={{
              overlay: {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.75",
                zIndex: 50,
              },
              content: {
                position: "absolute",
                top: "40px",
                left: "0",
                right: "0",
                marginLeft: "auto",
                marginRight: "auto",
                bottom: "0",
                border: "none",
                maxWidth: "800px",
                background: "#000",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: "8px",
                outline: "none",
                padding: "0",
                boxShadow: "0px 0px 25px 8px rgba(0,0,0,0.5)",
              },
            }}
          >
            <ModalLayout
              section={`${modalInfo.first_air_date === "tv" ? "tv" : "movies"}`}
              credits={`${modalInfo.first_air_date === "tv" ? "tv" : "movies"}`}
              info={modalInfo}
              genres={genres}
              tv={modalInfo.first_air_date}
            />
          </Modal>
        )}
      </PageLayout>
    </>
  );
}

export async function getServerSideProps() {
  const [
    genres,
    trending,
    tvNetflixOriginals,
    animation,
    drama,
    documentaries,
    western,
    kids,
    reality,
  ] = await Promise.all([
    fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=en-US`).then(
      (res) => res.json()
    ),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTvNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchAnimation).then((res) => res.json()),
    fetch(requests.fetchDrama).then((res) => res.json()),
    fetch(requests.fetchTvDocumentaries).then((res) => res.json()),
    fetch(requests.fetchWestern).then((res) => res.json()),
    fetch(requests.fetchKids).then((res) => res.json()),
    fetch(requests.fetchReality).then((res) => res.json()),
  ]);

  return {
    props: {
      genres: genres.genres,
      trending,
      tvNetflixOriginals,
      animation,
      drama,
      documentaries,
      western,
      kids,
      reality,
    },
  };
}
