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
import DisplayContainer from "../components/DisplayContainer";

Modal.setAppElement("#__next");

export default function Home({
  movieGenres,
  tvGenres,
  trending,
  actionMovies,
  tvDrama,
  comedyMovies,
  animation,
  romanceMovies,
  kids,
  horrorMovies,
  reality,
  topRated,
  western,
}) {
  const [modalInfo, setModalInfo] = useState("");
  const [randomTrend, setRandomTrend] = useState(null);
  const [gridMenuLayout, setGridMenuLayout] = useState(false);
  const router = useRouter();

  const changeMenuLayout = () => {
    setGridMenuLayout((prevState) => !prevState);
  };

  useEffect(() => {
    const randomResult =
      trending.results[Math.floor(Math.random() * trending.results.length)];

    setRandomTrend(randomResult);
  }, []);

  useEffect(() => {
    console.log({ modalInfo });
  }, [modalInfo]);

  const sections = [
    { title: "Action movies", data: actionMovies, itemType: "movies" },
    { title: "TV Drama", data: tvDrama, itemType: "tv" },
    { title: "Comedy Movies", data: comedyMovies, itemType: "movies" },
    { title: "Animation Shows", data: animation, itemType: "tv" },
    { title: "Romance Movies", data: romanceMovies, itemType: "movies" },
    { title: "Kids", data: kids, itemType: "tv" },
    { title: "Horror Movies", data: horrorMovies, itemType: "movies" },
    { title: "Reality TV", data: reality, itemType: "tv" },
    { title: "Top rated", data: topRated, itemType: "movies" },
    { title: "Western Shows", data: western, itemType: "tv" },
  ];

  const handleClose = () => {
    router.replace("/", undefined, { scroll: false, shallow: true });
  };

  return (
    <>
      <PageLayout
        section="Home"
        handleChangeGridMenuLayout={changeMenuLayout}
        gridMenuLayout={gridMenuLayout}
      >
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
        />*/}
        {gridMenuLayout ? (
          <section className="flex flex-col px-12">
            {sections.map((section) => (
              <DisplayContainer
                key={section.title}
                title={section.title}
                list={section.data}
                onClick={(item) =>
                  setModalInfo({
                    ...item,
                    itemType: section.itemType,
                  })
                }
                section={undefined} // para q la ruta que cambia sea "/"
              />
            ))}
          </section>
        ) : (
          <section className="flex flex-col px-12">
            {sections.map((section) => (
              <RowSection
                key={section.title}
                title={section.title}
                listData={section.data}
                onClick={(item) =>
                  setModalInfo({
                    ...item,
                    itemType: section.itemType,
                  })
                }
                section={undefined} // para q la ruta que cambia sea "/"
              />
            ))}
          </section>
        )}

        {/* TODO: logica para un row o displaycontainer */}

        {/* <DisplayContainer
          title="Action movies"
          list={actionMovies}
          onClick={(item) =>
            setModalInfo({
              ...item,
              itemType: "movies",
            })
          }
          section={undefined} // para q la ruta que cambia sea "/"
        /> */}

        {router.query.id && (
          <Modal
            className="scrollbar-none"
            //!! pasa a booleano
            isOpen={!!router.query.id}
            onRequestClose={handleClose}
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
              onClose={handleClose}
              section={modalInfo.itemType}
              credits={modalInfo.itemType === "movies" ? "movie" : "tv"}
              info={modalInfo}
              genres={modalInfo.itemType === "movies" ? movieGenres : tvGenres}
              tv={modalInfo.itemType === "tv"}
            />
          </Modal>
        )}
      </PageLayout>
    </>
  );
}

export async function getServerSideProps() {
  const [
    movieGenres,
    tvGenres,
    actionMovies,
    trending,
    tvDrama,
    comedyMovies,
    animation,
    romanceMovies,
    kids,
    horrorMovies,
    reality,
    topRated,
    western,
  ] = await Promise.all([
    fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
    ).then((res) => res.json()),
    fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=en-US`).then(
      (res) => res.json()
    ),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchDrama).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchAnimation).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchKids).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchReality).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchWestern).then((res) => res.json()),
  ]);

  return {
    props: {
      movieGenres: movieGenres.genres,
      tvGenres: tvGenres.genres,
      trending,
      actionMovies: actionMovies.results,
      tvDrama: tvDrama.results,
      comedyMovies: comedyMovies.results,
      animation: animation.results,
      romanceMovies: romanceMovies.results,
      kids: kids.results,
      horrorMovies: horrorMovies.results,
      reality: reality.results,
      topRated: topRated.results,
      western: western.results,
    },
  };
  // const [
  //   genres,
  //   trending,
  //   tvNetflixOriginals,
  //   animation,
  //   drama,
  //   documentaries,
  //   western,
  //   kids,
  //   reality,
  // ] = await Promise.all([
  //   fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=en-US`).then(
  //     (res) => res.json()
  //   ),
  //   fetch(requests.fetchTrending).then((res) => res.json()),
  //   fetch(requests.fetchTvNetflixOriginals).then((res) => res.json()),
  //   fetch(requests.fetchAnimation).then((res) => res.json()),
  //   fetch(requests.fetchDrama).then((res) => res.json()),
  //   fetch(requests.fetchTvDocumentaries).then((res) => res.json()),
  //   fetch(requests.fetchWestern).then((res) => res.json()),
  //   fetch(requests.fetchKids).then((res) => res.json()),
  //   fetch(requests.fetchReality).then((res) => res.json()),
  // ]);

  // return {
  //   props: {
  //     genres: genres.genres,
  //     trending,
  //     tvNetflixOriginals,
  //     animation,
  //     drama,
  //     documentaries,
  //     western,
  //     kids,
  //     reality,
  //   },
  // };
}
