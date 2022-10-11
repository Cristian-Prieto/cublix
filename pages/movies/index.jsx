import PageLayout from "../../components/PageLayout";
import requests from "../../utils/requests";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BASE_URL, API_KEY } from "../../utils/requests";
import { BASE_IMAGE_URL } from "../../utils/images";
import Modal from "react-modal";
import ModalLayout from "../../components/ModalLayout";
import { IoCaretDown } from "react-icons/io5";
import { HiMenuAlt1 } from "react-icons/hi";
import { BiBorderAll } from "react-icons/bi";
import RowSection from "../../components/RowSection";
import Link from "next/link";

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

  useEffect(() => {
    const randomResult =
      actionMovies.results[
        Math.floor(Math.random() * actionMovies.results.length)
      ];

    setRandomTrend(randomResult);
  }, []);

  return (
    <>
      <PageLayout>
        <div className="flex sticky top-0 justify-between py-4 z-20 bg-zinc-900 px-12">
          <div className="flex items-center space-x-12 text-slate-200">
            <span className="sm:text-3xl font-bold">Movies</span>
            <span className="flex items-center border-2 border-slate-200 text-xs p-1 px-2 gap-4">
              Categories
              <IoCaretDown />
            </span>
            <div></div>
          </div>
          <div className="flex sm:text-md text-slate-200">
            <div className="flex items-center px-4 border border-slate-200">
              <HiMenuAlt1 />
            </div>
            <div className="flex items-center px-4 border border-slate-200">
              <BiBorderAll />
            </div>
          </div>
        </div>

        {randomTrend && (
          <div className="h-96 relative">
            <div className="z-10 bottom-0 left-0 absolute md:w-1/2 p-12 pt-4 text-white">
              <h1 className="text-3xl text-white">
                {randomTrend.title || randomTrend.name}
              </h1>
              <p>{randomTrend.overview}</p>
            </div>

            <Image
              src={`${BASE_IMAGE_URL}${
                randomTrend.backdrop_path ?? randomTrend.poster_path
              }`}
              alt={`image for ${randomTrend.title}`}
              layout="fill"
              objectFit="cover"
            />
            <Link
              href={`/movies/?id=${randomTrend.id}`}
              as={`/movies/${randomTrend.id}`}
            >
              <a
                onClick={() => setModalInfo(randomTrend)}
                className="absolute bg-red-500 cursor-pointer z-10"
              >
                GOOO
              </a>
            </Link>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-zinc-900" />
          </div>
        )}

        {/*row lists*/}
        <div className="flex flex-col">
          <RowSection
            title="Netflix originals"
            setModalInfo={setModalInfo}
            listData={netflixOriginals}
            section="movies"
          />

          <RowSection
            title="Top rated"
            setModalInfo={setModalInfo}
            listData={topRated}
            section="movies"
          />

          <RowSection
            title="Action movies"
            setModalInfo={setModalInfo}
            listData={actionMovies}
            section="movies"
          />

          <RowSection
            title="Comedy movies"
            setModalInfo={setModalInfo}
            listData={comedyMovies}
            section="movies"
          />

          <RowSection
            title="Horror movies"
            setModalInfo={setModalInfo}
            listData={horrorMovies}
            section="movies"
          />

          <RowSection
            title="Romance movies"
            setModalInfo={setModalInfo}
            listData={romanceMovies}
            section="movies"
          />

          <RowSection
            title="Documentaries"
            setModalInfo={setModalInfo}
            listData={documentaries}
            section="movies"
          />

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
        </div>
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
