import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-modal";
import { BASE_URL, API_KEY } from "../../utils/requests";
import { BASE_IMAGE_URL } from "../../utils/images";
import PageLayout from "../../components/PageLayout";
import requests from "../../utils/requests";
import ModalLayout from "../../components/ModalLayout";
import DisplayContainer from "../../components/DisplayContainer";
import { IoMdInformationCircleOutline } from "react-icons/io";
import RowSection from "../../components/RowSection";
import { IoPlaySharp } from "react-icons/io5";

Modal.setAppElement("#__next");

export default function Movies({
  genres,
  netflixOriginals,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}) {
  const [randomTrend, setRandomTrend] = useState(null);
  const [modalInfo, setModalInfo] = useState("");
  const router = useRouter();
  const [genreSelected, setGenreSelected] = useState(null);
  const [gridMenuLayout, setGridMenuLayout] = useState(false);

  const changeMenuLayout = () => {
    setGridMenuLayout((prevState) => !prevState);
  };

  useEffect(() => {
    const randomResult =
      actionMovies.results[
        Math.floor(Math.random() * actionMovies.results.length)
      ];

    setRandomTrend(randomResult);
  }, []);

  const handleSelectedGenre = (genre) => {
    setGenreSelected(genre);
  };

  return (
    <>
      <PageLayout
        section="Movies"
        genreSelected={genreSelected}
        setGenreSelected={setGenreSelected}
        genres={genres}
        selectGenre={handleSelectedGenre}
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
              <div className="flex gap-4">
                <Link href={`/movies/${randomTrend.id}`}>
                  <a className="flex gap-2 font-semibold items-center justify-center rounded-md px-4 py-2 text-black bg-slate-100 bg-opacity-100 hover:bg-opacity-80">
                    <IoPlaySharp className="text-3xl" />
                    <span>Play</span>
                  </a>
                </Link>

                <Link
                  href={`/movies/?id=${randomTrend.id}`}
                  as={`/movies/${randomTrend.id}`}
                >
                  <a
                    onClick={() => setModalInfo(randomTrend)}
                    className="flex gap-2 font-semibold items-center justify-center rounded-md px-4 py-2 text-white bg-zinc-500 hover:bg-zinc-700 bg-opacity-50 hover:bg-opacity-50"
                  >
                    <IoMdInformationCircleOutline className="text-3xl" />
                    <span>Info</span>
                  </a>
                </Link>
              </div>
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

        {gridMenuLayout ? (
          <section className="flex flex-col p-12">
            <DisplayContainer
              title="Netflix originals"
              list={
                genreSelected
                  ? netflixOriginals.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : netflixOriginals.results
              }
              setModalInfo={setModalInfo}
              section="movies"
            />

            <DisplayContainer
              title="Top rated"
              setModalInfo={setModalInfo}
              list={
                genreSelected
                  ? topRated.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : topRated.results
              }
              section="movies"
            />

            <DisplayContainer
              title="Action movies"
              setModalInfo={setModalInfo}
              list={
                genreSelected
                  ? actionMovies.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : actionMovies.results
              }
              section="movies"
            />

            <DisplayContainer
              title="Comedy movies"
              setModalInfo={setModalInfo}
              list={
                genreSelected
                  ? comedyMovies.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : comedyMovies.results
              }
              section="movies"
            />

            <DisplayContainer
              title="Horror movies"
              setModalInfo={setModalInfo}
              list={
                genreSelected
                  ? horrorMovies.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : horrorMovies.results
              }
              section="movies"
            />

            <DisplayContainer
              title="Romance movies"
              setModalInfo={setModalInfo}
              list={
                genreSelected
                  ? romanceMovies.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : romanceMovies.results
              }
              section="movies"
            />

            <DisplayContainer
              title="Documentaries"
              setModalInfo={setModalInfo}
              list={
                genreSelected
                  ? documentaries.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : documentaries.results
              }
              section="movies"
            />
          </section>
        ) : (
          <section className="flex flex-col">
            <RowSection
              title="Netflix originals"
              listData={
                genreSelected
                  ? netflixOriginals.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : netflixOriginals.results
              }
              setModalInfo={setModalInfo}
              section="movies"
            />

            <RowSection
              title="Top rated"
              setModalInfo={setModalInfo}
              listData={
                genreSelected
                  ? topRated.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : topRated.results
              }
              section="movies"
            />

            <RowSection
              title="Action movies"
              setModalInfo={setModalInfo}
              listData={
                genreSelected
                  ? actionMovies.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : actionMovies.results
              }
              section="movies"
            />

            <RowSection
              title="Comedy movies"
              setModalInfo={setModalInfo}
              listData={
                genreSelected
                  ? comedyMovies.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : comedyMovies.results
              }
              section="movies"
            />

            <RowSection
              title="Horror movies"
              setModalInfo={setModalInfo}
              listData={
                genreSelected
                  ? horrorMovies.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : horrorMovies.results
              }
              section="movies"
            />

            <RowSection
              title="Romance movies"
              setModalInfo={setModalInfo}
              listData={
                genreSelected
                  ? romanceMovies.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : romanceMovies.results
              }
              section="movies"
            />

            <RowSection
              title="Documentaries"
              setModalInfo={setModalInfo}
              listData={
                genreSelected
                  ? documentaries.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : documentaries.results
              }
              section="movies"
            />
          </section>
        )}

        {router.query.id && (
          <Modal
            className="scrollbar-none"
            //!! pasa a booleano
            isOpen={!!router.query.id}
            onRequestClose={() => router.push("/movies")}
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
              section="movies"
              credits="movie"
              info={modalInfo}
              genres={genres}
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
    netflixOriginals,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
    ).then((res) => res.json()),
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      genres: genres.genres,
      netflixOriginals,
      topRated,
      actionMovies,
      comedyMovies,
      horrorMovies,
      romanceMovies,
      documentaries,
    },
  };
}
