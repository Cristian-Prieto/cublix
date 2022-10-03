import PageLayout from "../../components/PageLayout";
import requests from "../../utils/requests";
import { useRouter } from "next/router";
import { useState } from "react";
import { BASE_URL, API_KEY } from "../../utils/requests";
import Modal from "react-modal";
import ModalLayout from "../../components/ModalLayout";

import { IoCaretDown } from "react-icons/io5";
import { HiMenuAlt1 } from "react-icons/hi";
import { BiBorderAll } from "react-icons/bi";
import RowSection from "../../components/RowSection";

export default function Tv({
  genres,
  popular,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}) {
  // const topRatedList = topRated.results;
  // const actionMoviesList = actionMovies.results;
  // const comedyMoviesList = comedyMovies.results;
  // const horrorMoviesList = horrorMovies.results;
  // const romanceMoviesList = romanceMovies.results;
  // const documentariesList = documentaries.results;

  const [modalInfo, setModalInfo] = useState("");
  const router = useRouter();
  Modal.setAppElement("#__next");
  console.log(modalInfo);

  return (
    <>
      <PageLayout>
        <div className="flex justify-between mb-8">
          <div className="flex items-center space-x-12 text-slate-200">
            <span className="sm:text-3xl font-bold">Tv Shows</span>
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

        {/*row lists*/}

        <RowSection
          title="Popular"
          setModalInfo={setModalInfo}
          listData={popular}
          section="Tv"
        />

        {/* <RowSection
          title="Top rated"
          setModalInfo={setModalInfo}
          listData={topRatedList}
        />

        <RowSection
          title="Action movies"
          setModalInfo={setModalInfo}
          listData={actionMoviesList}
        />

        <RowSection
          title="Comedy movies"
          setModalInfo={setModalInfo}
          listData={comedyMoviesList}
        />

        <RowSection
          title="Horror movies"
          setModalInfo={setModalInfo}
          listData={horrorMoviesList}
        />

        <RowSection
          title="Romance movies"
          setModalInfo={setModalInfo}
          listData={romanceMoviesList}
        />

        <RowSection
          title="Documentaries"
          setModalInfo={setModalInfo}
          listData={documentariesList}
        /> */}

        {router.query.id && (
          <Modal
            className="scrollbar-none"
            //!! pasa a booleano
            isOpen={!!router.query.id}
            onRequestClose={() => router.push("/Tv")}
            style={{
              overlay: {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.75",
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
              credits="tv"
              info={modalInfo}
              genres={genres}
              tv={true}
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
    popular,
    netflixOriginals,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=en-US`).then(
      (res) => res.json()
    ),
    fetch(requests.fetchPopular).then((res) => res.json()),
    // fetch(requests.fetchTopRated).then((res) => res.json()),
    // fetch(requests.fetchActionMovies).then((res) => res.json()),
    // fetch(requests.fetchComedyMovies).then((res) => res.json()),
    // fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    // fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    // fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      genres: genres.genres,
      popular,
      // netflixOriginals,
      // topRated,
      // actionMovies,
      // comedyMovies,
      // horrorMovies,
      // romanceMovies,
      // documentaries,
    },
  };
}
